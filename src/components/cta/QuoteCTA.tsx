import { Clock, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
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
  const emailParams = new URLSearchParams();
  if (quoteItem) emailParams.set("nombre", quoteItem);
  if (quoteTipo) emailParams.set("tipo", quoteTipo);
  const emailQuery = emailParams.toString();
  const emailQuoteHref = `/cotizacion/correo${emailQuery ? `?${emailQuery}` : ""}`;
  return (
    <section className="bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(228,0,43,0.18),transparent_60%)]" />
      <div className="container-max relative py-20 sm:py-24 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-signal" />
            <span className="font-mono text-xs uppercase tracking-techno text-white/50">{eyebrow}</span>
            <div className="h-px w-8 bg-signal" />
          </div>
          <h2 className="font-display text-display-xl text-white mb-4 max-w-3xl mx-auto">{title}</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">
            {text}
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a href={whatsappHref ?? (quoteItem ? quoteHref(quoteItem, quoteTipo) : whatsappCylinderService())} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 text-sm">
              {ctaLabel}
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href={emailQuoteHref}
              className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white/40"
            >
              <Mail className="h-4 w-4" />
              Cotizar por correo
            </a>
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-xs text-white/40 font-mono uppercase tracking-techno">
            <Clock className="h-3.5 w-3.5" />
            Respuesta en menos de 24 horas hábiles
          </p>
        </Reveal>
      </div>
    </section>
  );
}
