import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Garantías",
  description: "Condiciones de garantía de los productos distribuidos por Dynatech Ingeniería SRL.",
};

export default function GarantiasPage() {
  return (
    <LegalPage
      eyebrow="Soporte"
      title="Garantías"
      updated="julio 2026"
      intro="Como distribuidor oficial, Dynatech Ingeniería traslada a cada cliente la garantía de fábrica del fabricante correspondiente, y gestiona el proceso de reclamo en representación tuya."
      sections={[
        {
          heading: "Cobertura",
          body: (
            <p>
              Los productos cubren defectos de fabricación, materiales o funcionamiento bajo
              condiciones normales de uso, según el plazo y términos que defina cada fabricante
              (Festo, SMC, Siemens, Omron, Parker Hannifin, Schneider Electric, WIKA, entre
              otros). El plazo específico de cada producto se indica en su ficha técnica o
              datasheet cuando el fabricante lo publica.
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
              <a href={`mailto:${CONTACT.email}`} className="text-signal hover:underline">
                {CONTACT.email}
              </a>{" "}
              con el SKU o nombre del producto, tu número de factura u orden de compra, y una
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
