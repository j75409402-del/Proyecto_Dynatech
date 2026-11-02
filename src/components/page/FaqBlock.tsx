import { AccordionItem } from "@/components/ui/Accordion";
import { Band, SectionHead } from "@/components/page/Blocks";

export type Faq = { q: string; a: string };

/**
 * Preguntas frecuentes (WEB-020) con su JSON-LD FAQPage. Solo respuestas con datos verificables
 * del sitio (constants.ts, decisiones del Capitán); nada de plazos, garantías ni cifras sin confirmar.
 */
export function FaqBlock({ items, kicker = "Preguntas frecuentes", title = "Antes de escribirnos", id = "preguntas", tone = "white" }: { items: Faq[]; kicker?: string; title?: string; id?: string; tone?: "white" | "light" | "dark" }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <Band tone={tone} id={id} labelledBy={`${id}-titulo`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="faq-layout">
        <SectionHead kicker={kicker} id={`${id}-titulo`} title={title} />
        <div className="faq-list">
          {items.map((f, i) => (
            <AccordionItem key={f.q} question={f.q} defaultOpen={i === 0}>
              {f.a}
            </AccordionItem>
          ))}
        </div>
      </div>
    </Band>
  );
}

/** FAQ común de las landings: solo hechos del sitio (constants.ts) y del flujo de cotización. */
export function landingFaqs({ name, datos, referencePhotos = true, address, hours }: { name: string; datos: readonly string[]; referencePhotos?: boolean; address: string; hours: string }): Faq[] {
  return [
    { q: `¿Cómo cotizo ${name.toLowerCase()}?`, a: "Por WhatsApp. Adjunta foto, código o plano." },
    { q: "¿Qué datos?", a: `${datos.join("; ")}. Con foto o referencia basta.` },
    { q: "¿Zonas francas?", a: "Sí. Empresas y zonas francas." },
    ...(referencePhotos ? [{ q: "¿Las fotos son inventario?", a: "No. Son referencia. El plazo va en la cotización." }] : []),
    { q: "¿Dónde están y en qué horario atienden?", a: `En ${address}. Horario: ${hours.replace(/ · /g, " ")}.` },
  ];
}
