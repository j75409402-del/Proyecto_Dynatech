import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { shortHours } from "@/components/page/TrustStrip";
import { Band, SectionHead, QuoteChecklist, RelatedGrid, CheckList } from "@/components/page/Blocks";
import { CatalogBoard } from "@/components/catalog/CatalogBoard";
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

/**
 * Plantilla de línea: hero → familias en grilla (anclas #<subcategoría>) → datos → aplicaciones.
 * Sin SKUs, precios, inventario ni marcas representadas.
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

  const tiles = s.subcategorias.map((sub) => ({
    id: sub.id,
    category: s.slug,
    title: sub.title,
    fact: sub.desc,
    image: sub.image,
    alt: sub.imageAlt,
    quote: sub.href
      ? (neumatica ? whatsappService("componente", sub.title) : quoteHref(sub.title, s.name))
      : (neumatica ? whatsappService("componente", sub.title) : quoteHref(sub.title, s.name)),
    href: sub.href ?? `/${s.slug}#${sub.id}`,
  }));
  const sides = SOLUCIONES.map((o) => ({ id: o.slug, label: o.name, href: `/${o.slug}` }));

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
        secondary={{ href: "#catalogo", label: "Ver catálogo" }}
        note="Código, foto o plano."
        image={{ src: s.image, alt: s.imageAlt }}
        caption={{ label: "Imagen de referencia", text: s.ejemplos.slice(0, 3).join(" · ") }}
        trust="lineas"
      />

      {destacado}

      <Band tone="light" id="catalogo" labelledBy="catalogo-titulo">
        <SectionHead
          kicker="Catálogo de la línea"
          id="catalogo-titulo"
          title="Catálogo"
          intro="Fotos de referencia, no inventario."
        />
        {s.soloSuministro && (
          <p className="scope-note mb-6"><Info className="h-4 w-4 shrink-0" aria-hidden="true" /><span>En esta línea {SOLO_SUMINISTRO}</span></p>
        )}
        <CatalogBoard sides={sides} tiles={tiles} current={s.slug} heading={s.name} />
        <PhotoCredits items={s.subcategorias} />
      </Band>

      <QuoteChecklist
        kicker="Para cotizar"
        title="Qué enviar"
        intro="Con foto o referencia basta."
        items={datos}
        quoteHref={lineQuote}
        note={`Atención por WhatsApp: ${shortHours()}.`}
      />

      <Band tone="white" labelledBy="aplicaciones-titulo">
        <SectionHead kicker="Aplicación" id="aplicaciones-titulo" title="Dónde se usan" intro="Empresas y zonas francas." />
        <CheckList items={s.aplicaciones} />
      </Band>

      <FaqBlock items={faqs} kicker="Preguntas" title={`Sobre ${s.name.toLowerCase()}`} tone="light" />

      <RelatedGrid
        kicker="Otras líneas"
        title="Otras líneas"
        id="otras-lineas"
        items={otras.map((o) => ({ href: `/${o.slug}`, title: o.name, desc: o.short, image: o.image, label: "Ver línea" }))}
      />

      <QuoteCTA
        eyebrow={`Suministro industrial · ${s.name}`}
        title={s.ctaTitle}
        text="Código, foto o muestra."
        quoteItem={s.name}
        quoteTipo={s.name}
        whatsappHref={lineQuote}
      />
    </div>
  );
}
