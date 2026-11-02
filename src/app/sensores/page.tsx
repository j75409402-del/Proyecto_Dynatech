import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("sensores");
const title = "Proveedor de sensores industriales en República Dominicana · Dynatech";
const description =
  "Suplidor de sensores industriales en Santo Domingo: inductivos, capacitivos, fotoeléctricos, magnéticos y de presión. Solo suministro.";

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
      lead={<p>Dynatech Ingeniería SRL es un suplidor de sensores industriales en Santo Domingo: inductivos, capacitivos, fotoeléctricos y fotoceldas, magnéticos, de presión y de temperatura, para empresas y zonas francas. En esta línea solo suministramos. Cotizas por WhatsApp con referencia o foto de la etiqueta.</p>}
      destacado={<LineSupply id="sensores-suministro" items={[
        { label: "Sensores inductivos", text: "Detectan objetos metálicos sin contacto.", href: "/sensores#inductivos" },
        { label: "Sensores capacitivos", text: "Detectan materiales metálicos y no metálicos.", href: "/sensores#capacitivos" },
        { label: "Sensores fotoeléctricos y fotoceldas", text: "Detectan presencia mediante un haz de luz.", href: "/sensores#fotoelectricos" },
        { label: "Sensores magnéticos", text: "Detectan la posición del pistón en cilindros y actuadores.", href: "/sensores#magneticos" },
        { label: "Sensores de presión", text: "Switches y transmisores para supervisar la presión.", href: "/sensores#presion" },
        { label: "Sensores de temperatura", text: "Termocuplas y RTD.", href: "/resistencias-electricas#termocuplas" },
        { label: "Amplificadores y accesorios", text: "Módulos, conectores, cables y soportes.", href: "/sensores#accesorios" },
      ]} />}
      faqItems={[
        { q: "¿Qué sensores suministran?", a: "Inductivos, capacitivos, fotoeléctricos y fotoceldas, magnéticos, de presión y de temperatura, con sus módulos y accesorios." },
        { q: "¿Instalan o programan?", a: "No. En sensores solo suministramos. Sin instalación, programación, mantenimiento ni puesta en marcha." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
