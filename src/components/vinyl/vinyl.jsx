import React, { useState, useEffect, useRef } from "react";
import { useSpotify } from "../../hooks/spotifyApp.js";
import "../../styles/vinyl.css";

import vinylDisc   from "../../assets/svg-components/vinyl/vinyl-disc.svg";
import vinylAccent from "../../assets/svg-components/vinyl/vinyl-disc-accent.svg";
import sunBase     from "../../assets/svg-components/vinyl/vinyl-sun-base.svg";
import moonBase    from "../../assets/svg-components/vinyl/vinyl-moon-base.svg";

const PLAYLIST_ID  = "2lhD8kwqlrMe3lRDHLvqMu";
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;

const MAX_TILT    = 12;
const SHADOW_MAX  = 20;
// shadow hardness with 0 being sharpest
const SHADOW_BLUR = 2;   
const EXPAND   = "1rem";  

function getTheme() {
  return document.documentElement.dataset.theme || "day";
}

function VinylWidget() {
  const [theme, setTheme]         = useState(getTheme);
  const [showPopup, setShowPopup] = useState(false);
  const { isPlaying, nowPlaying } = useSpotify();
  const prevIsListening           = useRef(null);
  const [tilt, setTilt]           = useState({ x: 0, y: 0 });
  const [shadow, setShadow]       = useState({ x: 0, y: 0, opacity: 0 });
  const currentTilt               = useRef({ x: 0, y: 0 });
  const currentShadow             = useRef({ x: 0, y: 0, opacity: 0 });
  // expanded mouse paralax area of effect
  const hitAreaRef                = useRef(null); 
  const resetRafRef               = useRef(null);

  const isListening = Boolean(nowPlaying);

  // theme observer
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // closes the popup when listening state flips
  useEffect(() => {
    if (prevIsListening.current !== null && prevIsListening.current !== isListening) {
      setShowPopup(false);
    }
    prevIsListening.current = isListening;
  }, [isListening]);

  // when mouse is moving
  const handleMouseMove = (e) => {
    if (resetRafRef.current) {
      cancelAnimationFrame(resetRafRef.current);
      resetRafRef.current = null;
    }
    const rect = hitAreaRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    const newX = Math.max(-1, Math.min(1, dy))  * MAX_TILT;
    const newY = Math.max(-1, Math.min(1, -dx)) * MAX_TILT;
    const sx   = (-newY / MAX_TILT) * SHADOW_MAX;
    const sy   = ( newX / MAX_TILT) * SHADOW_MAX;

    currentTilt.current   = { x: newX, y: newY };
    currentShadow.current = { x: sx, y: sy, opacity: 0.7 };
    setTilt({ x: newX, y: newY });
    setShadow({ x: sx, y: sy, opacity: 0.7 });
  };

  // mouse enters the paralax area
  const handleMouseEnter = () => {
    if (resetRafRef.current) {
      cancelAnimationFrame(resetRafRef.current);
      resetRafRef.current = null;
    }
  };

  // when mouse leaves paralax area, easing back into place
  const handleMouseLeave = () => {
    const ease = () => {
      const { x, y }                  = currentTilt.current;
      const { x: sx, y: sy, opacity } = currentShadow.current;

      const nx  = x       * 0.82;
      const ny  = y       * 0.82;
      const nsx = sx      * 0.82;
      const nsy = sy      * 0.82;
      const nop = opacity * 0.82;

      const done = Math.abs(nx) < 0.08 && Math.abs(ny) < 0.08;

      if (done) {
        currentTilt.current   = { x: 0, y: 0 };
        currentShadow.current = { x: 0, y: 0, opacity: 0 };
        setTilt({ x: 0, y: 0 });
        setShadow({ x: 0, y: 0, opacity: 0 });
        resetRafRef.current = null;
        return;
      }

      currentTilt.current   = { x: nx, y: ny };
      currentShadow.current = { x: nsx, y: nsy, opacity: nop };
      setTilt({ x: nx, y: ny });
      setShadow({ x: nsx, y: nsy, opacity: nop });
      resetRafRef.current = requestAnimationFrame(ease);
    };

    resetRafRef.current = requestAnimationFrame(ease);
  };

  // cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (resetRafRef.current) cancelAnimationFrame(resetRafRef.current);
    };
  }, []);

  const baseSVG    = theme === "day" ? sunBase : moonBase;
  const trackName  = nowPlaying?.trackName  ?? "Not playing";
  const artistName = nowPlaying?.artistName ?? "";
  const albumArt   = nowPlaying?.albumArt   ?? null;

  const dropShadow = `drop-shadow(${shadow.x}px ${shadow.y}px ${SHADOW_BLUR}px rgba(0,0,0,${shadow.opacity}))`;

  const wrapperStyle = {
    transform:  `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    filter:     dropShadow,
    willChange: "transform, filter",
    transition: "none",
  };

// helpers for the area that is affected by the paralax
  const hitAreaStyle = {
    position: "absolute",
    top:      `-${EXPAND}`,
    left:     `-${EXPAND}`,
    right:    `-${EXPAND}`,
    bottom:   `-${EXPAND}`,
    zIndex:   10,
  };

  return (
    <div className="vinyl-widget">

      <div style={{ position: "relative" }}>

        {/* invisible expanded hit area for the paralax effect */}
        <div
          ref={hitAreaRef}
          style={hitAreaStyle}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        <div className="vinyl-wrapper" style={wrapperStyle}>

          {/* base svg */}
          <img src={baseSVG} alt="" aria-hidden="true" className="vinyl-base" />

          {/* disc */}
          <div className={`vinyl-disc-group${isPlaying ? " vinyl-disc-group--spinning" : ""}`}>
            <img src={vinylDisc}   alt="" aria-hidden="true" className="vinyl-disc-img" />
            <div className="vinyl-disc-center">
              {albumArt
                ? <img src={albumArt} alt="" aria-hidden="true" />
                : <div className="vinyl-disc-center-placeholder" />
              }
            </div>
            <img src={vinylAccent} alt="" aria-hidden="true" className="vinyl-accent-img" />
          </div>

          {/* album cover */}
          <div
            className="vinyl-album-cover"
            onClick={() => setShowPopup((p) => !p)}
            role="button"
            tabIndex={0}
            aria-label={isListening ? "Listen along" : "Open music player"}
            onKeyDown={(e) => e.key === "Enter" && setShowPopup((p) => !p)}
          >
            {albumArt
              ? <img src={albumArt} alt={trackName} />
              : <div className="vinyl-album-placeholder" />
            }
          </div>

          {/* track title */}
          {isListening && (
            <div className="vinyl-track-info">
              <p className="vinyl-track-title">{trackName}</p>
            </div>
          )}

        </div>
      </div>

      {/* popup */}
      {showPopup && (
        isListening ? (
          <div className="vinyl-listen-popup">
            <p className="vinyl-listen-label">Currently listening</p>
            <p className="vinyl-listen-track">{trackName}</p>
            <p className="vinyl-listen-artist">{artistName}</p>
            <a
              className="vinyl-listen-btn"
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Listen Along →
            </a>
          </div>
        ) : (
          <div className="vinyl-spotify-popup vinyl-spotify-popup--visible">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: "12px", display: "block" }}
            />
          </div>
        )
      )}

    </div>
  );
}

export default VinylWidget;