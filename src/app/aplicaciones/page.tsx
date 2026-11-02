import type { Metadata } from "next";
import Link from "next/link";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { Band } from "@/components/page/Blocks";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Aplicaciones",
  description: "Dónde se usan las líneas de suministro industrial de Dynatech. Empresas y zonas francas en República Dominicana.",
  alternates: { canonical: "/aplicaciones" },
};

export default function AplicacionesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Aplicaciones" }]}
        kicker="Suministro industrial"
        title="Aplicaciones"
        lead={<p>Empresas y zonas francas.</p>}
        quoteHref={whatsappGeneral()}
        note="Foto, código o plano."
        image={{ src: "/banners/neumatica-industrial-conectores.webp", alt: "Componentes neumáticos de referencia" }}
        caption={{ label: "Imagen de referencia", text: "Líneas industriales" }}
        trust="lineas"
      />
      <Band tone="light" labelledBy="aplicaciones-lista">
        <h2 id="aplicaciones-lista" className="sr-only">Aplicaciones por línea</h2>
        <div className="app-groups">
          {SOLUCIONES.map((s) => (
            <section key={s.slug} aria-labelledby={`app-${s.slug}`}>
              <h3 id={`app-${s.slug}`}><Link href={`/${s.slug}`}>{s.name}</Link></h3>
              <ul>
                {s.aplicaciones.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </Band>
      <QuoteCTA eyebrow="Bajo cotización" title="Cuéntanos el uso" text="Foto, código o plano." whatsappHref={whatsappGeneral()} />
    </>
  );
}
