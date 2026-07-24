import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGithub,
  FaFigma,
  FaWordpress,
  FaDocker,
} from "react-icons/fa";
import { SiTypescript, SiNodedotjs, SiPhp, SiMysql } from "react-icons/si";

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
    name: "HTML5",
    subtitle: "The Foundation",
    stars: normalizeConstellation([
      { x: 10, y: 0 },
      { x: 70, y: 0 },
      { x: 65, y: 70 },
      { x: 40, y: 77 },
      { x: 20, y: 70 },
      { x: 40, y: 50 },
      { x: 50, y: 45 },
      { x: 25, y: 30 },
      { x: 28, y: 15 },
      { x: 53, y: 17 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [3, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
    ],
  },
  {
    name: "CSS3",
    subtitle: "The Weaver",
    stars: normalizeConstellation([
      { x: 10, y: 0 },
      { x: 70, y: 3 },
      { x: 65, y: 70 },
      { x: 40, y: 77 },
      { x: 20, y: 64 },
      { x: 28, y: 20 },
      { x: 53, y: 22 },
      { x: 33, y: 37 },
      { x: 38, y: 36 },
      { x: 50, y: 38 },
      { x: 48, y: 50 },
      { x: 27, y: 43 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
      [0, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
    ],
  },
  {
    name: "JavaScript",
    subtitle: "The Spark",
    stars: normalizeConstellation([
      { x: 0, y: 3 },
      { x: 80, y: 10 },
      { x: 87, y: 100 },
      { x: 0, y: 90 },
      { x: 30, y: 73 },
      { x: 35, y: 77 },
      { x: 45, y: 50 },
      { x: 70, y: 80 },
      { x: 73, y: 67 },
      { x: 51, y: 77 },
      { x: 63, y: 50 },
      { x: 70, y: 50 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 5],
      [5, 6],
      [2, 7],
      [7, 8],
      [7, 9],
      [8, 10],
      [10, 11],
    ],
  },
  {
    name: "TypeScript",
    subtitle: "The Sage",
    stars: normalizeConstellation([
      { x: 0, y: 3 },
      { x: 80, y: 10 },
      { x: 87, y: 80 },
      { x: 0, y: 90 },
      { x: 4, y: 63 },
      { x: 30, y: 40 },
      { x: 17, y: 44 },
      { x: 41, y: 41 },
      { x: 32, y: 80 },
      { x: 70, y: 63 },
      { x: 60, y: 40 },
      { x: 67, y: 44 },
      { x: 59, y: 73 },
      { x: 52, y: 70 },
      { x: 72, y: 40 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [5, 6],
      [5, 7],
      [5, 8],
      [9, 10],
      [10, 11],
      [9, 12],
      [12, 13],
      [11, 14],
      [2, 9],
      [4, 8],
    ],
  },
  {
    name: "React",
    subtitle: "The Architect",
    stars: normalizeConstellation([
      { x: 50, y: 42 },
      { x: 43, y: 46 },
      { x: 58, y: 49 },
      { x: 52, y: 56 },
      { x: 47, y: 54 },
      { x: 50, y: 19 },
      { x: 30, y: 10 },
      { x: 74, y: 12 },
      { x: 74, y: 36 },
      { x: 30, y: 32 },
      { x: 75, y: 70 },
      { x: 50, y: 73 },
      { x: 66, y: 83 },
      { x: 30, y: 90 },
      { x: 71, y: 60 },
      { x: 81, y: 55 },
      { x: 90, y: 49 },
      { x: 79, y: 39 },

      { x: 20, y: 40 },
      { x: 9, y: 50 },
      { x: 26, y: 59 },
      { x: 30, y: 70 },
      { x: 33, y: 47 },
      { x: 66, y: 47 },
    ]),
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 1],
      [0, 5],
      [5, 6],
      [5, 7],
      [7, 8],
      [6, 9],
      [3, 11],
      [11, 12],
      [11, 13],
      [12, 10],
      [10, 14],
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 8],
      [13, 21],
      [21, 20],
      [20, 22],
      [20, 19],
      [19, 18],
      [18, 9],
      [22, 9],
      [8, 23],
    ],
  },
  {
    name: "Node.js",
    subtitle: "The Nexus",
    stars: normalizeConstellation([
      { x: 50, y: 0 },
      { x: 70, y: 15 },
      { x: 20, y: 20 },
      { x: 10, y: 27 },
      { x: 10, y: 60 },
      { x: 12, y: 63 },
      { x: 35, y: 70 },
      { x: 35, y: 37 },
      { x: 86, y: 30 },
      { x: 82, y: 70 },
      { x: 48, y: 90 },
      { x: 40, y: 87 },
      { x: 69, y: 39 },
      { x: 55, y: 32 },
      { x: 49, y: 39 },
      { x: 47, y: 50 },
      { x: 69, y: 55 },
      { x: 64, y: 70 },
      { x: 50, y: 60 },
    ]),
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [1, 8],
      [8, 9],
      [9, 10],
      [9, 10],
      [10, 11],
      [8, 12],
      [12, 13],
      [13, 14],
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 18],
    ],
  },
  {
    name: "PHP",
    subtitle: "The Keeper",
    stars: normalizeConstellation([
      { x: 50, y: 20 },
      { x: 0, y: 48 },
      { x: 100, y: 50 },
      { x: 46, y: 80 },
      { x: 40, y: 55 },
      { x: 60, y: 50 },
      { x: 56, y: 55 },
      { x: 28, y: 40 },
      { x: 20, y: 55 },

      { x: 66, y: 55 },
      { x: 73, y: 40 },
      { x: 80, y: 55 },
    ]),
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [0, 4],
      [0, 5],
      [5, 6],
      [7, 8],
      [1, 8],

      [5, 9],
      [9, 11],
      [10, 11],
      [5, 10],
    ],
  },
  {
    name: "Wordpress",
    subtitle: "The Scribe",
    stars: normalizeConstellation([
      { x: 10, y: 25 },
      { x: 25, y: 100 },
      { x: 50, y: 45 },
      { x: 60, y: 50 },
      { x: 75, y: 100 },
      { x: 80, y: 90 },
      { x: 82, y: 86 },
      { x: 90, y: 50 },
      { x: 78, y: 40 },
      { x: 100, y: 50 },
      { x: 90, y: 30 },
      { x: 80, y: 20 },
      { x: 75, y: 15 },
      { x: 60, y: 10 },
      { x: 50, y: 7 },
      { x: 30, y: 9 },
      { x: 10, y: 15 },
      { x: 3, y: 40 },
      { x: 0, y: 50 },
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

      [0, 17],
      [0, 16],
      [17, 18],
      [15, 16],
      [14, 15],
      [13, 14],
    ],
  },
  {
    name: "MySQL",
    subtitle: "The Archive",
    stars: normalizeConstellation([
      { x: 5, y: 71 },
      { x: 6, y: 40 },
      { x: 25, y: 42 },
      { x: 25, y: 75 },
      { x: 39, y: 56 },
      { x: 42, y: 50 },
      { x: 52, y: 51 },
      { x: 50, y: 62 },
      { x: 45, y: 67 },
      { x: 73, y: 65 },
      { x: 74, y: 50 },
      { x: 80, y: 60 },
      { x: 90, y: 50 },
      { x: 90, y: 40 },
      { x: 60, y: 25 },
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
      [7, 9],
      [9, 11],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 10],
    ],
  },
  {
    name: "GitHub",
    subtitle: "The Chronicle",
    stars: normalizeConstellation([
      { x: 40, y: 14 },
      { x: 65, y: 18 },
      { x: 80, y: 0 },
      { x: 84, y: 18 },
      { x: 84, y: 33 },
      { x: 60, y: 63 },
      { x: 60, y: 100 },
      { x: 10, y: 74 },
      { x: 0, y: 63 },
      { x: 30, y: 63 },
      { x: 10, y: 44 },
      { x: 4, y: 33 },
      { x: 10, y: 25 },
      { x: 5, y: 4 },
      { x: 20, y: 18 },
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
      [7, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],

      [14, 0],
    ],
  },
  {
    name: "Figma",
    subtitle: "The Visionary",
    stars: normalizeConstellation([
      { x: 50, y: 0 },
      { x: 50, y: 100 },
      { x: 25, y: 75 },
      { x: 30, y: 70 },
      { x: 50, y: 70 },
      { x: 25, y: 50 },
      { x: 29, y: 33 },
      { x: 25, y: 25 },
      { x: 75, y: 25 },
      { x: 63, y: 30 },
      { x: 73, y: 40 },
      { x: 75, y: 50 },
      { x: 59, y: 60 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 5],
      [4, 5],
      [5, 6],
      [6, 7],
      [0, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 4],
    ],
  },
  {
    name: "Docker",
    subtitle: "The Voyager",
    stars: normalizeConstellation([
      { x: 55, y: 50 },
      { x: 0, y: 50 },
      { x: 5, y: 67 },
      { x: 50, y: 80 },
      { x: 90, y: 50 },
      { x: 83, y: 33 },
      { x: 88, y: 22 },
      { x: 100, y: 25 },
      { x: 5, y: 33 },
      { x: 15, y: 33 },
      { x: 15, y: 17 },
      { x: 37, y: 17 },
      { x: 45, y: 10 },
      { x: 55, y: 10 },
    ]),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [1, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 0],
    ],
  },
];

function ConstellationsCycle({ activeIndex, fadeIn }) {
  const current = constellations[activeIndex];

  if (!current) {
    console.log("BAD ACTIVE INDEX:", activeIndex);
    return null;
  }

  const iconMap = {
    HTML5: FaHtml5,
    CSS3: FaCss3Alt,
    JavaScript: FaJsSquare,
    TypeScript: SiTypescript,
    React: FaReact,
    "Node.js": SiNodedotjs,
    PHP: SiPhp,
    Wordpress: FaWordpress,
    MySQL: SiMysql,
    GitHub: FaGithub,
    Figma: FaFigma,
    Docker: FaDocker,
  };

  const IconComponent = iconMap[current.name];

  return (
    <div className="constellation-wrapper" style={{ position: "relative" }}>
      <h2 className="constellation-title" style={{ opacity: fadeIn ? 1 : 0 }}>
        {current.name} - {current.subtitle}
      </h2>

      {IconComponent && (
        <div
          className={`constellation-icon ${fadeIn ? "show" : ""}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            pointerEvents: "none",
            color: "var(--arc-ink)",
          }}
        >
          <IconComponent size={140} />
        </div>
      )}

      <svg
        className="constellation-svg"
        viewBox="0 0 100 100"
        style={{ opacity: fadeIn ? 1 : 0 }}
      >
        {(current.lines ?? []).map((line, idx) => {
          const star1 = current.stars[line[0]];
          const star2 = current.stars[line[1]];
          return (
            <line
              key={`line-${idx}`}
              x1={star1.x}
              y1={star1.y}
              x2={star2.x}
              y2={star2.y}
              stroke="var(--arc-ink)"
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
        {(current.stars ?? []).map((star, idx) => (
          <circle
            key={`star-${idx}`}
            cx={star.x}
            cy={star.y}
            r="2"
            fill="var(--arc-tertiary)"
          />
        ))}
      </svg>
    </div>
  );
}

export default ConstellationsCycle;