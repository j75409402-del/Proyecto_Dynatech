import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Box } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { SERVICIOS, COMPONENTES } from "@/lib/servicios";
import { whatsappService, whatsappCylinderService } from "@/lib/whatsapp";
import type { QuoteService } from "@/lib/quote";
import { CYLINDER_PARTS } from "@/lib/industrial-scenes";
import { BeforeAfterSlider } from "@/components/industrial/BeforeAfterSlider";
import { WorkRail } from "@/components/industrial/WorkRail";
import { Band, SectionHead } from "@/components/page/Blocks";
import { TRABAJOS_TALLER } from "@/lib/trabajos-taller";
import { Reveal } from "@/components/motion/Reveal";

const DETALLE: Record<string, string> = { fabricacion: "Ver tipos de cilindro", reparacion: "Ver reparación de cilindros", "kits-de-sellos": "Ver sellos y componentes" };
const SVC: Record<string, QuoteService> = { fabricacion: "neumatico-fabricar", reparacion: "neumatico-reparar", "kits-de-sellos": "componente" };

export function CilindrosDestacados() {
  const principales = [SERVICIOS[0], SERVICIOS[1], COMPONENTES[0]];
  return (
    <section className="section-pad border-b border-black/10 bg-[#F4F5F6]">
      <div className="container-max">
        <div className="section-heading mb-12">
          <div><p className="section-kicker">Conoce nuestra especialidad</p><h2 className="section-title">Cilindros neumáticos.<br /><span className="text-steel-500">De principio a fin.</span></h2></div>
          <p className="max-w-md text-steel-300 leading-relaxed">Fabricación a medida, reparación y componentes para mantener tu equipo en operación. Trabajamos a partir de la información de tu aplicación.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Link href="/cilindros-neumaticos" className="cyl-preview group" aria-label="Explorar el cilindro neumático en 3D: piezas y funciones">
            <span className="cyl-preview-stage">
              <Image src="/banners/cilindros-taller-wide.webp" alt="Imagen de referencia: cilindro neumático con sus componentes sobre el banco" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
              <span className="img-note">Imagen de referencia</span>
              <span className="cyl-preview-badge"><Box className="h-4 w-4" aria-hidden="true" />Visor 3D</span>
            </span>
            <span className="cyl-preview-body">
              <span className="cyl-preview-title">Explora un cilindro por dentro</span>
              <span className="cyl-preview-text">Gíralo, ábrelo y conoce la función de cada pieza. En equipos sin 3D verás la referencia fotográfica.</span>
              <span className="cyl-preview-parts" aria-hidden="true">
                {CYLINDER_PARTS.map((part, i) => <span key={part.id}><b>0{i + 1}</b>{part.name}</span>)}
              </span>
              <span className="cyl-preview-cta">Abrir la experiencia <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
            </span>
          </Link>
          <div className="divide-y divide-black/10 border-t border-black/10" data-fab-hide="">
            {principales.map((s, i) => (
              <article key={s.id} className="py-7">
                <div className="mb-3 flex items-center gap-3"><span className="font-mono text-xs text-signal">0{i + 1}</span><s.icon className="h-5 w-5 shrink-0 text-signal" /><h3 className="font-display text-xl font-medium sm:text-2xl">{s.title}</h3></div>
                <p className="mb-4 text-sm leading-relaxed text-steel-300 sm:text-base">{s.desc}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2"><a href={SVC[s.id] ? whatsappService(SVC[s.id], SVC[s.id] === "componente" ? s.title : undefined) : quoteHref(s.title)} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-signal"><WhatsAppIcon className="h-4 w-4" />Cotizar por WhatsApp<span className="sr-only">: {s.title}</span></a><Link href={s.href} className="inline-flex min-h-11 items-center gap-2 text-sm text-steel-400 hover:text-signal">{DETALLE[s.id] ?? "Ver página"} <ArrowUpRight className="h-4 w-4" /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComoTrabajamos() {
  const pasos = [
    { title: "Envíanos tu requerimiento.", text: "Referencia, código, cantidad o una foto. Añade las especificaciones que tengas." },
    { title: "Recibe una cotización.", text: "Revisamos tu solicitud y confirmamos disponibilidad, precio, condiciones y plazo." },
    { title: "Confirma tu orden de compra.", text: "Formaliza tu pedido con las condiciones acordadas en la cotización." },
    { title: "Coordinamos el suministro y la entrega.", text: "Acordamos contigo los detalles de entrega y facturación de tu pedido." },
  ];
  return (
    <section className="b2b-process" aria-labelledby="proceso-titulo">
      <div className="container-max">
        <div className="b2b-process-head"><div><p className="section-kicker">Cómo se cotiza</p><h2 id="proceso-titulo" className="section-title">De tu requerimiento a la entrega.</h2></div><a href={whatsappService("foto")} target="_blank" rel="noopener" className="btn-primary min-h-12" data-fab-hide=""><WhatsAppIcon className="h-5 w-5" />Cotizar por WhatsApp<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
        <ol className="b2b-steps">{pasos.map((p,i) => <li key={p.title}><span>{String(i+1).padStart(2,"0")}</span><h3>{p.title}</h3><p>{p.text}</p></li>)}</ol>
        <p className="b2b-conditions">Disponibilidad, precios, condiciones y tiempos de entrega sujetos a cotización. El catálogo es una referencia de nuestras líneas; no muestra inventario en tiempo real.</p>
      </div>
    </section>
  );
}

/** Antes/después con las fotos ya publicadas (mismo caso que /cilindros-neumaticos). */
/**
 * Pasarela «trabajos de nuestro taller», justo debajo de la portada (oct-2026).
 * Fotos y videos reales confirmados (src/lib/trabajos-taller.ts): cilindros neumáticos e hidráulicos.
 * Cada imagen sale una sola vez en la portada: la galería de hidráulicos de más abajo se retiró.
 */
export function TrabajosTaller() {
  // La foto neumática ya protagoniza el hero; el resto conserva su visor y video.
  const trabajos = TRABAJOS_TALLER.filter((t) => t.src !== "/cilindros/trabajo-real-cilindros-dynatech.jpg");
  return (
    <Band tone="light" id="trabajos-taller" labelledBy="trabajos-taller-titulo" className="work-band">
      <SectionHead
        kicker="Trabajos reales"
        id="trabajos-taller-titulo"
        title="Cilindros: trabajos de nuestro taller"
        intro="Conoce algunos de nuestros trabajos de fabricación y reparación de cilindros neumáticos e hidráulicos."
      />
      <div className={`work-body ${trabajos.length < 3 ? "is-few" : ""}`}>
        <WorkRail items={trabajos} label="Fotos y videos de trabajos del taller" />
        <div className="work-cta" data-fab-hide="">
          <a href={whatsappCylinderService()} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">
            <WhatsAppIcon className="h-4 w-4" />Cotizar un cilindro neumático<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={whatsappService("hidraulico")} target="_blank" rel="noopener" className="btn-secondary min-h-12 px-6">
            <WhatsAppIcon className="h-4 w-4" />Cotizar un cilindro hidráulico
          </a>
          <Link href="/cilindros-hidraulicos" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-signal">Ver cilindros hidráulicos <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/mecanizado" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-signal">Ver mecanizado <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </Band>
  );
}

export function AntesDespues() {
  return (
    <section className="section-pad border-b border-black/10 bg-white" aria-labelledby="antes-despues-inicio">
      <div className="container-max">
        <Reveal className="section-heading mb-10">
          <div><p className="section-kicker">Trabajos del taller</p><h2 id="antes-despues-inicio" className="section-title">Antes y después.</h2></div>
          <p className="max-w-md leading-relaxed text-steel-300">Cilindro ISO 32 mm recuperado en nuestro taller. Desliza para comparar.</p>
        </Reveal>
        <Reveal>
          <BeforeAfterSlider
            before={{ src: "/cilindros/antes-cilindro-iso-32mm.jpg", alt: "Antes · Cilindro ISO 32 mm" }}
            after={{ src: "/cilindros/despues-cilindro-iso-32mm.jpg", alt: "Después · Cilindro ISO 32 mm recuperado" }}
          />
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-steel-300">Una reconstrucción incluye desarme, reemplazo de los componentes dañados, ensamblaje y prueba de funcionamiento antes de entregar.</p>
            <a href={whatsappService("neumatico-reparar")} target="_blank" rel="noopener" className="btn-primary min-h-12 shrink-0 px-6" data-fab-hide=""><WhatsAppIcon className="h-4 w-4" />Cotizar por WhatsApp<span className="sr-only">: reparación de cilindro neumático</span></a>
          </div>
        </Reveal>
        {/* Oct-2026: la foto real de cilindros neumáticos y las fotos y videos de hidráulicos pasaron a la pasarela bajo la portada (TrabajosTaller). */}
      </div>
    </section>
  );
}
