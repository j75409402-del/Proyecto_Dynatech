import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappGeneral } from "@/lib/whatsapp";

type Props = {
  title?: string;
  body?: string;
  quoteHref?: string;
};

/** Cierre de página — cada página termina llevando a la cotización. Fondo oscuro a propósito. */
export function CtaBand({
  title = "¿Necesitas un cilindro?",
  body = "Envíanos el plano, la muestra, las medidas o unas fotos y te cotizamos.",
  quoteHref = "/cotizacion",
}: Props) {
  return (
    <section className="bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(228,0,43,0.22),transparent_60%)]" />
      <div className="container-max relative py-20 sm:py-24 text-center">
        <h2 className="font-display text-display-lg text-white mb-4 max-w-3xl mx-auto">{title}</h2>
        <p className="text-white/70 mb-10 max-w-xl mx-auto">{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={quoteHref} className="btn-primary px-8 py-4">
            Solicita tu cotización
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50
                       text-white font-medium px-8 py-4 text-sm uppercase tracking-wider transition-colors rounded-xs"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
