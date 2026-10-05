import type { Metadata } from "next";
import { CylinderExperience } from "@/components/industrial/CylinderExperience";
import { commercialMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, FileText, Box, Ruler, Camera, Hash, Factory, Wrench } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { whatsappCylinderService } from "@/lib/whatsapp";
import { BeforeAfterSlider } from "@/components/industrial/BeforeAfterSlider";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { CylinderRelated } from "@/components/industrial/CylinderRelated";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  ...commercialMetadata("Cilindros neumáticos en República Dominicana", "Fabricación de cilindros neumáticos a la medida bajo cotización. Comparte plano, muestra o medidas para tu solicitud.", "/cilindros-neumaticos"),
  title: "Cilindros neumáticos a la medida",
  description:
    "Fabricación de cilindros neumáticos a la medida en RD: doble y simple efecto, compactos, ISO y especiales, en mm o pulgadas. Cotiza con plano o muestra.",
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cilindros neumáticos a la medida",
  serviceType: "Fabricación y reparación de cilindros neumáticos",
  provider: { "@id": `${SITE.url}/#business` },
  areaServed: "República Dominicana",
  url: `${SITE.url}/cilindros-neumaticos`,
  description: "Fabricación de cilindros neumáticos a la medida (doble y simple efecto, compactos, ISO y especiales, métricos y en pulgadas) y reparación bajo cotización.",
};

export default function CilindrosNeumaticosPage() {
  return (
    <div className="industrial-detail cylinder-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <CylinderExperience />

      <section className="section-pad border-b border-black/5 cylinder-types">
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

      {/* FABRICACIÓN (la reparación vive en /servicios: mapa de intención WEB-010) */}
      <section className="section-pad border-b border-black/5 bg-carbon-900 cylinder-services">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">02 · Fabricación</div>
            <h2 className="font-display text-display-lg text-surface">Un cilindro nuevo, a tu medida</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Reveal className="h-full md:col-span-3">
              <div className="flex h-full flex-col border border-black/10 bg-carbon p-8">
                <Factory className="h-6 w-6 text-signal mb-5" />
                <h3 className="font-display text-2xl text-surface mb-5">Fabricación a la medida</h3>
                <ul className="space-y-3 mb-8 flex-1">
                  {["Cilindros nuevos a la medida", "Fabricación bajo muestra o plano", "Cilindros personalizados", "Medidas en milímetros o en pulgadas"].map((it) => (
                    <li key={it} className="flex items-start gap-3 text-steel-200">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                      {it}
                    </li>
                  ))}
                </ul>
                <a href={quoteHref("Fabricación de cilindros neumáticos")} target="_blank" rel="noopener" className="btn-primary min-h-12 self-start">
                  <WhatsAppIcon className="h-4 w-4" />
                  Cotizar por WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="h-full md:col-span-2">
              <div className="flex h-full flex-col border border-black/10 bg-carbon p-8">
                <Wrench className="h-6 w-6 text-signal mb-5" />
                <h3 className="font-display text-2xl text-surface mb-3">¿Tu cilindro está dañado?</h3>
                <p className="text-steel-300 leading-relaxed mb-8 flex-1">La reparación, la reconstrucción y el cambio de sellos tienen su propia página.</p>
                <Link href="/servicios" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium uppercase tracking-wider text-surface hover:text-signal">
                  Ver reparación de cilindros <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <p className="text-steel-300">
              ¿Buscas un cilindro estándar? Envíanos su código o medidas y te confirmamos disponibilidad.
              <a
                href={quoteHref("Cilindro neumático estándar")}
                target="_blank"
                rel="noopener"
                className="mt-1 flex min-h-11 w-fit items-center gap-1 text-signal font-medium hover:underline whitespace-nowrap"
              >
                Cotizar por WhatsApp <ArrowRight className="inline h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* QUÉ NECESITAMOS */}
      <section className="section-pad cylinder-quote-inputs">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">03 · Para cotizar</div>
            <h2 className="font-display text-display-lg text-surface">Qué necesitamos de ti</h2>
            <p className="text-steel-300 mt-4">Con cualquiera de estos datos podemos empezar. Lo mínimo: diámetro x carrera o una foto del cilindro y su placa.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {NECESITAMOS.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.05} className="h-full last:col-span-2 md:last:col-span-1">
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
            <a href={whatsappCylinderService()} target="_blank" rel="noopener" className="btn-primary min-h-12">
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ANTES Y DESPUÉS (fotos ya publicadas en /servicios) */}
      <section className="section-pad border-t border-black/5 bg-carbon-900">
        <div className="container-max">
          <Reveal className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">04 · Trabajo real</div>
            <h2 className="font-display text-display-lg text-surface">Antes y después</h2>
            <p className="text-steel-300 mt-4">Cilindro ISO 32 mm recuperado en nuestro taller. Desliza para comparar.</p>
          </Reveal>
          <Reveal>
            <BeforeAfterSlider
              before={{ src: "/cilindros/antes-cilindro-iso-32mm.jpg", alt: "Antes · Cilindro ISO 32 mm" }}
              after={{ src: "/cilindros/despues-cilindro-iso-32mm.jpg", alt: "Después · Cilindro ISO 32 mm recuperado" }}
            />
            <p className="text-sm text-steel-300 mt-5 max-w-3xl">Una reconstrucción incluye desarme, reemplazo de los componentes dañados, ensamblaje y prueba de funcionamiento antes de entregar. <Link href="/servicios" className="inline-flex min-h-10 items-center font-medium text-surface underline decoration-signal underline-offset-4 hover:text-signal">Ver reparación de cilindros</Link></p>
          </Reveal>
        </div>
      </section>

      <CylinderRelated current="/cilindros-neumaticos" />

      <QuoteCTA eyebrow="Fabricación · Bajo plano o muestra" title="¿Necesitas un cilindro neumático a la medida?" text="Envía el plano, la muestra, las medidas o fotos del cilindro y su placa. Te confirmamos alcance y condiciones en la cotización." quoteItem="Fabricación de cilindros neumáticos" />
    </div>
  );
}
