import type { Metadata } from "next";
import { HomeHero, TallerPrincipal, SuministroIndustrial, Sectores } from "@/components/home/HomeSections";
import { CilindrosDestacados, ComoTrabajamos, AntesDespues } from "@/components/home/IndustrialSections";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { CONTACT } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cilindros neumáticos e hidráulicos y mecanizado en RD",
  description:
    "Fabricación y reparación de cilindros neumáticos e hidráulicos, mecanizado con torno y fresadora, y suministro de neumática, control, automatización e instrumentación en Santo Domingo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cilindros neumáticos e hidráulicos y mecanizado en RD",
    description:
      "Fabricación y reparación de cilindros neumáticos e hidráulicos y mecanizado de piezas en República Dominicana. Cotiza por WhatsApp con una foto.",
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
  { q: "¿Qué necesito enviar?", a: "Lo que tengas: una foto, el código o la referencia, el plano, una muestra o las medidas. Para cilindros basta con una foto del cilindro y su placa, o el diámetro x carrera." },
  { q: "No conozco la referencia, ¿puedo cotizar igual?", a: "Sí. Envía fotos de la pieza y de su placa, si tiene, y cuéntanos qué hace en la máquina. Si hace falta otro dato o la muestra, te lo pedimos por el mismo chat." },
  { q: "¿Cómo envío la solicitud?", a: "Pulsa «Cotizar por WhatsApp»: se abre WhatsApp con un mensaje listo según lo que necesitas. Adjunta las fotos o el plano y envíalo. También puedes llamar o escribir un correo desde la página de contacto." },
  { q: "¿Reparan y también fabrican cilindros?", a: "Sí, neumáticos e hidráulicos. Reparamos cilindros dañados y fabricamos cilindros a la medida a partir de tu plano, una muestra o tus medidas. Una reconstrucción incluye desarme, reemplazo de los componentes dañados, ensamblaje y prueba de funcionamiento antes de entregar." },
  { q: "¿Mecanizan piezas?", a: "Sí, con torno y fresadora, a partir de un plano o de una muestra. Envía el plano o fotos de la pieza con una referencia de tamaño, el material si lo conoces y la cantidad." },
  { q: "¿Atienden zonas francas?", a: "Sí. Atendemos solicitudes de empresas de zonas francas y del sector privado en República Dominicana." },
  { q: "¿Qué productos suministran?", a: "Neumática (válvulas, conexiones, unidades FRL, mangueras y sellos), control industrial (contactores, relés, protecciones, mando y gabinetes), automatización (sensores), instrumentación (presión, temperatura, flujo y nivel), resistencias eléctricas y termocuplas, siempre bajo cotización." },
  { q: "¿Instalan o programan los equipos?", a: "No. En control, automatización e instrumentación solo suministramos los productos: no realizamos instalación, programación, mantenimiento, armado de tableros ni puesta en marcha." },
  { q: "¿Dónde están y en qué horario atienden?", a: `En ${CONTACT.address}. Horario: ${CONTACT.hours.replace(/ · /g, " ")}.` },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TallerPrincipal />
      <SuministroIndustrial />
      <AntesDespues />
      <CilindrosDestacados />
      <ComoTrabajamos />
      <Sectores />
      <FaqBlock items={FAQS} kicker="07 · Preguntas frecuentes" title="Antes de escribirnos" tone="light" />
      <QuoteCTA
        eyebrow="Taller · Suministro industrial"
        title="¿Un cilindro que reparar, una pieza que mecanizar o un componente que conseguir?"
        text="Envíanos una foto, el código, el plano o las medidas y te cotizamos."
        whatsappHref={whatsappGeneral()}
      />
    </>
  );
}
