import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteCTA } from "@/components/cta/QuoteCTA";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce a ${SITE.name}: fabricación, reparación y reconstrucción de cilindros neumáticos en República Dominicana.`,
  alternates: { canonical: "/nosotros" },
};

const PRINCIPIOS = [
  {
    title: "01 · Ingeniería primero",
    body: "Detrás de cada cotización hay un ingeniero que comprende la aplicación, no un vendedor leyendo hojas de datos. Evaluamos y recomendamos con criterio técnico.",
  },
  {
    title: "02 · A la medida",
    body: "Trabajamos a partir de lo que tengas: plano, muestra, medidas, fotos o especificaciones. Si el repuesto original ya no existe, lo fabricamos.",
  },
  {
    title: "03 · Local, no lento",
    body: "Taller y equipo en Santo Domingo. Lo que no fabricamos, lo importamos bajo pedido, con tiempos de entrega definidos en la cotización.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="border-b border-black/5">
        <div className="container-max max-w-4xl py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Nosotros" }]} />
          <div className="eyebrow mb-3 mt-8">Nosotros</div>
          <h1 className="font-display text-display-xl text-surface mb-6">
            La medida exacta.<br />
            <span className="text-signal">No la más parecida.</span>
          </h1>
          <p className="text-xl text-steel-200 leading-relaxed max-w-3xl">
            Dynatech Ingeniería SRL fabrica, repara y reconstruye cilindros neumáticos para la
            industria en República Dominicana. Trabajamos bajo cotización: nos envías las
            especificaciones, cotizamos, fabricamos o importamos, y entregamos.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl">
          {PRINCIPIOS.map((p) => (
            <div key={p.title} className="border-l-2 border-signal pl-6">
              <div className="eyebrow mb-4">{p.title}</div>
              <p className="text-steel-200 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <QuoteCTA />
    </>
  );
}
