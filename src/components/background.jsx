import React, { useEffect, useRef, useState } from "react";
import "../styles/background.css";

function getTheme() {
  return document.documentElement.dataset.theme || "day";
}
// using perm for smoother noise
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return a + t * (b - a);
}
function lerpColor(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

const PERM = Array.from({ length: 512 }, (_, i) => i % 256);
for (let i = 255; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [PERM[i], PERM[j]] = [PERM[j], PERM[i]];
  PERM[i + 256] = PERM[i];
}

function noise2D(x, y) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf),
    v = fade(yf);
  const a = PERM[X] + Y,
    b = PERM[X + 1] + Y;
  return (
    lerp(
      lerp(
        (((PERM[a] * 127.1 + PERM[a + 1] * 311.7) % 1) + 1) % 1,
        (((PERM[b] * 127.1 + PERM[b + 1] * 311.7) % 1) + 1) % 1,
        u,
      ),
      lerp(
        (((PERM[a + 1] * 127.1 + PERM[a + 2] * 311.7) % 1) + 1) % 1,
        (((PERM[b + 1] * 127.1 + PERM[b + 2] * 311.7) % 1) + 1) % 1,
        u,
      ),
      v,
    ) *
      2 -
    1
  );
}
// copnstellations
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

// for dif const in day.ngiht mode
const CONSTELLATION_MAP = {
  day: ["Aries", "Gemini", "Leo", "Libra", "Aquarius", "Sagittarius"],
  night: ["Taurus", "Cancer", "Virgo", "Scorpius", "Capricornus", "Pisces"],
};

const PALETTES = {
  day: [
    [253, 243, 220], // --arc-base
    [139, 58, 26], // --arc-border
    [42, 24, 0], // --arc-ink
    [231, 165, 44], // --arc-primary
    [232, 184, 75], // --arc-secondary
    [128, 88, 18], // --arc-tertiary
    [80, 200, 145], // --arc-quaternary
    [255, 200, 80], // light gold variant
    [180, 80, 10], // dark amber
    [255, 220, 120], // pale gold
    [200, 120, 30], // mid amber
  ],
  night: [
    [9, 14, 36], // --arc-base
    [58, 74, 138], // --arc-border
    [184, 200, 255], // --arc-ink
    [138, 172, 255], // --arc-primary
    [170, 196, 255], // --arc-secondary
    [96, 128, 208], // --arc-tertiary
    [30, 40, 100], // dark border variant
    [20, 10, 80], // deep navy
    [60, 80, 180], // mid blue
    [120, 150, 255], // bright periwinkle
  ],
};

const BASE_COLORS = {
  night: [0, 0, 60],
  day: [230, 170, 95],
};

const VIGNETTE_COLORS = {
  night: [15, 0, 0],
  day: [80, 190, 170],
};

const BLOB_COUNT = 9;
const TRANSITION_SPEED = 0.055;
const VIG_TRANSITION_SPEED = 0.055;

function makeConstellationInstance(constellation, W, H) {
  return {
    constellation,
    x: Math.random() * W,
    y: Math.random() * H,
    // size of constellations
    scale: 1.5 + Math.random() * 3,
    opacity: 0,
    targetOpacity: 0,
    fadeTimer: Math.random() * 6,
    randomOffset: Math.random() * 10,
    vx: (Math.random() - 0.5) * 0.05,
    vy: (Math.random() - 0.5) * 0.05,
  };
}

function makeBlob(W, H, index, total) {
  // spreads the blob shapes across screen
  const col = index % 3;
  const row = Math.floor(index / 3);
  const cols = 3;
  const rows = Math.ceil(total / 3);
  return {
    // anchor point for the shape drifting
    ax: ((col + 0.5) / cols) * W + (Math.random() - 0.5) * W * 0.15,
    ay: ((row + 0.5) / rows) * H + (Math.random() - 0.5) * H * 0.15,
    r: Math.min(W, H) * (0.28 + Math.random() * 0.2),
    colorIndex: index,
    // for tthe random movements
    noiseOffX: Math.random() * 100,
    noiseOffY: Math.random() * 100,
    noiseOffR: Math.random() * 100,
    // math for shapes
    points: 48 + Math.floor(Math.random() * 16),
    // movements from axis for shapes
    driftX: (Math.random() - 0.5) * 0.3,
    driftY: (Math.random() - 0.5) * 0.3,
    driftT: Math.random() * Math.PI * 2,
  };
}

function CelestialBackground({ paused = false }) {
  const canvasRef = useRef(null);
  const blobsRef = useRef([]);
  const constellationsRef = useRef([]);
  const rafRef = useRef(null);
  const themeRef = useRef(getTheme());
  const timeRef = useRef(0);
  const [, setTheme] = useState(getTheme);

  // Initialize with correct theme
  const initialTheme = getTheme();
  const currentPaletteRef = useRef(PALETTES[initialTheme].map((c) => [...c]));
  const currentBaseRef = useRef([...BASE_COLORS[initialTheme]]);
  const currentVigRef = useRef([...VIGNETTE_COLORS[initialTheme]]);

  // theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = getTheme();

      if (t !== themeRef.current) {
        themeRef.current = t;
        setTheme(t);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      blobsRef.current = Array.from({ length: BLOB_COUNT }, (_, i) =>
        makeBlob(W, H, i, BLOB_COUNT),
      );

      const theme = themeRef.current;
      const constellationNames = CONSTELLATION_MAP[theme];
      constellationsRef.current = constellationNames.map((name) => {
        const constellation = constellations.find((c) => c.name === name);
        const instance = makeConstellationInstance(constellation, W, H);

        const pos = findConstellationPosition(
          W,
          H,
          constellationsRef.current.concat(instance),
        );

        instance.x = pos.x;
        instance.y = pos.y;

        return instance;
      });
    }

    function buildShapePath(b, t) {
      const pts = b.points;
      // controls for shape movements
      b.driftT += 0.002;
      const cx = b.ax + Math.sin(b.driftT * 0.7 + b.noiseOffX) * W * 0.04;
      const cy = b.ay + Math.cos(b.driftT * 0.5 + b.noiseOffY) * H * 0.04;

      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const angle = (i / pts) * Math.PI * 2;
        // noise for the shape deformation
        const nx = noise2D(
          Math.cos(angle) * 1.8 + b.noiseOffX + t * 0.12,
          Math.sin(angle) * 1.8 + b.noiseOffY + t * 0.08,
        );
        const nr = noise2D(
          Math.cos(angle) * 1.2 + b.noiseOffR + t * 0.06,
          Math.sin(angle) * 1.2 + t * 0.1,
        );
        // deformation
        const r = b.r * (1 + nx * 0.3 + nr * 0.12);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      return { cx, cy };
    }

    function drawConstellation(c, ctx, theme) {
      if (c.opacity < 0.01) return;
      const { constellation, x, y, scale } = c;

      const colors =
        theme === "day"
          ? { line: "rgba(128, 88, 18, 1)", star: "rgba(128, 88, 18, 1)" }
          : { line: "rgba(202, 217, 255, 1)", star: "rgba(202, 217, 255, 1)" };

      ctx.save();
      ctx.globalAlpha = c.opacity * 0.05;
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      constellation.lines.forEach((line) => {
        const star1 = constellation.stars[line[0]];
        const star2 = constellation.stars[line[1]];
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        ctx.globalAlpha = c.opacity * 0.05;
        ctx.beginPath();
        ctx.moveTo(star1.x, star1.y);
        ctx.lineTo(star2.x, star2.y);
        ctx.stroke();
      });

      // tiwnkle effect
      constellation.stars.forEach((star, idx) => {
        star.phase ??= Math.random() * Math.PI * 2;
        star.speed ??= 0.02 + Math.random() * 0.05;
        star.phase += star.speed;

        star.sparkle ??= 0;

        if (Math.random() < 0.0015) {
          star.sparkle = 1;
        }

        star.sparkle *= 0.94;

        const blink = Math.sin(star.phase) * 0.5 + 0.5;
        const glowIntensity = 0.3 + (idx % 7) * 0.1;

        ctx.fillStyle = colors.star;
        ctx.globalAlpha =
          c.opacity * (0.55 + blink * 0.25 + star.sparkle * 0.2);
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors.star;
        ctx.globalAlpha = c.opacity * 0.15 * glowIntensity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    function findConstellationPosition(W, H, consts) {
      const margin = 180;
      const centerRadius = Math.min(W, H) * 0.22;
      const minDistance = 320;

      for (let attempt = 0; attempt < 40; attempt++) {
        let x, y;

        // for cosntellations to gravitate towards edge
        if (Math.random() < 0.90) {
          const side = Math.floor(Math.random() * 4);

          switch (side) {
            case 0: 
              x = Math.random() * W;
              y = margin * Math.random();
              break;

            case 1: 
              x = Math.random() * W;
              y = H - margin * Math.random();
              break;

            case 2: 
              x = margin * Math.random();
              y = Math.random() * H;
              break;

            default: 
              x = W - margin * Math.random();
              y = Math.random() * H;
          }
        } else {
          x = Math.random() * W;
          y = Math.random() * H;
        }

        // constellations will not be incenter and grafvitate towards the edges more
        const dx = x - W / 2;
        const dy = y - H / 2;

        if (Math.sqrt(dx * dx + dy * dy) < centerRadius) {
          continue;
        }

        // avoids overlapping the other constellations
        let valid = true;

        for (const other of consts) {
          if (other.opacity < 0.05) continue;

          const ox = x - other.x;
          const oy = y - other.y;

          if (Math.sqrt(ox * ox + oy * oy) < minDistance) {
            valid = false;
            break;
          }
        }

        if (valid) {
          return { x, y };
        }
      }

      return {
        x: Math.random() * W,
        y: Math.random() * H,
      };
    }

    function updateConstellations() {
      const consts = constellationsRef.current;
      // max constellations shown
      const MAX_VISIBLE = 3;
      const MIN_VISIBLE = 2;

      consts.forEach((c) => {
        c.fadeTimer += 0.01;
        c.x += c.vx;
        c.y += c.vy;

        if (c.x < -120) c.x = W + 120;
        if (c.x > W + 120) c.x = -120;

        if (c.y < -120) c.y = H + 120;
        if (c.y > H + 120) c.y = -120;
        c.randomOffset = c.randomOffset || Math.random() * 10;
        c.state = c.state || "waiting";
      });

      const sorted = consts.sort((a, b) => a.fadeTimer - b.fadeTimer);

      let visibleCount = 0;
      let activeTransitions = 0;

      sorted.forEach((c, idx) => {
        const cycle = 10 + c.randomOffset;
        const phase = (c.fadeTimer % cycle) / cycle;
        if (idx < MAX_VISIBLE) {
          // random anims for fading in/out
          if (c.opacity < 0.02 && c.state === "waiting") {
            c.randomOffset = Math.random() * 20;
            c.fadeTimer = Math.random() * 40;

            const pos = findConstellationPosition(W, H, consts);
            c.x = pos.x;
            c.y = pos.y;

            c.vx = (Math.random() - 0.5) * 0.05;
            c.vy = (Math.random() - 0.5) * 0.05;
          }

          if (phase < 0.4 && activeTransitions === 0) {
            c.state = "fadingIn";
            c.targetOpacity = Math.sin(phase * Math.PI * 2.5) * 0.5 + 0.5;
            activeTransitions++;
          } else if (phase < 0.5 && c.state === "fadingIn") {
            c.state = "fadingOut";
            c.targetOpacity = Math.max(0, 1 - (phase - 0.4) * 10);
          } else if (phase >= 0.5) {
            c.state = "waiting";
            c.targetOpacity = 0;
          }
        } else {
          c.targetOpacity = 0;
          c.state = "waiting";
        }

        // opacity smoothing
        c.opacity += (c.targetOpacity - c.opacity) * 0.03;

        if (c.opacity > 0.1) visibleCount++;
      });

      if (visibleCount < MIN_VISIBLE) {
        sorted[0].targetOpacity = 1;
        sorted[0].state = "active";
      }
    }

    function drawShapes() {
      const t = timeRef.current;
      const theme = themeRef.current;
      const blobs = blobsRef.current;

      const targetPalette = PALETTES[theme];
      const targetBase = BASE_COLORS[theme];
      const targetVig = VIGNETTE_COLORS[theme];
      const transitionSpeed = TRANSITION_SPEED;

      currentPaletteRef.current = currentPaletteRef.current.map((c, i) =>
        lerpColor(c, targetPalette[i], transitionSpeed),
      );
      currentBaseRef.current = lerpColor(
        currentBaseRef.current,
        targetBase,
        transitionSpeed,
      );
      currentVigRef.current = lerpColor(
        currentVigRef.current,
        targetVig,
        VIG_TRANSITION_SPEED,
      );

      const palette = currentPaletteRef.current;
      const base = currentBaseRef.current;
      const vc = currentVigRef.current;
      const isDay = theme === "day";

      ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "source-over";
      blobs.forEach((b) => {
        const [r, g, bl] = palette[b.colorIndex % palette.length];
        const { cx, cy } = buildShapePath(b, t);
        const glowR = b.r * 2.4;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0.18)`);
        grad.addColorStop(0.35, `rgba(${r},${g},${bl},0.1)`);
        grad.addColorStop(0.7, `rgba(${r},${g},${bl},0.03)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });

      // blobs
      ctx.globalCompositeOperation = "screen";
      blobs.forEach((b) => {
        const [r, g, bl] = palette[b.colorIndex % palette.length];
        const { cx, cy } = buildShapePath(b, t);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0.25)`);
        grad.addColorStop(0.3, `rgba(${r},${g},${bl},0.1)`);
        grad.addColorStop(0.65, `rgba(${r},${g},${bl},0.1)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      // vignette
      const vig1 = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.7,
      );
      vig1.addColorStop(0, `rgba(${vc[0]},${vc[1]},${vc[2]},0)`);
      vig1.addColorStop(0.4, `rgba(${vc[0]},${vc[1]},${vc[2]},0)`);
      vig1.addColorStop(
        1,
        `rgba(${vc[0]},${vc[1]},${vc[2]},${isDay ? 0.5 : 0.85})`,
      );
      ctx.fillStyle = vig1;
      ctx.fillRect(0, 0, W, H);

      const vig2 = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.5,
      );
      vig2.addColorStop(0, `rgba(${vc[0]},${vc[1]},${vc[2]},0)`);
      vig2.addColorStop(0.6, `rgba(${vc[0]},${vc[1]},${vc[2]},0)`);
      vig2.addColorStop(
        1,
        `rgba(${vc[0]},${vc[1]},${vc[2]},${isDay ? 0.25 : 0.5})`,
      );
      ctx.fillStyle = vig2;
      ctx.fillRect(0, 0, W, H);

      updateConstellations();
      constellationsRef.current.forEach((c) => {
        drawConstellation(c, ctx, theme);
      });
    }

    // for pausing the anim when not in vioewport
    let paused = false;

    function loopEffect() {
      if (!paused) {
        timeRef.current += 0.006;
        drawShapes();
      }

      rafRef.current = requestAnimationFrame(loopEffect);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loopEffect);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [paused]);

  return <canvas ref={canvasRef} className="celestial-bg" aria-hidden="true" />;
}

export default CelestialBackground;