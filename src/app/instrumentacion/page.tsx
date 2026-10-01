import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("instrumentacion");

export const metadata: Metadata = {
  title: solucion.title,
  description: solucion.metaDescription,
  alternates: { canonical: "/instrumentacion" },
  openGraph: { title: solucion.title, description: solucion.metaDescription, url: "/instrumentacion", images: [solucion.image] },
};

export default function InstrumentacionPage() {
  return <SolucionPage solucion={solucion} />;
}
