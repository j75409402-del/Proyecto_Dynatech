"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

const NODES = [
  { x: 12, y: 18, delay: 0 },
  { x: 74, y: 12, delay: 0.6 },
  { x: 40, y: 55, delay: 1.2 },
  { x: 88, y: 65, delay: 0.3 },
  { x: 20, y: 80, delay: 0.9 },
  { x: 60, y: 34, delay: 1.5 },
  { x: 92, y: 30, delay: 0.45 },
];

const TRACES = [
  "M -5,24 L 38,24 L 38,52 L 80,52 L 80,20",
  "M 105,72 L 62,72 L 62,40 L 15,40 L 15,95",
];

/** Fondo animado del hero: blobs de luz + grid en paralaje + trazas de circuito estilo blueprint. Todo CSS/SVG, sin WebGL, pa' no penalizar el bundle. */
export function HeroScene() {
  const shouldReduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const gridX = useTransform(mx, [0, 1], [6, -6]);
  const gridY = useTransform(my, [0, 1], [6, -6]);
  const blobX = useTransform(mx, [0, 1], [-24, 24]);
  const blobY = useTransform(my, [0, 1], [-24, 24]);
  const nodesX = useTransform(mx, [0, 1], [14, -14]);
  const nodesY = useTransform(my, [0, 1], [14, -14]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-hidden
    >
      {/* Blobs de luz — capa más profunda */}
      <motion.div style={{ x: blobX, y: blobY }} className="absolute inset-0">
        <div className="absolute -top-[12%] left-[8%] h-[420px] w-[420px] rounded-full bg-signal/20 blur-[120px] animate-blob" />
        <div
          className="absolute -bottom-[18%] right-[4%] h-[380px] w-[380px] rounded-full bg-steel-400/10 blur-[120px] animate-blob"
          style={{ animationDelay: "-7s" }}
        />
      </motion.div>

      {/* Grid técnico en paralaje */}
      <motion.div style={{ x: gridX, y: gridY }} className="absolute inset-0 grid-bg opacity-40" />

      {/* Trazas de circuito + nodos de señal */}
      <motion.svg
        style={{ x: nodesX, y: nodesY }}
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="trace-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E4002B" stopOpacity="0" />
            <stop offset="50%" stopColor="#E4002B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E4002B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {TRACES.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#trace-gradient)"
            strokeWidth="0.25"
            strokeDasharray="6 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className={shouldReduceMotion ? undefined : "animate-trace"}
            style={{ animationDelay: `${i * 1.1}s` }}
          />
        ))}

        {NODES.map((n) => (
          <circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r="0.7"
            fill="#E4002B"
            className={shouldReduceMotion ? undefined : "animate-pulse-glow"}
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
