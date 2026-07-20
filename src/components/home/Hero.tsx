"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { HeroScene } from "@/components/motion/HeroScene";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

// Líneas de producto del carrusel — imágenes son placeholders a propósito,
// el usuario las reemplaza por fotografía profesional más adelante.
const SLIDES = [
  { tag: "Línea 01", title: "Neumática industrial" },
  { tag: "Línea 02", title: "Instrumentación de procesos" },
  { tag: "Línea 03", title: "Sensores y fotoceldas" },
  { tag: "Línea 04", title: "Controles eléctricos" },
] as const;

const AUTO_ADVANCE_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-black/5"
      style={{ perspective: 1200 }}
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-carbon/60 to-carbon" />

      <div className="container-max relative py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* IZQUIERDA — copy */}
          <motion.div
            className="lg:col-span-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-signal" />
              <span className="eyebrow">SRL · Santo Domingo · Distribución industrial B2B</span>
            </motion.div>

            <motion.h1 variants={item} className="font-display text-display-xl text-surface mb-6">
              Soluciones industriales para{" "}
              <span className="text-signal">empresas que no pueden detenerse</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg text-steel-200 max-w-xl mb-4 leading-relaxed">
              Suministramos equipos, repuestos y componentes industriales para automatización,
              neumática, instrumentación y control eléctrico.
            </motion.p>

            <motion.p variants={item} className="text-base text-steel-300 max-w-xl mb-8 leading-relaxed">
              Además, ofrecemos el servicio de importación de productos industriales bajo pedido
              desde Estados Unidos, Europa y Asia.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Link
                href="/productos"
                className="btn-primary group/btn px-7 py-4 text-sm shadow-[0_10px_40px_-8px_rgba(228,0,43,0.55)]
                           hover:shadow-[0_14px_46px_-6px_rgba(228,0,43,0.7)] hover:scale-[1.03] transition-all"
              >
                Explorar catálogo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <Link
                href="/cotizacion"
                className="btn-secondary hover:-translate-y-0.5 transition-transform"
              >
                Solicitar cotización
              </Link>
            </motion.div>
          </motion.div>

          {/* DERECHA — carrusel de líneas de producto (placeholders) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative aspect-[4/3] border border-black/10 bg-carbon-800 overflow-hidden"
            >
              {/* Corner brackets — motivo visual de la marca */}
              <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal z-10" />
              <div className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-signal z-10" />
              <div className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-signal z-10" />
              <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-10 text-center"
                >
                  <ImageOff className="h-9 w-9 text-steel-500" strokeWidth={1.25} />
                  <div className="font-mono text-[10px] uppercase tracking-techno text-steel-500">
                    {SLIDES[index].tag} · imagen a reemplazar
                  </div>
                  <div className="font-display text-2xl text-surface">{SLIDES[index].title}</div>
                </motion.div>
              </AnimatePresence>

              {/* Controles */}
              <button
                type="button"
                onClick={prev}
                aria-label="Línea anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center
                           bg-carbon/70 backdrop-blur-sm border border-black/10 text-steel-300
                           hover:text-signal hover:border-signal/40 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Línea siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center
                           bg-carbon/70 backdrop-blur-sm border border-black/10 text-steel-300
                           hover:text-signal hover:border-signal/40 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ir a ${slide.title}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-6 bg-signal" : "w-1.5 bg-steel-500/40 hover:bg-steel-500/70",
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
