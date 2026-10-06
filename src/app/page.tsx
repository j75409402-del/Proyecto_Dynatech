import type { Metadata } from "next";
import { HomeHero, Categorias, Sectores } from "@/components/home/HomeSections";
import { CilindrosDestacados, ComoTrabajamos, AntesDespues } from "@/components/home/IndustrialSections";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { CONTACT } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";

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

/** Solo hechos ya publicados en el sitio o confirmados por el Capitán (WEB-020). */
const FAQS: Faq[] = [
  { q: "¿Qué necesito enviar?", a: "Lo que tengas: una foto, el código o la referencia, el plano, una muestra o las medidas. Para cilindros, lo mínimo es el diámetro x carrera o una foto del cilindro y su placa." },
  { q: "¿Cómo envío la solicitud?", a: "Pulsa «Solicitar cotización»: se abre WhatsApp con un mensaje listo para completar y enviar. También puedes escribirnos por WhatsApp, llamar o enviar un correo desde la página de contacto." },
  { q: "¿Reparan y también fabrican cilindros neumáticos?", a: "Sí. Fabricamos cilindros a la medida a partir de tu plano, una muestra o tus medidas, y reparamos cilindros dañados. Una reconstrucción incluye desarme, reemplazo de los componentes dañados, ensamblaje y prueba de funcionamiento antes de entregar." },
  { q: "¿Atienden zonas francas?", a: "Sí. Atendemos solicitudes de empresas de zonas francas y del sector privado en República Dominicana." },
  { q: "¿Qué más suministran además de cilindros?", a: "Cotizamos neumática, válvulas, control eléctrico, gabinetes eléctricos, sensores, instrumentación y resistencias eléctricas. También evaluamos cilindros hidráulicos y mecanizado." },
  { q: "¿Dónde están y en qué horario atienden?", a: `En ${CONTACT.address}. Horario: ${CONTACT.hours.replace(/ · /g, " ")}.` },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Categorias />
      <CilindrosDestacados />
      <AntesDespues />
      <ComoTrabajamos />
      <Sectores />
      <FaqBlock items={FAQS} kicker="06 · Preguntas frecuentes" title="Antes de escribirnos" tone="light" />
      <QuoteCTA
        eyebrow="Taller · Suministro industrial"
        title="¿Un cilindro que reparar o una pieza que conseguir?"
        text="Envíanos el código, una foto, el plano o las medidas y te cotizamos."
        quoteItem="Fabricación y reparación de cilindros neumáticos"
        whatsappHref={whatsappGeneral()}
      />
    </>
  );
}
