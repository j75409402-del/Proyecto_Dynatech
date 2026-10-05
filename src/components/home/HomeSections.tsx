import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ClipboardList, Send, FileText, Factory, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { SERVICIOS, COMPONENTES } from "@/lib/servicios";
import { SOLUCIONES } from "@/lib/soluciones";
import { cn } from "@/lib/utils";
import { whatsappCylinderService } from "@/lib/whatsapp";

/** 5 líneas industriales: 3 tarjetas arriba y 2 más anchas abajo en escritorio. */
export function SolucionesIndustriales() {
  return (
    <section id="soluciones" className="section-pad border-b border-black/5 scroll-mt-16">
      <div className="container-max">
        <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">Líneas complementarias</div>
            <h2 className="font-display text-display-lg text-surface max-w-2xl">
              Otras soluciones industriales
            </h2>
          </div>
          <p className="text-steel-300 max-w-md">
            Además de cilindros neumáticos, ofrecemos neumática, control eléctrico, sensores,
            instrumentación y resistencias eléctricas bajo cotización.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {SOLUCIONES.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={(i % 3) * 0.06}
              className={cn("h-full", i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === 4 && "sm:col-span-2 lg:col-span-3")}
            >
              <TiltCard max={3} className="h-full">
                <article className="group relative flex h-full flex-col border border-black/10 bg-carbon hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300">
                  <Link href={`/${s.slug}`} aria-label={`Ver línea de ${s.name}`} className="relative block aspect-[16/10] overflow-hidden border-b border-black/10 bg-surface">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-surface/75 via-surface/5 to-transparent" />
                    <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                      Línea {String(i + 1).padStart(2, "0")} / 05
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="grid h-9 w-9 place-items-center bg-signal-soft text-signal">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-400">Bajo cotización</span>
                    </div>
                    <h3 className="font-display text-2xl text-surface mb-2">
                      <Link href={`/${s.slug}`} className="hover:text-signal transition-colors">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-steel-300 leading-relaxed mb-4">{s.short}</p>
                    <ul className="mb-6 flex flex-wrap gap-1.5" aria-label={`Ejemplos de ${s.name}`}>
                      {s.ejemplos.slice(0, 4).map((e) => (
                        <li key={e} className="border border-black/10 bg-carbon-800 px-2 py-0.5 text-xs text-steel-300">
                          {e}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                      <a
                        href={quoteHref(s.name, s.name)}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal transition-all hover:gap-2.5"
                      >
                        Solicitar cotización
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                      <Link
                        href={`/${s.slug}`}
                        className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-steel-300 transition-colors hover:text-signal"
                      >
                        Ver {s.name.toLowerCase()}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal group-hover:w-full transition-all duration-500" />
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Cilindros neumáticos: línea destacada (fabricación, reparación, sellos y vástagos). */
export function CilindrosDestacados() {
  const oferta = [...SERVICIOS.slice(0, 5), ...COMPONENTES, SERVICIOS[5]];
  return (
    <section className="section-pad border-b border-black/5 bg-carbon-900">
      <div className="container-max">
        <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">Línea principal · Cilindros neumáticos</div>
            <h2 className="font-display text-display-lg text-surface max-w-2xl uppercase">
              Cilindros neumáticos <span className="text-signal">a la medida</span>
            </h2>
            <p className="text-steel-300 mt-4 max-w-xl">
              Fabricación, reparación y reconstrucción de cilindros neumáticos para aplicaciones
              industriales.
            </p>
          </div>
          <Link href="/cilindros-neumaticos" className="btn-ghost">
            Ver cilindros
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Reveal className="h-full">
            <TiltCard max={3} className="h-full">
              <Link
                href="/cilindros-neumaticos"
                className="group flex h-full flex-col border border-black/10 bg-carbon hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300"
              >
                <div className="relative aspect-[3/2] bg-white border-b border-black/10 overflow-hidden">
                  <Image
                    src="/products/cilindros-neumaticos.jpg"
                    alt="Cilindro neumático industrial"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="eyebrow mb-3">Fabricamos</div>
                  <h3 className="font-display text-2xl text-surface mb-3">Cilindros nuevos a la medida</h3>
                  <p className="text-steel-300 leading-relaxed mb-6 flex-1">
                    Desde un plano, una muestra o tus medidas. También cilindros personalizados para
                    tu aplicación.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal group-hover:gap-2.5 transition-all">
                    Ver cilindros neumáticos
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.16} className="h-full">
            <TiltCard max={3} className="h-full">
              <Link
                href="/sellos-y-componentes"
                className="group flex h-full flex-col border border-black/10 bg-carbon hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300"
              >
                <div className="relative aspect-[3/2] overflow-hidden border-b border-black/10 bg-white">
                  <Image
                    src="/products/kit-sello-cilindro-neumatico.jpg"
                    alt="Sellos para mantenimiento de cilindros neumáticos"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="eyebrow mb-3">Sellos y componentes</div>
                  <h3 className="font-display text-2xl text-surface mb-3">Sellos y vástagos cromados</h3>
                  <p className="text-steel-300 leading-relaxed mb-6 flex-1">
                    Kits de sellos, vástagos y componentes para cilindros neumáticos.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal group-hover:gap-2.5 transition-all">
                    Ver sellos y componentes
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <TiltCard max={3} className="h-full">
              <Link
                href="/servicios"
                className="group flex h-full flex-col border border-black/10 bg-carbon hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300"
              >
                <div className="relative aspect-[3/2] bg-white border-b border-black/10 overflow-hidden flex flex-col">
                  <div className="relative flex-1 border-b border-black/10">
                    <Image
                      src="/cilindros/antes-cilindro-iso-32mm.jpg"
                      alt="Cilindro ISO 32 mm antes de la reparación"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="relative flex-1">
                    <Image
                      src="/cilindros/despues-cilindro-iso-32mm.jpg"
                      alt="Cilindro ISO 32 mm después de la reparación"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="eyebrow mb-3">Reparamos y reconstruimos</div>
                  <h3 className="font-display text-2xl text-surface mb-3">Tu cilindro, de vuelta a la línea</h3>
                  <p className="text-steel-300 leading-relaxed mb-6 flex-1">
                    Cambio de sellos, vástagos y componentes dañados, con prueba de funcionamiento
                    antes de la entrega.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal group-hover:gap-2.5 transition-all">
                    Ver servicios
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal>
          <ul className="flex flex-wrap gap-2" aria-label="Servicios y componentes de cilindros">
            {oferta.map((o) => (
              <li key={o.id}>
                <Link
                  href={o.href}
                  className="inline-flex items-center gap-2 border border-black/10 bg-carbon px-3 py-2 text-sm text-steel-200
                             hover:border-signal/40 hover:text-signal transition-colors"
                >
                  <o.icon className="h-4 w-4 text-signal" />
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Modelo de trabajo, tal como lo define Dynatech. */
const PASOS = [
  { icon: ClipboardList, title: "Necesitas una pieza", desc: "Un componente, un repuesto o un trabajo de cilindros." },
  { icon: Send, title: "Nos envías las especificaciones", desc: "Código, plano, muestra, medidas, fotos o especificaciones." },
  { icon: FileText, title: "Cotizamos", desc: "Te respondemos en menos de 24 horas hábiles." },
  { icon: Factory, title: "Fabricamos o importamos", desc: "Según lo que requiera tu aplicación." },
  { icon: Truck, title: "Entregamos", desc: "La pieza lista para instalar." },
];

export function ComoTrabajamos() {
  return (
    <section className="section-pad border-b border-black/5">
      <div className="container-max">
        <Reveal className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">03 · Cómo trabajamos</div>
          <h2 className="font-display text-display-lg text-surface">Simple, bajo cotización</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-black/5 border border-black/5">
          {PASOS.map((paso, i) => (
            <Reveal key={paso.title} delay={i * 0.05} className={cn("h-full", i === 4 && "sm:col-span-2 lg:col-span-1")}>
              <div className="group bg-carbon hover:bg-carbon-800 p-6 h-full min-h-[160px] flex flex-col transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-signal tracking-techno">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <paso.icon className="h-4 w-4 text-signal transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="font-display text-base text-surface mb-2">{paso.title}</h3>
                <p className="text-sm text-steel-400 leading-relaxed">{paso.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <a href={whatsappCylinderService()} target="_blank" rel="noopener" className="btn-primary">
            Enviar especificaciones
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
