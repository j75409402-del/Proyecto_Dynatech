import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("resistencias-electricas");
const title = "Proveedor de resistencias eléctricas en República Dominicana · Dynatech";
const description =
  "Suplidor industrial en Santo Domingo: resistencias de cartucho, de banda y tubulares; termocuplas tipo J y K, y sondas RTD PT100. A la medida se consiguen o se mandan a fabricar.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  twitter: { card: "summary_large_image", title, description, images: [solucion.image] },
  alternates: { canonical: "/resistencias-electricas" },
  openGraph: { title, description, url: "/resistencias-electricas", images: [solucion.image] },
};

export default function ResistenciasElectricasPage() {
  return (
    <SolucionPage
      solucion={solucion}
      headline="¿Buscas un proveedor de resistencias eléctricas en República Dominicana?"
      lead={<p>Dynatech Ingeniería SRL es un suplidor industrial en República Dominicana. Suministra resistencias eléctricas en Santo Domingo: de cartucho, de banda y tubulares, termocuplas tipo J y K, y sondas RTD PT100. Las que van a la medida se consiguen o se mandan a fabricar. También hay alambre de resistencia. Escríbenos por WhatsApp con fotos, voltaje, potencia o una muestra. Entregamos en todo el país.</p>}
      destacado={<LineSupply id="resistencias-suministro" entrega={ENTREGA_LINEA} items={[
        { label: "Resistencias de cartucho", text: "Para calentamiento de cilindros en máquinas de inyección de plástico.", href: "/resistencias-electricas#cartucho" },
        { label: "Resistencias de banda", text: "Bajo cotización.", href: "/resistencias-electricas#resistencias-suministro", linkText: "Ver en esta página" },
        { label: "Resistencias tubulares", text: "Bajo cotización.", href: "/resistencias-electricas#resistencias-suministro", linkText: "Ver en esta página" },
        { label: "Termocuplas", text: "Tipo J y K, lisas y con conexión roscada, con sus conectores.", href: "/resistencias-electricas#termocuplas" },
        { label: "Sondas RTD", text: "PT100, para medir temperatura en equipos y procesos.", href: "/resistencias-electricas#rtd" },
        { label: "Alambre de resistencia", text: "Alambre de resistencia y resistencias planas.", href: "/resistencias-electricas#alambre" },
        { label: "A la medida", text: "Se consiguen o se mandan a fabricar. Envíanos voltaje, potencia, medidas o una muestra.", href: "/resistencias-electricas#a-la-medida" },
      ]} />}
      faqItems={[
        { q: "¿Y si la resistencia es a la medida?", a: "Se consiguen o se mandan a fabricar. Envíanos voltaje, potencia, medidas o una muestra y te cotizamos." },
        { q: "¿Suministran termocuplas y RTD?", a: "Sí. Termocuplas tipo J y K, y sondas RTD PT100, bajo cotización." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
