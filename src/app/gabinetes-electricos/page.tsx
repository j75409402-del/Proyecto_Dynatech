import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("gabinetes-electricos");
const title = "Gabinetes eléctricos en República Dominicana";

export const metadata: Metadata = {
  title,
  description: solucion.metaDescription,
  twitter: { card: "summary_large_image", title, description: solucion.metaDescription, images: [solucion.image] },
  alternates: { canonical: "/gabinetes-electricos" },
  openGraph: { title, description: solucion.metaDescription, url: "/gabinetes-electricos", images: [solucion.image] },
};

export default function GabinetesElectricosPage() {
  return <SolucionPage solucion={solucion} />;
}
