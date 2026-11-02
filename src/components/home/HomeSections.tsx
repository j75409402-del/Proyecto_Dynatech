import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Camera, Cog, Cylinder, Droplets, FileText, Mail, Wrench, Info } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Band, SectionHead } from "@/components/page/Blocks";
import { SOLO_SUMINISTRO, getSolucion } from "@/lib/soluciones";
import { CONTACT, emailHref } from "@/lib/constants";
import { whatsappGeneral, whatsappService } from "@/lib/whatsapp";
import { quoteHref } from "@/components/cta/QuoteCTA";

/** WEB-030: suministro B2B primero; foto propia confirmada en trabajos-taller.ts. */
export function HomeHero() {
  return (
    <section className="b2b-hero" aria-labelledby="home-hero-title">
      <div className="container-max b2b-hero-grid">
        <div className="b2b-hero-copy">
          <p className="home-hero-kicker"><span aria-hidden="true" />Dynatech Ingeniería</p>
          <h1 id="home-hero-title">Suministros industriales para mantener tu operación <span>en marcha.</span></h1>
          <p className="b2b-hero-lead">Suministramos componentes y soluciones industriales para los departamentos de Compras, Mantenimiento e Ingeniería de empresas y zonas francas en República Dominicana.</p>
          <div className="b2b-hero-actions" data-fab-hide="">
            <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-14 px-6"><WhatsAppIcon className="h-5 w-5" />Solicitar cotización<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <Link href="/catalogo" className="btn-secondary home-hero-secondary min-h-14 px-6">Explorar catálogo<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <p className="b2b-hero-note">Suministro industrial bajo cotización y pedido.</p>
        </div>
        <figure className="b2b-hero-photo">
          <Image src="/cilindros/trabajo-real-cilindros-dynatech-recorte.jpg" alt="Cilindros neumáticos fabricados por Dynatech junto al cilindro que sirvió de muestra" fill priority sizes="(max-width: 1023px) 100vw, 46vw" className="object-cover" />
          <figcaption><span>Trabajo realizado por Dynatech</span><strong>Especialistas en neumática.</strong><Link href="/cilindros-neumaticos">Explorar Cilindros 3D<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></figcaption>
        </figure>
      </div>
      <div className="b2b-hero-foot"><div className="container-max"><span>Santo Domingo · República Dominicana</span><span>Neumática · Automatización · Suministro industrial</span></div></div>
    </section>
  );
}

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
        kicker="Servicios técnicos"
        id="taller-titulo"
        title={<>Fabricación, reparación<br /><span className="text-steel-500">y mecanizado.</span></>}
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


// Solo categorías publicadas: imágenes y descripciones vienen del catálogo actual.
const neumatica = getSolucion("neumatica");
const sub = (id: string) => neumatica.subcategorias.find((s) => s.id === id)!;
const CATEGORIAS = [
  { title: "Cilindros neumáticos", text: "Cilindros, fabricación a medida y componentes.", href: "/cilindros-neumaticos", image: sub("cilindros").image!, imageAlt: sub("cilindros").imageAlt ?? "Cilindros neumáticos", quote: quoteHref("Cilindros neumáticos", "Neumática"), related: { href: "/neumatica#cilindros", label: "Ver en catálogo" } },
  { title: "Válvulas neumáticas", text: "Válvulas y electroválvulas para circuitos neumáticos.", href: "/valvulas-neumaticas", image: sub("valvulas").image!, imageAlt: sub("valvulas").imageAlt ?? "Válvulas neumáticas", quote: quoteHref("Válvulas neumáticas", "Neumática") },
  { title: "FRL y accesorios neumáticos", text: "Preparación de aire, conexiones y mangueras.", href: "/neumatica#frl", image: sub("frl").image!, imageAlt: sub("frl").imageAlt ?? "Unidades FRL y accesorios", quote: quoteHref("Unidades FRL y accesorios", "Neumática"), related: { href: "/neumatica#conexiones", label: "Conexiones y accesorios" } },
  { title: "Cilindros hidráulicos", text: "Reparación y fabricación según tu aplicación.", href: "/cilindros-hidraulicos", image: "/taller/cilindro-hidraulico-fabricado-poster.jpg", imageAlt: "Cilindro hidráulico fabricado en el torno", quote: whatsappService("hidraulico"), real: true },
  ...["control-electrico", "sensores", "instrumentacion", "resistencias-electricas"].map((slug) => {
    const line = getSolucion(slug);
    return { title: line.name, text: line.short, href: `/${slug}`, image: line.image, imageAlt: line.imageAlt, quote: quoteHref(line.name, "Suministro industrial"), related: slug === "control-electrico" ? { href: "/gabinetes-electricos", label: "También gabinetes eléctricos" } : undefined };
  }),
];

export function SuministroIndustrial() {
  return (
    <Band tone="light" id="soluciones" labelledBy="suministro-titulo">
      <SectionHead kicker="01 / Líneas industriales" id="suministro-titulo" title={<>El componente que necesita<br /><span className="text-steel-500">tu operación.</span></>} intro="Explora nuestras categorías y envíanos la referencia, cantidad o especificación. Confirmamos disponibilidad y condiciones en tu cotización." />
      <ul className="b2b-categories" data-fab-hide="">
        {CATEGORIAS.map((c, i) => (
          <li key={c.href} className="b2b-category">
            <Link href={c.href} className="b2b-category-image" tabIndex={-1} aria-hidden="true">
              <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 639px) 40vw, (max-width: 1023px) 45vw, 30vw" className={"real" in c ? "object-cover" : "object-contain p-5"} />
              <span>{"real" in c ? "Trabajo real" : "Referencia de categoría"}</span>
            </Link>
            <div className="b2b-category-body"><span className="b2b-index">{String(i + 1).padStart(2, "0")}</span><h3><Link href={c.href}>{c.title}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></h3><p>{c.text}</p>
              {"related" in c && c.related && <Link href={c.related.href} className="b2b-category-related">{c.related.label}</Link>}
              <a href={c.quote} target="_blank" rel="noopener" className="supply-quote"><WhatsAppIcon className="h-4 w-4" />Solicitar cotización<span className="sr-only">: {c.title}</span></a>
            </div>
          </li>
        ))}
        <li className="b2b-category b2b-category-query"><div className="b2b-category-body"><Camera className="h-7 w-7 text-signal" aria-hidden="true" /><span className="b2b-index">09 / Consulta especializada</span><h3>¿Buscas otro componente?</h3><p>Envíanos el código, una foto de la placa o tu requerimiento. Revisamos tu solicitud antes de cotizar.</p><a href={whatsappService("foto")} target="_blank" rel="noopener" className="supply-quote"><WhatsAppIcon className="h-4 w-4" />Consultar por WhatsApp</a><Link href="/catalogo" className="b2b-category-related">Explorar el catálogo completo <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></li>
      </ul>
      <p className="supply-scope"><Info className="h-4 w-4 shrink-0" aria-hidden="true" /><span><b>Control, automatización e instrumentación:</b> {SOLO_SUMINISTRO}</span></p>
    </Band>
  );
}

const SECTORES = [
  { icon: BriefcaseBusiness, title: "Compras", text: "Solicita componentes por referencia y cantidad. Recibe una cotización para gestionar tu orden de compra." },
  { icon: Wrench, title: "Mantenimiento", text: "Comparte el código, la placa o una foto del repuesto que necesita tu equipo." },
  { icon: Cog, title: "Ingeniería", text: "Envíanos los planos, las especificaciones o los requerimientos de componentes para tu aplicación." },
];
export function Sectores() {
  return (
    <Band tone="white" labelledBy="sectores-titulo">
      <SectionHead kicker="02 / Atención a empresas" id="sectores-titulo" title={<>De tu requerimiento<br />a una cotización clara.</>} intro="Atendemos solicitudes de empresas manufactureras y zonas francas en República Dominicana. Coordina tu solicitud por WhatsApp o correo, sin necesidad de visitar la tienda." />
      <div className="sector-grid">{SECTORES.map((s) => <article key={s.title} className="sector-card"><s.icon className="h-6 w-6 text-signal" aria-hidden="true" /><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
    </Band>
  );
}

export function VentajasB2B() {
  return (
    <Band tone="light" labelledBy="ventajas-titulo">
      <SectionHead kicker="04 / Por qué Dynatech" id="ventajas-titulo" title="Conversemos sobre lo que necesitas." intro="Un proveedor de suministros industriales, especializado en neumática y componentes de automatización." />
      <div className="b2b-benefits">
        {[
          { icon: Cylinder, title: "Especialización en neumática", text: "Cilindros, válvulas, preparación de aire y componentes, con páginas de referencia para orientar tu solicitud." },
          { icon: FileText, title: "Condiciones por escrito", text: "Disponibilidad, precio, condiciones y tiempo de entrega se confirman en la cotización de cada pedido." },
          { icon: Camera, title: "Empieza con lo que tengas", text: "Código, foto, plano o especificaciones. Si hace falta información, continuamos la conversación por el mismo canal." },
        ].map((b) => <article key={b.title}><b.icon className="h-6 w-6 text-signal" aria-hidden="true" /><h3>{b.title}</h3><p>{b.text}</p></article>)}
      </div>
    </Band>
  );
}

export function ContactoB2B() {
  return (
    <section className="b2b-contact" aria-labelledby="b2b-contact-title">
      <div className="container-max b2b-contact-grid">
        <div><p className="section-kicker">05 / Contacto B2B</p><h2 id="b2b-contact-title" className="section-title">Tu próximo pedido<br />empieza aquí.</h2><p>Envíanos la referencia, la cantidad y los datos de tu empresa. También puedes adjuntar fotos o especificaciones en WhatsApp.</p></div>
        <div className="b2b-contact-actions" data-fab-hide=""><a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-14"><WhatsAppIcon className="h-5 w-5" />Solicitar cotización<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a><a href={emailHref()} className="b2b-email"><Mail className="h-5 w-5 shrink-0" aria-hidden="true" /><span><small>Correo comercial</small>{CONTACT.email}</span><ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></a><Link href="/contacto" className="b2b-contact-more">Ver todos los canales y horarios<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
