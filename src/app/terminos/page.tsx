import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio web y del proceso de cotización de Dynatech Ingeniería SRL.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Términos y condiciones"
      updated="julio 2026"
      intro={`Este es un documento de referencia general — si tu empresa requiere una versión revisada por asesoría legal, contáctanos y la actualizamos. Al usar ${SITE.url} aceptas los siguientes términos.`}
      sections={[
        {
          heading: "Objeto del sitio",
          body: (
            <p>
              {SITE.name} SRL (RNC {SITE.rnc}) distribuye piezas y componentes industriales en
              República Dominicana. Este sitio funciona como catálogo técnico y canal de
              solicitud de cotización — no procesa pagos ni ventas en línea. Los precios,
              cuando se muestran, son referenciales y no constituyen una oferta vinculante hasta
              ser confirmados por escrito en una cotización formal.
            </p>
          ),
        },
        {
          heading: "Uso del catálogo y del carrito de cotización",
          body: (
            <p>
              El &quot;carrito de cotización&quot; es una herramienta para armar tu lista de
              productos de interés y enviarla en una sola solicitud. Agregar un producto al
              carrito no genera ningún compromiso de compra ni de venta; el pedido se formaliza
              únicamente cuando ambas partes confirman precio, cantidad y condiciones.
            </p>
          ),
        },
        {
          heading: "Exactitud de la información",
          body: (
            <p>
              Nos esforzamos por mantener descripciones, especificaciones e imágenes precisas.
              Sin embargo, especificaciones de fabricantes pueden cambiar sin previo aviso.
              Ante cualquier duda técnica antes de comprar, confírmala con nuestro equipo.
            </p>
          ),
        },
        {
          heading: "Propiedad intelectual",
          body: (
            <p>
              El contenido de este sitio (textos, marca, logo, diseño) pertenece a {SITE.name}{" "}
              SRL o se usa bajo licencia. Las marcas de terceros mencionadas (Festo, SMC,
              Siemens, Omron, y otras) pertenecen a sus respectivos fabricantes y se citan
              únicamente con fines informativos de distribución.
            </p>
          ),
        },
        {
          heading: "Uso aceptable",
          body: (
            <p>
              No está permitido usar este sitio para fines ilícitos, extraer masivamente su
              contenido (scraping) sin autorización, ni intentar comprometer su seguridad o
              disponibilidad.
            </p>
          ),
        },
        {
          heading: "Limitación de responsabilidad",
          body: (
            <p>
              {SITE.name} SRL no se hace responsable por daños indirectos derivados del uso del
              sitio web. Nuestra responsabilidad frente a pedidos confirmados se rige por los
              términos comerciales acordados en cada cotización/factura.
            </p>
          ),
        },
        {
          heading: "Ley aplicable",
          body: <p>Estos términos se rigen por las leyes de la República Dominicana.</p>,
        },
        {
          heading: "Contacto",
          body: (
            <p>
              Preguntas sobre estos términos:{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-signal hover:underline">
                {CONTACT.email}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
