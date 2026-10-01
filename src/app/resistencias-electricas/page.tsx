import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("resistencias-electricas");

export const metadata: Metadata = {
  title: solucion.title,
  description: solucion.metaDescription,
  alternates: { canonical: "/resistencias-electricas" },
  openGraph: { title: solucion.title, description: solucion.metaDescription, url: "/resistencias-electricas", images: [solucion.image] },
};

export default function ResistenciasElectricasPage() {
  return <SolucionPage solucion={solucion} />;
}
