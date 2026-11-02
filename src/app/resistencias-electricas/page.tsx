import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("resistencias-electricas");
const title = "Proveedor de resistencias eléctricas en República Dominicana · Dynatech";
const description =
  "Suplidor de resistencias eléctricas en Santo Domingo: de cartucho, termocuplas, sondas RTD y alambre de resistencia. También bajo especificación.";

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
      lead={<p>Dynatech Ingeniería SRL es un suplidor de resistencias eléctricas y termocuplas en Santo Domingo: resistencias de cartucho, termocuplas, sondas RTD y alambre de resistencia, para empresas y zonas francas. También cotizamos bajo especificación. Escríbenos por WhatsApp con fotos, voltaje, potencia o una muestra.</p>}
      destacado={<LineSupply id="resistencias-suministro" items={[
        { label: "Resistencias de cartucho", text: "Para calentamiento de cilindros en máquinas de inyección de plástico.", href: "/resistencias-electricas#cartucho" },
        { label: "Termocuplas", text: "Lisas y con conexión roscada, con sus conectores.", href: "/resistencias-electricas#termocuplas" },
        { label: "Sondas RTD", text: "Para medir temperatura en equipos y procesos.", href: "/resistencias-electricas#rtd" },
        { label: "Alambre de resistencia", text: "Alambre de resistencia y resistencias planas.", href: "/resistencias-electricas#alambre" },
        { label: "Bajo especificación", text: "Con voltaje, potencia, medidas o una muestra cotizamos la resistencia que corresponde.", href: "/resistencias-electricas#a-la-medida" },
      ]} />}
      faqItems={[
        { q: "¿Hacen resistencias bajo especificación?", a: "Sí. Envíanos voltaje, potencia, medidas o una muestra y te cotizamos la resistencia que corresponde." },
        { q: "¿Suministran termocuplas y RTD?", a: "Sí. Termocuplas lisas y roscadas, y sondas RTD, bajo cotización." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
