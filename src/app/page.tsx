import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SolucionesIndustriales, CilindrosDestacados, ComoTrabajamos } from "@/components/home/HomeSections";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { whatsappGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Proveedor industrial B2B en República Dominicana",
  description:
    "Neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas bajo cotización. Fabricación y reparación de cilindros neumáticos.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Soluciones industriales B2B · Dynatech Ingeniería",
    description:
      "Cinco líneas industriales bajo cotización y fabricación, reparación y reconstrucción de cilindros neumáticos.",
    url: "/",
    images: [{
      url: "/industrial-editorial.webp",
      width: 1536,
      height: 1024,
      alt: "Imagen editorial de maquinaria industrial",
    }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SolucionesIndustriales />
      <CilindrosDestacados />
      <ComoTrabajamos />
      <QuoteCTA
        eyebrow="Neumática · Control eléctrico · Sensores · Instrumentación · Resistencias"
        title="¿Qué necesita tu planta?"
        text="Envíanos el código, una foto, el plano o la descripción y te cotizamos."
        whatsappHref={whatsappGeneral()}
      />
    </>
  );
}
