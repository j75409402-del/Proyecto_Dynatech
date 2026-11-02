import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Band, SectionHead } from "@/components/page/Blocks";
import { SOLO_SUMINISTRO, SOLUCIONES } from "@/lib/soluciones";
import { SITE } from "@/lib/constants";
import { whatsappCylinderService, whatsappGeneral, whatsappService } from "@/lib/whatsapp";
import { quoteHref } from "@/components/cta/QuoteCTA";

export function CilindrosBand() {
  return (
    <section className="cyl-band" aria-labelledby="cyl-band-title">
      <div className="cyl-band-air" aria-hidden="true" />
      <div className="container-max cyl-band-inner">
        <div>
          <p className="hero-kicker">Taller</p>
          <h2 id="cyl-band-title">Cilindros neumáticos</h2>
          <p>Fabricación y reparación.</p>
          <ul>
            <li>Foto, placa o plano.</li>
            <li>Milímetros o pulgadas.</li>
            <li>Prueba antes de entregar.</li>
          </ul>
          <a href={whatsappCylinderService()} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6" data-fab-hide="">
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar por WhatsApp
          </a>
        </div>
        <figure>
          <Image src="/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg" alt="Cilindros neumáticos fabricados por Dynatech junto a la muestra que sirvió de referencia" width={915} height={549} sizes="(max-width: 1023px) 100vw, 46vw" />
        </figure>
      </div>
    </section>
  );
}

export function ServiciosHome() {
  const items = [
    { title: "Reparación de cilindros", text: "Fugas, desgaste o golpes.", href: "/servicios", quote: whatsappService("neumatico-reparar") },
    { title: "Mecanizado de piezas", text: "Torno y fresadora.", href: "/mecanizado", quote: whatsappService("mecanizado") },
  ] as const;
  return (
    <Band tone="white" labelledBy="servicios-home">
      <SectionHead kicker="Servicios" id="servicios-home" title="Taller" intro="Reparación y mecanizado." />
      <ul className="service-row">
        {items.map((s) => (
          <li key={s.href}>
            <h3><Link href={s.href}>{s.title}</Link></h3>
            <p>{s.text}</p>
            <a href={s.quote} target="_blank" rel="noopener">Solicitar cotización<span className="sr-only">: {s.title}</span></a>
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function AplicacionesHome() {
  return (
    <Band tone="light" labelledBy="aplicaciones-home">
      <SectionHead kicker="Aplicaciones" id="aplicaciones-home" title="Dónde se usan" intro="Empresas y zonas francas." aside={<Link href="/aplicaciones" className="inline-flex min-h-11 items-center gap-2 font-medium">Ver aplicaciones <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>} />
      <ul className="app-grid">
        {SOLUCIONES.map((s) => (
          <li key={s.slug}>
            <h3><Link href={`/${s.slug}`}>{s.name}</Link></h3>
            <ul>
              {s.aplicaciones.slice(0, 3).map((a) => <li key={a}>{a}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </Band>
  );
}
/** Portada: cilindros y neumática, una sola acción. */
export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="home-hero-title">
      <figure className="hero-media">
        <svg className="hero-flow" viewBox="0 0 800 500" aria-hidden="true">
          <path d="M-20 360 C 160 300, 280 420, 460 340 S 760 220, 840 280" />
          <path d="M-20 220 C 180 160, 320 260, 520 190 S 780 80, 860 140" />
          <path d="M40 460 C 220 400, 360 480, 560 410 S 820 320, 900 360" />
        </svg>
        <Image
          src="/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg"
          alt="Cilindros neumáticos fabricados por Dynatech junto a la muestra que sirvió de referencia"
          width={915}
          height={549}
          priority
          fetchPriority="high"
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
        <p className="hero-kicker">{SITE.shortName} · Santo Domingo</p>
        <h1 id="home-hero-title">Suministro industrial</h1>
        <p className="hero-lead">Bajo cotización y pedido.</p>
        <div className="hero-actions" data-fab-hide="">
          <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar por WhatsApp
          </a>
          <Link href="/catalogo" className="hero-secondary">
            Ver catálogo
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="hero-note">Foto, código o plano.</p>
      </div>
    </section>
  );
}

const OFERTAS = [
  {
    title: "Cilindros neumáticos",
    text: "Fabricación y reparación.",
    href: "/cilindros-neumaticos",
    quote: whatsappCylinderService(),
    image: "/products/cilindros-neumaticos.jpg",
    alt: "Cilindros neumáticos industriales",
  },
  {
    title: "Mecanizado de piezas",
    text: "Torno y fresadora.",
    href: "/mecanizado",
    quote: whatsappService("mecanizado"),
    image: "/taller/torno-eje-fresadora.jpg",
    alt: "Fabricación de un eje en el torno del taller de Dynatech; al fondo, la fresadora",
  },
] as const;

const AUDIENCIA = [
  { title: "Compras", text: "Referencia y cantidad." },
  { title: "Mantenimiento", text: "Código, placa o foto." },
  { title: "Ingeniería", text: "Plano o especificaciones." },
] as const;

export function OfertasClave() {
  return (
    <section className="key-offers" aria-labelledby="ofertas-titulo">
      <h2 id="ofertas-titulo" className="sr-only">Ofertas principales</h2>
      {OFERTAS.map((o) => (
        <article key={o.href} className="key-offer">
          <Link href={o.href} className="key-offer-photo" tabIndex={-1} aria-hidden="true">
            <Image src={o.image} alt={o.alt} fill sizes="(max-width: 799px) 100vw, 50vw" className={o.href === "/mecanizado" ? "object-cover" : "object-contain p-6"} />
          </Link>
          <div className="key-offer-copy">
            <h3><Link href={o.href}>{o.title}</Link></h3>
            <p>{o.text}</p>
            <a href={o.quote} target="_blank" rel="noopener" data-fab-hide="">
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
              <span className="sr-only">: {o.title}</span>
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

/** Índice de líneas: filas de catálogo, no tarjetas. */
export function LineIndex() {
  return (
    <Band tone="white" id="lineas" labelledBy="lineas-titulo">
      <SectionHead
        kicker="Catálogo"
        id="lineas-titulo"
        title="Líneas de suministro"
        intro="Referencia, cantidad o foto."
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
        <p><Link href="/cilindros-hidraulicos">Cilindros hidráulicos</Link> · Reparación y fabricación.</p>
        <p>Control, automatización e instrumentación: {SOLO_SUMINISTRO}</p>
        <Link href="/catalogo">Ver catálogo <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
      <ul className="audience" aria-label="A quién atendemos">
        {AUDIENCIA.map((a) => (
          <li key={a.title}><h3>{a.title}</h3><p>{a.text}</p></li>
        ))}
      </ul>
    </Band>
  );
}

