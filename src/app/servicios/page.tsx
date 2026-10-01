import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { AccordionItem } from "@/components/ui/Accordion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { SITE } from "@/lib/constants";
import { SERVICIOS } from "@/lib/servicios";
import { whatsappCylinderService } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fabricación y reparación de cilindros neumáticos",
  description:
    "Fabricación, reparación y reconstrucción de cilindros neumáticos, fabricación bajo muestra o plano, cambio de sellos y cilindros personalizados en República Dominicana.",
  keywords: [
    "reparación de cilindros neumáticos",
    "fabricación de cilindros neumáticos",
    "reconstrucción de cilindros neumáticos",
    "cambio de sellos",
    "cilindros neumáticos en República Dominicana",
  ],
  alternates: { canonical: "/servicios" },
};

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
    q: "¿Qué incluye el cambio de sellos?",
    a: "Desarme completo del cilindro, reemplazo de sellos por repuesto de calidad, limpieza y rectificación si el componente lo requiere, y prueba de funcionamiento antes de la entrega.",
  },
  {
    q: "¿Trabajan con todos los cilindros neumáticos industriales?",
    a: "Reparamos y fabricamos componentes compatibles con cilindros neumáticos industriales estándar, sin importar el fabricante de origen.",
  },
  {
    q: "¿El trabajo tiene garantía?",
    a: "Sí, todo trabajo de reparación o fabricación realizado por Dynatech Ingeniería incluye garantía — te confirmamos el alcance específico al momento de la cotización.",
  },
  {
    q: "¿Hacen envíos fuera de Santo Domingo?",
    a: "Sí, coordinamos envíos a todo el territorio nacional. El costo y tiempo de envío se confirman junto con tu cotización según el destino y volumen del pedido.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Trabajamos con transferencia bancaria y crédito corporativo para clientes recurrentes con cuenta abierta. Los detalles se confirman al formalizar cada cotización.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Fabricación, reparación y reconstrucción de cilindros neumáticos",
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: "República Dominicana",
  description: SITE.description,
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

export default function ServiciosPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="border-b border-black/5">
        <div className="container-max pt-7 sm:pt-9">
          <Breadcrumbs items={[{ label: "Servicios" }]} />
        </div>
        <div className="overflow-hidden bg-surface text-white">
          <div className="container-max grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
            <Reveal className="lg:col-span-6">
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-white/55">Cilindros neumáticos · Servicios</div>
              <h1 className="mb-6 font-display text-display-xl text-white">
                Fabricación, reparación y <span className="text-signal">reconstrucción</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
                Recuperamos cilindros dañados y fabricamos nuevos a partir de tu plano, una muestra o
                tus medidas.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/cotizacion" className="btn-primary min-h-12 px-6">
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappCylinderService()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/35 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10">
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </Reveal>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15 bg-carbon-800 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.85)]">
                <Image
                  src="/banners/cilindros-taller-wide.webp"
                  alt="Imagen editorial de un cilindro neumático completo en reparación"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface/45 via-transparent to-transparent" />
                <div aria-hidden className="absolute -left-1 -top-1 h-5 w-5 border-l-2 border-t-2 border-signal" />
                <div aria-hidden className="absolute -bottom-1 -right-1 h-5 w-5 border-b-2 border-r-2 border-signal" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">01 · Qué hacemos</div>
            <h2 className="font-display text-display-lg text-surface">Nuestros servicios</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICIOS.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.04} className="h-full">
                <TiltCard max={4} className="h-full">
                  <div
                    id={s.id}
                    className="scroll-mt-24 flex h-full flex-col border border-black/10 bg-carbon p-6 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] transition-shadow duration-300"
                  >
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
            <p className="text-steel-300 mt-4">Cilindro ISO 32 mm recuperado en nuestro taller.</p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
              <div className="relative aspect-[3/1] bg-white">
                <Image
                  src="/cilindros/antes-cilindro-iso-32mm.jpg"
                  alt="Antes · Cilindro ISO 32 mm"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[3/1] bg-white">
                <Image
                  src="/cilindros/despues-cilindro-iso-32mm.jpg"
                  alt="Después · Cilindro ISO 32 mm"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas-frecuentes" className="section-pad scroll-mt-16">
        <div className="container-max max-w-3xl">
          <Reveal className="mb-4">
            <div className="eyebrow mb-3">03 · Preguntas frecuentes</div>
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

      <QuoteCTA quoteItem="Reparación de cilindros neumáticos" />
    </div>
  );
}
