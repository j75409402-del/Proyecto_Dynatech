import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { LineSupply } from "@/components/soluciones/LineSupply";
import { ENTREGA } from "@/lib/entrega";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("gabinetes-electricos");
const title = "Proveedor de gabinetes eléctricos en República Dominicana · Dynatech";
const description =
  "Suplidor de gabinetes eléctricos en Santo Domingo: gabinetes para tableros y cajas eléctricas. Solo suministro. Cotiza con medidas y uso.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  twitter: { card: "summary_large_image", title, description, images: [solucion.image] },
  alternates: { canonical: "/gabinetes-electricos" },
  openGraph: { title, description, url: "/gabinetes-electricos", images: [solucion.image] },
};

export default function GabinetesElectricosPage() {
  return (
    <SolucionPage
      solucion={solucion}
      headline="¿Buscas un proveedor de gabinetes eléctricos en República Dominicana?"
      lead={<p>Dynatech Ingeniería SRL es un suplidor de gabinetes eléctricos en Santo Domingo: gabinetes para tableros de control, protección o distribución, y cajas para conexión o mando. Solo suministro. No fabricamos ni armamos tableros. Cotizas por WhatsApp con medidas y uso.</p>}
      destacado={<LineSupply id="gabinetes-suministro" items={[
        { label: "Gabinetes para tableros", text: "Gabinetes para alojar tableros de control, protección o distribución de máquinas y planta.", href: "/gabinetes-electricos#gabinetes-para-tablero" },
        { label: "Cajas eléctricas", text: "Cajas para conexión, paso o mando en campo, según las medidas y el uso que nos indiques.", href: "/gabinetes-electricos#cajas-electricas" },
      ]} />}
      faqItems={[
        { q: "¿Fabrican o arman tableros?", a: "No. Solo suministramos gabinetes y cajas. Sin fabricación ni armado." },
        { q: "¿Qué datos envío?", a: "Medidas (alto × ancho × fondo), material y grado de protección si están definidos, y el uso: interior o exterior, y qué va a alojar." },
        { q: "¿Cuánto tarda la entrega?", a: ENTREGA },
        { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
      ]}
    />
  );
}
