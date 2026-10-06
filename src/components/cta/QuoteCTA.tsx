import { ArrowRight, Clock } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappChat, whatsappCylinderService } from "@/lib/whatsapp";
import { quoteBridgeHref } from "@/lib/quote";
import { shortHours } from "@/components/page/TrustStrip";

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
 * Cotización por WhatsApp con el elemento y la línea: pasa por /cotizacion, que mide el
 * clic (quote_whatsapp_click) y redirige a WhatsApp Business con el mensaje precargado.
 */
export function quoteHref(item?: string, tipo?: string) {
  return quoteBridgeHref({ item, linea: tipo && tipo !== item ? tipo : undefined });
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
  ctaLabel = "Solicitar cotización",
  text = "Envíanos el plano, la muestra, las medidas, fotos o las especificaciones y te cotizamos.",
  whatsappHref,
}: Props) {
  return (
    <section className="border-t-4 border-signal bg-surface text-white">
      <div className="container-max grid gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-8">
          <div className="mb-5 flex items-center gap-3"><div className="h-px w-8 bg-signal" /><span className="font-mono text-xs uppercase tracking-techno text-white/60">{eyebrow}</span></div>
          <h2 className="max-w-3xl font-display text-display-lg text-white">{title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-white/70">{text}</p>
        </div>
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-3">
            <a href={whatsappHref ?? (quoteItem ? quoteHref(quoteItem, quoteTipo) : whatsappCylinderService())} target="_blank" rel="noopener" className="btn-primary min-h-14 px-6">{ctaLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href={whatsappChat()} target="_blank" rel="noopener" className="btn-secondary home-hero-secondary home-hero-wa min-h-14 px-6"><WhatsAppIcon className="h-5 w-5" />WhatsApp {CONTACT.whatsappDisplay}</a>
            <p className="text-sm text-white/60">«Solicitar cotización» abre WhatsApp con tu solicitud lista para enviar.</p>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm leading-relaxed text-white/60"><Clock className="h-4 w-4 shrink-0" aria-hidden="true" />Atención: {shortHours()}</p>
        </div>
      </div>
    </section>
  );
}
