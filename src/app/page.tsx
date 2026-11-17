import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { CONTACT } from "@/lib/constants";
import { LINE_PAGE_LINKS } from "@/lib/line-links";
import { whatsappCylinderService, whatsappGeneral, whatsappService } from "@/lib/whatsapp";
import { Reveal } from "@/components/motion/Reveal";
import { TaHead, TaHero, TaLink, TaProductCard, TaSteps } from "@/components/taller/TallerA";

const TITLE = "Proveedor industrial en República Dominicana: cilindros neumáticos, control, sensores, instrumentación y resistencias · Dynatech";
const DESCRIPTION =
  "Suplidor industrial en Santo Domingo. Cilindros neumáticos, válvulas, FRL y mangueras; control eléctrico, sensores, instrumentación y resistencias. Cotiza por WhatsApp.";

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
      alt: "Imagen de referencia: componentes neumáticos, control eléctrico e instrumentación",
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
  { q: "¿Zonas francas?", a: "Sí. Empresas privadas y zonas francas en el país." },
  { q: "¿Qué suministran?", a: "Cilindros neumáticos, válvulas, unidades FRL, conexiones y mangueras; control eléctrico, sensores, instrumentación y resistencias. También fabricamos y reparamos cilindros, y mecanizamos en torno y fresadora." },
  { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
  { q: "¿Suministran a zonas francas?", a: "Sí. Suministramos a empresas de zonas francas en todo el país y facturamos bajo el régimen de zonas francas. La exención de ITBIS aplica según la condición de zona franca del cliente." },
  { q: "¿Instalan o programan?", a: "No. En esas líneas solo suministramos." },
  { q: "¿Dónde y cuándo?", a: `${CONTACT.address}. ${CONTACT.hours.replace(/ · /g, " ")}.` },
];

/** Dirección A «Taller primero» (17-nov-2026). Fotos reales del taller; productos como imagen de referencia. */
const TALLER = [
  { title: "Fabricación a la medida", text: "Incluso cuando el original ya no se consigue.", href: "/cilindros-neumaticos", link: "Ver cilindros", image: "/cilindros/cilindro-fabricado-taller.webp", alt: "Cilindro neumático fabricado en el taller de Dynatech", fit: "py-5" },
  { title: "Reparación y reconstrucción", text: "Desarme, cambio de piezas dañadas y prueba antes de entregar.", href: "/servicios", link: "Ver reparación", image: "/cilindros/cilindro-desgastado-taller.webp", alt: "Cilindro neumático desgastado recibido en el taller de Dynatech", fit: "py-5" },
  { title: "Sellos y vástagos a medida", text: "Kits de sellos, vástagos cromados y componentes bajo medida.", href: "/sellos-y-componentes", link: "Ver componentes", image: "/products/sellos-y-vastago-cilindro-neumatico.webp", alt: "Vástago cromado con rosca y tuerca, y kit de sellos para cilindro neumático", fit: "p-6 mix-blend-multiply" },
] as const;

const LINEAS = [
  { href: "/neumatica", title: "Neumática", text: "Válvulas, FRL, conexiones y mangueras.", image: "/products/linea-valvulas-recorte.webp", alt: "Imagen de referencia: válvulas neumáticas" },
  { href: "/control-electrico", title: "Control eléctrico", text: "Contactores, relés y protecciones.", image: "/products/linea-contactor-recorte.webp", alt: "Imagen de referencia: contactor" },
  { href: "/sensores", title: "Sensores", text: "Inductivos, fotoeléctricos y de presión.", image: "/products/linea-sensores-recorte.webp", alt: "Imagen de referencia: sensores inductivos" },
  { href: "/instrumentacion", title: "Instrumentación", text: "Presión y temperatura.", image: "/products/linea-instrumentacion-recorte.webp", alt: "Imagen de referencia: manómetro y sonda de temperatura" },
  { href: "/resistencias-electricas", title: "Resistencias eléctricas", text: "Cartucho, termocuplas y RTD.", image: "/products/linea-resistencias-recorte.webp", alt: "Imagen de referencia: resistencias de cartucho" },
] as const;

const PASOS = [
  { title: "Envías el dato", text: "Foto, código, plano o muestra." },
  { title: "Recibes la cotización", text: "Precio, plazo y condiciones." },
  { title: "Confirmas", text: "Orden, entrega y facturación." },
];

export default function HomePage() {
  return (
    <div className="taller-a">
      <TaHero
        id="home-hero-title"
        kicker="Taller de cilindros · Santo Domingo"
        title={<>Fabricamos y reparamos cilindros <span>neumáticos.</span></>}
        lead="A la medida, bajo plano o muestra, en milímetros o pulgadas."
        whatsappHref={whatsappCylinderService()}
        correoItem="Cilindro neumático"
        notes={["Envía una foto y la placa", "Empresas privadas y zonas francas"]}
        image="/taller/cilindros-fabricados-en-taller.webp"
        imageAlt="Cilindros neumáticos fabricados en el taller de Dynatech junto al cilindro original que sirvió de muestra"
        caption="Cilindros fabricados en nuestro taller"
        objectPosition="50% 60%"
      />

      <section className="ta-sec" aria-labelledby="taller-cilindros">
        <div className="container-max">
          <TaHead kicker="Taller" id="taller-cilindros" title="Cilindros, de principio a fin" aside={<p>Un cilindro nuevo a tu medida, o el tuyo de vuelta funcionando.</p>} />
          <ul className="ta-svc">
            {TALLER.map((c) => (
              <li key={c.href} className="ta-card">
                <Link href={c.href}>
                  <span className="ta-card-img"><Image src={c.image} alt={c.alt} fill sizes="(max-width: 767px) 120px, 33vw" className={`object-contain ${c.fit}`} /></span>
                  <span className="ta-card-body">
                    <span className="ta-card-title">{c.title}</span>
                    <span className="ta-card-text">{c.text}</span>
                    <span className="ta-link">{c.link} <span aria-hidden="true">→</span></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ta-sec is-tint" aria-labelledby="suministro-industrial">
        <div className="container-max">
          <TaHead kicker="Suministro industrial" id="suministro-industrial" title="Lo que tu planta necesita" aside={<TaLink href="/catalogo">Ver todos los productos</TaLink>} />
          <ul className="ta-prod">
            {LINEAS.map((l) => <TaProductCard key={l.href} {...l} />)}
          </ul>
          <p className="ta-deliv">{ENTREGA_LINEA}</p>
        </div>
      </section>

      <section className="ta-sec" aria-label="Cilindros hidráulicos y mecanizado">
        <div className="container-max ta-comp">
          <Reveal className="ta-cx">
            <span className="ta-cx-img"><Image src="/taller/cilindro-hidraulico-fabricado.webp" alt="Cilindro hidráulico fabricado en el torno del taller de Dynatech" fill sizes="(max-width: 767px) 100vw, 240px" className="object-cover" style={{ objectPosition: "50% 40%" }} /></span>
            <div className="ta-cx-body">
              <p className="ta-eyebrow">Complemento</p>
              <h2>Cilindros hidráulicos</h2>
              <p>Reparación y fabricación. Plano, foto o muestra.</p>
              <div className="ta-cx-links">
                <a href={whatsappService("hidraulico")} target="_blank" rel="noopener" className="ta-link">Cotizar por WhatsApp<span className="sr-only">: cilindro hidráulico</span> <span aria-hidden="true">→</span></a>
                <TaLink href="/cilindros-hidraulicos">Ver cilindros hidráulicos</TaLink>
              </div>
            </div>
          </Reveal>
          <Reveal className="ta-cx" delay={0.06}>
            <span className="ta-cx-img"><Image src="/taller/torno-eje-fresadora.jpg" alt="Fabricación de un eje en el torno del taller de Dynatech; al fondo, la fresadora" fill sizes="(max-width: 767px) 100vw, 240px" className="object-cover" style={{ objectPosition: "50% 45%" }} /></span>
            <div className="ta-cx-body">
              <p className="ta-eyebrow">Complemento</p>
              <h2>Mecanizado</h2>
              <ul>
                <li><b>Torno</b> · ejes, bujes, pasadores</li>
                <li><b>Fresadora</b> · placas, soportes, bridas</li>
              </ul>
              <div className="ta-cx-links">
                <a href={whatsappService("mecanizado")} target="_blank" rel="noopener" className="ta-link">Cotizar por WhatsApp<span className="sr-only">: mecanizado</span> <span aria-hidden="true">→</span></a>
                <TaLink href="/mecanizado">Ver mecanizado</TaLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ta-sec is-tint ta-zf" aria-labelledby="zonas-francas">
        <div className="container-max">
          <p className="ta-eyebrow">Zonas francas</p>
          <h2 id="zonas-francas" className="ta-h2">Suministro para zonas francas</h2>
          <p className="ta-zf-text">Suministramos a empresas de zonas francas en todo el país. Facturamos bajo el régimen de zonas francas. La exención de ITBIS aplica según la condición de zona franca del cliente.</p>
          <nav className="ta-index" aria-label="Líneas de suministro y taller">
            <ul>{LINE_PAGE_LINKS.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </nav>
        </div>
      </section>

      <FaqBlock items={FAQS} kicker="Preguntas" title="Antes de escribir" tone="white" />

      <TaSteps id="como-cotizar" steps={PASOS} whatsappHref={whatsappGeneral()} />
    </div>
  );
}
