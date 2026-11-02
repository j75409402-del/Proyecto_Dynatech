import type { Metadata } from "next";
import { HomeHero, LineasDeUnVistazo, NeumaticaIndustrial, Editorial, AplicacionesHome } from "@/components/home/HomeSections";
import { ComoTrabajamos } from "@/components/home/IndustrialSections";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { CONTACT } from "@/lib/constants";
import { whatsappGeneral, whatsappService } from "@/lib/whatsapp";

const TITLE = "Proveedor industrial en República Dominicana: cilindros neumáticos, control, gabinetes, sensores, instrumentación y resistencias · Dynatech";
const DESCRIPTION =
  "Suplidor industrial en Santo Domingo. Cilindros neumáticos, válvulas, FRL y mangueras; control eléctrico, gabinetes, sensores, instrumentación y resistencias. Cotiza por WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    images: [{
      url: "/hero/suministro-industrial.jpg",
      width: 1280,
      height: 720,
      alt: "Imagen de referencia: componentes neumáticos, gabinete de control e instrumentación",
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
  { q: "¿Qué suministran?", a: "Cilindros neumáticos, válvulas, unidades FRL, conexiones y mangueras; control eléctrico, gabinetes, sensores, instrumentación y resistencias. También fabricamos y reparamos cilindros, y mecanizamos en torno y fresadora." },
  { q: "¿Cuánto tarda la entrega?", a: "Entrega inmediata cuando hay existencia, o importación cuando no está en el país; disponibilidad y plazo se confirman en la cotización." },
  { q: "¿Instalan o programan?", a: "No. En esas líneas solo suministramos." },
  { q: "¿Dónde y cuándo?", a: `${CONTACT.address}. ${CONTACT.hours.replace(/ · /g, " ")}.` },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <LineasDeUnVistazo />
      <NeumaticaIndustrial />
      <Editorial
        id="home-mecanizado"
        kicker="Taller"
        title="Mecanizado de piezas"
        text="Torno y fresadora. Plano o muestra."
        href="/mecanizado"
        quote={whatsappService("mecanizado")}
        image="/studio/linea-mecanizado.jpg"
        alt="Eje de acero en el torno, sin marcas"
      />
      <AplicacionesHome />
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
