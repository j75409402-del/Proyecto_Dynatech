import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SolucionesIndustriales, CilindrosDestacados, ComoTrabajamos } from "@/components/home/HomeSections";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { whatsappGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
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
