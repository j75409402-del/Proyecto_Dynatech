import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Resolvemos las dudas más comunes sobre pedidos, tiempos de entrega, productos y cotizaciones en Dynatech Ingeniería.",
};

export default function FaqPage() {
  return (
    <LegalPage
      eyebrow="Ayuda"
      title="Preguntas frecuentes"
      updated="julio 2026"
      sections={[
        {
          heading: "¿Cómo funciona una cotización con Dynatech?",
          body: (
            <p>
              Agregas los productos que necesitas al carrito de cotización (o nos escribes
              directo por WhatsApp), completas tus datos de contacto y un ingeniero de Dynatech
              te responde con precio y disponibilidad — normalmente en menos de 24 horas hábiles.
            </p>
          ),
        },
        {
          heading: "¿Puedo comprar directamente en el sitio web?",
          body: (
            <p>
              Todavía no procesamos pagos en línea. El catálogo funciona como vitrina técnica:
              armas tu lista, la envías como solicitud de cotización y cerramos el pedido por
              WhatsApp, correo o factura formal, según cómo trabaje tu empresa.
            </p>
          ),
        },
        {
          heading: "¿Cuál es el pedido mínimo?",
          body: (
            <p>
              Depende del producto. Para la mayoría de piezas de catálogo no hay mínimo; para
              pedidos especiales o importación directa, tu ingeniero de cuenta te lo confirma
              al cotizar.
            </p>
          ),
        },
        {
          heading: "¿Cuánto tardan las entregas?",
          body: (
            <p>
              Depende del producto y su origen — desde nuestro inventario en Santo Domingo o
              por importación directa. Escríbenos con la referencia que necesitas y te
              confirmamos disponibilidad y tiempo de entrega al cotizar.
            </p>
          ),
        },
        {
          heading: "¿Los productos que venden son originales?",
          body: (
            <p>
              Sí. Trabajamos con componentes industriales genuinos — no manejamos réplicas ni
              clones. Cada ficha de producto incluye su referencia o número de parte para que
              puedas verificarlo.
            </p>
          ),
        },
        {
          heading: "¿Hacen envíos fuera de Santo Domingo?",
          body: (
            <p>
              Sí, coordinamos envíos a todo el territorio nacional. El costo y tiempo de envío
              se confirman junto con tu cotización según el destino y volumen del pedido.
            </p>
          ),
        },
        {
          heading: "¿Qué formas de pago aceptan?",
          body: (
            <p>
              Trabajamos con transferencia bancaria y crédito corporativo para clientes
              recurrentes con cuenta abierta. Los detalles se confirman al formalizar cada
              cotización.
            </p>
          ),
        },
        {
          heading: "¿Y si no encuentro lo que necesito en el catálogo?",
          body: (
            <p>
              El catálogo online es una parte de lo que distribuimos. Escríbenos por{" "}
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-signal hover:underline">
                WhatsApp
              </a>{" "}
              o desde el{" "}
              <Link href="/cotizacion" className="text-signal hover:underline">
                formulario de cotización
              </Link>{" "}
              con la referencia o especificación que buscas — muy probablemente lo conseguimos.
            </p>
          ),
        },
      ]}
    />
  );
}
