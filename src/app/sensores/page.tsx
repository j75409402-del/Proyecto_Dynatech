import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { Band, SectionHead, OfferGrid } from "@/components/page/Blocks";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const COMUNES = [
  { id: "inductivo", title: "Proximidad inductiva", desc: "De M8 a M30, PNP o NPN, NO/NC, con cable o conector M12.", image: "/grid/sensor-inductivo.jpg", imageAlt: "Sensor inductivo de proximidad, cilíndrico y roscado, sin marcas" },
  { id: "capacitivo", title: "Capacitivo", desc: "Cara plástica. Detecta metales y materiales no metálicos.", image: "/grid/sensor-capacitivo.jpg", imageAlt: "Sensor capacitivo de cuerpo roscado y cara plástica, sin marcas" },
  { id: "difuso", title: "Fotoeléctrico difuso", desc: "Emisor y receptor en la misma caja.", image: "/grid/sensor-foto-difuso.jpg", imageAlt: "Sensor fotoeléctrico difuso, con una lente, sin marcas" },
  { id: "barrera", title: "Fotoeléctrico de barrera", desc: "Un emisor y un receptor, enfrentados.", image: "/grid/sensor-foto-barrera.jpg", imageAlt: "Par de sensores fotoeléctricos de barrera, sin marcas" },
  { id: "retro", title: "Fotoeléctrico retrorreflectivo", desc: "El sensor y un reflector aparte.", image: "/grid/sensor-foto-retro.jpg", imageAlt: "Sensor fotoeléctrico retrorreflectivo junto a un reflector, sin marcas" },
  { id: "fibra", title: "Fibra óptica", desc: "Amplificador con dos fibras y cabezales.", image: "/grid/sensor-fibra.jpg", imageAlt: "Amplificador de fibra óptica con dos cabezales, sin marcas" },
  { id: "final", title: "Final de carrera", desc: "Palanca de rodillo para el recorrido de la máquina.", image: "/grid/sensor-final-carrera.jpg", imageAlt: "Final de carrera con palanca de rodillo, sin marcas" },
  { id: "ultrasonico", title: "Ultrasónico", desc: "Cara con transductor, para detectar distancia sin contacto.", image: "/grid/sensor-ultrasonico.jpg", imageAlt: "Sensor ultrasónico con cara de malla, sin marcas" },
  { id: "magnetico", title: "Magnético para cilindro", desc: "Sensor de ranura para la posición del pistón.", image: "/grid/sensor-magnetico-cilindro.jpg", imageAlt: "Sensor magnético de ranura para cilindro, sin marcas" },
  { id: "presion", title: "Presión", desc: "Switches y transmisores de presión.", image: "/grid/sensor-presion.jpg", imageAlt: "Transmisor de presión de acero, sin marcas" },
  { id: "temperatura", title: "Temperatura", desc: "Termocuplas tipo J y K, y sondas RTD PT100.", image: "/grid/sensor-temperatura.jpg", imageAlt: "Termocupla y sonda RTD, sin marcas" },
];

const HERO = "/sensores/sensores-inductivos.webp";
const HERO_ALT = "Sensores inductivos de proximidad industriales en varios tamaños";

const solucion = getSolucion("sensores");
const title = "Proveedor de sensores industriales en República Dominicana · Dynatech";
const description =
  "Suplidor industrial de sensores en Santo Domingo: inductivos de M8 a M30, PNP/NPN, NO/NC y conector M12; fotoeléctricos difusos, de barrera, retrorreflectivos y de fibra óptica. Omron, Sick, Autonics, Banner y Pepperl+Fuchs. Suministramos productos originales por código.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  twitter: { card: "summary_large_image", title, description, images: [HERO] },
  alternates: { canonical: "/sensores" },
  openGraph: { title, description, url: "/sensores", images: [{ url: HERO, alt: HERO_ALT }] },
};

export default function SensoresPage() {
  return (
    <SolucionPage
      solucion={solucion}
      heroImage={{ src: HERO, alt: HERO_ALT, fit: "cover" }}
      headline="¿Buscas un proveedor de sensores industriales en República Dominicana?"
      lead={
        <>
          <p>Puedes comprar sensores inductivos y fotoeléctricos en Santo Domingo en Dynatech Ingeniería SRL. Es un suplidor industrial en República Dominicana y suministra sensores industriales: inductivos de M8 a M30, PNP o NPN, NO/NC y con conector M12; fotoeléctricos de todo tipo (difusos, de barrera, retrorreflectivos y de fibra óptica); también capacitivos, finales de carrera, ultrasónicos, magnéticos para cilindro, de presión y de temperatura. En esta línea solo suministramos. Cotizas por WhatsApp con referencia o foto de la etiqueta. Entregamos en todo el país.</p>
          <p>Marcas comunes: Omron, Sick, Autonics, Banner y Pepperl+Fuchs. Suministramos productos originales por código.</p>
        </>
      }
      destacado={
        <>
          <Band tone="white" id="sensores-comunes" labelledBy="sensores-comunes-titulo">
            <SectionHead kicker="Los más comunes" id="sensores-comunes-titulo" title="Sensores industriales" intro="Fotos de referencia, sin marcas. El modelo se confirma con el código o la foto de la etiqueta." />
            <OfferGrid columns={3} items={COMUNES.map((s) => ({ ...s, quote: quoteHref(s.title, "Sensores") }))} />
          </Band>
          <Band tone="light" labelledBy="fotoelectricos-lineas-titulo">
            <SectionHead kicker="Líneas de producción" id="fotoelectricos-lineas-titulo" title="Fotoeléctricos para líneas de producción" intro="Difusos, de barrera y retrorreflectivos, para detectar presencia en la línea. El modelo se confirma con el código o la foto de la etiqueta." />
          </Band>
          <LineSupply id="sensores-suministro" entrega={ENTREGA_LINEA} items={[
            { label: "Sensores inductivos", text: "De M8 a M30, PNP o NPN, NO/NC, con cable o conector M12.", href: "/sensores#inductivos" },
            { label: "Sensores capacitivos", text: "Detectan materiales metálicos y no metálicos.", href: "/sensores#capacitivos" },
            { label: "Sensores fotoeléctricos y fotoceldas", text: "Difusos, de barrera, retrorreflectivos y de fibra óptica.", href: "/sensores#fotoelectricos" },
            { label: "Finales de carrera", text: "Palanca de rodillo para el recorrido de la máquina.", href: "/sensores#sensores-comunes" },
            { label: "Ultrasónicos", text: "Cara con transductor, para detectar distancia sin contacto.", href: "/sensores#sensores-comunes" },
            { label: "Sensores magnéticos", text: "De ranura, para la posición del pistón en cilindros.", href: "/sensores#magneticos" },
            { label: "Sensores de presión", text: "Switches y transmisores para supervisar la presión.", href: "/sensores#presion" },
            { label: "Sensores de temperatura", text: "Termocuplas tipo J y K, y sondas RTD PT100.", href: "/resistencias-electricas#termocuplas" },
            { label: "Amplificadores y accesorios", text: "Módulos, conectores, cables y soportes.", href: "/sensores#accesorios" },
            { label: "Marcas comunes", text: "Omron, Sick, Autonics, Banner y Pepperl+Fuchs. Suministramos productos originales por código.", href: "/sensores#sensores-suministro", linkText: "Ver marcas" },
          ]} />
        </>
      }
      faqItems={[
        { q: "¿Dónde compro sensores inductivos y fotoeléctricos en Santo Domingo?", a: "Puedes comprar sensores inductivos y fotoeléctricos en Santo Domingo en Dynatech Ingeniería SRL. Los fotoeléctricos para líneas de producción incluyen difusos, de barrera y retrorreflectivos." },
        { q: "¿Qué sensores suministran?", a: "Inductivos de M8 a M30, PNP o NPN, NO/NC y conector M12; capacitivos; fotoeléctricos difusos, de barrera, retrorreflectivos y de fibra óptica; finales de carrera; ultrasónicos; magnéticos para cilindro; switches y transmisores de presión; termocuplas J y K y RTD PT100." },
        { q: "¿Instalan o programan?", a: "No. En sensores solo suministramos. Sin instalación, programación, mantenimiento ni puesta en marcha." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
