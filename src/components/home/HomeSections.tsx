import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Band, SectionHead } from "@/components/page/Blocks";
import { SOLO_SUMINISTRO, SOLUCIONES } from "@/lib/soluciones";
import { SITE } from "@/lib/constants";
import { whatsappCylinderService, whatsappGeneral, whatsappService } from "@/lib/whatsapp";
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

