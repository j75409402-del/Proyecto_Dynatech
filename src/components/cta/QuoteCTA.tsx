import { ArrowUpRight, Clock, Mail } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappCylinderService, whatsappLink } from "@/lib/whatsapp";

type Props = {
  eyebrow?: string;
  title?: string;
  /** Elemento que se agrega al mensaje de WhatsApp. */
  quoteItem?: string;
  /** Línea que se agrega al mensaje de WhatsApp. */
  quoteTipo?: string;
  ctaLabel?: string;
  /** Texto bajo el título. */
  text?: string;
  /** Enlace de WhatsApp con mensaje propio (por defecto, el de cilindros). */
  whatsappHref?: string;
};

/**
 * Enlace a WhatsApp con el elemento y la línea que el cliente quiere cotizar.
 */
export function quoteHref(item?: string, tipo?: string) {
  const details = [item, tipo && tipo !== item ? `Línea: ${tipo}` : undefined].filter(Boolean);
  const context = details.length ? ` sobre ${details.join(" · ")}` : "";
  return whatsappLink(`Hola Dynatech, solicito cotización${context}.\n\nCantidad o especificaciones:\n`);
}

/** Formulario alternativo con el mismo contexto comercial del enlace de WhatsApp. */
export function emailQuoteHref(item?: string, tipo?: string) {
  const params = new URLSearchParams();
  if (item) params.set("nombre", item);
  if (tipo) params.set("tipo", tipo);
  const query = params.toString();
  return `/cotizacion/correo${query ? `?${query}` : ""}`;
}

/**
 * Cierre común de todas las páginas: lleva siempre a la cotización. Fondo oscuro a
 * propósito con `surface` (el tono casi negro del sistema) — la escala `carbon` es clara.
 */
export function QuoteCTA({
  eyebrow = "Fabricación · Reparación · Reconstrucción",
  title = "¿Necesitas fabricar o reparar un cilindro neumático?",
  quoteItem,
  quoteTipo,
  ctaLabel = "Cotizar por WhatsApp",
  text = "Envíanos el plano, la muestra, las medidas, fotos o las especificaciones y te cotizamos.",
  whatsappHref,
}: Props) {
  return (
    <section className="border-t-4 border-signal bg-surface text-white">
      <div className="container-max grid gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-8">
          <div className="mb-5 flex items-center gap-3"><div className="h-px w-8 bg-signal" /><span className="font-mono text-[11px] uppercase tracking-techno text-white/60">{eyebrow}</span></div>
          <h2 className="max-w-3xl font-display text-display-lg text-white">{title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-white/70">{text}</p>
        </div>
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-3">
            <a href={whatsappHref ?? (quoteItem ? quoteHref(quoteItem, quoteTipo) : whatsappCylinderService())} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-14 px-6"><WhatsAppIcon className="h-5 w-5" />{ctaLabel}<ArrowUpRight className="h-4 w-4" /></a>
            <a href={emailQuoteHref(quoteItem, quoteTipo)} className="inline-flex min-h-14 items-center justify-center gap-2 border border-white/25 px-6 py-4 text-sm font-medium text-white transition-colors hover:border-white/60"><Mail className="h-4 w-4" />Cotizar por correo</a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs leading-relaxed text-white/55"><Clock className="h-4 w-4 shrink-0" />{CONTACT.hours}</p>
        </div>
      </div>
    </section>
  );
}
