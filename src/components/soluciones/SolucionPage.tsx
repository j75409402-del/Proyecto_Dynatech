import type { ReactNode } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { shortHours } from "@/components/page/TrustStrip";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid, CheckList, type OfferItem } from "@/components/page/Blocks";
import { CONTACT, SITE } from "@/lib/constants";
import { FaqBlock, landingFaqs } from "@/components/page/FaqBlock";
import { PhotoCredits } from "@/components/page/PhotoCredits";
import { SOLUCIONES, DATOS_PARA_COTIZAR, GRUPOS_SUMINISTRO, SOLO_SUMINISTRO, type Solucion } from "@/lib/soluciones";
import { whatsappService, whatsappSolucion } from "@/lib/whatsapp";

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
  // Neumática (especialidad): mensaje «busco un componente neumático… código o foto» y medición
  // como componente_neumatico. Las demás líneas mantienen su mensaje por línea.
  const neumatica = s.slug === "neumatica";
  const lineQuote = neumatica ? whatsappService("componente") : whatsappSolucion(s.name);

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
    imageNote: sub.imageNote,
    ejemplos: sub.ejemplos,
    ...(sub.href
      ? { link: { href: sub.href, label: linkLabel(sub.href, sub.title) } }
      : { quote: neumatica ? whatsappService("componente", sub.title) : quoteHref(sub.title, s.name) }),
  }));

  const datos = [...(DATOS_PARA_COTIZAR[s.slug] ?? []).map((t) => ({ title: t })), { title: "Cantidad y ciudad de entrega" }];

  const faqs = landingFaqs({ name: s.name, datos: datos.map((d) => d.title), address: CONTACT.address, hours: CONTACT.hours });

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        crumbs={[{ label: s.name }]}
        kicker={`Suministro industrial · ${GRUPOS_SUMINISTRO.find((g) => g.id === s.grupo)?.title ?? s.name}`}
        title={s.title}
        lead={<p>{s.description}</p>}
        quoteHref={neumatica ? lineQuote : quoteHref(s.name, s.name)}
        secondary={{ href: "#catalogo", label: "Ver catálogo de la línea" }}
        note="Envía el código o una foto de la placa; si no conoces la referencia, una foto de la pieza basta para empezar."
        image={{ src: s.image, alt: s.imageAlt }}
        caption={{ label: "Imagen de referencia", text: s.ejemplos.slice(0, 3).join(" · ") }}
        trust="lineas"
      />

      {destacado}

      <Band tone="light" id="catalogo" labelledBy="catalogo-titulo">
        <SectionHead
          kicker="01 · Qué cotizamos"
          id="catalogo-titulo"
          title={<>Catálogo de {s.name.toLowerCase()}</>}
          intro="Si no ves lo que buscas, envíanos el código, una foto o la descripción. Las fotos son de referencia del tipo de componente, no de inventario."
        />
        {s.soloSuministro && (
          <p className="scope-note mb-6"><Info className="h-4 w-4 shrink-0" aria-hidden="true" /><span>En esta línea {SOLO_SUMINISTRO}</span></p>
        )}
        <nav aria-label={`Subcategorías de ${s.name}`} className="mb-8" data-fab-hide="">
          <ul className="chip-nav">
            {s.subcategorias.map((sub) => (
              <li key={sub.id}>{sub.href ? <Link href={sub.href}>{sub.title}</Link> : <a href={`#${sub.id}`}>{sub.title}</a>}</li>
            ))}
          </ul>
        </nav>
        <OfferGrid items={items} />
        <PhotoCredits items={s.subcategorias} />
      </Band>

      <QuoteChecklist
        kicker="02 · Para cotizar"
        title="Qué datos necesitamos"
        intro={`Para cotizar ${s.name.toLowerCase()}, comparte los datos que tengas. No hace falta completarlos todos: con una foto legible de la placa o la referencia podemos empezar.`}
        items={datos}
        quoteHref={lineQuote}
        note={`Atención por WhatsApp: ${shortHours()}.`}
      />

      <Band tone="white" labelledBy="aplicaciones-titulo">
        <SectionHead kicker="03 · Aplicaciones" id="aplicaciones-titulo" title="Dónde se usan" intro="Atendemos solicitudes de empresas y zonas francas en República Dominicana." />
        <CheckList items={s.aplicaciones} />
      </Band>

      <FaqBlock items={faqs} kicker="04 · Preguntas frecuentes" title={`Sobre ${s.name.toLowerCase()}`} tone="light" />

      <RelatedGrid
        kicker="Otras líneas"
        title="Más suministro industrial"
        id="otras-lineas"
        items={otras.map((o) => ({ href: `/${o.slug}`, title: o.name, desc: o.short, image: o.image, label: "Ver catálogo de la línea" }))}
      />

      <QuoteCTA
        eyebrow={`Suministro industrial · ${s.name}`}
        title={s.ctaTitle}
        text="Envíanos el código, una foto, la muestra o la descripción y te cotizamos."
        quoteItem={s.name}
        quoteTipo={s.name}
        whatsappHref={lineQuote}
      />
    </div>
  );
}
