import React, { useRef, useState, useEffect } from "react";
import TarotCard from "./tarot-card/tarotCard";
import "../styles/heroCard.css";

// img imports
import profile1small from "../assets/media/profile1small.webp";
import profile1med from "../assets/media/profile1med.webp";
import profile1lrg from "../assets/media/profile1lrg.webp";

// imports for cardback
import sunCardBackIcons from "../assets/svg-components/arcana-sun-back/sun-cardback-icons.svg";
import moonCardBackIcons from "../assets/svg-components/arcana-moon-back/moon-cardback-icons.svg";
 
const FLIP_INTERVAL = 7000;
 
function getTheme() {
  return document.documentElement.dataset.theme || "night";
}
 
function HeroCard() {
  const [theme, setTheme]           = useState(getTheme);
  const [isSpinning, setIsSpinning] = useState(false);
  const flipTimerRef                = useRef(null);
  const isSpinningRef               = useRef(false);
  const isHoveredRef                = useRef(false);
  const cardWrapRef                 = useRef(null);
 
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
 
  // periodic 360 flip
  useEffect(() => {
    const trigger = () => {
      if (isSpinningRef.current || isHoveredRef.current) return;
      isSpinningRef.current = true;
      setIsSpinning(true);
      setTimeout(() => {
        isSpinningRef.current = false;
        setIsSpinning(false);
      }, 1400);
    };
    flipTimerRef.current = setInterval(trigger, FLIP_INTERVAL);
    return () => clearInterval(flipTimerRef.current);
  }, []);
 
  const isDay = theme === "day";
  const deckEdgeColor = isDay
    ? "rgba(139, 58, 26, 0.5)"
    : "rgba(58, 74, 138, 0.6)";

  // photo slot passed as frontContent to TarotCard
const heroPhoto = (
  <img
    src={profile1med}
    srcSet={`${profile1small} 480w, ${profile1med} 800w, ${profile1lrg} 1200w`}
    sizes="(max-width: 30rem) 30rem, (max-width: 50rem) 5rem, 70rem"
    alt="Ryan Leung"
    style={{
      width: "85%",
      height: "95%",
      objectFit: "cover",
      objectPosition: "center top",
      display: "block",
    }}
  />
);

  return (
    <section className="hero-section" aria-label="Hero">
      <div className="hero-layout">
 
        <div className="hero-card-scene">
          <div
            ref={cardWrapRef}
            className={`hero-card-positioner${isSpinning ? " hero-card-positioner-spinning" : ""}`}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
          >
            <TarotCard
              title="Ryan Leung"
              subtitle="Web Developer"
              variation={1}
              disableLink
              frontContent={heroPhoto}
            />
          </div>
 
          <div className="hero-deck-wrap">
            <div className="hero-deck-icons">
              <img
                src={isDay ? sunCardBackIcons : moonCardBackIcons}
                alt=""
                aria-hidden="true"
              />
            </div>
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