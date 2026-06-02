import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../../styles/tarot.css";

// Imports for svg components
// Day imports
import sunCardBackBase from "../../assets/svg-components/arcana-sun-back/sun-cardback-base.svg";
import sunCardBackIcons from "../../assets/svg-components/arcana-sun-back/sun-cardback-icons.svg";

import sunCardBase from "../../assets/svg-components/arcana-sun-front/sun-card-base.svg";
import sunClouds from "../../assets/svg-components/arcana-sun-front/sun-card-clouds.svg";
import sunCardFrame from "../../assets/svg-components/arcana-sun-front/sun-card-frame.svg";
import sunCardSun from "../../assets/svg-components/arcana-sun-front/sun-card-sun.svg";
import sunCardTitle from "../../assets/svg-components/arcana-sun-front/sun-card-title.svg";
// Night Imports
import moonCardBackBase from "../../assets/svg-components/arcana-moon-back/moon-cardback-base.svg";
import moonCardBackIcons from "../../assets/svg-components/arcana-moon-back/moon-cardback-icons.svg";

import moonCardBase from "../../assets/svg-components/arcana-moon-front/moon-card-base.svg";
import moonCardFrame from "../../assets/svg-components/arcana-moon-front/moon-card-frame.svg";
import moonCardMoon from "../../assets/svg-components/arcana-moon-front/moon-card-moon.svg";
import moonCardTitle from "../../assets/svg-components/arcana-moon-front/moon-card-title.svg";

const VARIATIONS = {
  1: {
    clouds: [{ width: 500, height: 50, top: "14%", duration: 40, delay: 0 }],
    starCount: 65,
  },
  2: {
    clouds: [{ width: 400, height: 40, top: "10%", duration: 35, delay: -3 }],
    starCount: 90,
  },
  3: {
    clouds: [{ width: 350, height: 50, top: "10%", duration: 25, delay: -5 }],
    starCount: 75,
  },
};

const GINKGO_COLORS = [
  "rgba(200, 140, 20, 0.35)",
  "rgba(180, 120, 15, 0.3)",
  "rgba(220, 160, 30, 0.28)",
  "rgba(190, 130, 10, 0.32)",
  "rgba(210, 150, 25, 0.25)",
];

function drawGinkgoLeaf(ctx, x, y, size, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const s = size;
  ctx.fillStyle = color;
  ctx.strokeStyle = color.replace(/[\d.]+\)$/, "0.15)");
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    -s * 0.9,
    -s * 0.3,
    -s * 1.1,
    -s * 1.0,
    -s * 0.15,
    -s * 1.1,
  );
  ctx.bezierCurveTo(
    -s * 0.1,
    -s * 0.85,
    s * 0.1,
    -s * 0.85,
    s * 0.15,
    -s * 1.1,
  );
  ctx.bezierCurveTo(s * 1.1, -s * 1.0, s * 0.9, -s * 0.3, 0, 0);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = color.replace(/[\d.]+\)$/, "0.2)");
  ctx.lineWidth = 0.8;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, s * 0.55);
  ctx.stroke();
  ctx.restore();
}

function makeLeaf(W, H) {
  const side = Math.random() < 0.7 ? "left" : "top";
  return {
    x: side === "left" ? -30 : Math.random() * W * 0.6,
    y: side === "left" ? Math.random() * H * 0.8 : -30,
    size: 6 + Math.random() * 10,
    vx: 0.4 + Math.random() * 0.5,
    vy: 0.1 + Math.random() * 0.25,
    wobbleAmp: Math.random() * 0.18 + 0.05,
    wobbleFreq: Math.random() * 0.04 + 0.02,
    wobbleT: Math.random() * Math.PI * 2,
    angle: Math.random() * Math.PI * 2,
    rotSpd: (Math.random() - 0.5) * 0.018,
    color: GINKGO_COLORS[Math.floor(Math.random() * GINKGO_COLORS.length)],
    alpha: 0,
    alphaTarget: 0.85 + Math.random() * 0.15,
  };
}

function getTheme() {
  return document.documentElement.dataset.theme || "day";
}

function MoonWaves() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 450 143"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", opacity: 0.5 }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient
          id="waveGrad"
          x1="360"
          y1="0"
          x2="1881"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ef6b6b" />
          <stop offset="50%" stopColor="#3dcca0" />
          <stop offset="100%" stopColor="#9b6bef" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1521 0"
            to="1521 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <g transform="matrix(0.295942,0,0,0.295942,-620.078,-220.806)">
        <path
          fill="url(#waveGrad)"
          d="M448.518,495.788C443.942,485.298 437.414,475.65 429.165,467.4C411.839,450.074 388.338,440.341 363.835,440.341C361.978,440.341 360.471,438.833 360.471,436.977C360.471,435.12 361.978,433.613 363.835,433.613C390.122,433.613 415.334,444.055 433.922,462.643C442.752,471.472 449.743,481.796 454.651,493.02C468.836,486.987 483.917,483.075 499.409,481.484C492.083,464.765 481.658,449.387 468.501,436.229C440.742,408.471 403.091,392.876 363.836,392.876C361.979,392.876 360.471,391.369 360.471,389.512C360.471,387.656 361.979,386.148 363.836,386.148C366.499,386.148 369.155,386.217 371.801,386.353C379.501,367.905 390.776,350.945 405.186,336.535C434.206,307.515 473.566,291.212 514.607,291.212L514.613,291.212C555.654,291.212 595.014,307.515 624.034,336.535C638.451,350.952 649.729,367.919 657.429,386.377C660.225,386.225 663.031,386.148 665.846,386.148C668.904,386.148 671.953,386.239 674.99,386.418C682.69,367.945 693.974,350.962 708.401,336.535C737.421,307.515 776.784,291.212 817.825,291.212C820.633,291.212 823.433,291.288 826.222,291.439C833.932,272.381 845.435,254.865 860.254,240.046C889.274,211.026 928.637,194.723 969.678,194.723C1010.719,194.723 1050.082,211.026 1079.102,240.046C1093.902,254.846 1105.395,272.335 1113.104,291.365C1115.398,291.263 1117.699,291.212 1120.005,291.212C1122.94,291.212 1125.866,291.295 1128.78,291.46C1136.489,272.394 1147.996,254.871 1162.82,240.046C1191.84,211.026 1231.204,194.723 1272.244,194.723C1313.285,194.723 1352.648,211.026 1381.669,240.046C1396.482,254.859 1407.981,272.366 1415.691,291.415C1418.329,291.28 1420.976,291.212 1423.63,291.212C1464.671,291.212 1504.034,307.515 1533.054,336.535C1547.474,350.955 1558.754,367.928 1566.454,386.391C1569.333,386.229 1572.224,386.148 1575.122,386.148C1577.713,386.148 1580.296,386.213 1582.871,386.342C1590.571,367.898 1601.844,350.942 1616.251,336.535C1645.271,307.515 1684.635,291.212 1725.676,291.212C1766.716,291.212 1806.08,307.515 1835.1,336.535C1849.527,350.963 1860.811,367.945 1868.512,386.419C1871.554,386.239 1874.61,386.148 1877.675,386.148C1879.532,386.148 1881.039,387.656 1881.039,389.512C1881.039,391.369 1879.532,392.876 1877.675,392.876C1838.418,392.876 1800.765,408.471 1773.007,436.229C1759.85,449.386 1749.426,464.765 1742.1,481.484C1757.591,483.074 1772.671,486.986 1786.855,493.018C1791.763,481.792 1798.756,471.466 1807.587,462.635C1826.174,444.048 1851.387,433.605 1877.675,433.605C1879.531,433.605 1881.039,435.112 1881.039,436.969C1881.039,438.826 1879.531,440.333 1877.675,440.333C1853.172,440.333 1829.67,450.067 1812.344,467.393C1804.094,475.643 1797.565,485.294 1792.989,495.786C1807.324,502.632 1820.632,511.698 1832.382,522.765C1834.827,517.407 1838.226,512.476 1842.47,508.231C1851.807,498.895 1864.471,493.65 1877.675,493.65C1879.532,493.65 1881.039,495.157 1881.039,497.014C1881.039,498.87 1879.532,500.378 1877.675,500.378C1866.255,500.378 1855.303,504.914 1847.228,512.989C1843.082,517.135 1839.869,522.039 1837.724,527.376C1837.661,527.531 1837.588,527.679 1837.506,527.82C1851.441,542.222 1862.316,559.054 1869.711,577.303C1877.122,595.592 1881.039,615.304 1881.039,635.42L1881.039,673.094C1881.039,674.952 1879.533,676.458 1877.675,676.458L363.836,676.458C361.978,676.458 360.472,674.952 360.472,673.094L360.472,635.42C360.472,615.304 364.388,595.592 371.8,577.303C379.194,559.055 390.068,542.225 404.001,527.824C403.92,527.685 403.849,527.539 403.787,527.386C401.642,522.048 398.428,517.143 394.282,512.996C386.207,504.922 375.255,500.385 363.835,500.385C361.979,500.385 360.471,498.878 360.471,497.021C360.471,495.165 361.979,493.657 363.835,493.657C377.039,493.657 389.703,498.902 399.039,508.239C403.282,512.482 406.68,517.412 409.125,522.767C420.875,511.701 434.183,502.635 448.518,495.788Z"
        />
      </g>
    </svg>
  );
}

function TarotCard({
  // number      = "I",
  title = "Project",
  subtitle = "",
  // description = "",
  // tags        = [],
  // link        = "/",
  image = {},
  variation = 1,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animRef = useRef(null);
  const ginkgoCanvasRef = useRef(null);
  const ginkgoAnimRef = useRef(null);
  const gingkoLeavesRef = useRef([]);

  const [flipped, setFlipped] = useState(false);
  const [theme, setTheme] = useState(getTheme);

  const config = VARIATIONS[variation] || VARIATIONS[1];
  const isDay = theme === "day";

  const frontAssets = isDay
    ? {
        base: sunCardBase,
        frame: sunCardFrame,
        icon: sunCardSun,
        title: sunCardTitle,
      }
    : {
        base: moonCardBase,
        frame: moonCardFrame,
        icon: moonCardMoon,
        title: moonCardTitle,
      };

  const backAssets = isDay
    ? { base: sunCardBackBase, icons: sunCardBackIcons }
    : { base: moonCardBackBase, icons: moonCardBackIcons };

  // for theme toggle
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // stars in night mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth || 260;
    canvas.height = canvas.offsetHeight || 416;
    starsRef.current = Array.from({ length: config.starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      t: Math.random() * Math.PI * 2,
      spd: 0.012 + Math.random() * 0.028,
      col: ["#ffffff", "#ffffff", "#c8aaff", "#aaffee"][
        Math.floor(Math.random() * 4)
      ],
    }));
  }, [theme, config.starCount]);

  // animation loop for stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (theme === "night") {
        starsRef.current.forEach((s) => {
          s.t += s.spd;
          // random blinking for stars
          ctx.globalAlpha = 0.1 + 0.9 * ((Math.sin(s.t) + 1) / 2);
          ctx.fillStyle = s.col;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [theme]);

  useEffect(() => {
    const canvas = ginkgoCanvasRef.current;
    if (!canvas || !isDay) return;
    canvas.width = canvas.offsetWidth || 220;
    canvas.height = canvas.offsetHeight || 380;
    const W = canvas.width;
    const H = canvas.height;
    gingkoLeavesRef.current = Array.from({ length: 20 }, () => {
      const l = makeLeaf(W, H);
      l.x = Math.random() * W;
      l.y = Math.random() * H;
      l.alpha = l.alphaTarget;
      return l;
    });
  }, [theme]);

  // ginkgo leaves anim loop
  useEffect(() => {
    const canvas = ginkgoCanvasRef.current;
    if (!canvas || !isDay) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      gingkoLeavesRef.current.forEach((leaf, i) => {
        leaf.wobbleT += leaf.wobbleFreq;
        leaf.x += leaf.vx + Math.sin(leaf.wobbleT) * leaf.wobbleAmp;
        leaf.y += leaf.vy + Math.cos(leaf.wobbleT * 0.7) * leaf.wobbleAmp * 0.4;
        leaf.angle += leaf.rotSpd;
        const edgeDist = Math.min(leaf.x / 40, (W - leaf.x) / 40, 1);
        leaf.alpha = Math.min(leaf.alphaTarget, Math.max(0, edgeDist));
        if (leaf.x > W + 40 || leaf.y > H + 40) {
          gingkoLeavesRef.current[i] = makeLeaf(W, H);
          return;
        }
        ctx.save();
        ctx.globalAlpha = leaf.alpha;
        drawGinkgoLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.angle, leaf.color);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
      ginkgoAnimRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(ginkgoAnimRef.current);
  }, [theme]);

  // Mouse Parallax: Tilts the whole card. Each data-depth layer shifts independently so layers feel like they r floating
  const handleMouseMove = useCallback((e) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // disables transition while actively moving so tilt can track instantly
    wrap.style.transition = "none";

    const rect = wrap.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    // tilts the card
    wrap.style.transform = `translateY(-8px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;

    wrap.querySelectorAll("[data-depth]").forEach((layer) => {
      const d = parseFloat(layer.dataset.depth) || 1;
      layer.style.transform = `translate(${dx * d * 2.8}px, ${dy * d * 2.8}px)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // restors thee transitiosn so card eases back smoothly
    wrap.style.transition = "";
    wrap.style.transform = "";

    wrap.querySelectorAll("[data-depth]").forEach((l) => {
      l.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
      l.style.transform = "";
    });

    // cleans up layer transitions after ease-back completes
    setTimeout(() => {
      if (!wrapRef.current) return;
      wrapRef.current.querySelectorAll("[data-depth]").forEach((l) => {
        l.style.transition = "";
      });
    }, 650);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`tarot-wrap${flipped ? " is-flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${title} — click to flip`}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
    >
      {/*Tarot front
          Layer order if form the bottom → top:
            1  card base SVG      (z-index 1)
            2a  clouds       (z-index 2, day)
            2b  gingko leave         (z-index 2, day)
            2c  stars           (z-index 2, night)
            3  project image      (z-index 3, object-fit:cover, no warp)
            4  frame SVG          (z-index 4, sits on top of image)
            5  sun/moon icon      (z-index 5)
            6  title banner SVG + html text (z-index 6)*/}
      <div className="tarot-face tarot-front">
        {/* 1: card base */}
        <div className="tarot-base" data-depth="1">
          <img
            src={frontAssets.base}
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
            }}
          />
        </div>

        {/* 2a: drifting clouds (day) */}
        {isDay && (
          <div className="tarot-bg" data-depth="2">
            {config.clouds.map((cloud, i) => (
              <img
                key={i}
                src={sunClouds}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: cloud.width,
                  height: "auto",
                  top: cloud.top,
                  left: 0,
                  opacity: 0.7,
                  animation: `tarot-drift ${cloud.duration}s linear ${cloud.delay}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* 2b: gingko leaves anim (day) */}
        {isDay && (
          <div className="tarot-canvas-clip">
            <canvas
              ref={ginkgoCanvasRef}
              data-depth="1"
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        {/* 2c:star canvas (night) */}
        <div className="tarot-canvas-clip">
          <canvas
            ref={canvasRef}
            data-depth="1"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* 3: project image */}
        <div className="tarot-image" data-depth="3">
          {image.src ? (
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={image.sizes}
              alt={image.alt || title}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(160deg,#1a0535,#0a2a4a,#0a1a0a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(180,160,255,0.15)",
                fontSize: "clamp(24px,8vw,48px)",
              }}
            >
              ◈
            </div>
          )}
        </div>

        {/* 4: frame SVG */}
        <div className="tarot-frame-wrapper">
          <div className="tarot-frame" data-depth="3">
            <img src={frontAssets.frame} alt="" aria-hidden="true" />
          </div>
        </div>

        {/* 5: sun/moon icon */}
        <div className="tarot-icon-wrapper">
          <div className="tarot-icon-inner" data-depth="2">
            <img
              src={frontAssets.icon}
              alt={isDay ? "sun" : "moon"}
              aria-hidden="true"
              className="tarot-icon"
            />
          </div>
        </div>

        {/* 6: title banner */}
        <div className="tarot-title" data-depth="5">
          <img
            src={frontAssets.title}
            alt=""
            aria-hidden="true"
            className="banner-svg"
          />
          <div className="tarot-title-text">
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Tarot Back
          Layer order if form the bottom → top:
            1  back base SVG        (z-index 1)
            2  moon/sun phase icons (z-index 2, night only) */}
      <div className="tarot-face tarot-back-face">
        {/* 1: back base */}
        <div className="tarot-base" data-depth="1">
          <img
            src={backAssets.base}
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              display: "block",
            }}
          />
        </div>

        {/* 2: moon/sun phase icons */}
        <div className="tarot-back-icons-wrapper">
          <div className="tarot-back-icons" data-depth="4">
            <img src={backAssets.icons} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarotCard;
