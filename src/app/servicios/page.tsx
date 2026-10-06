import type { Metadata } from "next";
import { commercialMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { shortHours } from "@/components/page/TrustStrip";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid, Steps } from "@/components/page/Blocks";
import { BeforeAfterSlider } from "@/components/industrial/BeforeAfterSlider";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import { ArrowUpRight, Cog, Droplets } from "lucide-react";
import { SERVICIOS } from "@/lib/servicios";
import { whatsappCylinderService } from "@/lib/whatsapp";

const DESCRIPTION = "Reparación y reconstrucción de cilindros neumáticos en RD: cambio de sellos, vástagos y componentes, con prueba de funcionamiento antes de entregar.";

/**
 * /servicios = REPARACIÓN y reconstrucción de cilindros neumáticos (mapa de intención WEB-010).
 * La fabricación a la medida vive en /cilindros-neumaticos: aquí solo se enlaza.
 * Se conservan las anclas #fabricacion, #reparacion, #reconstruccion, #bajo-muestra-o-plano,
 * #cambio-de-sellos, #personalizados y #preguntas-frecuentes (destino de /faq).
 */
export const metadata: Metadata = {
  ...commercialMetadata("Reparación de cilindros neumáticos en RD", DESCRIPTION, "/servicios"),
  title: "Reparación y fabricación de cilindros neumáticos en RD",
  description: DESCRIPTION,
  keywords: [
    "reparación de cilindros neumáticos",
    "reconstrucción de cilindros neumáticos",
    "cambio de sellos",
    "cilindros neumáticos en República Dominicana",
  ],
  alternates: { canonical: "/servicios" },
};

const FAQS = [
  {
    q: "¿Cuánto tiempo toma reparar un cilindro neumático?",
    a: "Depende de la disponibilidad de repuestos y la complejidad del daño. Tras la inspección técnica te damos un tiempo estimado junto con la cotización.",
  },
  {
    q: "¿Reparan cilindros que ya no se fabrican o son muy antiguos?",
    a: "Sí. Cuando no hay repuesto original disponible, fabricamos el componente (vástago, camisa, tapa o pistón) bajo medida a partir del cilindro original o de un plano.",
  },
  {
    q: "¿Puedo mandar solo el plano sin el cilindro físico?",
    a: "Sí, hacemos fabricación bajo plano. Envíanos las especificaciones técnicas y te cotizamos la fabricación completa.",
  },
  {
    q: "¿Qué incluye el cambio de sellos?",
    a: "Desarme completo del cilindro, reemplazo de sellos por repuesto de calidad, limpieza y prueba de funcionamiento antes de la entrega.",
  },
  {
    q: "¿Trabajan con todos los cilindros neumáticos industriales?",
    a: "Reparamos y fabricamos componentes compatibles con cilindros neumáticos industriales estándar, sin importar el fabricante de origen.",
  },
  {
    q: "¿Hacen envíos fuera de Santo Domingo?",
    a: "Sí, coordinamos envíos a todo el territorio nacional. El costo y tiempo de envío se confirman junto con tu cotización según el destino y volumen del pedido.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Trabajamos con transferencia bancaria. Los detalles se confirman al formalizar cada cotización.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Fabricación, reparación y reconstrucción de cilindros neumáticos",
  provider: { "@id": `${SITE.url}/#business` },
  areaServed: "República Dominicana",
  description: SITE.description,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const REPARACION_IDS = ["reparacion", "reconstruccion", "cambio-de-sellos"];
const FABRICACION_IDS = ["fabricacion", "bajo-muestra-o-plano", "personalizados"];
const REPARACION_MEDIA: Record<string, { image: string; imageAlt: string; imageFit?: "cover" | "contain"; imageNote?: string }> = {
  reparacion: { image: "/cilindros/taller-reparando.jpg", imageAlt: "Imagen de referencia: técnico reparando un cilindro neumático", imageFit: "cover", imageNote: "Imagen de referencia" },
  reconstruccion: { image: "/banners/cilindros-taller-wide.webp", imageAlt: "Imagen de referencia: cilindro neumático con sus componentes sobre el banco", imageFit: "cover", imageNote: "Imagen de referencia" },
  "cambio-de-sellos": { image: "/products/kits-sello-smc.jpg", imageAlt: "Imagen de catálogo: kits de sellos de reemplazo para cilindros neumáticos", imageNote: "Imagen de catálogo" },
};

const PROCESO = [
  { title: "Fotos y datos", text: "Compartes fotos del cilindro, su placa y la falla por WhatsApp." },
  { title: "Diagnóstico", text: "Desarmamos y revisamos camisa, pistón, vástago, tapas y sellos." },
  { title: "Reemplazo", text: "Cambiamos lo dañado. Si no hay repuesto original, fabricamos el componente bajo medida." },
  { title: "Ensamblaje y prueba", text: "Ensamblamos y probamos el funcionamiento antes de entregar." },
];

export default function ServiciosPage() {
  const reparacion = SERVICIOS.filter((s) => REPARACION_IDS.includes(s.id));
  const fabricacion = SERVICIOS.filter((s) => FABRICACION_IDS.includes(s.id));
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        crumbs={[{ label: "Servicios" }]}
        kicker="Taller · Reparación de cilindros"
        title={<>Reparación y reconstrucción de <span className="text-signal">cilindros neumáticos</span></>}
        lead={<p>Recuperamos cilindros con fugas, desgaste o golpes: cambio de sellos, vástagos y componentes, incluso cuando el repuesto original ya no está disponible.</p>}
        quoteHref={whatsappCylinderService()}
        secondary={{ href: "#proceso", label: "Ver el proceso" }}
        note="Desarmamos, cambiamos lo dañado y probamos el cilindro antes de entregarlo."
        image={{ src: "/cilindros/taller-portada-v2.webp", alt: "Imagen de referencia: técnico revisando un cilindro neumático en el banco" }}
        caption={{ label: "Imagen de referencia", text: "Reparación · Reconstrucción · Sellos" }}
        trust="cilindros"
      />

      <Band tone="white" id="proceso" labelledBy="proceso-titulo">
        <SectionHead kicker="01 · Cómo reparamos" id="proceso-titulo" title="Del diagnóstico a la prueba" intro="El alcance de cada reparación se confirma después de revisar el cilindro. Las fotos ayudan a orientar, pero no sustituyen la inspección." />
        <Steps items={PROCESO} />
      </Band>

      <Band tone="light" labelledBy="servicios-titulo">
        <SectionHead kicker="02 · Qué hacemos" id="servicios-titulo" title="Reparación, reconstrucción y sellos" />
        <OfferGrid
          items={reparacion.map((s) => ({ id: s.id, title: s.title, desc: s.desc, icon: s.icon, ...REPARACION_MEDIA[s.id], quote: quoteHref(s.title) }))}
        />
        <Reveal className="fab-aside">
          <div>
            <p className="section-kicker">¿Necesitas uno nuevo?</p>
            <p className="fab-aside-text">La fabricación de cilindros a la medida, bajo plano o muestra, tiene su propia página.</p>
          </div>
          <ul>
            {fabricacion.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28">
                <Link href="/cilindros-neumaticos" className="group">
                  <s.icon className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                  <span>{s.title}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Band>

      <Band tone="white" labelledBy="antes-despues-servicios">
        <SectionHead kicker="03 · Trabajo de taller" id="antes-despues-servicios" title="Antes y después" intro="Cilindro ISO 32 mm recuperado en nuestro taller. Desliza para comparar." />
        <Reveal>
          <BeforeAfterSlider
            before={{ src: "/cilindros/antes-cilindro-iso-32mm.jpg", alt: "Antes · Cilindro ISO 32 mm" }}
            after={{ src: "/cilindros/despues-cilindro-iso-32mm.jpg", alt: "Después · Cilindro ISO 32 mm recuperado" }}
          />
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-steel-300">Una reconstrucción incluye desarme, reemplazo de los componentes dañados, ensamblaje y prueba de funcionamiento antes de entregar.</p>
        </Reveal>
      </Band>

      <QuoteChecklist
        kicker="04 · Para cotizar"
        title="Qué enviar para cotizar una reparación"
        intro="Con fotos del cilindro y su placa podemos empezar. Añade lo que tengas:"
        items={[
          { title: "Fotos del cilindro completo y de su placa" },
          { title: "Qué falla", text: "Fuga de aire, vástago rayado o doblado, golpe, no avanza o no retrocede." },
          { title: "Diámetro x carrera", text: "En mm o pulgadas, si los conoces." },
          { title: "Marca, modelo o código", text: "Si la placa es legible." },
          { title: "Cantidad y ciudad de entrega" },
        ]}
        quoteHref={whatsappCylinderService()}
        note={`Atención por WhatsApp: ${shortHours()}.`}
      />

      {/* FAQ (destino de /faq → /servicios#preguntas-frecuentes) */}
      <Band tone="white" id="preguntas-frecuentes" labelledBy="faq-titulo">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-kicker">05 · Preguntas frecuentes</p>
            <h2 id="faq-titulo" className="section-title">Preguntas frecuentes</h2>
          </div>
          <div className="lg:col-span-8">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} question={faq.q} defaultOpen={i === 0}>
                {faq.a}
              </AccordionItem>
            ))}
          </div>
        </div>
      </Band>

      <RelatedGrid
        kicker="Relacionado"
        title="Más sobre cilindros"
        id="cilindros-relacionado"
        items={[
          { href: "/cilindros-neumaticos", title: "Cilindros neumáticos a la medida", desc: "Tipos de cilindro y fabricación bajo plano, muestra o medidas.", image: "/products/cilindros-neumaticos.jpg", label: "Ver tipos de cilindro" },
          { href: "/sellos-y-componentes", title: "Sellos y componentes", desc: "Kits de sellos, vástagos y piezas para tu cilindro.", image: "/products/kit-sello-cilindro-neumatico.jpg", label: "Ver sellos y componentes" },
          { href: "/cilindros-hidraulicos", title: "Cilindros hidráulicos", desc: "Fabricación y reparación de cilindros hidráulicos.", icon: Droplets, label: "Ver cilindros hidráulicos" },
          { href: "/mecanizado", title: "Mecanizado", desc: "Piezas bajo plano o muestra.", icon: Cog, label: "Ver mecanizado" },
        ]}
      />

      <QuoteCTA
        eyebrow="Reparación · Reconstrucción · Cambio de sellos"
        title="¿Tu cilindro tiene fugas o dejó de funcionar?"
        text="Envía fotos del cilindro y su placa por WhatsApp. Te confirmamos alcance y condiciones en la cotización."
        quoteItem="Reparación de cilindros neumáticos"
      />
    </div>
  );
}
