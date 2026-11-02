import type { Metadata } from "next";
import { HomeHero, OfertasClave, CilindrosBand, LineIndex, AplicacionesHome, ServiciosHome } from "@/components/home/HomeSections";
import { ComoTrabajamos, AntesDespues, TrabajosTaller } from "@/components/home/IndustrialSections";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { CONTACT } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Suministros industriales para empresas en República Dominicana",
  description:
    "Suministro industrial bajo cotización y pedido para empresas y zonas francas en República Dominicana. Neumática, control, sensores e instrumentación.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Suministros industriales para empresas en República Dominicana",
    description:
      "Componentes industriales para Compras, Mantenimiento e Ingeniería. Explora el catálogo y solicita tu cotización por WhatsApp.",
    url: "/",
    images: [{
      url: "/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg",
      width: 915,
      height: 549,
      alt: "Cilindros neumáticos fabricados por Dynatech",
    }],
  },
};

/** Solo hechos ya publicados en el sitio o confirmados por el Capitán (WEB-020). */
const FAQS: Faq[] = [
  { q: "¿Hay stock en línea?", a: "No. Precio y plazo se confirman en la cotización." },
  { q: "¿Qué envío?", a: "Foto, código, plano o muestra." },
  { q: "¿Sin referencia?", a: "Sí. Foto de la pieza y de su placa." },
  { q: "¿Cómo cotizo?", a: "Por WhatsApp, con el mensaje listo." },
  { q: "¿Cilindros?", a: "Neumáticos e hidráulicos. Fabricamos y reparamos." },
  { q: "¿Mecanizado?", a: "Torno y fresadora. Plano o muestra." },
  { q: "¿Zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
  { q: "¿Qué suministran?", a: "Neumática, control, sensores, instrumentación y resistencias." },
  { q: "¿Instalan o programan?", a: "No. En esas líneas solo suministramos." },
  { q: "¿Dónde y cuándo?", a: `${CONTACT.address}. ${CONTACT.hours.replace(/ · /g, " ")}.` },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <OfertasClave />
      <CilindrosBand />
      <ServiciosHome />
      <AplicacionesHome />
      <LineIndex />
      <TrabajosTaller />
      <AntesDespues />
      <ComoTrabajamos />
      <FaqBlock items={FAQS} kicker="Preguntas" title="Antes de escribir" tone="light" />
      <QuoteCTA
        eyebrow="Bajo cotización"
        title="Empieza con una foto"
        text="Código, plano o muestra."
        ctaLabel="Cotizar por WhatsApp"
        whatsappHref={whatsappGeneral()}
      />
    </>
  );
}
