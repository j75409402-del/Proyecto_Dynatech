import { SupplyRail } from "@/components/home/SupplyRail";
import { VITRINA_SUMINISTRO } from "@/lib/vitrina-suministro";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Camera, Cog, Droplets, Factory, Wrench, Cylinder, Info, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TrustStrip } from "@/components/page/TrustStrip";
import { Band, SectionHead } from "@/components/page/Blocks";
import { GRUPOS_SUMINISTRO, SOLO_SUMINISTRO, SOLUCIONES, type GrupoId } from "@/lib/soluciones";
import { whatsappGeneral, whatsappService, whatsappSolucion } from "@/lib/whatsapp";

/**
 * Portada (oct-2026, pedido del dueño del 15-oct): presenta toda la oferta en dos bloques,
 * «Fabricación, reparación y mecanizado» (los cilindros siguen destacados) y «Suministro
 * industrial» (neumática, control industrial, automatización, instrumentación, resistencias
 * y termocuplas). Un solo CTA «Cotizar por WhatsApp» (→ /cotizacion → WhatsApp, medido).
 * Sin clientes, cifras, certificaciones, stock, precios ni plazos.
 */

type Acceso = { icon?: LucideIcon; title: string; text?: string; href: string };

/** Taller: lo que más se quiere vender hoy (cada uno lleva a su página). */
const ACCESOS_TALLER: Acceso[] = [
  { icon: Wrench, title: "Reparar un cilindro neumático", text: "Fugas, desgaste, golpes", href: "/servicios" },
  { icon: Cylinder, title: "Fabricar un cilindro neumático", text: "Bajo plano, muestra o medidas", href: "/cilindros-neumaticos" },
  { icon: Droplets, title: "Cilindro hidráulico", text: "Reparación o fabricación", href: "/cilindros-hidraulicos" },
  { icon: Cog, title: "Mecanizar una pieza", text: "Torno y fresadora, bajo plano o muestra", href: "/mecanizado" },
];

/** Suministro: una entrada por grupo (página principal del grupo). */
const ACCESOS_SUMINISTRO: Acceso[] = [
  { title: "Neumática", href: "/neumatica" },
  { title: "Control industrial", href: "/control-electrico" },
  { title: "Automatización", href: "/sensores" },
  { title: "Instrumentación", href: "/instrumentacion" },
  { title: "Resistencias y termocuplas", href: "/resistencias-electricas" },
  { title: "Ver todo el catálogo", href: "/catalogo" },
];

export function HomeHero() {
  return (
    <section className="hx" aria-labelledby="home-hero-title">
      {/* Oct-2026: sin foto de fondo (se repetía en el visor 3D más abajo); la imagen la ponen los suministros. */}
      <div className="hx-shade" aria-hidden="true" />
      <div className="container-max hx-inner">
        <div className="hx-copy">
          <p className="home-hero-kicker"><span aria-hidden="true" />Santo Domingo · República Dominicana</p>
          <h1 id="home-hero-title" className="hx-title">
            <span className="home-hero-brand">Dynatech Ingeniería<span className="sr-only"> —</span></span>{" "}
            Suministro industrial y taller de <span className="text-signal">cilindros y mecanizado.</span>
          </h1>
          <p className="hx-lead">
            Fabricamos y reparamos cilindros neumáticos e hidráulicos, y mecanizamos piezas con torno y fresadora.
            Suministramos neumática, control industrial, automatización, instrumentación, resistencias y termocuplas.
          </p>
          <div className="hx-actions" data-fab-hide="">
            <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-14 px-7">
              <WhatsAppIcon className="h-5 w-5" />Cotizar por WhatsApp<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="home-hero-note">Empieza con una foto de la pieza, su placa o el código. No necesitas todas las medidas.</p>
          <SupplyRail items={VITRINA_SUMINISTRO} />
        </div>
        <nav className="hx-paths" aria-label="¿Qué necesitas?">
          <p className="hx-paths-title">¿Qué necesitas?</p>
          <div className="hx-group">
            <p className="hx-group-title">Fabricación, reparación y mecanizado</p>
            <ul>
              {ACCESOS_TALLER.map((a) => (
                <li key={a.title}>
                  <Link href={a.href} className="hx-path">
                    {a.icon && <a.icon className="h-5 w-5 shrink-0 text-signal" aria-hidden="true" />}
                    <span><b>{a.title}</b><small>{a.text}</small></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 hx-path-arrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hx-group">
            <p className="hx-group-title">Suministro industrial</p>
            <ul className="hx-chips">
              {ACCESOS_SUMINISTRO.map((a) => (
                <li key={a.title}>
                  <Link href={a.href} className="hx-chip">{a.title}<ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
          </div>
          <a href={whatsappService("foto")} target="_blank" rel="noopener" className="hx-path hx-photo">
            <Camera className="h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
            <span><b>Solo tengo una foto</b><small>Te ayudamos a identificar la pieza</small></span>
            <WhatsAppIcon className="h-4 w-4 shrink-0 hx-path-arrow" />
            <span className="sr-only"> (abre WhatsApp)</span>
          </a>
        </nav>
      </div>
      <TrustStrip variant="cilindros" />
    </section>
  );
}

/**
 * Bloque 1 · Fabricación, reparación y mecanizado: cada trabajo con qué enviar y su cotización
 * directa (mensaje propio por servicio).
 */
const TALLER_PRINCIPAL = [
  {
    href: "/servicios",
    tag: "Especialidad",
    title: "Cilindros neumáticos",
    text: "Reparamos cilindros con fugas, desgaste o golpes y fabricamos cilindros nuevos a la medida, en milímetros o pulgadas.",
    send: "Fotos del cilindro y su placa, o el plano.",
    icon: Cylinder,
    actions: [
      { label: "Reparar", href: whatsappService("neumatico-reparar") },
      { label: "Fabricar", href: whatsappService("neumatico-fabricar") },
    ],
    links: [{ label: "Reparación", href: "/servicios" }, { label: "Fabricación", href: "/cilindros-neumaticos" }],
  },
  {
    href: "/cilindros-hidraulicos",
    title: "Cilindros hidráulicos",
    text: "Reparamos cilindros hidráulicos con fugas o daños y fabricamos cilindros nuevos para equipos industriales.",
    send: "Fotos del cilindro, conexiones y montajes, o el plano.",
    icon: Droplets,
    actions: [
      { label: "Reparar", href: whatsappService("hidraulico-reparar") },
      { label: "Fabricar", href: whatsappService("hidraulico-fabricar") },
    ],
    links: [{ label: "Ver cilindros hidráulicos", href: "/cilindros-hidraulicos" }],
  },
  {
    href: "/mecanizado",
    title: "Mecanizado de piezas",
    text: "Torneado y fresado de piezas industriales a partir de tu plano o de una muestra, como ejes, bujes, bridas o soportes.",
    send: "El plano, o fotos de la pieza con una referencia de tamaño.",
    icon: Cog,
    actions: [{ label: "Cotizar mecanizado", href: whatsappService("mecanizado") }],
    links: [{ label: "Ver mecanizado", href: "/mecanizado" }],
  },
] as const;

export function TallerPrincipal() {
  return (
    <Band tone="white" id="taller" labelledBy="taller-titulo">
      <SectionHead
        kicker="01 · Fabricación, reparación y mecanizado"
        id="taller-titulo"
        title={<>Taller de cilindros<br /><span className="text-steel-500">y mecanizado.</span></>}
        intro="Elige el trabajo y escríbenos por WhatsApp con el mensaje listo. Alcance, plazo y condiciones se confirman en la cotización."
      />
      <div className="taller-grid" data-fab-hide="">
        {TALLER_PRINCIPAL.map((t) => (
          <article key={t.title} className="taller-card">
            <div className="taller-card-head">
              <t.icon className="h-6 w-6 text-signal" aria-hidden="true" />
              {"tag" in t && <span className="taller-tag">{t.tag}</span>}
            </div>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            <p className="taller-send"><span>Qué enviar</span>{t.send}</p>
            <div className="taller-actions">
              {t.actions.map((a) => (
                <a key={a.label} href={a.href} target="_blank" rel="noopener" className="taller-quote">
                  <WhatsAppIcon className="h-4 w-4" />{a.label}<span className="sr-only">: {t.title}, cotizar por WhatsApp</span>
                </a>
              ))}
            </div>
            <div className="taller-links">
              {t.links.map((l) => (
                <Link key={l.href} href={l.href}>{l.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Band>
  );
}

/**
 * Imagen (de referencia), enlaces y cotización de cada grupo. Los enlaces apuntan a páginas y
 * anclas existentes de SOLUCIONES; no hay productos nuevos.
 */
const GRUPO_VISUAL: Record<GrupoId, { image: string; quote: string; links: { label: string; href: string }[] }> = {
  neumatica: {
    image: "/banners/neumatica-industrial-conectores.webp",
    quote: whatsappService("componente"),
    links: [{ label: "Válvulas", href: "/valvulas-neumaticas" }, { label: "Conexiones y FRL", href: "/neumatica#conexiones" }, { label: "Sellos y vástagos", href: "/sellos-y-componentes" }],
  },
  control: {
    image: "/banners/control-electrico.webp",
    quote: whatsappSolucion("Control eléctrico"),
    links: [{ label: "Control eléctrico", href: "/control-electrico" }, { label: "Gabinetes eléctricos", href: "/gabinetes-electricos" }],
  },
  automatizacion: {
    image: "/banners/sensores-fotoceldas.webp",
    quote: whatsappSolucion("Sensores"),
    links: [{ label: "Sensores", href: "/sensores" }, { label: "Temporizadores y contadores", href: "/control-electrico#temporizadores" }],
  },
  instrumentacion: {
    image: "/banners/instrumentacion-procesos.webp",
    quote: whatsappSolucion("Instrumentación"),
    links: [{ label: "Presión", href: "/instrumentacion#presion" }, { label: "Temperatura", href: "/instrumentacion#temperatura" }],
  },
  resistencias: {
    image: "/banners/resistencias-electricas-industriales.webp",
    quote: whatsappSolucion("Resistencias eléctricas"),
    links: [{ label: "Resistencias de cartucho", href: "/resistencias-electricas#cartucho" }, { label: "Termocuplas y RTD", href: "/resistencias-electricas#termocuplas" }],
  },
};

/**
 * Bloque 2 · Suministro industrial. Mantiene el ancla #soluciones (WEB-010). Control,
 * automatización e instrumentación son solo suministro (aviso visible).
 */
export function SuministroIndustrial() {
  return (
    <Band tone="light" id="soluciones" labelledBy="suministro-titulo">
      <SectionHead
        kicker="02 · Suministro industrial"
        id="suministro-titulo"
        title={<>Componentes para<br /><span className="text-steel-500">tu planta.</span></>}
        intro="Cotizamos con el código, una foto de la placa o la descripción. Elige el grupo para ver qué suministramos."
      />
      <ul className="supply-grid" data-fab-hide="">
        {GRUPOS_SUMINISTRO.map((g) => {
          const v = GRUPO_VISUAL[g.id];
          const principal = SOLUCIONES.find((s) => s.grupo === g.id)!;
          return (
            <li key={g.id} className="supply-card">
              <Link href={`/${principal.slug}`} className="supply-media" tabIndex={-1} aria-hidden="true">
                <Image src={v.image} alt="" fill sizes="(max-width: 639px) 120px, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
                <span className="img-note">Referencia</span>
              </Link>
              <div className="supply-body">
                <h3><Link href={`/${principal.slug}`}>{g.title}</Link></h3>
                <p>{g.desc}</p>
                <div className="supply-lines">
                  {v.links.map((l) => (
                    <Link key={l.href} href={l.href}>{l.label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
                  ))}
                </div>
                <a href={v.quote} target="_blank" rel="noopener" className="supply-quote">
                  <WhatsAppIcon className="h-4 w-4" />Cotizar<span className="sr-only"> {g.title.toLowerCase()} por WhatsApp</span>
                </a>
              </div>
            </li>
          );
        })}
        <li className="supply-card is-cta">
          <div className="supply-body">
            <Camera className="h-6 w-6 text-signal" aria-hidden="true" />
            <h3>¿No conoces la referencia?</h3>
            <p>Envía una foto de la pieza y de su placa, y te ayudamos a identificarla.</p>
            <a href={whatsappService("foto")} target="_blank" rel="noopener" className="supply-quote">
              <WhatsAppIcon className="h-4 w-4" />Enviar foto por WhatsApp
            </a>
            <Link href="/catalogo" className="supply-all">Ver todo el catálogo <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </li>
      </ul>
      <p className="supply-scope"><Info className="h-4 w-4 shrink-0" aria-hidden="true" /><span><b>Control, automatización e instrumentación:</b> {SOLO_SUMINISTRO}</span></p>
    </Band>
  );
}

const SECTORES = [
  { icon: Wrench, title: "Mantenimiento de planta", text: "Repuestos y reparación de cilindros para que tus máquinas vuelvan a operar: cilindros, sellos, válvulas, sensores y componentes de tablero." },
  { icon: Building2, title: "Zonas francas", text: "Atendemos solicitudes de empresas de zonas francas en República Dominicana, con la referencia o la muestra de lo que necesitas." },
  { icon: Factory, title: "Industria del sector privado", text: "Fabricación bajo plano o muestra y suministro industrial para plantas de producción y proyectos." },
] as const;

export function Sectores() {
  return (
    <Band tone="white" labelledBy="sectores-titulo">
      <SectionHead kicker="06 · Para quién trabajamos" id="sectores-titulo" title={<>Para quien mantiene<br />la planta en marcha.</>} />
      <div className="sector-grid">
        {SECTORES.map((s) => (
          <article key={s.title} className="sector-card">
            <s.icon className="h-6 w-6 text-signal" aria-hidden="true" />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </Band>
  );
}
