import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("sensores");

export const metadata: Metadata = {
  title: solucion.title,
  description: solucion.metaDescription,
  alternates: { canonical: "/sensores" },
  openGraph: { title: solucion.title, description: solucion.metaDescription, url: "/sensores", images: [solucion.image] },
};

export default function SensoresPage() {
  return <SolucionPage solucion={solucion} />;
}
