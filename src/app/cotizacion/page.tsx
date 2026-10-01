import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description: "Cotiza la fabricación, reparación o reconstrucción de tu cilindro neumático. Respuesta en menos de 24 horas hábiles.",
};

export default function CotizacionPage() {
  return (
    <div className="container-max py-12 sm:py-16">
      <div className="max-w-3xl">
        <div className="mb-10">
          <div className="eyebrow mb-3">Solicita tu cotización</div>
          <h1 className="font-display text-display-lg text-surface mb-4">
            Cuéntanos qué necesitas.
          </h1>
          <p className="text-lg text-steel-300 leading-relaxed">
            Envíanos el plano, la muestra, las medidas, fotos o las especificaciones. Un ingeniero
            de Dynatech te responde en menos de 24 horas hábiles. Cero compromiso.
          </p>
        </div>

        <Suspense fallback={<div className="text-steel-400">Cargando formulario…</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
