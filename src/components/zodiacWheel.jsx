import React, { useState, useEffect } from "react";
import arcDayCompass from "../assets/svg-components/misc/arc-day-compass.svg";
import arcMoonCompass from "../assets/svg-components/misc/arc-moon-compass.svg";
import ConstellationsCycle from "./constellation";
import {
  FaReact,
  FaNode,
  FaPython,
  FaJsSquare,
  FaCss3Alt,
  FaGitAlt,
  FaDatabase,
  FaFigma,
  FaLinux,
  FaDocker,
  FaGithub,
  FaTerminal,
} from "react-icons/fa";
import "../styles/zodiacWheel.css";

function ZodiacWheel({ onArrowClick }) {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "night",
  );

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
    FaReact,
    FaNode,
    FaPython,
    FaJsSquare,
    FaCss3Alt,
    FaGitAlt,
    FaDatabase,
    FaFigma,
    FaLinux,
    FaDocker,
    FaGithub,
    FaTerminal,
  ];

  return (
    <div className="zodiac-wheel-container">
      <button
        className="zodiac-arrow zodiac-arrow--left"
        onClick={() => onArrowClick("prev")}
        aria-label="Previous sign"
      >
        <div className="zodiac-arrow-top"></div>
        <div className="zodiac-arrow-bottom"></div>
      </button>

      <div className="zodiac-wheel-wrapper">
        <img src={compassSvg} alt="compass" className="compass-bg" />

        <div className="zodiac-icons-ring">
          {techIcons.map((Icon, i) => {
            const angle = (i * 30 + 15 - 90) * (Math.PI / 180);
            const radius = 42;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const rotation = i * 30 + 15 + 90;

            return (
              <div
                key={i}
                className="zodiac-icon"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }}
              >
                <Icon
                  size={24}
                  style={{
                    color: "var(--arc-primary)",
                    filter: "drop-shadow(0 0 1px var(--arc-primary))",
                    transform: `rotate(-${rotation}deg)`, // ← Counter-rotate
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="constellation-center">
          <ConstellationsCycle />
        </div>
      </div>

      <button
        className="zodiac-arrow zodiac-arrow--right"
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
