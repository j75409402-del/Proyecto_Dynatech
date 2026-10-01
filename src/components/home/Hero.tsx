import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CONTACT } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";

/** Información disponible para preparar una cotización. */
const PUNTOS_DE_PARTIDA = ["Código o referencia", "Plano", "Muestra", "Medidas", "Fotos", "Especificaciones del cliente"];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(760px,calc(100svh-4rem))] items-center overflow-hidden bg-surface text-white">
      <Image
        src="/industrial-editorial.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover object-[64%_center]"
      />
      <div aria-hidden className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(11,13,16,0.97)_0%,rgba(11,13,16,0.86)_44%,rgba(11,13,16,0.38)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(11,13,16,0.8)_0%,transparent_42%)]" />
      <div aria-hidden className="absolute inset-0 z-10 opacity-[0.12] grid-bg" />

      <div className="container-max relative z-20 w-full py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-signal" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/65">
              Proveedor industrial B2B · Santo Domingo
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Soluciones industriales para{" "}
            <span className="text-signal">empresas que no pueden detenerse</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            Neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas para
            empresas, fábricas y zonas francas. Además, fabricamos, reparamos y reconstruimos
            cilindros neumáticos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/cotizacion" className="btn-primary min-h-12 px-6 text-sm sm:px-7">
              Solicita tu cotización
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/35 px-6 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10 sm:px-7"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Consulta sobre soluciones industriales")}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 px-4 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" />
              Correo
            </a>
          </div>

          <div className="mt-12 border-t border-white/20 pt-5">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Cotizamos a partir de
            </p>
            <ul className="flex flex-wrap gap-2">
              {PUNTOS_DE_PARTIDA.map((point) => (
                <li key={point} className="border border-white/20 bg-surface/45 px-3 py-2 text-xs text-white/80 backdrop-blur-sm sm:text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 right-8 hidden h-24 w-px bg-gradient-to-b from-signal to-transparent lg:block" />
    </section>
  );
}
