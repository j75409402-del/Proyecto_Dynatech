import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Bloques compartidos del sistema visual WEB-010 (todas las páginas internas).
 * Reglas: CTAs de cotizar = <a href> de lib/quote.ts / lib/whatsapp.ts con el texto único
 * "Cotizar por WhatsApp"; enlaces internos con <Link> y textos que NO contienen "cotiz".
 */

type Tone = "light" | "white" | "dark";

/** Sección con tono de fondo del sistema. */
export function Band({ tone = "white", id, children, className = "", labelledBy }: { tone?: Tone; id?: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`band band-${tone} ${id ? "scroll-mt-28" : ""} ${className}`}>
      <div className="container-max">{children}</div>
    </section>
  );
}

/** Encabezado de sección: kicker mono + H2 + entradilla opcional. */
export function SectionHead({ kicker, title, intro, id, aside }: { kicker: string; title: ReactNode; intro?: ReactNode; id?: string; aside?: ReactNode }) {
  return (
    <Reveal className="section-head">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 id={id} className="section-title">{title}</h2>
      </div>
      {(intro || aside) && <div className="section-intro">{intro && <p>{intro}</p>}{aside}</div>}
    </Reveal>
  );
}

/** Botón de cotización estándar (rojo). `href` siempre de lib/quote.ts / lib/whatsapp.ts. */
export function QuoteButton({ href, label = "Cotizar por WhatsApp", className = "" }: { href: string; label?: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={`btn-primary min-h-12 px-6 ${className}`}>
      <WhatsAppIcon className="h-4 w-4" />{label}<ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export type OfferItem = {
  id?: string;
  title: string;
  desc: string;
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
  /** Fotos de catálogo con fondo blanco: se muestran completas. */
  imageFit?: "contain" | "cover";
  ejemplos?: readonly string[];
  /** Línea "Necesitamos: …" (datos mínimos para cotizar). */
  need?: string;
  /** Enlace interno (página propia o ancla). */
  link?: { href: string; label: string };
  /** CTA de cotización (href de lib/quote.ts). */
  quote?: string;
};

/** Tarjetas con imagen real (o panel técnico con icono si no hay foto). */
export function OfferGrid({ items, columns = 3, compact = false }: { items: OfferItem[]; columns?: 2 | 3 | 4; /** Sin fotos: icono pequeño en lugar del panel 16:10. */ compact?: boolean }) {
  return (
    <div className={`offer-grid cols-${columns}`}>
      {items.map((it, i) => (
        <Reveal key={it.id ?? it.title} delay={(i % 3) * 0.05} className="h-full">
          <article id={it.id} className="offer-card scroll-mt-28">
            {!(compact && !it.image) && <div className={`offer-media ${it.image ? (it.imageFit === "cover" ? "is-photo" : "is-catalog") : "is-icon"}`}>
              {it.image ? (
                <Image src={it.image} alt={it.imageAlt ?? it.title} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className={it.imageFit === "cover" ? "object-cover" : "object-contain p-5"} />
              ) : it.icon ? (
                <it.icon className="h-16 w-16" aria-hidden="true" strokeWidth={1.2} />
              ) : null}
            </div>}
            <div className="offer-body">
              {compact && !it.image && it.icon && <span className="offer-icon"><it.icon className="h-6 w-6" aria-hidden="true" /></span>}
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              {it.ejemplos && it.ejemplos.length > 0 && (
                <ul className="offer-tags" aria-label={`Ejemplos de ${it.title}`}>
                  {it.ejemplos.map((e) => <li key={e}>{e}</li>)}
                </ul>
              )}
              {it.need && <p className="offer-need"><span>Necesitamos</span>{it.need}</p>}
              <div className="offer-actions">
                {it.quote && (
                  <a href={it.quote} target="_blank" rel="noopener" className="offer-quote">
                    <WhatsAppIcon className="h-4 w-4" />Cotizar por WhatsApp<span className="sr-only">: {it.title}</span>
                  </a>
                )}
                {it.link && (
                  <Link href={it.link.href} className="offer-link">
                    {it.link.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** "Qué datos necesitamos para cotizar": lista numerada sobre banda oscura + CTA. */
export function QuoteChecklist({ kicker = "Para cotizar", title, intro, items, quoteHref, note, aside }: { kicker?: string; title: ReactNode; intro?: ReactNode; items: { title: string; text?: string }[]; quoteHref: string; note?: ReactNode; aside?: ReactNode }) {
  return (
    <Band tone="dark" className="quote-checklist">
      <div className="qc-grid">
        <Reveal>
          <p className="section-kicker">{kicker}</p>
          <h2 className="section-title">{title}</h2>
          {intro && <p className="qc-intro">{intro}</p>}
          <div className="mt-8" data-fab-hide=""><QuoteButton href={quoteHref} /></div>
          {note && <p className="qc-note">{note}</p>}
          {aside}
        </Reveal>
        <ol className="qc-list">
          {items.map((it, i) => (
            <li key={it.title}>
              <span className="qc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div><strong>{it.title}</strong>{it.text && <p>{it.text}</p>}</div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

export type RelatedItem = { href: string; title: string; desc?: string; image?: string; icon?: LucideIcon; label?: string };

/** Enlazado interno entre páginas (relacionados). Tarjetas completas clicables. */
export function RelatedGrid({ kicker = "Relacionado", title, items, id = "relacionado" }: { kicker?: string; title: string; items: RelatedItem[]; id?: string }) {
  return (
    <Band tone="light" labelledBy={id}>
      <SectionHead kicker={kicker} title={title} id={id} />
      <ul className={`related-grid ${items.length >= 4 ? "cols-4" : ""}`}>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="related-card group">
              {it.image ? (
                <span className="related-thumb"><Image src={it.image} alt="" fill sizes="96px" className="object-cover" /></span>
              ) : it.icon ? (
                <span className="related-thumb is-icon"><it.icon className="h-6 w-6" aria-hidden="true" /></span>
              ) : null}
              <span className="related-text">
                <span className="related-title">{it.title}</span>
                {it.desc && <span className="related-desc">{it.desc}</span>}
                <span className="related-more">{it.label ?? "Ver página"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/** Lista de puntos con marca roja (aplicaciones, alcance…). */
export function CheckList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`check-list ${className}`}>
      {items.map((a) => <li key={a}><span aria-hidden="true" />{a}</li>)}
    </ul>
  );
}

/** Pasos de un proceso (numerados, horizontales en escritorio). */
export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={s.title} className="step" data-reveal="" style={{ "--reveal-delay": `${Math.min(i * 0.06, 0.3)}s` } as React.CSSProperties}>
          <span className="step-num">{String(i + 1).padStart(2, "0")}</span><strong>{s.title}</strong><p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
