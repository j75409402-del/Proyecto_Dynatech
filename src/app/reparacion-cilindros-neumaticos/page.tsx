import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Factory,
  Ruler,
  ShieldCheck,
  PackageCheck,
  Settings,
  FileText,
  Cog,
  Gauge,
  CalendarCheck,
  Inbox,
  Search,
  Activity,
  Layers,
  Truck,
  Package,
  Award,
  Zap,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { AccordionItem } from "@/components/ui/Accordion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE } from "@/lib/constants";
import { whatsappCylinderService } from "@/lib/whatsapp";

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
  { icon: Wrench, title: "Reparación de cilindros neumáticos", desc: "Diagnóstico y reparación completa, con repuesto de calidad y prueba de funcionamiento." },
  { icon: Factory, title: "Fabricación de cilindros", desc: "Fabricación de cilindros completos a medida cuando el original ya no está disponible." },
  { icon: Ruler, title: "Fabricación de vástagos", desc: "Vástagos cromados fabricados a medida, con el acabado y tolerancia del original." },
  { icon: ShieldCheck, title: "Cambio de sellos", desc: "Reemplazo de sellos por repuesto de calidad para eliminar fugas de aire." },
  { icon: PackageCheck, title: "Cambio de empaques", desc: "Empaques nuevos ajustados a cada modelo, sin comprometer la presión de trabajo." },
  { icon: Settings, title: "Rectificación de vástagos", desc: "Rectificado de precisión para recuperar vástagos con desgaste o corrosión." },
  { icon: FileText, title: "Fabricación bajo plano", desc: "Fabricamos el componente completo a partir de tus especificaciones técnicas." },
  { icon: Cog, title: "Mecanizado de piezas", desc: "Mecanizado CNC de piezas y componentes neumáticos a medida." },
  { icon: Gauge, title: "Pruebas neumáticas", desc: "Pruebas de presión y funcionamiento antes de cada entrega." },
  { icon: CalendarCheck, title: "Mantenimiento preventivo", desc: "Planes de mantenimiento para reducir paradas no programadas en tu línea." },
];

const MARCAS = [
  "SMC", "Festo", "Airtac", "Parker", "Metal Work",
  "Camozzi", "Norgren", "Bosch Rexroth", "CKD", "Mindman",
];

const PROCESO = [
  { icon: Inbox, title: "Recepción", desc: "Recibimos el cilindro dañado o tu plano de fabricación." },
  { icon: Search, title: "Inspección", desc: "Revisión técnica de cada componente." },
  { icon: Activity, title: "Diagnóstico", desc: "Identificamos causa y alcance del daño." },
  { icon: FileText, title: "Cotización", desc: "Te enviamos precio y tiempo estimado." },
  { icon: Wrench, title: "Reparación o fabricación", desc: "Ejecutamos el trabajo con repuesto de calidad." },
  { icon: Layers, title: "Ensamblaje", desc: "Armado con las tolerancias correctas." },
  { icon: Gauge, title: "Pruebas", desc: "Prueba de presión y funcionamiento real." },
  { icon: Truck, title: "Entrega", desc: "Entregamos el cilindro listo para instalar." },
];

const BENEFICIOS = [
  { icon: Award, title: "Personal especializado" },
  { icon: Ruler, title: "Alta precisión" },
  { icon: PackageCheck, title: "Repuestos de calidad" },
  { icon: ShieldCheck, title: "Garantía" },
  { icon: Factory, title: "Fabricación personalizada" },
  { icon: Zap, title: "Atención rápida" },
  { icon: Package, title: "Soluciones industriales" },
];

const ANTES_DESPUES = [
  "Cilindro ISO 32mm",
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

function quoteHref(item: string) {
  return `/cotizacion?nombre=${encodeURIComponent(item)}`;
}

export default function ReparacionCilindrosPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="relative border-b border-black/5 overflow-hidden">
        <div className="container-max py-16 sm:py-20">
          <Breadcrumbs items={[{ label: "Reparación y fabricación de cilindros neumáticos" }]} />

          <div className="grid lg:grid-cols-12 gap-12 items-center mt-8">
            <Reveal className="lg:col-span-6">
              <div className="eyebrow mb-4">Neumática · Servicio técnico</div>
              <h1 className="font-display text-display-xl text-surface mb-6">
                Reparación y fabricación de <span className="text-signal">cilindros neumáticos</span>
              </h1>
              <p className="text-xl text-steel-200 leading-relaxed mb-8 max-w-xl">
                Soluciones especializadas para recuperar y fabricar cilindros neumáticos
                industriales con altos estándares de calidad.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={quoteHref("Reparación / fabricación de cilindro neumático")} className="btn-primary">
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappCylinderService()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Contactar por WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] border border-black/10">
                  <ImagePlaceholder label="Taller reparando cilindros" />
                </div>
                <div className="aspect-[3/4] border border-black/10 mt-8">
                  <ImagePlaceholder label="Cilindros neumáticos nuevos" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NUESTROS SERVICIOS */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">01 · Qué hacemos</div>
            <h2 className="font-display text-display-lg text-surface">Nuestros servicios</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICIOS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <TiltCard max={4} className="h-full">
                  <div className="group flex h-full flex-col border border-black/10 bg-carbon hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] transition-all duration-300">
                    <div className="flex flex-1 flex-col p-6">
                      <s.icon className="h-5 w-5 text-signal mb-4" />
                      <h3 className="font-display text-lg text-surface mb-2">{s.title}</h3>
                      <p className="text-sm text-steel-300 leading-relaxed mb-5 flex-1">{s.desc}</p>
                      <Link
                        href={quoteHref(s.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                      >
                        Solicitar cotización
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANTES Y DESPUÉS */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">02 · Resultados</div>
            <h2 className="font-display text-display-lg text-surface">Antes y después</h2>
            <p className="text-steel-300 mt-4">
              Comparaciones de cilindros dañados recuperados en nuestro taller — se reemplazan
              por fotografías reales cuando estén disponibles.
            </p>
          </Reveal>

          <div className="space-y-6">
            {ANTES_DESPUES.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <div className="border border-black/10 bg-carbon">
                  <div className="px-6 py-4 border-b border-black/10">
                    <span className="font-display text-base text-surface">{item}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="aspect-[16/9] border-r border-black/10 relative">
                      <ImagePlaceholder label={`Antes · ${item}`} />
                      <span className="absolute top-3 left-3 bg-signal text-white font-mono text-[9px] uppercase tracking-techno px-2 py-1">
                        Antes
                      </span>
                    </div>
                    <div className="aspect-[16/9] relative">
                      <ImagePlaceholder label={`Después · ${item}`} />
                      <span className="absolute top-3 left-3 bg-emerald-500 text-white font-mono text-[9px] uppercase tracking-techno px-2 py-1">
                        Después
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO DE TRABAJO */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">03 · Cómo trabajamos</div>
            <h2 className="font-display text-display-lg text-surface">Proceso de trabajo</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
            {PROCESO.map((paso, i) => (
              <Reveal key={paso.title} delay={i * 0.05}>
                <div className="group bg-carbon hover:bg-carbon-800 p-6 h-full min-h-[180px] flex flex-col transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs text-signal tracking-techno">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <paso.icon className="h-4 w-4 text-signal transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="font-display text-base text-surface mb-2">{paso.title}</h3>
                  <p className="text-xs text-steel-400 leading-relaxed">{paso.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link href={quoteHref("Reparación / fabricación de cilindro neumático")} className="btn-primary">
              Solicitar cotización de este servicio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">04 · Por qué Dynatech</div>
            <h2 className="font-display text-display-lg text-surface">Beneficios</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <TiltCard max={4} className="h-full">
                  <div className="group bg-carbon hover:bg-carbon-800 p-6 flex flex-col items-start gap-4 h-full min-h-[140px] transition-colors duration-300">
                    <span className="grid h-10 w-10 place-items-center bg-signal-soft text-signal transition-transform duration-300 group-hover:scale-110">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-steel-200 leading-relaxed">{b.title}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARCAS — carrusel */}
      <section className="py-12 border-b border-black/5 overflow-hidden">
        <Reveal className="container-max mb-6">
          <div className="eyebrow">05 · Compatibilidad</div>
          <h2 className="font-display text-2xl text-surface mt-2">Marcas compatibles</h2>
        </Reveal>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-carbon to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-carbon to-transparent z-10" />

          <div className="flex animate-marquee gap-16 w-max hover:[animation-play-state:paused]">
            {[...MARCAS, ...MARCAS].map((marca, i) => (
              <div key={`${marca}-${i}`} className="group flex items-center gap-3 px-2 shrink-0">
                <Award className="h-4 w-4 text-signal transition-transform duration-300 group-hover:scale-125" />
                <span className="font-display text-xl text-steel-200 whitespace-nowrap transition-colors duration-300 group-hover:text-surface">
                  {marca}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-max max-w-3xl">
          <Reveal className="mb-4">
            <div className="eyebrow mb-3">06 · Preguntas frecuentes</div>
            <h2 className="font-display text-display-lg text-surface">Preguntas frecuentes</h2>
          </Reveal>

          <div>
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} question={faq.q} defaultOpen={i === 0}>
                {faq.a}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL — fondo oscuro a propósito, usa `surface` (el tono casi negro del sistema
          de diseño) ya que la escala `carbon` es toda clara en este sitio (tema claro). */}
      <section className="bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,0,43,0.18),transparent_60%)]" />
        <div className="container-max relative py-20 sm:py-24 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-signal" />
              <span className="font-mono text-xs uppercase tracking-techno text-white/50">
                Servicio técnico especializado
              </span>
              <div className="h-px w-8 bg-signal" />
            </div>
            <h2 className="font-display text-display-xl text-white mb-8 max-w-3xl mx-auto">
              ¿Necesita reparar o fabricar un cilindro neumático?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={quoteHref("Reparación / fabricación de cilindro neumático")}
                className="btn-primary px-8 py-4 text-sm"
              >
                Solicitar cotización
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappCylinderService()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40
                           text-white font-medium px-8 py-4 text-sm uppercase tracking-wider transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
            <p className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40 font-mono uppercase tracking-techno">
              <Clock className="h-3.5 w-3.5" />
              Respuesta en menos de 24 horas hábiles
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
