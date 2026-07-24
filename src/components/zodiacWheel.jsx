import React, { useState, useEffect, useRef } from "react";
import arcDayCompass from "../assets/svg-components/misc/arc-day-compass.svg";
import arcMoonCompass from "../assets/svg-components/misc/arc-moon-compass.svg";
import ConstellationsCycle from "./constellation";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGithub,
  FaFigma,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNodedotjs,
  SiPhp,
  SiWordpress,
  SiMysql,
} from "react-icons/si";
import "../styles/zodiacWheel.css";

const AUTO_CYCLE_MS = 12000;
const FADE_MS = 2000;

function ZodiacWheel({ onArrowClick }) {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "night",
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.dataset.theme || "night");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const compassSvg = theme === "day" ? arcDayCompass : arcMoonCompass;

  const techIcons = [
    FaHtml5,
    FaCss3Alt,
    FaJsSquare,
    SiTypescript,
    FaReact,
    SiNodedotjs,
    SiPhp,
    SiWordpress,
    SiMysql,
    FaGithub,
    FaFigma,
    FaDocker,
  ];

  const techNames = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "PHP",
    "Wordpress",
    "MySQL",
    "GitHub",
    "Figma",
    "Docker",
  ];

  const goToConstellation = (index) => {
    if (index === activeIndex) return;
    setFadeIn(false);
    clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      setFadeIn(true);
    }, FADE_MS);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToConstellation((activeIndex + 1) % techIcons.length);
    }, AUTO_CYCLE_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  useEffect(() => {
    return () => clearTimeout(fadeTimeoutRef.current);
  }, []);

return (
    <div className="zodiac-wheel-container">
      <button
        className="zodiac-arrow zodiac-arrow-left"
        onClick={() => onArrowClick("prev")}
        aria-label="Previous sign"
      >
        <div className="zodiac-arrow-top"></div>
        <div className="zodiac-arrow-bottom"></div>
      </button>

      <div className="zodiac-wheel-wrapper">
        <div className="zodiac-wheel-spinner">
          <img src={compassSvg} alt="compass" className="compass-bg" />
          <div className="zodiac-icons-ring">
            {techIcons.map((Icon, i) => {
              const angle = i * 30 + 15;
              const radians = (angle - 90) * (Math.PI / 180);
              const radius = 42;
              const x = 50 + radius * Math.cos(radians);
              const y = 50 + radius * Math.sin(radians);
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className="zodiac-icon"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                >
                  <div
                    className="zodiac-icon-rotation"
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <button
                      type="button"
                      className={`zodiac-icon-button${
                        isActive ? " zodiac-icon-button-active" : ""
                      }`}
                      onClick={() => goToConstellation(i)}
                      aria-label={`Show ${techNames[i]} constellation`}
                      aria-pressed={isActive}
                    >
                      <Icon
                        size={36}
                        style={{
                          color: isActive
                            ? "var(--arc-quaternary)"
                            : "var(--arc-tertiary)",
                          filter: isActive
                            ? "drop-shadow(0 0 6px var(--arc-quaternary))"
                            : "drop-shadow(0 0 1px var(--arc-primary))",
                          transition: "color 0.4s ease, filter 0.4s ease",
                        }}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="constellation-center">
          <ConstellationsCycle activeIndex={activeIndex} fadeIn={fadeIn} />
        </div>
      </div>

      <button
        className="zodiac-arrow zodiac-arrow-right"
        onClick={() => onArrowClick("next")}
        aria-label="Next sign"
      >
        <div className="zodiac-arrow-top"></div>
        <div className="zodiac-arrow-bottom"></div>
      </button>
    </div>
  );
}

export default ZodiacWheel;