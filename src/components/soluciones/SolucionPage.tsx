import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { SITE } from "@/lib/constants";
import { SOLUCIONES, type Solucion } from "@/lib/soluciones";
import { whatsappSolucion } from "@/lib/whatsapp";

type Props = {
  solucion: Solucion;
  /** Bloque opcional entre el hero y las subcategorías (ej. cilindros en Neumática). */
  destacado?: ReactNode;
};

/**
 * Plantilla de página de línea industrial: Hero → (destacado) → Subcategorías →
 * Aplicaciones → Otras líneas → Cotización. Sin SKUs, precios ni inventario.
 */
export function SolucionPage({ solucion: s, destacado }: Props) {
  const index = SOLUCIONES.findIndex((x) => x.slug === s.slug) + 1;
  const otras = SOLUCIONES.filter((x) => x.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.name,
    description: s.description,
    url: `${SITE.url}/${s.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "República Dominicana",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.title,
      itemListElement: s.subcategorias.map((sub) => ({
        "@type": "OfferCatalog",
        name: sub.title,
      })),
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="border-b border-black/5">
        <div className="container-max py-12 sm:py-16">
          <Breadcrumbs items={[{ label: s.name }]} />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-8">
            <div className="lg:col-span-6">
              <div className="eyebrow mb-4">
                Soluciones industriales · {String(index).padStart(2, "0")}
              </div>
              <h1 className="font-display text-display-xl text-surface mb-6">{s.title}</h1>
              <p className="text-lg sm:text-xl text-steel-200 leading-relaxed mb-8 max-w-xl">{s.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={quoteHref(s.name, s.name)} className="btn-primary">
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappSolucion(s.name)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-techno text-steel-400">
                Bajo cotización · Respuesta en menos de 24 horas hábiles
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative border border-black/10 bg-white">
                <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal z-10" />
                <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal z-10" />
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={s.imageWidth}
                  height={s.imageHeight}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {destacado}

      {/* SUBCATEGORÍAS */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">01 · Qué cotizamos</div>
            <h2 className="font-display text-display-lg text-surface">Líneas principales</h2>
            <p className="text-steel-300 mt-4">
              Si no ves lo que buscas, envíanos el código, una foto o la descripción.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.subcategorias.map((sub, i) => (
              <Reveal key={sub.id} delay={(i % 3) * 0.05} className="h-full">
                <TiltCard max={3} className="h-full">
                  <div
                    id={sub.id}
                    className="scroll-mt-24 group flex h-full flex-col border border-black/10 bg-carbon p-6
                               hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] transition-shadow duration-300"
                  >
                    <span className="grid h-10 w-10 place-items-center bg-signal-soft text-signal mb-5">
                      <sub.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg text-surface mb-2">{sub.title}</h3>
                    <p className="text-sm text-steel-300 leading-relaxed mb-4">{sub.desc}</p>
                    {sub.ejemplos && (
                      <ul className="flex flex-wrap gap-1.5 mb-5" aria-label={`Ejemplos de ${sub.title}`}>
                        {sub.ejemplos.map((e) => (
                          <li key={e} className="border border-black/10 bg-carbon-800 px-2 py-0.5 text-xs text-steel-300">
                            {e}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto pt-1">
                      {sub.href ? (
                        <Link
                          href={sub.href}
                          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                        >
                          Ver detalle
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <Link
                          href={quoteHref(sub.title, s.name)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                        >
                          {sub.cta ?? "Solicitar cotización"}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APLICACIONES */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow mb-3">02 · Aplicaciones</div>
            <h2 className="font-display text-display-lg text-surface">Dónde se usan</h2>
          </Reveal>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/5 border border-black/5">
            {s.aplicaciones.map((a) => (
              <li key={a} className="flex items-start gap-3 bg-carbon p-5 text-steel-200">
                <Check className="h-4 w-4 text-signal shrink-0 mt-1" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OTRAS LÍNEAS */}
      <section className="py-12 border-b border-black/5">
        <div className="container-max">
          <div className="eyebrow mb-5">Otras soluciones industriales</div>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
            {otras.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/${o.slug}`}
                  className="group flex h-full items-center justify-between gap-3 bg-carbon hover:bg-carbon-800 px-5 py-4 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-surface">
                    <o.icon className="h-4 w-4 text-signal shrink-0" />
                    {o.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-steel-500 group-hover:text-signal transition-colors shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteCTA
        eyebrow={`Soluciones industriales · ${s.name}`}
        title={s.ctaTitle}
        text="Envíanos el código, una foto, la muestra o la descripción y te cotizamos."
        quoteItem={s.name}
        quoteTipo={s.name}
        whatsappHref={whatsappSolucion(s.name)}
      />
    </div>
  );
}
