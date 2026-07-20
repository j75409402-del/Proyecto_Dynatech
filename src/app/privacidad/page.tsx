import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Dynatech Ingeniería SRL recopila, usa y protege los datos que compartes en este sitio.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de privacidad"
      updated="julio 2026"
      intro={`Este es un documento de referencia general — si tu empresa requiere una versión revisada por asesoría legal, contáctanos y la actualizamos. En Dynatech Ingeniería SRL ("Dynatech", "nosotros") respetamos la privacidad de quienes visitan ${SITE.url} y usan nuestros formularios de cotización y contacto.`}
      sections={[
        {
          heading: "Qué información recopilamos",
          body: (
            <p>
              Cuando completas el carrito de cotización, el formulario de contacto o nos
              escribes por WhatsApp, recopilamos los datos que nos proporcionas voluntariamente:
              nombre, empresa, RNC, correo electrónico, teléfono, ciudad, y el detalle de los
              productos que te interesan. No solicitamos ni almacenamos datos de tarjetas de
              pago ni información financiera a través del sitio.
            </p>
          ),
        },
        {
          heading: "Para qué usamos tus datos",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Responder tu solicitud de cotización o consulta.</li>
              <li>Coordinar entregas y facturación de pedidos confirmados.</li>
              <li>Contactarte sobre el estado de tu solicitud (por correo o WhatsApp).</li>
              <li>Mejorar nuestro catálogo y servicio al cliente.</li>
            </ul>
          ),
        },
        {
          heading: "Con quién compartimos tu información",
          body: (
            <p>
              No vendemos ni alquilamos tus datos a terceros. Solo los compartimos cuando es
              necesario para cumplir tu solicitud (por ejemplo, con transportistas para
              coordinar una entrega) o cuando la ley nos lo requiere.
            </p>
          ),
        },
        {
          heading: "Cuánto tiempo conservamos tus datos",
          body: (
            <p>
              Conservamos la información de cotizaciones y pedidos mientras exista una relación
              comercial activa o mientras sea necesario por motivos contables/fiscales. Puedes
              solicitar la eliminación de tus datos de contacto en cualquier momento, salvo la
              información que estemos legalmente obligados a conservar.
            </p>
          ),
        },
        {
          heading: "Tus derechos",
          body: (
            <p>
              Puedes solicitarnos en cualquier momento acceder, corregir o eliminar tus datos
              personales escribiéndonos a{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-signal hover:underline">
                {CONTACT.email}
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Cookies y analítica",
          body: (
            <p>
              Este sitio puede usar cookies técnicas o de analítica básica para entender cómo se
              usa el catálogo y mejorar la experiencia de navegación. No usamos esta información
              para publicidad de terceros.
            </p>
          ),
        },
        {
          heading: "Cambios a esta política",
          body: (
            <p>
              Podemos actualizar esta política ocasionalmente. La fecha de &quot;última
              actualización&quot; al inicio de esta página refleja la versión vigente.
            </p>
          ),
        },
      ]}
    />
  );
}
