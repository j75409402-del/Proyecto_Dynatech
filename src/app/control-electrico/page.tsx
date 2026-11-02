import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("control-electrico");
const title = "Proveedor de control eléctrico en República Dominicana · Dynatech";
const description =
  "Suplidor de control eléctrico industrial en Santo Domingo: contactores, relés, breakers, fusibles, pulsadores y temporizadores. Solo suministro.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  twitter: { card: "summary_large_image", title, description, images: [solucion.image] },
  alternates: { canonical: "/control-electrico" },
  openGraph: { title, description, url: "/control-electrico", images: [solucion.image] },
};

export default function ControlElectricoPage() {
  return (
    <SolucionPage
      solucion={solucion}
      headline="¿Buscas un proveedor de control eléctrico en República Dominicana?"
      lead={<p>Dynatech Ingeniería SRL es un suplidor de control eléctrico industrial en Santo Domingo: contactores, relés, breakers, fusibles, pulsadores, temporizadores y conectores para empresas y zonas francas. En esta línea solo suministramos. Cotizas por WhatsApp con referencia o foto.</p>}
      destacado={<LineSupply id="control-suministro" items={[
        { label: "Contactores y relés", text: "Contactores para arranque y control de motores, relés de control y relés térmicos.", href: "/control-electrico#contactores-y-reles" },
        { label: "Breakers y protección", text: "Interruptores termomagnéticos, arrancadores manuales y protección de circuitos.", href: "/control-electrico#proteccion" },
        { label: "Fusibles y portafusibles", text: "Fusibles industriales, fusibles tipo NH y bases portafusibles.", href: "/control-electrico#fusibles" },
        { label: "Pulsadores, selectores y luces piloto", text: "Mando y señalización para tableros de control.", href: "/control-electrico#mando-y-senalizacion" },
        { label: "Temporizadores, contadores y controladores", text: "Temporizadores, contadores y controladores de temperatura para tablero.", href: "/control-electrico#temporizadores" },
        { label: "Finales de carrera e interruptores", text: "Interruptores de posición para detectar el recorrido de máquinas.", href: "/control-electrico#interruptores" },
        { label: "Conectores industriales", text: "Clavijas y conectores para conexión de equipos en planta.", href: "/control-electrico#conectores" },
      ]} />}
      faqItems={[
        { q: "¿Dynatech vende contactores y relés en RD?", a: "Sí. Contactores, relés de control y relés térmicos, bajo cotización desde Santo Domingo." },
        { q: "¿Instalan o arman tableros?", a: "No. En control eléctrico solo suministramos. Sin instalación, programación, mantenimiento, tableros ni puesta en marcha." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
