import React, { useRef, useState, useEffect, useCallback } from "react";
import TarotCard from "./tarot-card/tarotCard";
import "../styles/heroCard.css";

// img imports
import profile1small from "../assets/media/profile1small.webp";
import profile1med from "../assets/media/profile1med.webp";
import profile1lrg from "../assets/media/profile1lrg.webp";

const FLIP_INTERVAL = 7000;

function getTheme() {
  const t = document.documentElement.dataset.theme;
  return t === "day" || t === "night" ? t : "day";
}

function HeroCard({ paused = false }) {
  const [theme, setTheme] = useState(getTheme);
  const [isSpinning, setIsSpinning] = useState(false);
  const flipTimerRef = useRef(null);
  const isSpinningRef = useRef(false);
  const isHoveredRef = useRef(false);
  const cardWrapRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Periodic 360 flip
  useEffect(() => {
    if (paused) {
      if (flipTimerRef.current) clearInterval(flipTimerRef.current);
      if (animFrameRef.current) clearTimeout(animFrameRef.current);
      return;
    }

    const trigger = () => {
      if (isSpinningRef.current || isHoveredRef.current) return;
      isSpinningRef.current = true;
      setIsSpinning(true);

      animFrameRef.current = setTimeout(() => {
        isSpinningRef.current = false;
        setIsSpinning(false);
      }, 1400);
    };

    flipTimerRef.current = setInterval(trigger, FLIP_INTERVAL);

    return () => {
      clearInterval(flipTimerRef.current);
      clearTimeout(animFrameRef.current);
    };
  }, [paused]);

  const isDay = theme === "day";
  const deckEdgeColor = isDay
    ? "rgba(139, 58, 26, 0.5)"
    : "rgba(58, 74, 138, 0.6)";

  // photo slot passed as frontContent to TarotCard
  const heroPhoto = useCallback(
    () => (
      <img
        src={profile1med}
        srcSet={`${profile1small} 480w, ${profile1med} 800w, ${profile1lrg} 1200w`}
        sizes="(max-width: 30rem) 30rem, (max-width: 50rem) 50rem, 70rem"
        alt="Ryan Leung"
        style={{
          width: "85%",
          height: "95%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
        }}
      />
    ),
    [],
  );

  // Memoize mouse handlers
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  return (
    <section className="hero-card-section" aria-label="Hero">
      <div className="hero-layout">
        <div className="hero-card-scene">
          <div
            ref={cardWrapRef}
            className={`hero-card-positioner${
              isSpinning ? " hero-card-positioner-spinning" : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <TarotCard
              title="Ryan Leung"
              subtitle="Web Developer"
              variation={1}
              disableLink
              frontContent={heroPhoto()}
            />
          </div>

          <div className="hero-deck-wrap">
            <div
              className="hero-deck"
              style={{ "--deck-edge": deckEdgeColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
