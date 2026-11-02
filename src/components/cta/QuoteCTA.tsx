import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappCylinderService } from "@/lib/whatsapp";
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
  ctaLabel = "Cotizar por WhatsApp",
  text = "Envíanos el plano, la muestra, las medidas, fotos o las especificaciones y te cotizamos.",
  whatsappHref,
}: Props) {
  return (
    <section className="quote-close">
      <div className="container-max quote-close-grid">
        <div>
          <p className="quote-close-kicker">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div data-fab-hide="">
          <a href={whatsappHref ?? (quoteItem ? quoteHref(quoteItem, quoteTipo) : whatsappCylinderService())} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6"><WhatsAppIcon className="h-5 w-5" />{ctaLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <p className="quote-close-note">Se abre WhatsApp ({CONTACT.whatsappDisplay}) con el mensaje listo. Puedes empezar con una foto. Atención: {shortHours()}.</p>
        </div>
      </div>
    </section>
  );
}
