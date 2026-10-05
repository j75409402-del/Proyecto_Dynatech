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
import { SOLUCIONES, DATOS_PARA_COTIZAR, type Solucion } from "@/lib/soluciones";
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
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: "República Dominicana",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s.title,
      itemListElement: s.subcategorias.map((sub) => ({
        "@type": "OfferCatalog",
        name: sub.title,
        url: `${SITE.url}${sub.href ?? `/${s.slug}#${sub.id}`}`,
      })),
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="border-b border-black/5">
        <div className="container-max pt-7 sm:pt-9">
          <Breadcrumbs items={[{ label: s.name }]} />
        </div>
        <div className="overflow-hidden bg-[#F4F5F6] text-surface">
          <div className="container-max grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
            <div className="lg:col-span-6">
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-steel-400">
                Soluciones industriales · {String(index).padStart(2, "0")}
              </div>
              <h1 className="mb-6 font-display text-display-xl text-surface">{s.title}</h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-steel-300 sm:text-xl">{s.description}</p>
              <div className="flex flex-wrap gap-3">
                <a href={quoteHref(s.name, s.name)} target="_blank" rel="noopener" className="btn-primary">
                  Cotizar por WhatsApp
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-techno text-steel-400">
                  Bajo cotización · Disponibilidad confirmada al responder
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] border border-black/10 bg-white">
                <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal z-10" />
                <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal z-10" />
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {destacado}

      <nav className="container-max py-7" aria-label={`Subcategorías de ${s.name}`}>
        <p className="eyebrow mb-4">Busca tu componente</p>
        <ul className="flex flex-wrap gap-2">
          {s.subcategorias.map((sub) => (
            <li key={sub.id}>
              <Link href={sub.href ?? `#${sub.id}`} className="inline-flex border border-black/15 px-3 py-2 text-sm text-surface hover:border-signal hover:text-signal">
                {sub.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>


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
                    {sub.image && (
                      <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden border-b border-black/10 bg-white">
                        <Image
                          src={sub.image}
                          alt={sub.imageAlt ?? sub.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-3"
                        />
                      </div>
                    )}
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
                        <a
                          href={quoteHref(sub.title, s.name)}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                        >
                          {sub.cta ?? "Solicitar cotización"}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
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

      <section className="container-max py-12">
        <h2 className="font-display text-display-lg mb-4">Cotiza para tu empresa o zona franca</h2>
        <p className="text-steel-300 leading-relaxed mb-4">Atendemos solicitudes industriales en República Dominicana. Para cotizar {s.name.toLowerCase()}, comparte los datos disponibles de tu componente:</p>
        <ul className="list-disc pl-5 space-y-2 text-steel-300 mb-5">{DATOS_PARA_COTIZAR[s.slug]?.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="text-steel-300 mb-6">Indica también cantidad y ciudad. La disponibilidad y condiciones se confirman al responder.</p>
        <a href={quoteHref(s.name, s.name)} target="_blank" rel="noopener" className="btn-primary">Enviar solicitud por WhatsApp</a>
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
