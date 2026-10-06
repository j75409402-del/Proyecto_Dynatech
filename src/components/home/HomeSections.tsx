import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Factory, GitFork, Wrench, Cylinder, Hammer, Package, Ruler } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { TrustStrip } from "@/components/page/TrustStrip";
import { Band, SectionHead } from "@/components/page/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappChat, whatsappGeneral } from "@/lib/whatsapp";

/**
 * Portada WEB-020 (rediseño de conversión sobre WEB-010).
 * - CTA principal "Solicitar cotización" (→ /cotizacion → WhatsApp, quote_whatsapp_click).
 * - CTA secundario "WhatsApp" (chat directo, whatsapp_click).
 * - Imagen sin personas ni logotipos, rotulada "Imagen de referencia" (auditoría H-W2).
 * - Sin clientes, cifras, certificaciones ni marcas representadas.
 */

const ACCESOS = [
  { icon: Wrench, title: "Reparar un cilindro", text: "Fugas, desgaste o golpes", href: "/servicios" },
  { icon: Cylinder, title: "Fabricar un cilindro", text: "Bajo plano, muestra o medidas", href: "/cilindros-neumaticos" },
  { icon: Package, title: "Sellos y componentes", text: "Kits, vástagos y piezas", href: "/sellos-y-componentes" },
  { icon: Factory, title: "Suministro industrial", text: "Neumática, eléctrico e instrumentación", href: "#soluciones" },
] as const;

export function HomeHero() {
  return (
    <section className="hx" aria-labelledby="home-hero-title">
      <div className="hx-media" aria-hidden="true">
        <Image src="/banners/cilindros-taller-wide.webp" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "60% 40%" }} />
      </div>
      <div className="hx-shade" aria-hidden="true" />
      <div className="container-max hx-inner">
        <div className="hx-copy">
          <p className="home-hero-kicker"><span aria-hidden="true" />Santo Domingo · República Dominicana</p>
          <h1 id="home-hero-title" className="hx-title">
            <span className="home-hero-brand">Dynatech Ingeniería<span className="sr-only"> —</span></span>{" "}
            Taller de cilindros y suministro industrial <span className="text-signal">en Santo Domingo.</span>
          </h1>
          <p className="hx-lead">Reparamos y fabricamos cilindros neumáticos. Cotizamos neumática, válvulas, sensores, instrumentación, control eléctrico, gabinetes y resistencias para tu planta.</p>
          <div className="hx-actions" data-fab-hide="">
            <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-14 px-7">
              Solicitar cotización<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={whatsappChat()} target="_blank" rel="noopener" className="btn-secondary home-hero-secondary home-hero-wa min-h-14 px-6">
              <WhatsAppIcon className="h-5 w-5" />WhatsApp
            </a>
          </div>
          <p className="home-hero-note">Envía foto, código, plano o medidas. «Solicitar cotización» abre WhatsApp con tu solicitud lista.</p>
        </div>
        <nav className="hx-paths" aria-label="¿Qué necesitas?">
          <p className="hx-paths-title">¿Qué necesitas?</p>
          <ul>
            {ACCESOS.map((a) => {
              const Tag = a.href.startsWith("#") ? "a" : Link;
              return (
                <li key={a.title}>
                  <Tag href={a.href} className="hx-path">
                    <a.icon className="h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                    <span><b>{a.title}</b><small>{a.text}</small></span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 hx-path-arrow" aria-hidden="true" />
                  </Tag>
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

const TALLER = [
  { href: "/cilindros-neumaticos", title: "Cilindros neumáticos", short: "Fabricación a la medida: doble y simple efecto, compactos, ISO y especiales.", icon: Cylinder },
  { href: "/servicios", title: "Reparación de cilindros", short: "Desarme, cambio de sellos y componentes, y prueba antes de entregar.", icon: Wrench },
  { href: "/sellos-y-componentes", title: "Sellos y componentes", short: "Kits de sellos, vástagos y componentes bajo medida.", icon: Package },
  { href: "/cilindros-hidraulicos", title: "Cilindros hidráulicos", short: "Fabricación y reparación a partir de fotos, plano o muestra.", icon: Hammer },
  { href: "/mecanizado", title: "Mecanizado", short: "Piezas bajo plano o muestra, con la cantidad que necesitas.", icon: Ruler },
] as const;

/** Categorías visibles (taller + suministro). Mantiene el ancla #soluciones de WEB-010. */
export function Categorias() {
  return (
    <Band tone="light" id="soluciones" labelledBy="categorias-titulo">
      <SectionHead
        kicker="01 · Qué ofrecemos"
        id="categorias-titulo"
        title={<>Taller y suministro.<br /><span className="text-steel-500">En un solo proveedor.</span></>}
        intro="Elige la línea para ver qué cotizamos y qué datos necesitamos. Si no la encuentras, envíanos una foto o el código."
      />
      <div className="cat-groups" data-fab-hide="">
        <div>
          <p className="cat-group-title">Cilindros y taller</p>
          <ul className="cat-list">
            {TALLER.map((t) => (
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
            <li>
              <Link href="/valvulas-neumaticas" className="cat-item">
                <span className="cat-icon"><GitFork className="h-5 w-5" aria-hidden="true" /></span>
                <span className="cat-text"><b>Válvulas neumáticas</b><small>Direccionales y solenoides para controlar el paso del aire.</small></span>
                <ArrowUpRight className="h-4 w-4 shrink-0 cat-arrow" aria-hidden="true" />
              </Link>
            </li>
            {SOLUCIONES.map((s) => (
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
      <SectionHead kicker="05 · Para quién trabajamos" id="sectores-titulo" title={<>Para quien mantiene<br />la planta en marcha.</>} />
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
