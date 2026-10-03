import type { Metadata } from "next";
import { Hero } from "@/components/home/IndustrialHero";
import { SolucionesIndustriales, CilindrosDestacados, ComoTrabajamos, ServiciosComplementarios } from "@/components/home/IndustrialSections";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { whatsappCylinderService } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cilindros neumáticos: fabricación y reparación en RD",
  description:
    "Fabricación y reparación de cilindros neumáticos en República Dominicana. También hidráulicos, mecanizado y suministros industriales. Cotiza por WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cilindros neumáticos: fabricación y reparación en RD",
    description:
      "Fabricación, reparación y reconstrucción de cilindros neumáticos en República Dominicana. También cotizamos servicios complementarios de hidráulicos y mecanizado.",
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
      <ComoTrabajamos />
      <SolucionesIndustriales />
      <ServiciosComplementarios />
      <QuoteCTA
        eyebrow="Cilindros neumáticos · Sellos · Vástagos cromados"
        title="¿Necesitas fabricar o reparar un cilindro neumático?"
        text="Envíanos el código, una foto, el plano o las medidas por WhatsApp y te cotizamos."
        quoteItem="Fabricación y reparación de cilindros neumáticos"
        whatsappHref={whatsappCylinderService()}
      />
    </>
  );
}
