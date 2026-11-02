import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("instrumentacion");
const title = "Proveedor de instrumentación industrial en República Dominicana · Dynatech";
const description =
  "Suplidor de instrumentación industrial en Santo Domingo: manómetros, transmisores de presión, termómetros y termopozos. Solo suministro.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  twitter: { card: "summary_large_image", title, description, images: [solucion.image] },
  alternates: { canonical: "/instrumentacion" },
  openGraph: { title, description, url: "/instrumentacion", images: [solucion.image] },
};

export default function InstrumentacionPage() {
  return (
    <SolucionPage
      solucion={solucion}
      headline="¿Buscas un proveedor de instrumentación en República Dominicana?"
      lead={<p>Dynatech Ingeniería SRL es un suplidor de instrumentación industrial en Santo Domingo: manómetros, interruptores y transmisores de presión, termómetros y termopozos, para empresas y zonas francas. Las termocuplas tipo J y K y las sondas RTD PT100 están en resistencias eléctricas. En esta línea solo suministramos. Cotizas por WhatsApp con la variable, el rango y una foto o referencia.</p>}
      destacado={<LineSupply id="instrumentacion-suministro" entrega={ENTREGA_LINEA} items={[
        { label: "Presión", text: "Manómetros tipo Bourdon, interruptores y transmisores de presión.", href: "/instrumentacion#presion" },
        { label: "Temperatura", text: "Termómetros, termómetros de bolsillo y termopozos.", href: "/instrumentacion#temperatura" },
        { label: "Termocuplas y RTD", text: "Termocuplas tipo J y K, y sondas RTD PT100.", href: "/resistencias-electricas#termocuplas", linkText: "Ver termocuplas y RTD" },
        { label: "Medición y control", text: "Controladores de temperatura para tablero.", href: "/control-electrico#temporizadores" },
      ]} />}
      faqItems={[
        { q: "¿Qué instrumentación suministran?", a: "Presión y temperatura: manómetros, interruptores y transmisores de presión, termómetros y termopozos. Las termocuplas tipo J y K y las sondas RTD PT100 están en resistencias eléctricas." },
        { q: "¿Tienen termocuplas J/K y RTD PT100?", a: "Sí. Están en la página de resistencias eléctricas: termocuplas tipo J y K, y sondas RTD PT100." },
        { q: "¿Calibran o instalan?", a: "No. En instrumentación solo suministramos. Sin instalación, programación, mantenimiento ni puesta en marcha." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
