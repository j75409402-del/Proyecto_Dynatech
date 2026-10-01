import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SolucionesIndustriales, CilindrosDestacados, ComoTrabajamos } from "@/components/home/HomeSections";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { whatsappCylinderService } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cilindros neumáticos: fabricación y reparación",
  description:
    "Fabricación, reparación y reconstrucción de cilindros neumáticos, sellos y vástagos cromados en República Dominicana. Cotización por WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cilindros neumáticos · Dynatech Ingeniería",
    description:
      "Fabricación y reparación de cilindros neumáticos, sellos y vástagos cromados bajo cotización.",
    url: "/",
    images: [{
      url: "/cilindros/taller-reparando.jpg",
      width: 1280,
      height: 850,
      alt: "Técnico trabajando en la reparación de un cilindro neumático",
    }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CilindrosDestacados />
      <SolucionesIndustriales />
      <ComoTrabajamos />
      <QuoteCTA
        eyebrow="Cilindros neumáticos · Sellos · Vástagos cromados"
        title="¿Necesitas fabricar o reparar un cilindro?"
        text="Envíanos el código, una foto, el plano o las medidas por WhatsApp y te cotizamos."
        quoteItem="Fabricación y reparación de cilindros neumáticos"
        whatsappHref={whatsappCylinderService()}
      />
    </>
  );
}
