import React, { useState, useEffect } from "react";

const normalizeConstellation = (stars) => {
  if (stars.length === 0) return stars;

  const minX = Math.min(...stars.map((s) => s.x));
  const maxX = Math.max(...stars.map((s) => s.x));
  const minY = Math.min(...stars.map((s) => s.y));
  const maxY = Math.max(...stars.map((s) => s.y));

  const width = maxX - minX || 1;
  const height = maxY - minY || 1;
  const maxDim = Math.max(width, height);

  const targetSize = 110;
  const scale = targetSize / maxDim;

  return stars.map((star) => ({
    x: 50 + (star.x - minX - width / 2) * scale,
    y: 50 + (star.y - minY - height / 2) * scale,
  }));
};

// constellations
const constellations = [
  {
    name: "Aries",
    subtitle: "The Ram",
    stars: normalizeConstellation([
      { x: 10, y: 20 },
      { x: 50, y: 30 },
      { x: 70, y: 45 },
      { x: 70, y: 50 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  },
  {
    name: "Taurus",
    subtitle: "The Bull",
    stars: normalizeConstellation([
      { x: 10, y: 20 },
      { x: 40, y: 45 },
      { x: 45, y: 50 },
      { x: 47, y: 55 },
      { x: 40, y: 55 },
      { x: 30, y: 50 },
      { x: 10, y: 40 },
      { x: 65, y: 70 },
      { x: 75, y: 73 },
      { x: 77, y: 77 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [4, 6],
      [3, 7],
      [7, 8],
      [8, 9],
    ],
  },
  {
    name: "Gemini",
    subtitle: "The Twins",
    stars: normalizeConstellation([
      { x: 10, y: 40 },
      { x: 15, y: 30 },
      { x: 23, y: 25 },
      { x: 45, y: 40 },
      { x: 55, y: 45 },
      { x: 58, y: 40 },
      { x: 45, y: 70 },
      { x: 45, y: 77 },
      { x: 30, y: 55 },
      { x: 20, y: 50 },
      { x: 10, y: 45 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [4, 6],
      [6, 7],
      [6, 8],
      [8, 9],
      [9, 10],
      [10, 0],
    ],
  },
  {
    name: "Cancer",
    subtitle: "The Crab",
    stars: normalizeConstellation([
      { x: 60, y: 10 },
      { x: 63, y: 35 },
      { x: 60, y: 45 },
      { x: 50, y: 60 },
      { x: 75, y: 67 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ],
  },
  {
    name: "Leo",
    subtitle: "The Lion",
    stars: normalizeConstellation([
      { x: 20, y: 70 },
      { x: 35, y: 45 },
      { x: 65, y: 40 },
      { x: 63, y: 35 },
      { x: 70, y: 25 },
      { x: 75, y: 30 },
      { x: 70, y: 45 },
      { x: 74, y: 55 },
      { x: 40, y: 60 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [2, 6],
      [6, 7],
      [7, 8],
      [8, 0],
    ],
  },
  {
    name: "Virgo",
    subtitle: "The Virgin",
    stars: normalizeConstellation([
      { x: 60, y: 5 },
      { x: 70, y: 15 },
      { x: 60, y: 35 },
      { x: 55, y: 45 },
      { x: 30, y: 45 },
      { x: 20, y: 35 },
      { x: 25, y: 70 },
      { x: 60, y: 80 },
      { x: 53, y: 60 },
      { x: 45, y: 100 },
      { x: 38, y: 95 },
      { x: 25, y: 110 },
      { x: 10, y: 80 },
      { x: -10, y: 110 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [4, 6],
      [6, 7],
      [7, 8],
      [8, 3],
      [7, 9],
      [9, 10],
      [10, 11],
      [6, 12],
      [12, 13],
    ],
  },
  {
    name: "Libra",
    subtitle: "The Scales",
    stars: normalizeConstellation([
      { x: 50, y: 5 },
      { x: 70, y: 30 },
      { x: 55, y: 65 },
      { x: 40, y: 20 },
      { x: 30, y: 25 },
      { x: 40, y: 70 },
      { x: 38, y: 75 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
      [0, 3],
      [3, 4],
      [2, 5],
      [3, 4],
      [5, 6],
    ],
  },
  {
    name: "Scorpius",
    subtitle: "The Scorpion",
    stars: normalizeConstellation([
      { x: 90, y: 20 },
      { x: 85, y: 15 },
      { x: 90, y: 28 },
      { x: 75, y: 25 },
      { x: 68, y: 29 },
      { x: 65, y: 33 },
      { x: 60, y: 45 },
      { x: 61, y: 58 },
      { x: 59, y: 69 },
      { x: 50, y: 75 },
      { x: 38, y: 76 },
      { x: 35, y: 70 },
      { x: 38, y: 65 },
      { x: 43, y: 60 },
    ]),
    lines: [
      [0, 1],
      [0, 2],
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
    ],
  },
  {
    name: "Sagittarius",
    subtitle: "The Archer",
    stars: normalizeConstellation([
      { x: 35, y: 95 },
      { x: 40, y: 100 },
      { x: 45, y: 90 },
      { x: 5, y: 75 },
      { x: 0, y: 50 },
      { x: 25, y: 43 },
      { x: 40, y: 45 },
      { x: 50, y: 35 },
      { x: 55, y: 43 },
      { x: 43, y: 55 },
      { x: 35, y: 20 },
      { x: 40, y: 17 },
      { x: 20, y: 12 },
      { x: 10, y: 0 },
      { x: 80, y: 35 },
      { x: 85, y: 60 },
      { x: 81, y: 80 },
      { x: 85, y: 90 },
      { x: 95, y: 15 },
      { x: 100, y: 63 },
    ]),
    lines: [
      [0, 1],
      [0, 2],
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 6],
      [7, 10],
      [10, 11],
      [10, 12],
      [12, 13],
      [8, 14],
      [14, 15],
      [15, 16],
      [16, 17],
      [14, 18],
      [15, 19],
    ],
  },
  {
    name: "Capricornus",
    subtitle: "The Goat",
    stars: normalizeConstellation([
      { x: 10, y: 20 },
      { x: 15, y: 21 },
      { x: 23, y: 22 },
      { x: 30, y: 25 },
      { x: 75, y: 15 },
      { x: 80, y: 10 },
      { x: 50, y: 50 },
      { x: 45, y: 55 },
      { x: 20, y: 40 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [4, 6],
      [6, 7],
      [7, 8],
      [8, 0],
    ],
  },
  {
    name: "Aquarius",
    subtitle: "The Water Bearer",
    stars: normalizeConstellation([
      { x: 10, y: 90 },
      { x: 20, y: 75 },
      { x: 25, y: 70 },
      { x: 23, y: 55 },
      { x: 35, y: 25 },
      { x: 40, y: 25 },
      { x: 45, y: 30 },
      { x: 55, y: 27 },
      { x: 45, y: 50 },
      { x: 50, y: 70 },
      { x: 70, y: 40 },
      { x: 90, y: 43 },
      { x: 100, y: 45 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [7, 10],
      [10, 11],
      [11, 12],
    ],
  },
  {
    name: "Pisces",
    subtitle: "The Fish",
    stars: normalizeConstellation([
      { x: 0, y: 25 },
      { x: 5, y: 30 },
      { x: 10, y: 31 },
      { x: 20, y: 35 },
      { x: 25, y: 50 },
      { x: 40, y: 100 },
      { x: 45, y: 90 },
      { x: 43, y: 85 },
      { x: 55, y: 70 },
      { x: 60, y: 60 },
      { x: 67, y: 50 },
      { x: 80, y: 20 },
      { x: 85, y: 15 },
      { x: 90, y: 20 },
      { x: 95, y: 16 },
      { x: 100, y: 10 },
      { x: 91, y: 0 },
      { x: 83, y: 7 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 12],
    ],
  },
];

function ConstellationsCycle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % constellations.length);
        setFadeIn(true);
      }, 2000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex(
        (i) => (i - 1 + constellations.length) % constellations.length,
      );
      setFadeIn(true);
    }, 2000);
  };

  const next = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % constellations.length);
      setFadeIn(true);
    }, 2000);
  };

  const current = constellations[currentIndex];

  return (
    <div className="constellation-wrapper">
      <h2 className="constellation-title" style={{ opacity: fadeIn ? 1 : 0 }}>
        {current.name} - {current.subtitle}
      </h2>

      <svg
        className="constellation-svg"
        viewBox="0 0 100 100"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        {current.lines.map((line, idx) => {
          const star1 = current.stars[line[0]];
          const star2 = current.stars[line[1]];
          return (
            <line
              key={`line-${idx}`}
              x1={star1.x}
              y1={star1.y}
              x2={star2.x}
              y2={star2.y}
              stroke="var(--arc-primary)"
              strokeWidth="1"
              opacity="0.6"
            />
          );
        })}
        {current.stars.map((star, idx) => (
          <circle
            key={`star-${idx}`}
            cx={star.x}
            cy={star.y}
            r="2"
            fill="var(--arc-primary)"
          />
        ))}
      </svg>

      <div className="constellation-controls">
        <button className="constellation-btn" onClick={prev}>
          ‹
        </button>

        <div className="constellation-counter">
          {currentIndex + 1} / {constellations.length}
        </div>

        <button className="constellation-btn" onClick={next}>
          ›
        </button>
      </div>
    </div>
  );
}

export default ConstellationsCycle;
