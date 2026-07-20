import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de devoluciones",
  description: "Condiciones para devolución o cambio de productos comprados a Dynatech Ingeniería SRL.",
};

export default function DevolucionesPage() {
  return (
    <LegalPage
      eyebrow="Soporte"
      title="Política de devoluciones"
      updated="julio 2026"
      intro="Como cada pedido se formaliza mediante cotización directa con nuestro equipo (no hay checkout automático en el sitio), las devoluciones también se coordinan directamente — sin procesos automáticos ni letra pequeña oculta."
      sections={[
        {
          heading: "Condiciones generales",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Plazo de 7 días calendario desde la entrega para solicitar la devolución.</li>
              <li>El producto debe estar sin usar, en su empaque original y con todos sus accesorios.</li>
              <li>Se requiere el número de factura u orden de compra correspondiente.</li>
            </ul>
          ),
        },
        {
          heading: "Productos que no aplican a devolución",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Productos cortados, ensamblados o modificados a pedido (ej. mangueras cortadas a medida).</li>
              <li>Productos de importación especial o pedidos directos a fábrica bajo especificación del cliente.</li>
              <li>Consumibles y piezas de desgaste una vez instalados (sellos, empaques, resistencias usadas).</li>
              <li>Productos dañados por mal uso o instalación incorrecta.</li>
            </ul>
          ),
        },
        {
          heading: "Productos con defecto de fábrica",
          body: (
            <p>
              Si el producto llega con un defecto de fabricación, se gestiona bajo nuestra{" "}
              <a href="/garantias" className="text-signal hover:underline">
                política de garantías
              </a>{" "}
              en lugar de esta política de devoluciones — sin costo para ti.
            </p>
          ),
        },
        {
          heading: "Cómo solicitar una devolución",
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
              con tu número de factura y el motivo de la devolución. Te confirmamos si aplica y
              coordinamos la logística de retiro o cambio.
            </p>
          ),
        },
        {
          heading: "Reembolsos",
          body: (
            <p>
              Las devoluciones aprobadas se resuelven como nota de crédito para tu próxima
              compra o reembolso por el mismo método de pago utilizado, según lo acordado al
              momento de facturar.
            </p>
          ),
        },
      ]}
    />
  );
}
