import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TrustStrip } from "./TrustStrip";

type Crumb = { label: string; href?: string };
type Props = {
  /** Migas (sin "Inicio"). Si se omite, no se muestran (portada). */
  crumbs?: Crumb[];
  kicker: string;
  /** Contenido del único H1 de la página. */
  title: ReactNode;
  lead: ReactNode;
  /** CTA principal: SIEMPRE un href de lib/quote.ts o lib/whatsapp.ts (/cotizacion…), nunca wa.me. */
  quoteHref: string;
  quoteLabel?: string;
  /** Enlace secundario interno (ancla o ruta). */
  secondary?: { href: string; label: string };
  /** Texto bajo el CTA (MENSAJES-Y-SEO D2). */
  note?: ReactNode;
  /** Visual: imagen real de public/ o un nodo (p. ej. esquema técnico SVG). */
  image?: { src: string; alt: string; fit?: "cover" | "contain"; /** object-position para fotos verticales (p. ej. "center 35%"). */ position?: string };
  visual?: ReactNode;
  caption?: { label: string; text: string };
  trust?: "cilindros" | "lineas" | false;
  /** Tamaño del título: la portada lo usa más grande. */
  size?: "home" | "page";
  titleId?: string;
};

/**
 * Hero oscuro compartido (portada y páginas internas): texto → CTA → visual en móvil, dos
 * columnas en escritorio. La imagen lleva `priority` porque suele ser el LCP.
 * El CTA principal es un <a href="/cotizacion…"> (lo mide CommercialTracking), nunca <Link>.
 */
export function PageHero({ crumbs, kicker, title, lead, quoteHref, quoteLabel = "Cotizar por WhatsApp", secondary, note, image, visual, caption, trust = "lineas", size = "page", titleId = "page-hero-title" }: Props) {
  const SecondaryTag = secondary?.href.startsWith("#") ? "a" : Link;
  return (
    <section className={`home-hero ${size === "page" ? "page-hero" : ""}`} aria-labelledby={titleId}>
      {crumbs && <div className="container-max page-hero-crumbs"><Breadcrumbs items={crumbs} /></div>}
      <div className="home-hero-grid container-max">
        <div className="home-hero-copy">
          <p className="home-hero-kicker"><span aria-hidden="true" />{kicker}</p>
          <h1 id={titleId} className="home-hero-title">{title}</h1>
          <div className="home-hero-lead">{lead}</div>
          <div className="home-hero-actions" data-fab-hide="">
            <a href={quoteHref} target="_blank" rel="noopener" className="btn-primary min-h-14 px-6">
              <WhatsAppIcon className="h-5 w-5" />{quoteLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {secondary && (
              <SecondaryTag href={secondary.href} className="btn-secondary home-hero-secondary min-h-14 px-6">
                {secondary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SecondaryTag>
            )}
          </div>
          {note && <p className="home-hero-note">{note}</p>}
        </div>
        <figure className={`home-hero-visual ${visual ? "is-drawing" : image?.fit === "contain" ? "is-catalog" : ""}`}>
          {visual ?? (image && (
            <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 1023px) 100vw, 50vw" className={image.fit === "contain" ? "object-contain p-6" : "object-cover"} style={image.position ? { objectPosition: image.position } : undefined} />
          ))}
          {caption && <figcaption><span>{caption.label}</span>{caption.text}</figcaption>}
        </figure>
      </div>
      {trust && <TrustStrip variant={trust} />}
    </section>
  );
}
