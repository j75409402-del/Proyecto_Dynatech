import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Band, SectionHead } from "@/components/page/Blocks";
import { SOLO_SUMINISTRO, SOLUCIONES } from "@/lib/soluciones";
import { SITE } from "@/lib/constants";
import { whatsappCylinderService, whatsappGeneral, whatsappService } from "@/lib/whatsapp";
import { quoteHref } from "@/components/cta/QuoteCTA";

function PhotoBand({
  id,
  kicker,
  title,
  text,
  href,
  quote,
  image,
  alt,
}: {
  id: string;
  kicker: string;
  title: string;
  text: string;
  href: string;
  quote: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="photo-band" aria-labelledby={id}>
      <Image src={image} alt={alt} fill sizes="100vw" className="photo-band-img" />
      <div className="photo-band-shade" aria-hidden="true" />
      <div className="container-max photo-band-copy">
        <p className="hero-kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
        <p>{text}</p>
        <div className="hero-actions" data-fab-hide="">
          <a href={quote} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar por WhatsApp
          </a>
          <Link href={href} className="hero-secondary">Ver más <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

export function CilindrosBand() {
  return (
    <PhotoBand
      id="cyl-band-title"
      kicker="Taller"
      title="Cilindros neumáticos"
      text="Fabricación y reparación. Foto, placa o plano."
      href="/cilindros-neumaticos"
      quote={whatsappCylinderService()}
      image="/taller/cilindro-hidraulico-fabricado-poster.jpg"
      alt="Cilindro hidráulico fabricado en el torno del taller"
    />
  );
}

export function MecanizadoBand() {
  return (
    <PhotoBand
      id="mecanizado-band-title"
      kicker="Taller"
      title="Mecanizado de piezas"
      text="Torno y fresadora. Plano o muestra."
      href="/mecanizado"
      quote={whatsappService("mecanizado")}
      image="/taller/torno-eje-fresadora.jpg"
      alt="Fabricación de un eje en el torno del taller de Dynatech; al fondo, la fresadora"
    />
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

export function Editorial({
  id, flip, kicker, title, text, href, quote, image, alt,
}: {
  id: string; flip?: boolean; kicker: string; title: string; text: string; href: string; quote: string; image: string; alt: string;
}) {
  return (
    <section className={`edit ${flip ? "is-flip" : ""}`} aria-labelledby={id}>
      <div className="edit-photo">
        <Image src={image} alt={alt} fill sizes="(max-width: 899px) 100vw, 58vw" className="object-cover" />
      </div>
      <div className="edit-copy">
        <p className="section-kicker">{kicker}</p>
        <h2 id={id}>{title}</h2>
        <p>{text}</p>
        <div className="hero-actions" data-fab-hide="">
          <a href={quote} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">
            <WhatsAppIcon className="h-5 w-5" />Cotizar por WhatsApp
          </a>
          <Link href={href} className="edit-more">Ver más <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

/** Usos ya escritos en cada línea. Fotos distintas de las miniaturas del hero. */
const USOS_HOME: { slug: string; index: number; image: string; fit: "cover" | "contain" }[] = [
  { slug: "neumatica", index: 0, image: "/studio/uso-lineas.jpg", fit: "cover" },
  { slug: "control-electrico", index: 0, image: "/studio/uso-motores.jpg", fit: "cover" },
  { slug: "resistencias-electricas", index: 0, image: "/studio/uso-inyeccion.jpg", fit: "cover" },
];

export function AplicacionesHome() {
  const usos = USOS_HOME.map((u) => {
    const s = SOLUCIONES.find((x) => x.slug === u.slug);
    return s ? { title: s.aplicaciones[u.index], href: `/${s.slug}`, image: u.image, fit: u.fit } : null;
  }).filter((u): u is { title: string; href: string; image: string; fit: "cover" | "contain" } => u !== null);
  return (
    <Band tone="white" labelledBy="aplicaciones-home">
      <SectionHead kicker="Aplicaciones" id="aplicaciones-home" title="Dónde se usan" intro="Empresas y zonas francas." aside={<Link href="/aplicaciones" className="inline-flex min-h-11 items-center gap-2 font-medium">Ver aplicaciones <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>} />
      <ul className="industry-grid">
        {usos.map((u) => (
          <li key={u.href}>
            <Link href={u.href}>
              <span className="industry-photo"><Image src={u.image} alt="" fill sizes="(max-width: 699px) 100vw, 33vw" className={u.fit === "contain" ? "object-contain p-6" : "object-cover"} /></span>
              <span className="industry-copy"><strong>{u.title}</strong></span>
            </Link>
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
      <div className="hero-media">
        <Image
          src="/hero/suministro-industrial.jpg"
          alt="Imagen de referencia: componentes neumáticos, gabinete de control e instrumentación, sin marcas"
          fill
          priority
          fetchPriority="high"
          quality={68}
          sizes="100vw"
          className="hero-photo"
          style={{ objectPosition: "68% 58%" }}
        />
      </div>
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

/** Todas las líneas del catálogo, en la primera pantalla. */
export function LineasDeUnVistazo() {
  return (
    <section className="fold-lines" aria-label="Líneas de suministro">
      <ul>
        {SOLUCIONES.map((s) => (
          <li key={s.slug}>
            <Link href={`/${s.slug}`}>
              <span className="fold-photo">
                <Image src={s.image} alt="" fill sizes="(max-width: 799px) 33vw, 160px" className="object-cover" />
              </span>
              <span>{s.name}</span>
            </Link>
          </li>
        ))}
      </ul>
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
      <ul className="studio-grid">
        {SOLUCIONES.map((s) => (
          <li key={s.slug}>
            <Link href={`/${s.slug}`} className="studio-photo" aria-label={s.name}>
              <Image src={s.image} alt="" fill sizes="(max-width: 639px) 50vw, 30vw" className="object-contain" />
            </Link>
            <h3><Link href={`/${s.slug}`}>{s.name}</Link></h3>
            <p>{s.short}</p>
            <a href={quoteHref(s.name, "Suministro industrial")} target="_blank" rel="noopener" className="line-quote">
              Solicitar cotización<span className="sr-only">: {s.name}</span>
            </a>
          </li>
        ))}
      </ul>
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

