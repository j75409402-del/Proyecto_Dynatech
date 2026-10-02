import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("resistencias-electricas");

export const metadata: Metadata = {
  title: `${solucion.title} en República Dominicana`,
  description: solucion.metaDescription,
  twitter: { card: "summary_large_image", title: `${solucion.title} en República Dominicana`, description: solucion.metaDescription, images: [solucion.image] },
  alternates: { canonical: "/resistencias-electricas" },
  openGraph: { title: `${solucion.title} en República Dominicana`, description: solucion.metaDescription, url: "/resistencias-electricas", images: [solucion.image] },
};

export default function ResistenciasElectricasPage() {
  return <SolucionPage solucion={solucion} />;
}
