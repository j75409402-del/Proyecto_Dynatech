import type { Metadata } from "next";
import { commercialMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteCTA } from "@/components/cta/QuoteCTA";

export const metadata: Metadata = {
  ...commercialMetadata("Solicitar cotización por correo", "Envía tu solicitud industrial con referencias, cantidad y adjuntos a Dynatech Ingeniería SRL.", "/cotizacion/correo"),
  title: "Solicitar cotización por correo",
  description: "Envía a Dynatech tu solicitud de cotización con los datos de tu empresa, referencias, cantidades y adjuntos.",
  alternates: { canonical: "/cotizacion/correo" },
};

export default function CotizacionCorreoPage() {
  return (
    <>
      <div className="container-max py-12 sm:py-16">
        <div className="max-w-3xl">
          <Breadcrumbs items={[{ label: "Cotización por correo" }]} />
          <div className="mb-10">
            <div className="eyebrow mb-3">Cotización por correo</div>
            <h1 className="font-display text-display-lg text-surface mb-4">Cuéntanos qué necesitas.</h1>
            <p className="text-lg text-steel-300 leading-relaxed">
              Completa los datos y adjunta las fotos, planos o especificaciones disponibles.
              Tu solicitud quedará registrada para que el equipo de Dynatech prepare la cotización.
            </p>
          </div>
          <Suspense fallback={<div className="min-h-[1100px] sm:min-h-[900px] text-steel-400">Cargando formulario…</div>}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
      <QuoteCTA eyebrow="Contacto directo" title="También puedes consultar por WhatsApp" text="Comparte la referencia o los detalles de tu solicitud con nuestro equipo." />
    </>
  );
}
