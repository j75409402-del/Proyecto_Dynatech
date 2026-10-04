import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteCTA, quoteHref, emailQuoteHref } from "@/components/cta/QuoteCTA";
import { SITE } from "@/lib/constants";
import { getSolucion } from "@/lib/soluciones";

const sub = getSolucion("neumatica").subcategorias.find((item) => item.id === "valvulas")!;
const title = "Válvulas neumáticas en República Dominicana";
const description = "Cotiza válvulas neumáticas direccionales y solenoides con Dynatech en Santo Domingo. Envía referencia, foto, conexiones y datos de tu aplicación industrial.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/valvulas-neumaticas" },
  openGraph: { title, description, url: "/valvulas-neumaticas", images: [sub.image!] },
  twitter: { card: "summary_large_image", title, description, images: [sub.image!] },
};

const information = [
  { title: "Referencia y fotografías", text: "Comparte el código completo y una foto legible de la etiqueta. Añade una imagen de la válvula y sus conexiones; si tiene un símbolo de funcionamiento, inclúyelo. Así podremos evaluar qué componente necesitas." },
  { title: "Configuración y accionamiento", text: "Indica la configuración conocida, como 2/2, 3/2, 5/2 o 5/3, y cómo se acciona en tu máquina. Si no tienes ese dato, envía el código o las fotos disponibles para revisar la solicitud." },
  { title: "Conexiones y montaje", text: "Envíanos las medidas de conexión y el tipo de rosca, si están documentados. Indica si la válvula está montada individualmente o en un conjunto y comparte fotos del montaje existente." },
  { title: "Datos eléctricos y de operación", text: "Cuando tenga bobina, comparte su etiqueta y la alimentación indicada. Añade la presión de trabajo conocida y explica qué función cumple la válvula en el equipo. No es necesario que completes datos que desconoces." },
];

export default function ValvulasNeumaticasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Suministro de válvulas neumáticas bajo cotización",
    description,
    url: `${SITE.url}/valvulas-neumaticas`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: "República Dominicana",
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="border-b border-black/5">
        <div className="container-max pt-7">
          <Breadcrumbs items={[{ label: "Neumática", href: "/neumatica" }, { label: "Válvulas neumáticas" }]} />
        </div>
        <div className="container-max grid gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">Neumática industrial · Bajo cotización</p>
            <h1 className="font-display text-display-xl mb-6">{title}</h1>
            <p className="text-lg leading-relaxed text-steel-300 mb-6">Cotiza válvulas direccionales y solenoides para controlar el paso del aire en tus equipos. En Dynatech Ingeniería SRL, en Santo Domingo, recibimos solicitudes de componentes neumáticos para empresas de República Dominicana.</p>
            <div className="flex flex-wrap gap-3">
              <a href={quoteHref(sub.title, "Neumática")} target="_blank" rel="noopener noreferrer" className="btn-primary">Cotizar válvula por WhatsApp</a>
              <Link href={emailQuoteHref(sub.title, "Neumática")} className="btn-secondary">Cotizar por correo</Link>
            </div>
            <p className="mt-5 text-sm text-steel-400">La disponibilidad, compatibilidad y condiciones se confirman al evaluar tu solicitud.</p>
          </div>
          <div className="relative aspect-[4/3] border border-black/10 bg-white">
            <Image src={sub.image!} alt={sub.imageAlt ?? sub.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6" />
          </div>
        </div>
      </section>
      <section className="section-pad border-b border-black/5">
        <div className="container-max">
          <p className="eyebrow mb-3">Qué cotizamos</p>
          <h2 className="font-display text-display-lg mb-5">Válvulas direccionales y solenoides</h2>
          <p className="max-w-3xl text-steel-300 leading-relaxed mb-6">Nuestra línea de neumática incluye las configuraciones y tipos siguientes. Para un reemplazo, comparte la referencia del componente existente; la apariencia por sí sola no confirma que dos válvulas sean compatibles.</p>
          <ul className="flex flex-wrap gap-3 mb-8">{sub.ejemplos?.map((item) => <li key={item} className="border border-black/15 px-4 py-3">{item}</li>)}</ul>
          <p className="max-w-3xl text-steel-300 leading-relaxed">Si tu solicitud corresponde a una válvula de descarga rápida o de cheque, indica su función y comparte fotos de las conexiones. La disponibilidad del componente se confirma al evaluar la referencia y la aplicación.</p>
        </div>
      </section>
      <section className="section-pad bg-carbon-900 border-b border-black/5">
        <div className="container-max">
          <h2 className="font-display text-display-lg mb-5">Qué enviar para cotizar una válvula neumática</h2>
          <p className="text-steel-300 mb-8">Envía los datos que tengas, junto con la cantidad y tu ciudad. Una solicitud bien identificada ayuda a evaluar el repuesto para tu máquina.</p>
          <div className="grid gap-4 sm:grid-cols-2">{information.map((item) => (
            <div key={item.title} className="border border-black/10 bg-carbon p-6">
              <h3 className="font-display text-xl mb-3">{item.title}</h3>
              <p className="text-steel-300 leading-relaxed">{item.text}</p>
            </div>
          ))}</div>
        </div>
      </section>
      <section className="container-max py-12">
        <h2 className="font-display text-display-lg mb-5">Componentes relacionados de tu sistema neumático</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li><Link className="text-signal underline underline-offset-4" href="/cilindros-neumaticos">Cilindros neumáticos</Link></li>
          <li><Link className="text-signal underline underline-offset-4" href="/neumatica#conexiones">Conexiones y conectores neumáticos</Link></li>
          <li><Link className="text-signal underline underline-offset-4" href="/neumatica#frl">Unidades FRL y reguladores</Link></li>
          <li><Link className="text-signal underline underline-offset-4" href="/neumatica#accesorios">Bobinas, manifolds y accesorios</Link></li>
        </ul>
      </section>
      <QuoteCTA eyebrow="Válvulas neumáticas · República Dominicana" title="Envía la referencia de la válvula que necesitas" text="Comparte código, fotos y datos disponibles de la aplicación. Evaluamos tu solicitud y confirmamos las condiciones en la cotización." quoteItem={sub.title} quoteTipo="Neumática" />
    </div>
  );
}
