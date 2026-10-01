import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("control-electrico");

export const metadata: Metadata = {
  title: solucion.title,
  description: solucion.metaDescription,
  alternates: { canonical: "/control-electrico" },
  openGraph: { title: solucion.title, description: solucion.metaDescription, url: "/control-electrico", images: [solucion.image] },
};

export default function ControlElectricoPage() {
  return <SolucionPage solucion={solucion} />;
}
