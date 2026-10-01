import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ClipboardList, Send, FileText, Factory, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SERVICIOS, COMPONENTES } from "@/lib/servicios";

/** Los 8 puntos de la oferta, en el orden en que Dynatech los prioriza. */
const OFERTA = [...SERVICIOS.slice(0, 5), ...COMPONENTES, SERVICIOS[5]];

export function QueHacemos() {
  return (
    <section className="section-pad border-b border-black/5">
      <div className="container-max">
        <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">01 · Qué hacemos</div>
            <h2 className="font-display text-display-lg text-surface max-w-2xl">
              Todo lo que necesita tu cilindro, en un solo lugar
            </h2>
          </div>
          <Link href="/servicios" className="btn-ghost">
            Ver servicios
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
          {OFERTA.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.04} className="h-full">
              <Link
                href={o.href}
                className="group relative flex h-full min-h-[150px] flex-col bg-carbon hover:bg-carbon-800 p-6 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <o.icon className="h-5 w-5 text-signal" />
                  <ArrowUpRight className="h-4 w-4 text-steel-500 group-hover:text-signal transition-colors" />
                </div>
                <h3 className="font-display text-lg text-surface leading-snug">{o.title}</h3>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal group-hover:w-full transition-all duration-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FabricamosReparamos() {
  return (
    <section className="section-pad border-b border-black/5 bg-carbon-900">
      <div className="container-max">
        <Reveal className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">02 · Fabricar o reparar</div>
          <h2 className="font-display text-display-lg text-surface">
            Nuevo a la medida o recuperado en taller
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal className="h-full">
            <TiltCard max={3} className="h-full">
              <Link
                href="/cilindros-neumaticos"
                className="group flex h-full flex-col border border-black/10 bg-carbon hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-shadow duration-300"
              >
                <div className="relative aspect-[3/2] bg-white border-b border-black/10 overflow-hidden">
                  <Image
                    src="/products/cilindros-neumaticos.jpg"
                    alt="Cilindros neumáticos"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
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
      </div>
    </section>
  );
}

/** Modelo de trabajo, tal como lo define Dynatech. */
const PASOS = [
  { icon: ClipboardList, title: "Necesitas una pieza", desc: "Un cilindro nuevo, una reparación o un componente." },
  { icon: Send, title: "Nos envías las especificaciones", desc: "Plano, muestra, medidas, fotos o especificaciones." },
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
            <Reveal key={paso.title} delay={i * 0.05} className="h-full">
              <div className="group bg-carbon hover:bg-carbon-800 p-6 h-full min-h-[180px] flex flex-col transition-colors duration-300">
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
          <Link href="/cotizacion" className="btn-primary">
            Enviar especificaciones
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
