import React, { useState, useEffect } from "react";
import "../styles/background.css";

function getTheme() {
  return document.documentElement.dataset.theme || "day";
}

function CelestialBackground() {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`celestial-bg celestial-bg--${theme}`} aria-hidden="true">
      <div className="celestial-bg__layer celestial-bg__nebula-1" />
      <div className="celestial-bg__layer celestial-bg__nebula-2" />
      <div className="celestial-bg__layer celestial-bg__nebula-3" />
      <div className="celestial-bg__layer celestial-bg__nebula-4" />
      <div className="celestial-bg__layer celestial-bg__vignette"  />
    </div>
  );
}

export default CelestialBackground;