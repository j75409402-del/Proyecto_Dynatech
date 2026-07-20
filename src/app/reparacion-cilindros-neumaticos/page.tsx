import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Package,
  Award,
  ClipboardList,
  ShieldCheck,
  ImageOff,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reparación y Fabricación de Cilindros Neumáticos",
  description:
    "Reparación de cilindros neumáticos, fabricación de vástagos, camisas, tapas y pistones, cambio de sellos y empaques. Servicios neumáticos industriales en República Dominicana — SMC, Festo, Airtac, Parker y más.",
  keywords: [
    "reparación de cilindros neumáticos",
    "fabricación de cilindros neumáticos",
    "mantenimiento de cilindros neumáticos",
    "cambio de sellos",
    "fabricación de vástagos",
    "servicios neumáticos industriales",
    "reparación de cilindros neumáticos en República Dominicana",
  ],
  openGraph: {
    title: "Reparación y Fabricación de Cilindros Neumáticos · Dynatech Ingeniería",
    description:
      "Reparación, fabricación bajo plano y mantenimiento de cilindros neumáticos para la industria dominicana.",
  },
};

const SERVICIOS = [
  "Reparación de cilindros neumáticos",
  "Fabricación de cilindros neumáticos",
  "Fabricación de vástagos",
  "Fabricación de camisas (tubos)",
  "Fabricación de tapas",
  "Fabricación de pistones",
  "Cambio de sellos",
  "Cambio de empaques",
  "Rectificación de componentes",
  "Fabricación bajo plano",
];

const TIPOS_CILINDROS = [
  "Cilindros ISO",
  "Cilindros compactos",
  "Cilindros mini",
  "Cilindros guiados",
  "Cilindros sin vástago",
  "Cilindros especiales",
  "Cilindros de doble efecto",
  "Cilindros de simple efecto",
];

const MARCAS = [
  "SMC", "Festo", "Airtac", "Parker", "Metal Work",
  "Camozzi", "Norgren", "Bosch Rexroth", "CKD", "Mindman",
];

const PROCESO = [
  "Recepción del cilindro o plano",
  "Inspección técnica",
  "Diagnóstico",
  "Cotización",
  "Aprobación",
  "Reparación o fabricación",
  "Pruebas de funcionamiento",
  "Entrega",
];

const BENEFICIOS = [
  "Personal técnico especializado",
  "Fabricación personalizada",
  "Repuestos de alta calidad",
  "Pruebas de funcionamiento",
  "Soluciones para la industria",
  "Atención rápida",
  "Garantía en los trabajos realizados",
];

const FAQS = [
  {
    q: "¿Cuánto tiempo toma reparar un cilindro neumático?",
    a: "Depende de la disponibilidad de repuestos y la complejidad del daño. Tras la inspección técnica te damos un tiempo estimado junto con la cotización.",
  },
  {
    q: "¿Reparan cilindros que ya no se fabrican o son muy antiguos?",
    a: "Sí. Cuando no hay repuesto original disponible, fabricamos el componente (vástago, camisa, tapa o pistón) bajo medida a partir del cilindro original o de un plano.",
  },
  {
    q: "¿Puedo mandar solo el plano sin el cilindro físico?",
    a: "Sí, hacemos fabricación bajo plano. Envíanos las especificaciones técnicas y te cotizamos la fabricación completa.",
  },
  {
    q: "¿Qué incluye el cambio de sellos y empaques?",
    a: "Desarme completo del cilindro, reemplazo de sellos/empaques por repuesto de calidad, limpieza y rectificación si el componente lo requiere, y prueba de funcionamiento antes de la entrega.",
  },
  {
    q: "¿Trabajan con todas las marcas de cilindros?",
    a: "Reparamos y fabricamos componentes compatibles con SMC, Festo, Airtac, Parker, Metal Work, Camozzi, Norgren, Bosch Rexroth, CKD, Mindman y otras marcas industriales estándar.",
  },
  {
    q: "¿El trabajo tiene garantía?",
    a: "Sí, todo trabajo de reparación o fabricación realizado por Dynatech Ingeniería incluye garantía — te confirmamos el alcance específico al momento de la cotización.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Reparación y fabricación de cilindros neumáticos",
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: "República Dominicana",
  description:
    "Reparación de cilindros neumáticos, fabricación de vástagos, camisas, tapas y pistones, cambio de sellos y empaques, y fabricación bajo plano.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ReparacionCilindrosPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Header */}
      <section className="border-b border-black/5 section-pad">
        <div className="container-max max-w-4xl">
          <Breadcrumbs items={[{ label: "Reparación y fabricación de cilindros neumáticos" }]} />
          <div className="eyebrow mb-3 mt-6">Neumática · Servicio técnico</div>
          <h1 className="font-display text-display-xl text-surface mb-6">
            Reparación y fabricación de <span className="text-signal">cilindros neumáticos</span>
          </h1>
          <p className="text-xl text-steel-200 leading-relaxed max-w-3xl">
            Reparación, mantenimiento y fabricación bajo plano de cilindros neumáticos para la
            industria dominicana — vástagos, camisas, tapas, pistones, sellos y empaques, con
            personal técnico especializado y garantía en cada trabajo.
          </p>
        </div>
      </section>

      {/* Nuestros Servicios */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">01 · Qué hacemos</div>
            <h2 className="font-display text-display-lg text-surface">Nuestros servicios</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
            {SERVICIOS.map((servicio, i) => (
              <Reveal key={servicio} delay={i * 0.04}>
                <TiltCard max={4} className="h-full">
                  <div className="group bg-carbon hover:bg-carbon-800 p-6 flex items-start gap-3 h-full transition-colors duration-300">
                    <Wrench className="h-4 w-4 text-signal shrink-0 mt-0.5" />
                    <span className="text-sm text-steel-200">{servicio}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de cilindros */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">02 · Alcance técnico</div>
            <h2 className="font-display text-display-lg text-surface">Tipos de cilindros que reparamos</h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TIPOS_CILINDROS.map((tipo, i) => (
              <Reveal key={tipo} delay={i * 0.04}>
                <div className="flex items-center gap-2.5 border border-black/10 bg-carbon px-4 py-3.5">
                  <Package className="h-4 w-4 text-signal shrink-0" />
                  <span className="text-sm text-steel-200">{tipo}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas compatibles */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-10">
            <div className="eyebrow mb-3">03 · Compatibilidad</div>
            <h2 className="font-display text-display-lg text-surface">Marcas compatibles</h2>
            <p className="text-steel-300 mt-4">
              Reparamos y fabricamos componentes compatibles con las principales marcas de
              neumática industrial.
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap gap-3">
            {MARCAS.map((marca) => (
              <span
                key={marca}
                className="flex items-center gap-2 border border-black/10 bg-carbon-800 px-4 py-2.5"
              >
                <Award className="h-3.5 w-3.5 text-signal" />
                <span className="text-sm text-steel-200">{marca}</span>
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max max-w-3xl">
          <Reveal className="mb-12">
            <div className="eyebrow mb-3">04 · Cómo trabajamos</div>
            <h2 className="font-display text-display-lg text-surface">Proceso de trabajo</h2>
          </Reveal>

          <ol className="space-y-0">
            {PROCESO.map((paso, i) => (
              <Reveal key={paso} delay={i * 0.05}>
                <li className="flex items-start gap-5 py-4 border-b border-black/10 last:border-0">
                  <span className="font-display text-2xl text-signal text-numeric shrink-0 w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-steel-200 pt-1">{paso}</span>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <Link
              href={`/cotizacion?nombre=${encodeURIComponent("Reparación / fabricación de cilindro neumático")}`}
              className="btn-primary"
            >
              Solicitar cotización de este servicio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">05 · Por qué Dynatech</div>
            <h2 className="font-display text-display-lg text-surface">Beneficios</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
            {BENEFICIOS.map((beneficio, i) => (
              <Reveal key={beneficio} delay={i * 0.06}>
                <TiltCard max={4} className="h-full">
                  <div className="group bg-carbon hover:bg-carbon-800 p-6 flex flex-col items-start gap-3 h-full min-h-[140px] transition-colors duration-300">
                    <ShieldCheck className="h-5 w-5 text-signal" />
                    <span className="text-sm text-steel-200 leading-relaxed">{beneficio}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de trabajos */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">06 · Trabajos realizados</div>
            <h2 className="font-display text-display-lg text-surface">Galería de trabajos</h2>
            <p className="text-steel-300 mt-4">
              Espacio preparado para fotografías reales de reparaciones y fabricaciones — se
              reemplaza cuando esté disponible el material fotográfico.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="aspect-square bg-carbon-800 border border-black/10 flex flex-col items-center justify-center gap-2 text-steel-500">
                  <ImageOff className="h-6 w-6" strokeWidth={1.25} />
                  <span className="font-mono text-[9px] uppercase tracking-techno">Imagen a reemplazar</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-max max-w-3xl">
          <Reveal className="mb-12">
            <div className="eyebrow mb-3">07 · Preguntas frecuentes</div>
            <h2 className="font-display text-display-lg text-surface">
              Preguntas frecuentes
            </h2>
          </Reveal>

          <div className="space-y-10">
            {FAQS.map((faq) => (
              <Reveal key={faq.q}>
                <div className="flex items-start gap-4">
                  <ClipboardList className="h-4 w-4 text-signal shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg text-surface mb-2">{faq.q}</h3>
                    <p className="text-sm text-steel-300 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
