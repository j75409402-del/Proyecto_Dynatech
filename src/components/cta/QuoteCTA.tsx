import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappCylinderService } from "@/lib/whatsapp";

type Props = {
  eyebrow?: string;
  title?: string;
  /** Texto con el que se precarga el formulario de cotización (?nombre=). */
  quoteItem?: string;
  /** Opción del formulario a preseleccionar (?tipo=). */
  quoteTipo?: string;
  ctaLabel?: string;
  /** Texto bajo el título. */
  text?: string;
  /** Enlace de WhatsApp con mensaje propio (por defecto, el de cilindros). */
  whatsappHref?: string;
};

/**
 * Enlace al formulario de cotización precargado. `item` va como ?nombre= (lo que se quiere
 * cotizar); `tipo`, si se pasa, es la opción del formulario a preseleccionar (ej. la línea
 * "Sensores" cuando el ítem es "Sensores inductivos").
 */
export function quoteHref(item?: string, tipo?: string) {
  const params = new URLSearchParams();
  if (item) params.set("nombre", item);
  if (tipo) params.set("tipo", tipo);
  const qs = params.toString();
  return qs ? `/cotizacion?${qs}` : "/cotizacion";
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
  ctaLabel = "Solicita tu cotización",
  text = "Envíanos el plano, la muestra, las medidas, fotos o las especificaciones y te cotizamos.",
  whatsappHref,
}: Props) {
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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={quoteHref(quoteItem, quoteTipo)} className="btn-primary px-8 py-4 text-sm">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappHref ?? whatsappCylinderService()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40
                         text-white font-medium px-8 py-4 text-sm uppercase tracking-wider transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
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
