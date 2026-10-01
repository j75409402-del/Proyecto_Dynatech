"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { HeroScene } from "@/components/motion/HeroScene";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappGeneral } from "@/lib/whatsapp";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

/** A partir de qué información podemos cotizar — dato del cliente, no se agregan otros. */
const PUNTOS_DE_PARTIDA = ["Código o referencia", "Plano", "Muestra", "Medidas", "Fotos", "Especificaciones del cliente"];

export function Hero() {
  return (
    <section
      className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-black/5"
      style={{ perspective: 1200 }}
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-carbon/60 to-carbon" />

      <div className="container-max relative py-16 sm:py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* IZQUIERDA — copy. Sin opacity:0 inicial: el H1 es el LCP y debe pintarse con el
              HTML del servidor, sin esperar a que cargue la animación. */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-signal" />
              <span className="eyebrow">Proveedor industrial B2B · Santo Domingo</span>
            </div>

            <h1 className="font-display text-display-xl text-surface mb-6">
              Soluciones industriales para{" "}
              <span className="text-signal">empresas que no pueden detenerse</span>
            </h1>

            <p className="text-lg sm:text-xl text-steel-200 max-w-xl mb-8 leading-relaxed">
              Neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas para
              empresas, fábricas y zonas francas. Además, fabricamos, reparamos y reconstruimos
              cilindros neumáticos.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/cotizacion"
                className="btn-primary group/btn px-7 py-4 text-sm shadow-[0_10px_40px_-8px_rgba(228,0,43,0.55)]
                           hover:shadow-[0_14px_46px_-6px_rgba(228,0,43,0.7)] hover:scale-[1.03] transition-all"
              >
                Solicita tu cotización
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
              <a
                href={whatsappGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-7 py-4 hover:-translate-y-0.5 transition-transform"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <motion.div variants={item} initial="hidden" animate="show">
              <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mb-3">
                Cotizamos a partir de
              </div>
              <ul className="flex flex-wrap gap-2">
                {PUNTOS_DE_PARTIDA.map((p) => (
                  <li
                    key={p}
                    className="border border-black/10 bg-carbon/80 backdrop-blur-sm px-3 py-1.5 text-sm text-steel-200"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* DERECHA — una sola imagen grande y real del taller */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative aspect-[4/3] border border-black/10 bg-carbon-800"
            >
              {/* Corner brackets — motivo visual de la marca */}
              <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal z-10" />
              <div className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-signal z-10" />
              <div className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-signal z-10" />
              <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal z-10" />
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/cilindros/taller-reparando.jpg"
                  alt="Técnico de Dynatech trabajando en el taller"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
