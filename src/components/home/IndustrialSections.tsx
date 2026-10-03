import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Camera, FileText, Ruler } from "lucide-react";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { SERVICIOS, COMPONENTES, SERVICIOS_ADICIONALES } from "@/lib/servicios";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappCylinderService } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function CilindrosDestacados() {
  const principales = [SERVICIOS[0], SERVICIOS[1], COMPONENTES[0]];
  return (
    <section className="section-pad border-b border-black/10">
      <div className="container-max">
        <div className="section-heading mb-12">
          <div><p className="eyebrow mb-4">01 / Nuestra línea principal</p><h2 className="font-display text-display-lg">Cilindros neumáticos.<br /><span className="text-steel-500">De principio a fin.</span></h2></div>
          <p className="max-w-md text-steel-300 leading-relaxed">Fabricación a medida, reparación y componentes para mantener tu equipo en operación. Trabajamos a partir de la información de tu aplicación.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex min-h-[320px] items-center overflow-hidden border border-black/10 bg-[#F6F7F8] sm:min-h-[430px]">
            <Image src="/products/cilindros-neumaticos.jpg" alt="Tipos de cilindros neumáticos industriales, imagen de referencia" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            <span className="absolute left-5 top-5 border border-black/10 bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-techno text-steel-400">Cilindros industriales</span>
            <Link href="/cilindros-neumaticos" className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 bg-surface px-5 py-4 text-sm font-medium text-white hover:bg-signal">Conoce la línea de cilindros <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="divide-y divide-black/10 border-t border-black/10">
            {principales.map((s, i) => (
              <article key={s.id} className="py-7">
                <div className="mb-3 flex items-center gap-3"><span className="font-mono text-xs text-signal">0{i + 1}</span><s.icon className="h-5 w-5 shrink-0 text-signal" /><h3 className="font-display text-xl font-medium sm:text-2xl">{s.title}</h3></div>
                <p className="mb-4 text-sm leading-relaxed text-steel-300 sm:text-base">{s.desc}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2"><a href={quoteHref(s.title)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-signal">Cotizar por WhatsApp <ArrowRight className="h-4 w-4" /></a><Link href={s.href} className="inline-flex min-h-11 items-center gap-2 text-sm text-steel-400 hover:text-signal">Ver detalle <ArrowUpRight className="h-4 w-4" /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ComoTrabajamos() {
  return (
    <section className="bg-surface text-white">
      <div className="container-max grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-5 text-white/60">02 / Tu solicitud, paso a paso</p>
          <h2 className="font-display text-display-lg">Una foto. Un plano.<br /><span className="text-white/55">El primer paso.</span></h2>
          <p className="mt-6 max-w-lg leading-relaxed text-white/70">Envíanos lo que tengas: referencia, fotos, plano, muestra o medidas. Evaluamos tu solicitud y confirmamos alcance, condiciones y disponibilidad en la cotización.</p>
          <div className="my-8 grid grid-cols-3 gap-3">{[{ icon: Camera, name: "Fotos" }, { icon: FileText, name: "Plano o muestra" }, { icon: Ruler, name: "Medidas" }].map((item) => <div key={item.name} className="border border-white/15 p-4"><item.icon className="mb-3 h-5 w-5 text-signal" /><p className="text-sm text-white/80">{item.name}</p></div>)}</div>
          <a href={whatsappCylinderService()} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-14"><WhatsAppIcon className="h-5 w-5" /> Enviar especificaciones <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="flex flex-col justify-center">
          <div className="relative aspect-[3/2] overflow-hidden border border-white/15"><Image src="/banners/cilindros-taller-wide.webp" alt="Imagen editorial de un cilindro completo en reparación" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /></div>
          <ol className="mt-5 grid grid-cols-3 gap-px border border-white/15 bg-white/15">{["Comparte tu necesidad", "Recibe la cotización", "Coordina tu pedido"].map((step, i) => <li key={step} className="bg-surface px-4 py-5"><span className="mb-2 block font-mono text-xs text-signal">0{i + 1}</span><span className="text-sm text-white/80">{step}</span></li>)}</ol>
        </div>
      </div>
    </section>
  );
}

export function SolucionesIndustriales() {
  return (
    <section id="soluciones" className="section-pad scroll-mt-28 border-b border-black/10 bg-[#F4F5F6]">
      <div className="container-max">
        <div className="section-heading mb-10"><div><p className="eyebrow mb-4">03 / Líneas complementarias</p><h2 className="font-display text-display-lg">Más soluciones<br />para tu industria.</h2></div><p className="max-w-md leading-relaxed text-steel-300">Además de cilindros neumáticos, cotizamos componentes de neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas.</p></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {SOLUCIONES.map((s) => (
            <article key={s.slug} className="group flex gap-4 border border-black/10 bg-white p-4 transition-colors hover:border-black/25 sm:gap-6 sm:p-6 last:lg:col-span-2">
              <Link href={`/${s.slug}`} className="relative block h-28 w-24 shrink-0 overflow-hidden bg-[#F4F5F6] sm:h-36 sm:w-36" aria-label={`Ver línea de ${s.name}`}><Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 639px) 96px, 144px" className="object-contain transition-transform duration-300 group-hover:scale-105" /></Link>
              <div className="flex min-w-0 flex-1 flex-col justify-center"><h3 className="mb-2 font-display text-xl font-medium sm:text-2xl"><Link href={`/${s.slug}`} className="hover:text-signal">{s.name}</Link></h3><p className="text-sm leading-relaxed text-steel-300">{s.short}</p><div className="mt-3 flex flex-wrap gap-x-5 gap-y-1"><Link href={`/${s.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-surface hover:text-signal">Ver línea <ArrowUpRight className="h-4 w-4" /></Link><a href={quoteHref(s.name, s.name)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-signal">Cotizar <ArrowRight className="h-4 w-4" /></a></div></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiciosComplementarios() {
  return (
    <section className="container-max py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-3"><div><p className="eyebrow mb-4">También bajo cotización</p><h2 className="font-display text-display-md">Servicios<br />complementarios.</h2><p className="mt-4 text-sm leading-relaxed text-steel-300">Los cilindros neumáticos son nuestra línea principal. También evaluamos solicitudes de hidráulicos y mecanizado.</p></div>{SERVICIOS_ADICIONALES.map((s) => <Link key={s.slug} href={`/${s.slug}`} className="group flex flex-col border border-black/10 p-6 transition-colors hover:border-signal/40 sm:p-8"><h3 className="mb-3 font-display text-2xl">{s.name}</h3><p className="mb-6 text-sm leading-relaxed text-steel-300">{s.description}</p><span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-signal">Ver servicio <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></Link>)}</div>
    </section>
  );
}
