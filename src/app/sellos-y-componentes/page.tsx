import type { Metadata } from "next";
import { commercialMetadata } from "@/lib/seo";
import Image from "next/image";
import { ArrowRight, Ruler, Cog } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CylinderRelated } from "@/components/industrial/CylinderRelated";

export const metadata: Metadata = {
  ...commercialMetadata("Sellos y componentes para cilindros neumáticos", "Cotiza kits de sellos, vástagos y componentes bajo medida para cilindros neumáticos en República Dominicana.", "/sellos-y-componentes"),
  title: "Sellos y componentes para cilindros neumáticos",
  description:
    "Kits de sellos, vástagos y barras cromadas, y componentes bajo medida para cilindros neumáticos. Cotiza con el código, una foto o la muestra.",
  alternates: { canonical: "/sellos-y-componentes" },
};

const BLOQUES = [
  {
    id: "vastagos",
    icon: Ruler,
    title: "Vástagos y barras cromadas",
    desc: "Vástagos cromados fabricados a medida, con el acabado y la tolerancia del original.",
    necesitamos: "Diámetro y largo, un plano o el vástago de muestra.",
    cta: "Cotizar por WhatsApp",
    item: "Vástagos y barras cromadas",
  },
  {
    id: "componentes",
    icon: Cog,
    title: "Componentes bajo medida",
    desc: "Camisas, tapas y pistones fabricados bajo medida cuando no hay repuesto original disponible.",
    necesitamos: "La pieza original o el plano.",
    cta: "Cotizar por WhatsApp",
    item: "Componentes bajo medida (camisa, tapa, pistón)",
  },
];

export default function SellosYComponentesPage() {
  return (
    <div>
      {/* HERO + KITS DE SELLOS */}
      <section className="border-b border-black/5">
        <div className="container-max py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Sellos y componentes" }]} />

          <div className="grid lg:grid-cols-12 gap-12 items-center mt-8">
            <Reveal className="lg:col-span-6">
              <div className="eyebrow mb-4">Sellos y componentes</div>
              <h1 className="font-display text-display-xl text-surface mb-6">
                Las piezas que mantienen <span className="text-signal">tu cilindro sellado</span>
              </h1>
              <p className="text-xl text-steel-200 leading-relaxed mb-8 max-w-xl">
                Kits de sellos, vástagos y componentes para cilindros neumáticos. Envíanos el código,
                una foto o la muestra y te cotizamos.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={quoteHref("Kits de sellos")} target="_blank" rel="noopener" className="btn-primary">
                  <WhatsAppIcon className="h-4 w-4" />
                  Cotizar por WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/servicios" className="btn-secondary">
                  Reparación de cilindros
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-6">
              <div id="kits-de-sellos" className="scroll-mt-24 border border-black/10 bg-carbon">
                <div className="relative aspect-[4/3] bg-white border-b border-black/10">
                  <Image
                    src="/products/kit-sello-cilindro-neumatico.jpg"
                    alt="Kit de sellos para cilindro neumático"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="font-display text-2xl text-surface mb-2">Kits de sellos</h2>
                  <p className="text-steel-300 leading-relaxed mb-4">
                    Kits de sellos para la reparación y el mantenimiento de cilindros neumáticos.
                  </p>
                  <p className="text-sm text-steel-400">
                    <span className="font-mono text-[10px] uppercase tracking-techno text-signal mr-2">
                      Necesitamos
                    </span>
                    El código del cilindro o del kit, una foto o el cilindro de muestra.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VÁSTAGOS + COMPONENTES */}
      <section className="section-pad">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOQUES.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08} className="h-full">
                <TiltCard max={3} className="h-full">
                  <div id={b.id} className="scroll-mt-24 flex h-full flex-col border border-black/10 bg-carbon p-8">
                    <span className="grid h-12 w-12 place-items-center bg-signal-soft text-signal mb-6">
                      <b.icon className="h-6 w-6" />
                    </span>
                    <h2 className="font-display text-2xl text-surface mb-3">{b.title}</h2>
                    <p className="text-steel-300 leading-relaxed mb-5">{b.desc}</p>
                    <p className="text-sm text-steel-400 mb-8 flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-techno text-signal mr-2">
                        Necesitamos
                      </span>
                      {b.necesitamos}
                    </p>
                    <a
                      href={quoteHref(b.item)}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                    >
                      {b.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CylinderRelated current="/sellos-y-componentes" />

      <QuoteCTA
        eyebrow="Sellos · Vástagos · Componentes"
        title="¿Necesitas sellos o una pieza para tu cilindro?"
        quoteItem="Kits de sellos"
      />
    </div>
  );
}
