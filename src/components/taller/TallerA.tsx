import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "@/components/motion/Reveal";
import { CorreoButton } from "@/components/taller/CorreoButton";

export { CorreoButton };

/**
 * Dirección A «Taller primero» (aprobada por el dueño el 17-nov-2026).
 * Bloques compartidos por la portada y /cilindros-neumaticos. Estilos `.ta-*` en globals.css.
 * Reglas: fotos reales del taller o recortes de producto; poco texto; nada de antes/después ISO 32 mm.
 */

export function TaHero({
  id,
  kicker,
  title,
  lead,
  whatsappHref,
  correoItem,
  notes,
  image,
  imageAlt,
  caption,
  objectPosition = "50% 60%",
  top,
  children,
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  lead: ReactNode;
  whatsappHref: string;
  correoItem?: string;
  notes?: string[];
  image: string;
  imageAlt: string;
  caption?: string;
  objectPosition?: string;
  top?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="ta-hero" aria-labelledby={id}>
      <div className="ta-hero-copy">
        {top}
        <p className="ta-eyebrow">{kicker}</p>
        <h1 id={id}>{title}</h1>
        <p className="ta-lead">{lead}</p>
        <div className="ta-ctas" data-fab-hide="">
          <a href={whatsappHref} target="_blank" rel="noopener" className="ta-btn-red">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Cotizar por WhatsApp
          </a>
          <CorreoButton item={correoItem} />
        </div>
        {notes && notes.length > 0 && (
          <ul className="ta-notes">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
        )}
        {children}
      </div>
      <div className="ta-hero-photo">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="(max-width: 767px) 100vw, 58vw"
          className="object-cover"
          style={{ objectPosition }}
        />
        {caption && <p className="ta-caption">{caption}</p>}
      </div>
    </section>
  );
}

export function TaHead({ kicker, title, id, aside }: { kicker: string; title: ReactNode; id: string; aside?: ReactNode }) {
  return (
    <Reveal className="ta-head">
      <div>
        <p className="ta-eyebrow">{kicker}</p>
        <h2 id={id} className="ta-h2">{title}</h2>
      </div>
      {aside && <div className="ta-head-aside">{aside}</div>}
    </Reveal>
  );
}

export function TaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="ta-link">
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

/** Producto recortado sobre fondo claro (tarjeta de línea, componentes). */
export function TaProductCard({ href, image, alt, title, text, imgClass = "" }: { href?: string; image: string; alt: string; title: string; text: string; imgClass?: string }) {
  const body = (
    <>
      <span className="ta-pc-img"><Image src={image} alt={alt} fill sizes="(max-width: 767px) 50vw, 240px" className={`object-contain ${imgClass}`} /></span>
      <span className="ta-pc-body">
        <span className="ta-pc-title">{title}</span>
        <span className="ta-pc-text">{text}</span>
      </span>
    </>
  );
  return <li className="ta-pc">{href ? <Link href={href}>{body}</Link> : <div>{body}</div>}</li>;
}

/** Cierre «Cómo cotizar» en tres pasos, con WhatsApp y correo. */
export function TaSteps({ id, steps, whatsappHref, correoItem }: { id: string; steps: { title: string; text: string }[]; whatsappHref: string; correoItem?: string }) {
  return (
    <section className="ta-steps" aria-labelledby={id}>
      <div className="container-max ta-steps-grid">
        <div>
          <p className="ta-eyebrow is-light">Cómo cotizar</p>
          <h2 id={id} className="ta-h2">Empieza con una foto</h2>
          <div className="ta-ctas" data-fab-hide="">
            <a href={whatsappHref} target="_blank" rel="noopener" className="ta-btn-red"><WhatsAppIcon className="h-[18px] w-[18px]" />WhatsApp<span className="sr-only">: cotizar</span></a>
            <CorreoButton item={correoItem} className="ta-btn-line is-light" />
          </div>
        </div>
        {steps.map((s, i) => (
          <div key={s.title} className="ta-step">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
