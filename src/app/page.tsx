import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SolucionesIndustriales, CilindrosDestacados, ComoTrabajamos } from "@/components/home/HomeSections";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import Link from "next/link";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { whatsappCylinderService } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cilindros neumáticos y suministros industriales en RD",
  description:
    "Cilindros neumáticos e hidráulicos, mecanizado y suministros industriales en República Dominicana. Cotiza para tu empresa o zona franca por WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cilindros neumáticos y suministros industriales en RD",
    description:
      "Cilindros neumáticos e hidráulicos, mecanizado y suministros industriales. Solicita cotización para tu empresa en República Dominicana.",
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
      <section className="container-max py-12 sm:py-16"><h2 className="font-display text-display-lg mb-4">Servicios para empresas e industrias en República Dominicana</h2><p className="text-steel-300 mb-6">Además de la línea neumática, cotiza fabricación y reparación de cilindros hidráulicos y trabajos de mecanizado. Comparte la información de tu proyecto para evaluar la solicitud.</p><div className="grid gap-4 sm:grid-cols-2">{SERVICIOS_ADICIONALES.map((s) => <Link key={s.slug} href={`/${s.slug}`} className="card p-6 border border-black/10"><h3 className="font-display text-xl mb-3">{s.name}</h3><p className="text-steel-300 mb-4">{s.description}</p><span className="text-signal">Ver servicio y solicitar cotización →</span></Link>)}</div></section>
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
