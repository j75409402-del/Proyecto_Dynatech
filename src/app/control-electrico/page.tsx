import type { Metadata } from "next";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("control-electrico");
const title = "Controles eléctricos industriales en República Dominicana";

export const metadata: Metadata = {
  title,
  description: solucion.metaDescription,
  twitter: { card: "summary_large_image", title, description: solucion.metaDescription, images: [solucion.image] },
  alternates: { canonical: "/control-electrico" },
  openGraph: { title, description: solucion.metaDescription, url: "/control-electrico", images: [solucion.image] },
};

export default function ControlElectricoPage() {
  return <SolucionPage solucion={solucion} />;
}
