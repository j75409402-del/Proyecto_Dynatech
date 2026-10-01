import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT, emailHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Garantías",
  description: "Condiciones de garantía de los trabajos y piezas de Dynatech Ingeniería SRL.",
  alternates: { canonical: "/garantias" },
};

export default function GarantiasPage() {
  return (
    <LegalPage
      eyebrow="Soporte"
      title="Garantías"
      updated="julio 2026"
      intro="Todo trabajo de fabricación o reparación realizado por Dynatech Ingeniería incluye garantía, con el alcance específico confirmado en la cotización. En piezas importadas, trasladamos la garantía del fabricante y gestionamos el reclamo en representación tuya."
      sections={[
        {
          heading: "Cobertura",
          body: (
            <p>
              La garantía cubre defectos de fabricación, materiales o funcionamiento bajo
              condiciones normales de uso. El plazo y alcance específicos de cada trabajo o pieza
              se confirman al momento de la cotización.
            </p>
          ),
        },
        {
          heading: "Qué no cubre la garantía",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Desgaste normal por uso (sellos, empaques, consumibles).</li>
              <li>Daños por instalación incorrecta, mal uso o condiciones fuera de especificación.</li>
              <li>Modificaciones o reparaciones realizadas por terceros no autorizados.</li>
              <li>Daños por eventos externos (sobrevoltaje, humedad, corrosión no especificada, golpes).</li>
            </ul>
          ),
        },
        {
          heading: "Cómo hacer un reclamo",
          body: (
            <p>
              Escríbenos por WhatsApp al{" "}
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">
                {CONTACT.whatsappDisplay}
              </a>{" "}
              o a{" "}
              <a href={emailHref()} className="text-signal hover:underline">
                {CONTACT.email}
              </a>{" "}
              con la descripción del trabajo o la pieza, tu número de factura u orden de compra, y una
              breve descripción del problema (foto o video ayuda). Un ingeniero evalúa el caso y
              te confirma los siguientes pasos — reemplazo, reparación o gestión directa con el
              fabricante, según corresponda.
            </p>
          ),
        },
        {
          heading: "Piezas de reparación y consumibles",
          body: (
            <p>
              Kits de sellos, empaques y otras piezas de desgaste están diseñadas para
              mantenimiento periódico y no están cubiertas por garantía una vez instaladas.
            </p>
          ),
        },
      ]}
    />
  );
}
