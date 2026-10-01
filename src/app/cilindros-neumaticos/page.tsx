import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Box, Ruler, Camera, Hash, Factory, Wrench } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { whatsappCylinderService } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cilindros neumáticos a la medida",
  description:
    "Cilindros neumáticos de doble y simple efecto, compactos, ISO y especiales, en medidas métricas y en pulgadas. Fabricación y reparación bajo cotización en República Dominicana.",
  alternates: { canonical: "/cilindros-neumaticos" },
};

/**
 * Tipos tomados del trabajo real de Dynatech (inventario y trabajos de taller) — no
 * agregar tipos que no manejen.
 */
const TIPOS = [
  { code: "D/E", title: "Doble efecto", desc: "Avance y retroceso por aire." },
  { code: "S/E", title: "Simple efecto", desc: "Retorno por resorte." },
  { code: "CPT", title: "Compactos", desc: "Para espacios reducidos." },
  { code: "ISO", title: "ISO", desc: "Cilindros de norma ISO." },
  { code: "mm / in", title: "Métricos y en pulgadas", desc: "Diámetro y carrera en ambos sistemas." },
  { code: "ESP", title: "A la medida", desc: "Especiales, bajo plano o muestra." },
];

const NECESITAMOS = [
  { icon: FileText, title: "Plano", desc: "Plano o dibujo técnico de la pieza." },
  { icon: Box, title: "Muestra", desc: "El cilindro o el componente original." },
  { icon: Ruler, title: "Medidas", desc: "Diámetro y carrera, como mínimo." },
  { icon: Camera, title: "Fotos", desc: "Del cilindro, su placa y su montaje." },
  { icon: Hash, title: "Código", desc: "La referencia del cilindro, si la tienes." },
];

export default function CilindrosNeumaticosPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative border-b border-black/5 overflow-hidden">
        <div className="container-max py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Cilindros neumáticos" }]} />

          <div className="grid lg:grid-cols-12 gap-12 items-center mt-8">
            <Reveal className="lg:col-span-6">
              <div className="eyebrow mb-4">Cilindros neumáticos</div>
              <h1 className="font-display text-display-xl text-surface mb-6">
                Fabricamos y reparamos <span className="text-signal">el cilindro que tu máquina necesita</span>
              </h1>
              <p className="text-xl text-steel-200 leading-relaxed mb-8 max-w-xl">
                Cilindros estándar y a la medida, a partir de tu plano, una muestra o tus medidas.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={quoteHref("Fabricación de cilindros neumáticos")} className="btn-primary">
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappCylinderService()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-6">
              <div className="relative aspect-[3/2] border border-black/10 bg-white">
                <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal z-10" />
                <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal z-10" />
                <Image
                  src="/banners/cilindros-taller-wide.webp"
                  alt="Imagen editorial de un cilindro neumático completo en reparación"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIPOS */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">01 · Qué cilindros trabajamos</div>
            <h2 className="font-display text-display-lg text-surface">Tipos de cilindro</h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
            {TIPOS.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05} className="h-full">
                <div className="group bg-carbon hover:bg-carbon-800 p-6 sm:p-8 h-full transition-colors duration-300">
                  <div className="font-mono text-xs text-signal tracking-techno mb-6">{t.code}</div>
                  <h3 className="font-display text-xl sm:text-2xl text-surface mb-2">{t.title}</h3>
                  <p className="text-sm text-steel-300 leading-relaxed">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FABRICAR O REPARAR */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">02 · Fabricar o reparar</div>
            <h2 className="font-display text-display-lg text-surface">Tú decides, nosotros lo resolvemos</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Factory,
                title: "Fabricación",
                items: ["Cilindros nuevos a la medida", "Fabricación bajo muestra o plano", "Cilindros personalizados"],
                cta: "Fabricación de cilindros neumáticos",
              },
              {
                icon: Wrench,
                title: "Reparación y reconstrucción",
                items: ["Cambio de sellos", "Reemplazo de vástagos y componentes", "Prueba de funcionamiento antes de entregar"],
                cta: "Reparación de cilindros neumáticos",
              },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="h-full">
                <TiltCard max={3} className="h-full">
                  <div className="flex h-full flex-col border border-black/10 bg-carbon p-8">
                    <b.icon className="h-6 w-6 text-signal mb-5" />
                    <h3 className="font-display text-2xl text-surface mb-5">{b.title}</h3>
                    <ul className="space-y-3 mb-8 flex-1">
                      {b.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-steel-200">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={quoteHref(b.cta)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                    >
                      Solicitar cotización
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="text-steel-300">
              ¿Buscas un cilindro estándar? Envíanos su código o medidas y te confirmamos disponibilidad.{" "}
              <Link
                href={quoteHref("Cilindro neumático estándar")}
                className="text-signal font-medium hover:underline whitespace-nowrap"
              >
                Consultar disponibilidad →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* QUÉ NECESITAMOS */}
      <section className="section-pad">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">03 · Para cotizar</div>
            <h2 className="font-display text-display-lg text-surface">Qué necesitamos de ti</h2>
            <p className="text-steel-300 mt-4">Con cualquiera de estos datos podemos empezar.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {NECESITAMOS.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.05} className="h-full">
                <div className="h-full border border-black/10 bg-carbon p-6">
                  <span className="grid h-10 w-10 place-items-center bg-signal-soft text-signal mb-4">
                    <n.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg text-surface mb-1">{n.title}</h3>
                  <p className="text-sm text-steel-300 leading-relaxed">{n.desc}</p>
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

      <QuoteCTA quoteItem="Fabricación de cilindros neumáticos" />
    </div>
  );
}
