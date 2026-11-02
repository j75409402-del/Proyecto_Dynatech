import type { Metadata } from "next";
import { Boxes, PanelTop, Rows3 } from "lucide-react";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { shortHours } from "@/components/page/TrustStrip";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid } from "@/components/page/Blocks";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";
import { CONTACT, SITE } from "@/lib/constants";
import { ENTREGA_LINEA } from "@/lib/entrega";

const TITLE = "Breakers e interruptores industriales en Santo Domingo";
const DESCRIPTION =
  "Suplidor industrial en Santo Domingo: breakers de riel DIN, caja moldeada (MCCB) y panel, en cualquier número de polos y amperaje. Schneider Electric, ABB, Siemens y Eaton. Suministramos productos originales por código.";

const QUOTE = quoteHref("Breakers", "Control eléctrico");

const MARCAS = ["Schneider Electric", "ABB", "Siemens", "Eaton"] as const;

const TIPOS = [
  { id: "riel-din", title: "Riel DIN", desc: "Breakers termomagnéticos para riel DIN. Lo más común es 1, 2 y 3 polos, y también cualquier otro número de polos y amperaje.", icon: Rows3 },
  { id: "mccb", title: "Caja moldeada (MCCB)", desc: "Breakers de caja moldeada para tableros de distribución y principales, en cualquier número de polos y amperaje.", icon: Boxes },
  { id: "panel", title: "Panel", desc: "Breakers tipo panel, en cualquier número de polos y amperaje.", icon: PanelTop },
];

const FAQS: Faq[] = [
  { q: "¿Dónde comprar breakers industriales en Santo Domingo?", a: `En Dynatech Ingeniería SRL, ${CONTACT.streetAddress}, Santo Domingo. Bajo cotización por código, plano o foto por WhatsApp ${CONTACT.whatsappDisplay}.` },
  { q: "¿Venden breakers de caja moldeada para tableros industriales?", a: "Sí. Riel DIN, caja moldeada (MCCB) y panel, en cualquier número de polos y amperaje, bajo cotización. Indica amperaje, polos, tensión y kA." },
  { q: "¿Puedo cotizar un breaker solo con una foto?", a: "Sí. Con la foto de la etiqueta cotizamos el mismo modelo o un equivalente." },
  { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
  { q: "¿Entregan fuera de Santo Domingo?", a: "Sí, entregamos en todo el país." },
  { q: "¿Instalan breakers o arman tableros?", a: "No. En esta línea solo suministramos." },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/breakers" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/breakers" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function BreakersPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/breakers`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: "República Dominicana",
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ label: "Control eléctrico", href: "/control-electrico" }, { label: "Breakers" }]}
        kicker="Suministro industrial · Control eléctrico"
        title={TITLE}
        lead={
          <>
            <p>Dynatech Ingeniería SRL es un suplidor industrial en República Dominicana. En Santo Domingo suministra breakers e interruptores industriales para tableros, máquinas y plantas: de riel DIN, de caja moldeada (MCCB) y de panel, en cualquier número de polos y amperaje. Cotizas por WhatsApp con amperaje, polos, tensión y kA, o con una foto de la etiqueta. Entregamos en todo el país.</p>
            <p>Marcas comunes: {MARCAS.join(", ")}. Suministramos productos originales por código.</p>
          </>
        }
        quoteHref={QUOTE}
        secondary={{ href: "#tipos", label: "Ver tipos" }}
        note={`WhatsApp ${CONTACT.whatsappDisplay}. En esta línea solo suministramos.`}
        visual={
          <div className="flex h-full flex-col justify-center gap-5 bg-white p-8 text-surface">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-steel-300">Marcas comunes</p>
            <ul className="grid gap-3 text-lg font-semibold">
              {MARCAS.map((marca) => <li key={marca}>{marca}</li>)}
            </ul>
            <p className="text-base leading-relaxed text-steel-300">Suministramos productos originales por código.</p>
          </div>
        }
        trust="lineas"
      />

      <Band tone="white" id="tipos" labelledBy="breakers-tipos">
        <SectionHead kicker="Suministro" id="breakers-tipos" title="Qué suministramos" intro="Los tres tipos, en cualquier número de polos y amperaje." />
        <OfferGrid columns={3} items={TIPOS.map((t) => ({ ...t, noMedia: true, quote: QUOTE }))} />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">{ENTREGA_LINEA} Entregamos en todo el país.</p>
      </Band>

      <Band tone="light" labelledBy="breakers-marcas">
        <SectionHead kicker="Por código" id="breakers-marcas" title="Marcas comunes" />
        <ul className="mt-8 grid gap-3 text-base font-semibold text-surface sm:grid-cols-2">
          {MARCAS.map((marca) => <li key={marca}>{marca}</li>)}
        </ul>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">Suministramos productos originales por código.</p>
      </Band>

      <QuoteChecklist
        kicker="Para cotizar"
        title="Qué enviar"
        intro="Con la foto de la etiqueta basta. Si los conoces, estos datos afinan la cotización."
        items={[
          { title: "Foto o código", text: "Foto de la etiqueta, el código o un plano." },
          { title: "Amperaje", text: "La corriente nominal del breaker." },
          { title: "Número de polos" },
          { title: "Tensión" },
          { title: "Capacidad interruptiva (kA)" },
          { title: "Tipo de montaje", text: "Riel DIN, caja moldeada o panel." },
          { title: "Cantidad y ciudad de entrega" },
        ]}
        quoteHref={QUOTE}
        note={`WhatsApp ${CONTACT.whatsappDisplay}. Atención: ${shortHours()}.`}
      />

      <FaqBlock items={FAQS} kicker="Preguntas" title="Sobre breakers" tone="light" />

      <RelatedGrid
        kicker="La línea"
        title="Control eléctrico"
        id="breakers-relacionado"
        items={[{ href: "/control-electrico", title: "Control eléctrico", desc: "Contactores, relés, fusibles, pulsadores y más. También breakers.", icon: Boxes, label: "Ver control eléctrico" }]}
      />

      <QuoteCTA
        eyebrow="Breakers · Santo Domingo"
        title="Cotiza el breaker con una foto"
        text={`Amperaje, polos, tensión y kA, o la foto de la etiqueta. WhatsApp ${CONTACT.whatsappDisplay}. Entregamos en todo el país.`}
        ctaLabel="Cotizar por WhatsApp"
        whatsappHref={QUOTE}
      />
    </div>
  );
}
