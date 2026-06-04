import React, { useRef, useState, useEffect } from "react";
import TarotCard from "./tarot-card/tarotCard";
import "../styles/heroCard.css";

const FLIP_INTERVAL = 20000;
const TEXT_RADIUS = 170;

function getTheme() {
  return document.documentElement.dataset.theme || "night";
}

function HeroCard() {
  const [theme, setTheme] = useState(getTheme);
  const [isSpinning, setIsSpinning] = useState(false);
  const flipTimerRef = useRef(null);
  const isSpinningRef = useRef(false);
  const cardWrapRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // auto-tilts the card to resting angle on mount
  useEffect(() => {
    const wrap = cardWrapRef.current;
    if (!wrap) return;
    wrap.style.transform = "rotateY(-25deg) rotateX(8deg) translateY(-10px)";
    const t = setTimeout(() => {
      wrap.style.transition = "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
      wrap.style.transform = "rotateY(-12deg) rotateX(4deg) translateY(-6px)";
    }, 300);
    return () => clearTimeout(t);
  }, []);

  // periodic 360 flip
  useEffect(() => {
    const trigger = () => {
      if (isSpinningRef.current) return;
      isSpinningRef.current = true;
      setIsSpinning(true);
      setTimeout(() => {
        isSpinningRef.current = false;
        setIsSpinning(false);
      }, 1200);
    };
    flipTimerRef.current = setInterval(trigger, FLIP_INTERVAL);
    return () => clearInterval(flipTimerRef.current);
  }, []);

  const isDay = theme === "day";
  const deckEdgeColor = isDay
    ? "rgba(139, 58, 26, 0.5)"
    : "rgba(58, 74, 138, 0.6)";

  // photo slot passed as frontContent to TarotCard
  const heroPhoto = <div className="hero-photo-placeholder" />;

  return (
    <section className="hero-section" aria-label="Hero">
      <div className="hero-layout">
        <div className="hero-card-scene">
          <div
            ref={cardWrapRef}
            className={`hero-card-positioner${isSpinning ? " hero-card-positioner--spinning" : ""}`}
          >
            <TarotCard
              title="Ryan Leung"
              subtitle="Web Developer"
              variation={1}
              disableLink
              frontContent={heroPhoto}
            />
          </div>

          <div className="hero-deck" style={{ "--deck-edge": deckEdgeColor }} />
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
