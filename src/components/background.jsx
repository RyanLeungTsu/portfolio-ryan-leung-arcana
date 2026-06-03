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
const TRANSITION_SPEED = 0.035;
const VIG_TRANSITION_SPEED = 0.055;

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

function CelestialBackground() {
  const canvasRef = useRef(null);
  const blobsRef = useRef([]);
  const rafRef = useRef(null);
  const themeRef = useRef(getTheme());
  const timeRef = useRef(0);
  const [, setTheme] = useState(getTheme);

  const currentPaletteRef = useRef(PALETTES[getTheme()].map((c) => [...c]));
  const currentBaseRef = useRef([...BASE_COLORS[getTheme()]]);
  const currentVigRef = useRef([...VIGNETTE_COLORS[getTheme()]]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = getTheme();
      themeRef.current = t;
      setTheme(t);
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
        // noise for shape deformation
        const nx = noise2D(
          Math.cos(angle) * 1.8 + b.noiseOffX + t * 0.12,
          Math.sin(angle) * 1.8 + b.noiseOffY + t * 0.08,
        );
        const nr = noise2D(
          Math.cos(angle) * 1.2 + b.noiseOffR + t * 0.06,
          Math.sin(angle) * 1.2 + t * 0.1,
        );
        // deformation: radius varies ±30% based on noise
        const r = b.r * (1 + nx * 0.3 + nr * 0.12);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      return { cx, cy };
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

      // glow behind the blobs
      ctx.globalCompositeOperation = "source-over";
      blobs.forEach((b) => {
        const [r, g, bl] = palette[b.colorIndex % palette.length];
        const { cx, cy } = buildShapePath(b, t);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r * 2);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0.18)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${bl},0.07)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.fillStyle = grad;
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
    }

    function loopEffect() {
      timeRef.current += 0.003;
      drawShapes();
      rafRef.current = requestAnimationFrame(loopEffect);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(loopEffect);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="celestial-bg" aria-hidden="true" />;
}

export default CelestialBackground;
