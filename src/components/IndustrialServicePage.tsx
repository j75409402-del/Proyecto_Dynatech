import { ServiceAvailabilityNotice } from "@/components/page/ServiceAvailabilityNotice";
import { Box, Cog, Droplets, Factory, FileText, Ruler, Wrench } from "lucide-react";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { shortHours } from "@/components/page/TrustStrip";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid, type RelatedItem } from "@/components/page/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { TallerGallery } from "@/components/industrial/TallerGallery";
import { CONTACT, SITE } from "@/lib/constants";
import { FaqBlock, landingFaqs, type Faq } from "@/components/page/FaqBlock";
import { ENTREGA, ENTREGA_LINEA } from "@/lib/entrega";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { whatsappService } from "@/lib/whatsapp";

type Service = (typeof SERVICIOS_ADICIONALES)[number];

const HIDRAULICO_FAQS: Faq[] = [
  { q: "¿Es mejor reparar o comprar nuevo un cilindro hidráulico?", a: "Si la camisa y el vástago están sanos o se pueden recuperar, reparar suele convenir. Si la camisa está rayada o deformada, o el vástago no tiene arreglo, conviene cambiarlo. Dynatech hace el diagnóstico y cotiza las dos opciones. También hay cilindros hidráulicos listos." },
  { q: "¿Quién repara cilindros hidráulicos en República Dominicana?", a: `Dynatech Ingeniería SRL, en ${CONTACT.streetAddress}, Santo Domingo, repara, reconstruye y fabrica cilindros hidráulicos a la medida, con prueba de funcionamiento antes de la entrega. También suministra cilindros listos. Entrega en todo el país.` },
  { q: "¿Qué necesito para cotizar la reparación de un cilindro hidráulico?", a: `Foto del cilindro y de la falla, foto de la placa, medidas (camisa, vástago, carrera y montaje) y plano si lo tienes. WhatsApp ${CONTACT.whatsappDisplay}.` },
  { q: "¿Hacen el cambio de sellos de cilindros hidráulicos?", a: "Sí. Cambiamos el kit de sellos según las medidas del cilindro, con prueba de funcionamiento antes de la entrega." },
  { q: "¿Fabrican un cilindro hidráulico si ya no existe el original?", a: "Sí. Lo fabricamos a la medida a partir de un plano, una muestra o las medidas. El vástago se recupera o se fabrica nuevo, según el daño." },
  { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
  { q: "¿Entregan fuera de Santo Domingo?", a: "Sí, entregamos en todo el país." },
];

/**
 * Plantilla de cilindros hidráulicos y mecanizado (prioridad comercial, oct-2026). No hay fotos
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
  // Mecanizado: bloque «Torno y fresadora» antes de plano/muestra (numeración correlativa).
  const procesos = s.procesos;
  const n = (i: number) => String(i + (procesos.length ? 1 : 0)).padStart(2, "0");
  // Hidráulicos: CTA principal sin elegir aún (reparar/fabricar se elige abajo); mecanizado: directo.
  const mainQuote = whatsappService(hidraulico ? "hidraulico" : "mecanizado");
  const heroFoto = hidraulico ? "/taller/torno-pieza-larga-polipasto.jpg" as const : "/taller/torno-eje-fresadora.jpg" as const;
  const related: RelatedItem[] = [
    ...SERVICIOS_ADICIONALES.filter((o) => o.slug !== s.slug).map((o) => ({ href: `/${o.slug}`, title: o.name, desc: o.slug === "mecanizado" ? "Piezas bajo plano o muestra." : "Fabricación y reparación de cilindros hidráulicos.", icon: o.slug === "mecanizado" ? Cog : Droplets, label: `Ver ${o.name.toLowerCase()}` })),
    { href: "/servicios", title: "Reparación de cilindros neumáticos", desc: "Reparación y reconstrucción, con prueba antes de entregar.", image: "/cilindros/despues-cilindro-iso-32mm.jpg", label: "Ver reparación de cilindros" },
    { href: "/sellos-y-componentes", title: "Sellos y componentes", desc: "Kits de sellos, vástagos y componentes bajo medida.", image: "/products/kit-sello-cilindro-neumatico.jpg", label: "Ver sellos y componentes" },
  ];
  return (
    <>
      <ServiceAvailabilityNotice service={hidraulico ? "hydraulic-cylinders" : "machining"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[{ label: "Servicios", href: "/servicios" }, { label: s.name }]}
        kicker={hidraulico ? "Taller · Hidráulica" : "Taller · Mecanizado"}
        title={s.h1}
        lead={<p>{s.intro}</p>}
        quoteHref={mainQuote}
        secondary={{ href: "#datos", label: "Qué enviar" }}
        note={s.lead}
        // Fotos reales del taller (15-oct-2026): las piezas en el torno son cilindros hidráulicos.
        image={{ src: heroFoto, alt: hidraulico ? "Cilindro hidráulico largo montado en el torno del taller de Dynatech, con polipasto" : "Cilindro hidráulico montado en el torno del taller de Dynatech; al fondo, la fresadora", position: hidraulico ? "center 55%" : "center 45%" }}
        caption={{ label: "Foto real · taller Dynatech", text: hidraulico ? "Cilindro hidráulico en proceso" : "Torno y fresadora, en el mismo taller" }}
        trust="lineas"
      />

      {hidraulico && (
        <Band tone="white" labelledBy="reparar-o-cambiar">
          <SectionHead kicker="Taller" id="reparar-o-cambiar" title="¿Reparar o cambiar un cilindro hidráulico?" />
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-steel-300">
            <p><b className="text-surface">Respuesta corta.</b> Conviene reparar cuando la camisa y el vástago están en buen estado o se pueden recuperar. Conviene cambiar cuando la camisa está rayada o deformada, o el vástago está doblado y no tiene arreglo. En Dynatech Ingeniería SRL, en Santo Domingo, reparamos, reconstruimos y fabricamos a la medida. También hay cilindros hidráulicos listos. El vástago se recupera o se fabrica nuevo, según el daño.</p>
            <p><b className="text-surface">En el taller.</b> Diagnóstico del cilindro desarmado, cambio de sellos, vástago recuperado o nuevo, y mecanizado en torno y fresadora cuando hace falta. Prueba de funcionamiento antes de la entrega.</p>
            <p><b className="text-surface">Para cotizar.</b> Foto del cilindro y de la falla, foto de la placa si tiene, medidas de camisa, vástago, carrera y montaje, y plano o muestra si los tienes. WhatsApp {CONTACT.whatsappDisplay}.</p>
            <p>{ENTREGA_LINEA} Entregamos en todo el país.</p>
          </div>
        </Band>
      )}

      {procesos.length > 0 && (
        <Band tone="white" labelledBy="procesos">
          <SectionHead kicker="Qué hacemos" id="procesos" title="Torno y fresadora" intro="Piezas nuevas y repuestos." />
          <OfferGrid columns={3} compact items={procesos.map((p, i) => ({ title: p.title, desc: p.text, icon: [Cog, Box, Ruler][i] ?? Cog }))} />
          <div className="taller-work">
            <div className="taller-work-head">
              <div>
                <p className="section-kicker">Trabajo real</p>
                <h3>En nuestro taller</h3>
              </div>
              <p>Trabajo real de nuestro taller en Santo Domingo.</p>
            </div>
            <TallerGallery omitir={[heroFoto]} />
          </div>
        </Band>
      )}

      <Band tone="light" labelledBy="que-cotizamos">
        <SectionHead kicker={procesos.length ? "Cómo empezar" : "Qué hacemos"} id="que-cotizamos" title={hidraulico ? "Reparar o fabricar" : "Plano o muestra"} />
        <OfferGrid columns={2} compact items={s.situations.map((t, i) => ({ title: t, desc: s.situationDescs[i], icon: situationIcons[i], quote: whatsappService(s.services[i]) }))} />
        {hidraulico && (
          <div className="taller-work">
            <div className="taller-work-head">
              <div>
                <p className="section-kicker">Trabajo real</p>
                <h3>Cilindros hidráulicos en nuestro taller</h3>
              </div>
              <p>Trabajo real de nuestro taller en Santo Domingo.</p>
            </div>
            <TallerGallery omitir={[heroFoto]} />
          </div>
        )}
      </Band>

      <div id="datos" className="scroll-mt-28">
        <QuoteChecklist
          kicker={`${n(2)} · Para cotizar`}
          title="Qué enviar"
          intro="Con lo que tengas basta."
          items={s.information.map((t) => ({ title: t }))}
          quoteHref={mainQuote}
          note={`Atención por WhatsApp: ${shortHours()}.`}
        />
      </div>

      <Band tone="white" labelledBy="evaluacion">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="section-kicker">{n(3)} · La cotización</p>
            <h2 id="evaluacion" className="section-title">En la cotización</h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-lg leading-relaxed text-steel-300">{s.note}</p>
            <p className="mt-4 leading-relaxed text-steel-300">Alcance, plazo y condiciones, por escrito.</p>
          </div>
        </Reveal>
      </Band>

      <FaqBlock items={hidraulico ? HIDRAULICO_FAQS : [...landingFaqs({ name: s.name, datos: s.information, referencePhotos: false, address: CONTACT.address, hours: CONTACT.hours }), { q: "¿Cuánto tarda la entrega?", a: ENTREGA }]} kicker={`${n(4)} · Preguntas frecuentes`} title={`Sobre ${s.name.toLowerCase()}`} tone="light" />

      <RelatedGrid kicker="Relacionado" title="Otros servicios del taller" id="servicio-relacionado" items={related} />

      <QuoteCTA eyebrow="Taller" title={hidraulico ? "Cotiza el cilindro" : "Cotiza la pieza"} text={s.lead} whatsappHref={mainQuote} />
    </>
  );
}
