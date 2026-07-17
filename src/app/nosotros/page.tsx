import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `Conoce a ${SITE.name} — distribuidora industrial en República Dominicana.`,
};

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-black/5 section-pad">
        <div className="container-max max-w-4xl">
          <div className="eyebrow mb-3">Nosotros</div>
          <h1 className="font-display text-display-xl text-surface mb-6">
            No vendemos catálogo.<br />
            <span className="text-signal">Vendemos uptime.</span>
          </h1>
          <p className="text-xl text-steel-200 leading-relaxed max-w-3xl">
            Dynatech Ingeniería SRL nació para resolver un problema concreto de la industria
            dominicana: encontrar la pieza correcta, al precio correcto, sin esperar semanas
            de importación mientras la producción se detiene.
          </p>
        </div>
      </section>

      {/* Filosofía en 3 párrafos */}
      <section className="section-pad border-b border-black/5">
        <div className="container-max grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl">
          <div>
            <div className="eyebrow mb-4">01 · Ingeniería primero</div>
            <p className="text-steel-200 leading-relaxed">
              Detrás de cada cotización hay un ingeniero que comprende la aplicación,
              no un vendedor leyendo hojas de datos. Evaluamos, dimensionamos y
              recomendamos con criterio técnico.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-4">02 · Distribución oficial</div>
            <p className="text-steel-200 leading-relaxed">
              Somos representantes autorizados de Festo, SMC, Siemens, Omron, Parker,
              Schneider y otras marcas líderes. Sin réplicas ni mercado gris: cada pieza
              cuenta con garantía del fabricante.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-4">03 · Local, no lento</div>
            <p className="text-steel-200 leading-relaxed">
              Contamos con inventario en Santo Domingo para consumibles y repuestos
              críticos, e importación directa para equipos especiales, con tiempos de
              entrega definidos.
            </p>
          </div>
        </div>
      </section>

      {/* Números o hitos */}
      <section className="section-pad border-b border-black/5 bg-carbon-900">
        <div className="container-max max-w-5xl">
          <div className="eyebrow mb-8">Datos operativos</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "24h", l: "Respuesta cotización" },
              { n: "8+",  l: "Marcas representadas" },
              { n: "100+", l: "SKUs en catálogo activo" },
              { n: "RD", l: "Base de operaciones" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-signal pl-4">
                <div className="font-display text-4xl text-surface text-numeric mb-2">
                  {s.n}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-max max-w-4xl text-center">
          <h2 className="font-display text-display-lg text-surface mb-4">
            ¿Necesita una solución específica?
          </h2>
          <p className="text-steel-300 mb-8 max-w-xl mx-auto">
            Cuéntenos sobre su proyecto y le enviaremos una cotización.
          </p>
          <Link href="/cotizacion" className="btn-primary">
            Solicitar cotización
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
