"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { HeroScene } from "@/components/motion/HeroScene";
import { TiltCard } from "@/components/motion/TiltCard";
import { Counter } from "@/components/motion/Counter";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/5"
      style={{ perspective: 1200 }}
    >
      <HeroScene />
      {/* Radial fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-carbon/60 to-carbon" />

      <div className="container-max relative section-pad">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* IZQUIERDA — copy */}
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Eyebrow con línea */}
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-signal" />
              <span className="eyebrow">SRL · Santo Domingo · Est. 2024</span>
            </motion.div>

            <motion.h1 variants={item} className="font-display text-display-xl text-surface mb-6">
              Piezas industriales <br />
              <span className="text-signal">que no paran</span> tu planta.
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-steel-200 max-w-xl mb-8 leading-relaxed"
            >
              Neumática, automatización, instrumentación y sensores. Distribución
              directa de marcas originales — con inventario en Santo Domingo y
              soporte de ingeniería pa' cotizar bien la primera vez.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Link href="/productos" className="btn-primary group/btn">
                Explorar catálogo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <Link href="/cotizacion" className="btn-secondary">
                Solicitar cotización
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div variants={item} className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
              <div className="border-l border-signal pl-4">
                <div className="font-display font-semibold text-2xl text-surface text-numeric">
                  <Counter value={6} suffix="+" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mt-1">
                  Familias técnicas
                </div>
              </div>
              <div className="border-l border-white/20 pl-4">
                <div className="font-display font-semibold text-2xl text-surface text-numeric">
                  <Counter value={8} />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mt-1">
                  Marcas OEM
                </div>
              </div>
              <div className="border-l border-white/20 pl-4">
                <div className="font-display font-semibold text-2xl text-surface text-numeric">
                  <Counter value={24} suffix="h" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mt-1">
                  Respuesta cotización
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* DERECHA — Datasheet mockup en 3D (elemento firma) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -18 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="animate-float">
                <TiltCard max={9} glare>
                  <DatasheetCard />
                </TiltCard>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Elemento firma — una ficha técnica renderizada como si fuera el producto real.
 * Le dice al visitante en 2 segundos: "aquí se venden cosas técnicas, en serio".
 */
function DatasheetCard() {
  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      {/* Corner brackets — visual industrial */}
      <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal" />
      <div className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-signal" />
      <div className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-signal" />
      <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal" />

      <div className="bg-carbon-800 border border-white/10 p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* Header ficha */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="eyebrow mb-1">Ficha técnica</div>
            <div className="font-display text-xl text-surface">DSBC-32-100-PPVA-N3</div>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono uppercase tracking-techno text-emerald-500 text-[10px]">
              En stock
            </span>
          </div>
        </div>

        {/* Producto info */}
        <div className="mb-6">
          <div className="text-xs text-steel-400 mb-1">Festo · Neumática</div>
          <h3 className="font-display text-lg text-surface leading-snug">
            Cilindro estándar ISO 15552 <br />
            <span className="text-steel-300">doble efecto Ø32mm</span>
          </h3>
        </div>

        {/* Specs table */}
        <dl className="space-y-2.5 mb-6">
          {[
            ["Diámetro", "32 mm"],
            ["Carrera", "100 mm"],
            ["Presión máx.", "10 bar"],
            ["Conexión", "G 1/8"],
            ["Temperatura", "−20 a 80 °C"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between gap-4 py-1 border-b border-white/5 last:border-0"
            >
              <dt className="spec-key">{k}</dt>
              <dd className="spec-val text-numeric">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Footer con SKU */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="sku-tag">SKU · FES-DSBC-32-100</span>
          <button className="btn-ghost text-xs">
            <Download className="h-3.5 w-3.5" />
            Datasheet
          </button>
        </div>
      </div>

      {/* Nota técnica flotante */}
      <div
        className="absolute -bottom-6 -right-4 sm:-right-6 bg-signal text-white px-3 py-2 rotate-2 shadow-lg"
        style={{ transform: "translateZ(40px) rotate(2deg)" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-techno">Cotiza en línea</div>
        <div className="font-display font-semibold text-sm">Respuesta 24h ↗</div>
      </div>
    </div>
  );
}
