import React, { useState, useEffect } from "react";
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
                    <Icon
                      size={36}
                      style={{
                        color: "var(--arc-tertiary)",
                        filter: "drop-shadow(0 0 1px var(--arc-primary))",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="constellation-center">
          <ConstellationsCycle />
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
