import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Band, SectionHead } from "@/components/page/Blocks";
import { shortHours } from "@/components/page/TrustStrip";
import { SOLO_SUMINISTRO, SOLUCIONES } from "@/lib/soluciones";
import { NAV, SITE } from "@/lib/constants";
import { whatsappGeneral, whatsappService } from "@/lib/whatsapp";
import { quoteHref } from "@/components/cta/QuoteCTA";

/** Portada: cilindros y neumática, una sola acción. */
export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="home-hero-title">
      <figure className="hero-media">
        <Image
          src="/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg"
          alt="Cilindros neumáticos fabricados por Dynatech junto a la muestra que sirvió de referencia"
          width={915}
          height={549}
          priority
          fetchPriority="high"
          decoding="sync"
          quality={68}
          sizes="(max-width: 1023px) 100vw, 48vw"
          className="hero-photo"
        />
        <figcaption>
          <span>Trabajo del taller</span>
          Cilindros fabricados a partir de una muestra.
        </figcaption>
      </figure>
      <div className="hero-copy">
        <p className="hero-kicker">Neumática industrial · {SITE.shortName}</p>
        <h1 id="home-hero-title">Cilindros neumáticos y neumática industrial, bajo cotización.</h1>
        <p className="hero-lead">
          Fabricamos y reparamos cilindros. Suministramos válvulas, preparación de aire y componentes industriales para empresas y zonas francas en República Dominicana.
        </p>
        <div className="hero-actions" data-fab-hide="">
          <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar por WhatsApp
          </a>
          <Link href="/neumatica" className="hero-secondary">
            Ver la línea de neumática
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="hero-note">Empieza con una foto, el código o el plano. Suministro bajo cotización y pedido.</p>
      </div>
    </section>
  );
}

const AUDIENCIA = [
  { title: "Compras", text: "Pide por referencia y cantidad. La cotización sirve para tu orden de compra." },
  { title: "Mantenimiento", text: "Comparte el código, la placa o una foto del repuesto." },
  { title: "Ingeniería", text: "Envía el plano, las especificaciones o lo que requiere la aplicación." },
] as const;

/** Índice de líneas: filas de catálogo, no tarjetas. */
export function LineIndex() {
  return (
    <Band tone="white" id="lineas" labelledBy="lineas-titulo">
      <SectionHead
        kicker="Suministro industrial"
        id="lineas-titulo"
        title="Líneas para cotizar"
        intro="Elige la línea y envía la referencia, la cantidad o una foto. Confirmamos disponibilidad y condiciones en la cotización."
      />
      <ol className="line-index">
        {SOLUCIONES.map((s, i) => (
          <li key={s.slug}>
            <span className="line-no">{String(i + 1).padStart(2, "0")}</span>
            <div className="line-main">
              <h3><Link href={`/${s.slug}`}>{s.name}</Link></h3>
              <p>{s.short}</p>
            </div>
            <a href={quoteHref(s.name, "Suministro industrial")} target="_blank" rel="noopener" className="line-quote">
              Cotizar por WhatsApp
              <span className="sr-only">: {s.name}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="line-foot">
        <p><b>Control, automatización e instrumentación.</b> {SOLO_SUMINISTRO}</p>
        <Link href="/catalogo">Ver el catálogo por categorías <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
      <ul className="audience" aria-label="A quién atendemos">
        {AUDIENCIA.map((a) => (
          <li key={a.title}><h3>{a.title}</h3><p>{a.text}</p></li>
        ))}
      </ul>
    </Band>
  );
}

const TALLER = [
  {
    title: "Cilindros neumáticos",
    text: "Reparamos cilindros con fugas, desgaste o golpes y fabricamos cilindros nuevos a la medida, en milímetros o pulgadas.",
    send: "Fotos del cilindro y su placa, o el plano.",
    href: "/cilindros-neumaticos",
    actions: [
      { label: "Reparar", href: whatsappService("neumatico-reparar") },
      { label: "Fabricar", href: whatsappService("neumatico-fabricar") },
    ],
  },
  {
    title: "Cilindros hidráulicos",
    text: "Reparamos cilindros hidráulicos con fugas o daños y fabricamos cilindros nuevos para equipos industriales.",
    send: "Fotos del cilindro, conexiones y montajes, o el plano.",
    href: "/cilindros-hidraulicos",
    actions: [
      { label: "Reparar", href: whatsappService("hidraulico-reparar") },
      { label: "Fabricar", href: whatsappService("hidraulico-fabricar") },
    ],
  },
  {
    title: "Mecanizado de piezas",
    text: "Torneado y fresado a partir de un plano o de una muestra: ejes, bujes, bridas o soportes.",
    send: "El plano, o fotos de la pieza con una referencia de tamaño.",
    href: "/mecanizado",
    actions: [{ label: "Cotizar mecanizado", href: whatsappService("mecanizado") }],
  },
] as const;

export function TallerPrincipal() {
  return (
    <Band tone="light" id="taller" labelledBy="taller-titulo">
      <SectionHead
        kicker="Taller"
        id="taller-titulo"
        title="Fabricación, reparación y mecanizado"
        intro="Elige el trabajo. Se abre WhatsApp con el mensaje listo. Alcance, plazo y condiciones se confirman en la cotización."
      />
      <ol className="spec-index" data-fab-hide="">
        {TALLER.map((t, i) => (
          <li key={t.title}>
            <span className="line-no">{String(i + 1).padStart(2, "0")}</span>
            <div className="spec-copy">
              <h3><Link href={t.href}>{t.title}</Link></h3>
              <p>{t.text}</p>
              <p className="spec-send"><span>Qué enviar</span>{t.send}</p>
            </div>
            <div className="spec-actions">
              {t.actions.map((a) => (
                <a key={a.label} href={a.href} target="_blank" rel="noopener">
                  <WhatsAppIcon className="h-4 w-4" />
                  {a.label}
                  <span className="sr-only">: {t.title}</span>
                </a>
              ))}
            </div>
          </li>
        ))}
      </ol>
      <p className="line-foot">
        <span>También: {NAV.especialidades.map((e) => e.label).join(" · ")}.</span>
        <span>Horario: {shortHours()}.</span>
      </p>
    </Band>
  );
}
