import type { ReactNode } from "react";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid, CheckList, type OfferItem } from "@/components/page/Blocks";
import { CONTACT, SITE } from "@/lib/constants";
import { SOLUCIONES, DATOS_PARA_COTIZAR, type Solucion } from "@/lib/soluciones";
import { whatsappSolucion } from "@/lib/whatsapp";

type Props = {
  solucion: Solucion;
  /** Bloque opcional entre el hero y el catálogo (ej. cilindros y válvulas en Neumática). */
  destacado?: ReactNode;
};

/** Texto del enlace interno de una subcategoría con página propia (sin la palabra "cotizar"). */
function linkLabel(href: string, title: string) {
  if (href.startsWith("/cilindros-neumaticos")) return "Ver tipos de cilindro";
  if (href.startsWith("/servicios")) return "Ver reparación de cilindros";
  return `Ver ${title.toLowerCase()}`;
}

/**
 * Plantilla de línea industrial (WEB-010): Hero con imagen real → (destacado) → Qué cotizamos
 * (tarjetas con foto) → Qué datos necesitamos → Dónde se usan → Otras líneas → Cierre.
 * Sin SKUs, precios, inventario ni marcas representadas. Las anclas #<subcategoría> se conservan.
 */
export function SolucionPage({ solucion: s, destacado }: Props) {
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

  const items: OfferItem[] = s.subcategorias.map((sub) => ({
    id: sub.id,
    title: sub.title,
    desc: sub.desc,
    icon: sub.icon,
    image: sub.image,
    imageAlt: sub.imageAlt,
    imageFit: sub.imageFit,
    ejemplos: sub.ejemplos,
    ...(sub.href
      ? { link: { href: sub.href, label: linkLabel(sub.href, sub.title) } }
      : { quote: quoteHref(sub.title, s.name) }),
  }));

  const datos = [...(DATOS_PARA_COTIZAR[s.slug] ?? []).map((t) => ({ title: t })), { title: "Cantidad y ciudad de entrega" }];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        crumbs={[{ label: s.name }]}
        kicker={`Línea industrial · ${s.name}`}
        title={s.title}
        lead={<p>{s.description}</p>}
        quoteHref={quoteHref(s.name, s.name)}
        secondary={{ href: "#catalogo", label: "Ver catálogo de la línea" }}
        note="Envía la referencia o una foto de la placa. Te confirmamos disponibilidad y condiciones en la cotización."
        image={{ src: s.image, alt: s.imageAlt }}
        trust="lineas"
      />

      {destacado}

      <Band tone="light" id="catalogo" labelledBy="catalogo-titulo">
        <SectionHead
          kicker="01 · Qué cotizamos"
          id="catalogo-titulo"
          title={<>Catálogo de {s.name.toLowerCase()}</>}
          intro="Si no ves lo que buscas, envíanos el código, una foto o la descripción. Las fotos son de referencia del tipo de componente."
        />
        <nav aria-label={`Subcategorías de ${s.name}`} className="mb-8">
          <ul className="chip-nav">
            {s.subcategorias.map((sub) => (
              <li key={sub.id}><a href={`#${sub.id}`}>{sub.title}</a></li>
            ))}
          </ul>
        </nav>
        <OfferGrid items={items} />
      </Band>

      <QuoteChecklist
        kicker="02 · Para cotizar"
        title="Qué datos necesitamos"
        intro={`Para cotizar ${s.name.toLowerCase()}, comparte los datos que tengas. No hace falta completarlos todos: con una foto legible de la placa o la referencia podemos empezar.`}
        items={datos}
        quoteHref={whatsappSolucion(s.name)}
        note={`Atención por WhatsApp: ${CONTACT.hours}.`}
      />

      <Band tone="white" labelledBy="aplicaciones-titulo">
        <SectionHead kicker="03 · Aplicaciones" id="aplicaciones-titulo" title="Dónde se usan" intro="Atendemos solicitudes de empresas y zonas francas en República Dominicana." />
        <CheckList items={s.aplicaciones} />
      </Band>

      <RelatedGrid
        kicker="Otras líneas"
        title="Más soluciones industriales"
        id="otras-lineas"
        items={otras.map((o) => ({ href: `/${o.slug}`, title: o.name, desc: o.short, image: o.image, label: "Ver catálogo de la línea" }))}
      />

      <QuoteCTA
        eyebrow={`Líneas industriales · ${s.name}`}
        title={s.ctaTitle}
        text="Envíanos el código, una foto, la muestra o la descripción y te cotizamos."
        quoteItem={s.name}
        quoteTipo={s.name}
        whatsappHref={whatsappSolucion(s.name)}
      />
    </div>
  );
}
