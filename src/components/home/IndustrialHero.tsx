import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappCylinderService } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="home-hero border-b border-black/10">
      <div className="container-max grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div>
          <div className="mb-7 flex items-center gap-3"><span className="h-2 w-2 bg-signal" aria-hidden /><p className="eyebrow">Ingeniería industrial · República Dominicana</p></div>
          <h1 className="hero-title font-display font-semibold text-surface">Cilindros<br />neumáticos<br /><span className="text-signal">a la medida.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel-300">Fabricamos, reparamos y reconstruimos cilindros neumáticos. Del plano o la muestra a la solución que necesita tu equipo.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappCylinderService()} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-14 px-6"><WhatsAppIcon className="h-5 w-5" />Cotizar por WhatsApp<ArrowRight className="h-4 w-4" /></a>
            <Link href="/servicios" className="btn-secondary min-h-14 px-6">Ver servicios <ArrowDownRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5 text-sm text-steel-400">¿Prefieres escribirnos?{" "}<Link href="/cotizacion/correo?nombre=Fabricaci%C3%B3n%20y%20reparaci%C3%B3n%20de%20cilindros%20neum%C3%A1ticos" className="font-medium text-surface underline decoration-black/25 underline-offset-4 hover:text-signal">Solicita cotización por correo</Link></div>
          <p className="mt-9 flex items-center gap-2 text-sm text-steel-400"><MapPin className="h-4 w-4 text-signal" /> Santo Domingo · Bajo cotización</p>
        </div>
        <div className="relative">
          <div className="relative aspect-square overflow-hidden bg-surface sm:aspect-[6/5] lg:aspect-square">
            <Image src="/cilindros/taller-reparando.jpg" alt="Imagen de referencia de un técnico trabajando en un cilindro neumático" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[58%_center]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-6 pt-20 text-white sm:px-8 sm:pb-8"><p className="mb-2 font-mono text-[11px] uppercase tracking-techno text-white/70">Nuestra línea principal</p><p className="font-display text-2xl font-medium sm:text-3xl">Fabricación. Reparación.<br />Reconstrucción.</p></div>
          </div>
          <div className="absolute -right-2 -top-2 h-12 w-12 border-r-4 border-t-4 border-signal sm:-right-3 sm:-top-3" aria-hidden />
          <span className="absolute left-6 top-6 border border-white/30 bg-black/30 px-3 py-2 font-mono text-[10px] uppercase tracking-techno text-white backdrop-blur-sm">Dynatech Ingeniería SRL</span>
        </div>
      </div>
      <div className="border-t border-black/10 bg-white"><div className="container-max grid grid-cols-2 gap-x-6 gap-y-5 py-6 lg:grid-cols-4">{["Fabricación bajo plano o muestra", "Reparación y reconstrucción", "Sellos y vástagos cromados", "Empresas e industrias en RD"].map((item) => <div key={item} className="flex items-start gap-3 text-sm font-medium text-steel-300"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-signal" />{item}</div>)}</div></div>
    </section>
  );
}
