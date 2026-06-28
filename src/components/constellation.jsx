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

  const targetSize = 95;
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
    lines: [[0, 1], [1, 2], [2, 3]],
  },
  {
    name: "Taurus",
    subtitle: "The Bull",
    stars: normalizeConstellation([
      { x: 25, y: 20 },
      { x: 40, y: 35 },
      { x: 55, y: 50 },
      { x: 65, y: 65 },
      { x: 75, y: 80 },
    ]),
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: "Gemini",
    subtitle: "The Twins",
    stars: normalizeConstellation([
      { x: 30, y: 10 },
      { x: 55, y: 10 },
      { x: 25, y: 30 },
      { x: 50, y: 25 },
      { x: 60, y: 30 },
      { x: 20, y: 50 },
      { x: 40, y: 45 },
      { x: 60, y: 50 },
      { x: 30, y: 65 },
      { x: 45, y: 60 },
      { x: 65, y: 65 },
      { x: 35, y: 80 },
      { x: 50, y: 75 },
    ]),
    lines: [
      [0, 2], [2, 5], [5, 8], [8, 11],
      [1, 3], [3, 4], [4, 7], [7, 10],
      [5, 6], [6, 9], [9, 12],
      [2, 3], [6, 7],
    ],
  },
  {
    name: "Cancer",
    subtitle: "The Crab",
    stars: normalizeConstellation([
      { x: 25, y: 30 },
      { x: 50, y: 20 },
      { x: 70, y: 35 },
      { x: 40, y: 55 },
      { x: 60, y: 60 },
      { x: 30, y: 75 },
      { x: 65, y: 80 },
    ]),
    lines: [
      [0, 1], [1, 2],
      [0, 3], [2, 4],
      [3, 4],
      [3, 5], [4, 6],
    ],
  },
  {
    name: "Leo",
    subtitle: "The Lion",
    stars: normalizeConstellation([
      { x: 20, y: 55 },
      { x: 30, y: 35 },
      { x: 40, y: 20 },
      { x: 55, y: 25 },
      { x: 60, y: 40 },
      { x: 50, y: 55 },
      { x: 70, y: 50 },
      { x: 80, y: 65 },
      { x: 65, y: 75 },
    ]),
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
      [4, 6], [6, 7], [7, 8], [8, 5],
    ],
  },
  {
    name: "Virgo",
    subtitle: "The Virgin",
    stars: normalizeConstellation([
      { x: 50, y: 10 },
      { x: 35, y: 25 },
      { x: 60, y: 25 },
      { x: 30, y: 40 },
      { x: 55, y: 38 },
      { x: 70, y: 45 },
      { x: 25, y: 55 },
      { x: 45, y: 55 },
      { x: 35, y: 68 },
      { x: 50, y: 72 },
      { x: 40, y: 85 },
      { x: 55, y: 88 },
    ]),
    lines: [
      [0, 1], [0, 2],
      [1, 3], [2, 4], [4, 5],
      [3, 6], [3, 7], [4, 7],
      [6, 8], [7, 9],
      [8, 10], [9, 11],
    ],
  },
  {
    name: "Libra",
    subtitle: "The Scales",
    stars: normalizeConstellation([
      { x: 25, y: 55 },
      { x: 50, y: 30 },
      { x: 75, y: 55 },
      { x: 40, y: 70 },
      { x: 60, y: 70 },
    ]),
    lines: [
      [0, 1], [1, 2],
      [0, 3], [2, 4],
      [3, 4],
      [1, 3],
    ],
  },
  {
    name: "Scorpius",
    subtitle: "The Scorpion",
    stars: normalizeConstellation([
      { x: 30, y: 10 },
      { x: 45, y: 15 },
      { x: 55, y: 10 },
      { x: 50, y: 28 },
      { x: 45, y: 40 },
      { x: 40, y: 52 },
      { x: 35, y: 62 },
      { x: 30, y: 72 },
      { x: 35, y: 83 },
      { x: 45, y: 88 },
      { x: 55, y: 83 },
    ]),
    lines: [
      [0, 3], [1, 3], [2, 3],
      [3, 4], [4, 5], [5, 6], [6, 7],
      [7, 8], [8, 9], [9, 10],
    ],
  },
  {
    name: "Sagittarius",
    subtitle: "The Archer",
    stars: normalizeConstellation([
      { x: 20, y: 60 },
      { x: 35, y: 45 },
      { x: 50, y: 30 },
      { x: 65, y: 20 },
      { x: 70, y: 40 },
      { x: 60, y: 55 },
      { x: 45, y: 60 },
      { x: 30, y: 70 },
      { x: 50, y: 75 },
      { x: 65, y: 70 },
      { x: 75, y: 80 },
    ]),
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [4, 5], [5, 6], [6, 1],
      [6, 7], [7, 8], [8, 9],
      [5, 9], [9, 10],
    ],
  },
  {
    name: "Capricornus",
    subtitle: "The Goat",
    stars: normalizeConstellation([
      { x: 20, y: 30 },
      { x: 35, y: 20 },
      { x: 55, y: 20 },
      { x: 70, y: 30 },
      { x: 75, y: 50 },
      { x: 65, y: 65 },
      { x: 50, y: 75 },
      { x: 35, y: 70 },
      { x: 20, y: 55 },
    ]),
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [4, 5], [5, 6], [6, 7], [7, 8], [8, 0],
    ],
  },
  {
    name: "Aquarius",
    subtitle: "The Water Bearer",
    stars: normalizeConstellation([
      { x: 20, y: 35 },
      { x: 35, y: 25 },
      { x: 50, y: 30 },
      { x: 65, y: 20 },
      { x: 75, y: 35 },
      { x: 60, y: 50 },
      { x: 40, y: 55 },
      { x: 25, y: 65 },
      { x: 45, y: 70 },
      { x: 60, y: 65 },
      { x: 70, y: 75 },
    ]),
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [2, 5], [5, 6], [6, 7],
      [6, 8], [8, 9], [9, 10],
    ],
  },
  {
    name: "Pisces",
    subtitle: "The Fish",
    stars: normalizeConstellation([
      { x: 20, y: 40 },
      { x: 30, y: 25 },
      { x: 45, y: 20 },
      { x: 55, y: 30 },
      { x: 50, y: 45 },
      { x: 60, y: 55 },
      { x: 75, y: 50 },
      { x: 80, y: 35 },
      { x: 70, y: 25 },
      { x: 65, y: 65 },
      { x: 55, y: 75 },
      { x: 40, y: 70 },
      { x: 30, y: 60 },
    ]),
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
      [4, 5], [5, 6], [6, 7], [7, 8], [8, 6],
      [5, 9], [9, 10], [10, 11], [11, 12], [12, 5],
    ],
  },
];

function ConstellationsCycle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((i) => (i - 1 + constellations.length) % constellations.length);
  };

  const next = () => {
    setCurrentIndex((i) => (i + 1) % constellations.length);
  };

  const current = constellations[currentIndex];

  return (
    <div style={{ textAlign: "center", padding: "0", position: "relative", width: "100%", height: "100%" }}>
      <h2
        style={{
          fontSize: "clamp(0.85rem, 2vw, 1.25rem)",
          margin: "0",
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        {current.name} - {current.subtitle}
      </h2>

      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
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

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0.5rem 0 0 0", justifyContent: "center" }}>
        <button
          onClick={prev}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--arc-primary)",
            fontSize: "1.25rem",
            padding: "0",
                        zIndex: "1000",
          }}
        >
          ‹
        </button>

        <div style={{ fontSize: "0.7rem", color: "var(--arc-primary)", opacity: 0.6, minWidth: "2rem" }}>
          {currentIndex + 1} / {constellations.length}
        </div>

        <button
          onClick={next}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--arc-primary)",
            fontSize: "1.25rem",
            padding: "0",
            zIndex: "1000",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default ConstellationsCycle;

// function ConstellationsCycle() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % constellations.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     let animationFrame;
//     let startTime = Date.now();

//     const animate = () => {
//       const elapsed = Date.now() - startTime;
//       const newProgress = Math.min(elapsed / 1000, 1);
//       setProgress(newProgress);

//       if (newProgress < 1) {
//         animationFrame = requestAnimationFrame(animate);
//       }
//     };

//     animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [currentIndex]);

//   const nextIndex = (currentIndex + 1) % constellations.length;
//   const current = constellations[currentIndex];
//   const next = constellations[nextIndex];
//   const easeProgress =
//     progress < 0.5
//       ? 2 * progress * progress
//       : -1 + (4 - 2 * progress) * progress;

//   const interpolateStars = (idx) => {
//     const currentStar = current.stars[idx];
//     const nextStar = next.stars[idx];
//     if (!currentStar || !nextStar) return currentStar || nextStar;

//     return {
//       x: currentStar.x + (nextStar.x - currentStar.x) * easeProgress,
//       y: currentStar.y + (nextStar.y - currentStar.y) * easeProgress,
//     };
//   };

//   return (
//   <div style={{ textAlign: "center", padding: "0" }}>
//     <h2
//       style={{
//         fontSize: "clamp(0.85rem, 2vw, 1.25rem)",
//         margin: "0.5rem 0 0 0",
//         position: "absolute",
//         top: "45%",
//         left: "50%",
//         transform: "translateX(-50%)",
//         width: "90%",
//       }}
//     >
//       {current.name} - {current.subtitle}
//     </h2>
//     <svg
//       viewBox="0 0 100 100"
//       style={{
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       {/* Lines */}
//       {current.lines.map((line, idx) => {
//         const star1 = interpolateStars(line[0]);
//         const star2 = interpolateStars(line[1]);
//         return (
//           <line
//             key={`line-${idx}`}
//             x1={star1.x}
//             y1={star1.y}
//             x2={star2.x}
//             y2={star2.y}
//             stroke="var(--arc-primary)"
//             strokeWidth="1"
//             opacity="0.6"
//           />
//         );
//       })}

//       {/* Stars */}
//       {current.stars.map((_, idx) => {
//         const star = interpolateStars(idx);
//         return (
//           <circle
//             key={`star-${idx}`}
//             cx={star.x}
//             cy={star.y}
//             r="2"
//             fill="var(--arc-primary)"
//           />
//         );
//       })}
//     </svg>
//     <div
//       style={{
//         height: "0.25rem",
//         background: "var(--arc-border)",
//         borderRadius: "0.125rem",
//         overflow: "hidden",
//         margin: "0.5rem 0 0 0",
//       }}
//     >
//       <div
//         style={{
//           height: "100%",
//           background: "var(--arc-primary)",
//           width: `${(1 - progress) * 100}%`,
//           transition: "width 0.1s linear",
//         }}
//       />
//     </div>
//   </div>
// );
// }

// export default ConstellationsCycle;
