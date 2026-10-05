import { Box, Cog, Droplets, Factory, FileText, Wrench } from "lucide-react";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid, type RelatedItem } from "@/components/page/Blocks";
import { HydraulicCylinderDrawing, MachinedPartDrawing } from "@/components/page/TechDrawings";
import { Reveal } from "@/components/motion/Reveal";
import { CONTACT, SITE } from "@/lib/constants";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";

type Service = (typeof SERVICIOS_ADICIONALES)[number];

/**
 * Plantilla de servicios complementarios (cilindros hidráulicos, mecanizado). No hay fotos
 * propias de estos trabajos: el visual es un esquema técnico SVG honesto (sin fotos de stock ni
 * 3D), con las cotas que pedimos para cotizar. Sin capacidades, máquinas ni plazos.
 */
export function IndustrialServicePage({ service: s }: { service: Service }) {
  const hidraulico = s.slug === "cilindros-hidraulicos";
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Service",
    name: s.title, serviceType: s.name, description: s.description, url: `${SITE.url}/${s.slug}`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "Country", name: "República Dominicana" },
  };
  const situationIcons = hidraulico ? [Wrench, Factory] : [FileText, Box];
  const related: RelatedItem[] = [
    ...SERVICIOS_ADICIONALES.filter((o) => o.slug !== s.slug).map((o) => ({ href: `/${o.slug}`, title: o.name, desc: o.slug === "mecanizado" ? "Piezas bajo plano o muestra." : "Fabricación y reparación de cilindros hidráulicos.", icon: o.slug === "mecanizado" ? Cog : Droplets, label: `Ver ${o.name.toLowerCase()}` })),
    { href: "/servicios", title: "Reparación de cilindros neumáticos", desc: "Reparación y reconstrucción, con prueba antes de entregar.", image: "/cilindros/despues-cilindro-iso-32mm.jpg", label: "Ver reparación de cilindros" },
    { href: "/sellos-y-componentes", title: "Sellos y componentes", desc: "Kits de sellos, vástagos y componentes bajo medida.", image: "/products/kit-sello-cilindro-neumatico.jpg", label: "Ver sellos y componentes" },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[{ label: "Servicios", href: "/servicios" }, { label: s.name }]}
        kicker="Servicio complementario · Bajo cotización"
        title={s.h1}
        lead={<p>{s.intro}</p>}
        quoteHref={quoteHref(s.name)}
        secondary={{ href: "#datos", label: "Ver qué datos enviar" }}
        note="Envía foto, plano, muestra o medidas. Te confirmamos alcance y condiciones en la cotización."
        visual={hidraulico
          ? <HydraulicCylinderDrawing title="Esquema de un cilindro hidráulico en corte con las medidas que pedimos: diámetro interior, diámetro del vástago, carrera y montajes" />
          : <MachinedPartDrawing title="Esquema de una pieza mecanizada con las medidas que pedimos: largo total, diámetros, rosca y patrón de agujeros" />}
        trust="lineas"
      />

      <Band tone="light" labelledBy="que-cotizamos">
        <SectionHead kicker="01 · Qué cotizamos" id="que-cotizamos" title={`${s.name}: qué podemos evaluar`} intro="Cada solicitud se evalúa antes de confirmar su alcance." />
        <OfferGrid columns={2} compact items={s.situations.map((t, i) => ({ title: t, desc: s.situationDescs[i], icon: situationIcons[i], quote: quoteHref(t, s.name) }))} />
      </Band>

      <div id="datos" className="scroll-mt-28">
        <QuoteChecklist
          kicker="02 · Para cotizar"
          title="Información para tu cotización"
          intro="Comparte la información disponible. Si te falta algún dato, te diremos qué hace falta."
          items={s.information.map((t) => ({ title: t }))}
          quoteHref={quoteHref(s.name)}
          note={`Atención por WhatsApp: ${CONTACT.hours}.`}
        />
      </div>

      <Band tone="white" labelledBy="evaluacion">
        <Reveal className="max-w-3xl">
          <p className="section-kicker">03 · Evaluación</p>
          <h2 id="evaluacion" className="section-title">Evaluamos tu solicitud</h2>
          <p className="mt-6 text-lg leading-relaxed text-steel-300">{s.note}</p>
          <p className="mt-4 leading-relaxed text-steel-300">Indica si solicitas la cotización para mantenimiento, compras o un proyecto de tu empresa. El alcance, plazo y condiciones se confirman al responder tu solicitud.</p>
        </Reveal>
      </Band>

      <RelatedGrid kicker="Relacionado" title="Otros servicios del taller" id="servicio-relacionado" items={related} />

      <QuoteCTA eyebrow={`${s.name} · Bajo cotización`} title={`Solicita tu cotización de ${s.name.toLowerCase()}`} text="Comparte las fotos, plano o descripción disponibles, la cantidad y tu ciudad." quoteItem={s.name} />
    </>
  );
}
