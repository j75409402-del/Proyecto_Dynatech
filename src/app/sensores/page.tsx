import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("sensores");
const title = "Proveedor de sensores industriales en República Dominicana · Dynatech";
const description =
  "Suplidor industrial de sensores en Santo Domingo: inductivos de M8 a M30, PNP/NPN, NO/NC y conector M12; fotoeléctricos difusos, de barrera, retrorreflectivos y de fibra óptica. Omron, Sick, Autonics, Banner y Pepperl+Fuchs. Suministramos productos originales por código.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  twitter: { card: "summary_large_image", title, description, images: [solucion.image] },
  alternates: { canonical: "/sensores" },
  openGraph: { title, description, url: "/sensores", images: [solucion.image] },
};

export default function SensoresPage() {
  return (
    <SolucionPage
      solucion={solucion}
      headline="¿Buscas un proveedor de sensores industriales en República Dominicana?"
      lead={
        <>
          <p>Dynatech Ingeniería SRL es un suplidor industrial en República Dominicana. Suministra sensores industriales en Santo Domingo: inductivos de M8 a M30, PNP o NPN, NO/NC y con conector M12; fotoeléctricos de todo tipo (difusos, de barrera, retrorreflectivos y de fibra óptica); también capacitivos, magnéticos, de presión y de temperatura. En esta línea solo suministramos. Cotizas por WhatsApp con referencia o foto de la etiqueta. Entregamos en todo el país.</p>
          <p>Marcas comunes: Omron, Sick, Autonics, Banner y Pepperl+Fuchs. Suministramos productos originales por código.</p>
        </>
      }
      destacado={<LineSupply id="sensores-suministro" entrega={ENTREGA_LINEA} items={[
        { label: "Sensores inductivos", text: "De M8 a M30, PNP o NPN, NO/NC, con cable o conector M12.", href: "/sensores#inductivos" },
        { label: "Sensores capacitivos", text: "Detectan materiales metálicos y no metálicos.", href: "/sensores#capacitivos" },
        { label: "Sensores fotoeléctricos y fotoceldas", text: "De todo tipo: difusos, de barrera, retrorreflectivos y de fibra óptica.", href: "/sensores#fotoelectricos" },
        { label: "Sensores magnéticos", text: "Detectan la posición del pistón en cilindros y actuadores.", href: "/sensores#magneticos" },
        { label: "Sensores de presión", text: "Switches y transmisores para supervisar la presión.", href: "/sensores#presion" },
        { label: "Sensores de temperatura", text: "Termocuplas tipo J y K, y sondas RTD PT100.", href: "/resistencias-electricas#termocuplas" },
        { label: "Amplificadores y accesorios", text: "Módulos, conectores, cables y soportes.", href: "/sensores#accesorios" },
        { label: "Marcas comunes", text: "Omron, Sick, Autonics, Banner y Pepperl+Fuchs. Suministramos productos originales por código.", href: "/sensores#sensores-suministro", linkText: "Ver marcas" },
      ]} />}
      faqItems={[
        { q: "¿Qué sensores suministran?", a: "Inductivos de M8 a M30, PNP o NPN, NO/NC y conector M12; fotoeléctricos difusos, de barrera, retrorreflectivos y de fibra óptica; también capacitivos, magnéticos, de presión y de temperatura." },
        { q: "¿Instalan o programan?", a: "No. En sensores solo suministramos. Sin instalación, programación, mantenimiento ni puesta en marcha." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
