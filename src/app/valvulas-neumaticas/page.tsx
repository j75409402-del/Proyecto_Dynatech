import type { Metadata } from "next";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { shortHours } from "@/components/page/TrustStrip";
import { Band, SectionHead, OfferGrid, QuoteChecklist, RelatedGrid } from "@/components/page/Blocks";
import { SITE } from "@/lib/constants";
import { FaqBlock } from "@/components/page/FaqBlock";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";
import { whatsappService } from "@/lib/whatsapp";

const neumatica = getSolucion("neumatica");
const sub = neumatica.subcategorias.find((item) => item.id === "valvulas")!;
const title = "Suplidor de electroválvulas en República Dominicana · Dynatech";
const description = "Suplidor de válvulas neumáticas y electroválvulas en Santo Domingo: 3/2, 5/2 y 5/3. Bobinas de 24 VDC y 110 VAC. Originales Festo y SMC por código.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/valvulas-neumaticas" },
  openGraph: { title, description, url: "/valvulas-neumaticas", images: [sub.image!] },
  twitter: { card: "summary_large_image", title, description, images: [sub.image!] },
};

const information = [
  { title: "Referencia y fotografías", text: "El código completo y una foto legible de la etiqueta. Añade una imagen de la válvula y sus conexiones; si tiene un símbolo de funcionamiento, inclúyelo." },
  { title: "Configuración y accionamiento", text: "La configuración conocida (3/2, 5/2 o 5/3) y cómo se acciona en tu máquina. Si no tienes ese dato, el código o las fotos bastan para revisar la solicitud." },
  { title: "Conexiones y montaje", text: "Medidas de conexión y tipo de rosca, si están documentados. Indica si va montada sola o en un conjunto y envía fotos del montaje." },
  { title: "Datos eléctricos y de operación", text: "Si tiene bobina, su etiqueta. Trabajamos bobinas de 24 VDC y 110 VAC. Añade qué función cumple la válvula en el equipo." },
  { title: "Cantidad y ciudad de entrega" },
];

const TIPOS = [
  { id: "direccionales", title: "Válvulas direccionales", desc: "Controlan el paso y la dirección del aire hacia cilindros y actuadores.", ejemplos: ["2/2", "3/2", "5/2", "5/3"], image: "/products/valvulas-smc.jpg", imageAlt: "Válvulas neumáticas direccionales de distintas configuraciones" },
  { id: "solenoides", title: "Electroválvulas y bobinas", desc: "Válvulas de accionamiento eléctrico. Bobinas de 24 VDC y 110 VAC. Comparte la etiqueta de la bobina.", image: "/products/bobinas-smc.jpg", imageAlt: "Bobinas para electroválvulas neumáticas" },
  { id: "conjuntos", title: "Válvulas en conjunto", desc: "Válvulas montadas sobre una base común. Indica cuántas posiciones tiene y envía fotos del montaje.", image: "/products/manifold-smc.jpg", imageAlt: "Conjunto de válvulas neumáticas sobre base común" },
  { id: "descarga-y-cheque", title: "Descarga rápida y cheque", desc: "Indica su función en el circuito y comparte fotos de las conexiones.", ejemplos: ["Descarga rápida", "Cheque"], image: "/products/valvulas-mac.jpg", imageAlt: "Válvulas neumáticas de distintos tipos y conexiones" },
];

export default function ValvulasNeumaticasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Suministro de válvulas neumáticas bajo cotización",
    description,
    url: `${SITE.url}/valvulas-neumaticas`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: "República Dominicana",
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ label: "Neumática", href: "/neumatica" }, { label: "Válvulas neumáticas" }]}
        kicker="Neumática industrial · Válvulas"
        title="Suplidor de válvulas neumáticas y electroválvulas"
        lead={<p>Dynatech Ingeniería SRL es un suplidor de válvulas neumáticas y electroválvulas en República Dominicana: 3/2, 5/2 y 5/3, con bobinas de 24 VDC y 110 VAC, para empresas y zonas francas. También piezas originales Festo y SMC por código. Cotizas por WhatsApp con el código o una foto.</p>}
        quoteHref={whatsappService("componente", sub.title)}
        secondary={{ href: "#tipos", label: "Ver catálogo de la línea" }}
        note="Envía el código o una foto de la etiqueta. Si no lo tienes, una foto de la válvula y sus conexiones basta para empezar."
        image={{ src: sub.image!, alt: sub.imageAlt ?? sub.title, fit: "contain" }}
        trust="lineas"
      />

      <Band tone="light" id="tipos" labelledBy="tipos-titulo">
        <SectionHead
          kicker="01 · Qué cotizamos"
          id="tipos-titulo"
          title="Configuraciones y tipos"
          intro="Para un reemplazo, comparte la referencia del componente existente: la apariencia por sí sola no confirma que dos válvulas sean compatibles."
        />
        <OfferGrid columns={4} items={TIPOS.map((t) => ({ ...t, quote: whatsappService("componente", t.title) }))} />
      </Band>

      <QuoteChecklist
        kicker="02 · Para cotizar"
        title="Qué enviar para cotizar una válvula"
        intro="Envía los datos que tengas. No es necesario completar los que desconoces."
        items={information}
        quoteHref={whatsappService("componente", sub.title)}
        note={`Atención por WhatsApp: ${shortHours()}.`}
      />

      <FaqBlock items={[
        { q: "¿Dynatech es suplidor de electroválvulas en RD?", a: "Sí. Somos suplidor de electroválvulas y válvulas neumáticas 3/2, 5/2 y 5/3, con bobinas de 24 VDC y 110 VAC, bajo cotización desde Santo Domingo." },
        { q: "¿Consiguen válvulas originales Festo o SMC?", a: "Sí. Cotizamos la pieza original por código. Si no está disponible, ofrecemos otra marca de primera calidad." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
        { q: "¿Instalan o programan?", a: "No. En neumática solo suministramos." },
      ]} kicker="Preguntas frecuentes" title="Sobre válvulas neumáticas" tone="light" />

      <RelatedGrid
        kicker="Tu sistema neumático"
        title="Componentes relacionados"
        id="valvulas-relacionado"
        items={[
          { href: "/cilindros-neumaticos", title: "Cilindros neumáticos", desc: "Tipos de cilindro y fabricación a la medida.", image: "/products/cilindros-neumaticos.jpg", label: "Ver tipos de cilindro" },
          { href: "/neumatica#conexiones", title: "Conexiones y conectores", desc: "Conectores, codos, tés y reguladores de flujo.", image: "/products/fittings-neumaticos.jpg", label: "Ver conexiones" },
          { href: "/neumatica#frl", title: "Unidades FRL y reguladores", desc: "Preparación del aire comprimido.", image: "/products/unidades-frl-smc.jpg", label: "Ver unidades FRL" },
          { href: "/neumatica#accesorios", title: "Accesorios neumáticos", desc: "Actuadores, amortiguadores, generadores de vacío y más.", image: "/products/accesorios-neumaticos-todos.jpg", label: "Ver accesorios" },
        ]}
      />

      <QuoteCTA eyebrow="Válvulas neumáticas · República Dominicana" title="Envía la referencia de la válvula que necesitas" text="Comparte el código, fotos y los datos que tengas de la aplicación. Te respondemos con disponibilidad y condiciones en la cotización." whatsappHref={whatsappService("componente", sub.title)} />
    </div>
  );
}
