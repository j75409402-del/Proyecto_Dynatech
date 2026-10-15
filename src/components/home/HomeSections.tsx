import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Camera, Cog, Droplets, Factory, GitFork, Wrench, Cylinder, Package, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TrustStrip } from "@/components/page/TrustStrip";
import { Band, SectionHead } from "@/components/page/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral, whatsappService } from "@/lib/whatsapp";

/**
 * Portada (mejora de conversión, oct-2026, sobre WEB-020).
 * - H1 directo: fabricación y reparación de cilindros neumáticos e hidráulicos + mecanizado.
 *   La neumática sigue como especialidad; las líneas de suministro bajan a #soluciones.
 * - Un solo CTA «Cotizar por WhatsApp» (→ /cotizacion → WhatsApp, quote_whatsapp_click).
 * - «¿Qué necesitas?»: un acceso por necesidad; cada uno lleva a su página o, en «Solo tengo
 *   una foto», directo a WhatsApp con su mensaje (svc=foto).
 * - Imagen sin personas ni logotipos, rotulada "Imagen de referencia" (auditoría H-W2).
 * - Sin clientes, cifras, certificaciones ni marcas representadas.
 */

type Acceso = { icon: LucideIcon; title: string; text: string; href: string; quote?: boolean };
const ACCESOS: Acceso[] = [
  { icon: Wrench, title: "Reparar un cilindro neumático", text: "Fugas, desgaste, golpes", href: "/servicios" },
  { icon: Cylinder, title: "Fabricar un cilindro neumático", text: "Bajo plano, muestra o medidas", href: "/cilindros-neumaticos" },
  { icon: Droplets, title: "Cilindro hidráulico", text: "Reparación o fabricación", href: "/cilindros-hidraulicos" },
  { icon: Cog, title: "Mecanizar una pieza", text: "Bajo plano o muestra", href: "/mecanizado" },
  { icon: GitFork, title: "Válvula, conexión u otro componente", text: "Con el código o una foto", href: "/neumatica" },
  { icon: Camera, title: "Solo tengo una foto", text: "Te ayudamos a identificarla", href: whatsappService("foto"), quote: true },
];

export function HomeHero() {
  return (
    <section className="hx" aria-labelledby="home-hero-title">
      <div className="hx-media" aria-hidden="true">
        <Image src="/banners/cilindros-taller-wide.webp" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "60% 40%" }} />
      </div>
      <div className="hx-shade" aria-hidden="true" />
      <div className="container-max hx-inner">
        <div className="hx-copy">
          <p className="home-hero-kicker"><span aria-hidden="true" />Taller en Santo Domingo · RD</p>
          <h1 id="home-hero-title" className="hx-title">
            <span className="home-hero-brand">Dynatech Ingeniería<span className="sr-only"> —</span></span>{" "}
            Fabricación y reparación de cilindros <span className="text-signal">neumáticos e hidráulicos.</span>
          </h1>
          <p className="hx-lead">También mecanizamos piezas bajo plano o muestra. Neumática industrial: nuestra especialidad.</p>
          <div className="hx-actions" data-fab-hide="">
            <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-14 px-7">
              <WhatsAppIcon className="h-5 w-5" />Cotizar por WhatsApp<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="home-hero-note">Empieza con una foto de la pieza o de su placa. No necesitas todas las medidas.</p>
        </div>
        <nav className="hx-paths" aria-label="¿Qué necesitas?">
          <p className="hx-paths-title">¿Qué necesitas?</p>
          <ul>
            {ACCESOS.map((a) => {
              const inner = (
                <>
                  <a.icon className="h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                  <span><b>{a.title}</b><small>{a.text}</small></span>
                  {a.quote
                    ? <WhatsAppIcon className="h-4 w-4 shrink-0 hx-path-arrow" />
                    : <ArrowUpRight className="h-4 w-4 shrink-0 hx-path-arrow" aria-hidden="true" />}
                </>
              );
              return (
                <li key={a.title}>
                  {a.quote
                    ? <a href={a.href} target="_blank" rel="noopener" className="hx-path">{inner}<span className="sr-only"> (abre WhatsApp)</span></a>
                    : <Link href={a.href} className="hx-path">{inner}</Link>}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <p className="hx-note container-max"><span>Imagen de referencia</span></p>
      <TrustStrip variant="cilindros" />
    </section>
  );
}

/**
 * Los tres trabajos de taller que se quieren vender hoy, cada uno con qué enviar y su cotización
 * directa (mensaje propio por servicio).
 */
const TALLER_PRINCIPAL = [
  {
    href: "/servicios",
    tag: "Especialidad",
    title: "Cilindros neumáticos",
    text: "Reparamos cilindros con fugas, desgaste o golpes y fabricamos cilindros nuevos a la medida, en mm o pulgadas.",
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
    text: "Reparamos y fabricamos cilindros hidráulicos para equipos industriales.",
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
    text: "Fabricamos piezas industriales a partir de tu plano o de una muestra.",
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
        kicker="01 · Taller"
        id="taller-titulo"
        title={<>Reparamos, fabricamos<br /><span className="text-steel-500">y mecanizamos.</span></>}
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
 * Componentes y suministro (antes «Taller y suministro»). El taller ya se presenta en #taller;
 * aquí quedan todas las líneas de componentes. Mantiene el ancla #soluciones de WEB-010.
 */
export function Categorias() {
  return (
    <Band tone="light" id="soluciones" labelledBy="categorias-titulo">
      <SectionHead
        kicker="04 · Componentes y suministro"
        id="categorias-titulo"
        title={<>Componentes neumáticos<br /><span className="text-steel-500">y suministro industrial.</span></>}
        intro="Elige la línea para ver qué cotizamos. Si no la encuentras o no conoces la referencia, envíanos una foto."
      />
      <div className="cat-groups" data-fab-hide="">
        <div>
          <p className="cat-group-title">Neumática y cilindros</p>
          <ul className="cat-list">
            {[
              { href: "/valvulas-neumaticas", title: "Válvulas neumáticas", short: "Direccionales y solenoides para controlar el paso del aire.", icon: GitFork },
              { href: "/sellos-y-componentes", title: "Sellos y componentes", short: "Kits de sellos, vástagos y componentes para cilindros.", icon: Package },
              ...SOLUCIONES.filter((s) => s.slug === "neumatica").map((s) => ({ href: `/${s.slug}`, title: s.name, short: s.short, icon: s.icon })),
            ].map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="cat-item">
                  <span className="cat-icon"><t.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="cat-text"><b>{t.title}</b><small>{t.short}</small></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 cat-arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="cat-group-title">Suministro industrial</p>
          <ul className="cat-list">
            {SOLUCIONES.filter((s) => s.slug !== "neumatica").map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="cat-item">
                  <span className="cat-icon"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="cat-text"><b>{s.name}</b><small>{s.short}</small></span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 cat-arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}

const SECTORES = [
  { icon: Wrench, title: "Mantenimiento de planta", text: "Repuestos y reparaciones para que tus máquinas vuelvan a operar: cilindros, sellos, válvulas, sensores y componentes de tablero." },
  { icon: Building2, title: "Zonas francas", text: "Atendemos solicitudes de empresas de zonas francas en República Dominicana, con la referencia o la muestra de lo que necesitas." },
  { icon: Factory, title: "Industria del sector privado", text: "Fabricación bajo plano o muestra y suministro industrial para plantas de producción y proyectos." },
] as const;

export function Sectores() {
  return (
    <Band tone="white" labelledBy="sectores-titulo">
      <SectionHead kicker="06 · Para quién trabajamos" id="sectores-titulo" title={<>Para quien mantiene<br />la planta en marcha.</>} />
      <div className="sector-grid">
        {SECTORES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05} className="h-full">
            <article className="sector-card">
              <s.icon className="h-6 w-6 text-signal" aria-hidden="true" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
