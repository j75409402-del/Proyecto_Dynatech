import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { Band, SectionHead } from "@/components/page/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { getSolucion } from "@/lib/soluciones";
import { CALL_PHONES, CONTACT, SITE, emailHref, telHref } from "@/lib/constants";
import { whatsappService } from "@/lib/whatsapp";
import type { Faq } from "@/components/page/FaqBlock";

const solucion = getSolucion("neumatica");

const TITLE = "Proveedor de neumática en República Dominicana · Dynatech";
const DESCRIPTION =
  "Suplidor de neumática industrial en Santo Domingo: cilindros, válvulas y electroválvulas, FRL, conexiones y mangueras. Originales Festo y SMC por código.";

/** Confirmado por el dueño: sin cifras de plazo ni país de origen. */
const ENTREGA =
  "Entrega inmediata cuando hay existencia, o importación cuando no; disponibilidad y plazo se confirman en la cotización.";

const FAQS: Faq[] = [
  { q: "¿Dynatech vende electroválvulas en RD?", a: "Sí. Válvulas solenoides y direccionales 2/2, 3/2, 5/2 y 5/3, bajo cotización desde Santo Domingo." },
  { q: "¿Consiguen repuestos originales Festo o SMC en RD?", a: "Sí. Suministramos piezas originales Festo y SMC por código. Cotizamos exactamente el código que nos envías." },
  { q: "¿Tienen equivalentes a Festo o SMC?", a: "Cotizamos la pieza original por código. Si no está disponible, ofrecemos otra marca de primera calidad." },
  { q: "¿Cuánto tarda la entrega?", a: ENTREGA },
  { q: "¿Entregan fuera de Santo Domingo?", a: "Sí. En todo el país, incluidas las zonas francas del interior." },
  { q: "¿Pueden reemplazar un cilindro que ya no se fabrica?", a: "Sí. Lo fabricamos a la medida desde plano, muestra o medidas, en mm o pulgadas." },
  { q: "¿Reparan cilindros neumáticos?", a: "Sí. Reparación, reconstrucción y cambio de sellos, con prueba antes de entregar." },
  { q: "¿Instalan o programan?", a: "No. En neumática solo suministramos." },
  { q: "¿Atienden zonas francas?", a: "Sí. Empresas y zonas francas en el país." },
  { q: "¿Cómo sé la disponibilidad?", a: "Disponibilidad y plazo se confirman en la cotización." },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: "Dynatech Ingeniería SRL",
  url: `${SITE.url}/`,
  telephone: ["+1-809-284-4336", "+1-809-854-2800"],
  email: CONTACT.email,
  taxID: SITE.rnc,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.streetAddress,
    addressLocality: CONTACT.locality,
    addressCountry: "DO",
  },
  areaServed: { "@type": "Country", name: "República Dominicana" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
  ],
  knowsAbout: ["Neumática industrial", "Cilindros neumáticos", "Válvulas solenoides", "Unidades FRL", "Reparación de cilindros neumáticos", "Piezas originales Festo", "Piezas originales SMC"],
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [solucion.image] },
  alternates: { canonical: "/neumatica" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/neumatica", images: [solucion.image] },
};

/**
 * Destacado de Neumática (mapa de intención WEB-010): reparte hacia las páginas propias sin
 * atacar "fabricación/reparación de cilindros" (eso vive en /cilindros-neumaticos y /servicios).
 */
const DESTACADOS = [
  { href: "/cilindros-neumaticos", title: "Cilindros neumáticos a la medida", desc: "Doble y simple efecto, compactos e ISO, en mm o pulgadas." },
  { href: "/valvulas-neumaticas", title: "Válvulas neumáticas", desc: "Direccionales y solenoides: 2/2, 3/2, 5/2 y 5/3." },
  { href: "/servicios", title: "Reparación de cilindros", desc: "Reparación y reconstrucción, con prueba antes de entregar." },
  { href: "/sellos-y-componentes", title: "Kits de sellos y vástagos", desc: "Repuestos para mantener tus cilindros." },
];

function CilindrosDestacado() {
  return (
    <Band tone="dark" labelledBy="neumatica-destacado">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          {/* WEB-011: foto de catálogo (antes cilindros-nuevos.jpg, imagen IA con marcas de terceros). */}
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white lg:aspect-[4/5]">
            <Image
              src="/products/cilindros-smc.jpg"
              alt="Imagen de catálogo: cilindros neumáticos compactos, ISO y de vástago guiado"
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="object-contain p-6"
            />
            <span className="img-note">Imagen de catálogo</span>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <p className="section-kicker">Dentro de neumática</p>
          <h2 id="neumatica-destacado" className="section-title text-white">Cilindros, válvulas y conexiones</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#bcc8d2]">
            Los cilindros y las válvulas tienen su propia página, con los datos que necesitamos para cotizarlos.
          </p>
          <ul className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {DESTACADOS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group flex h-full min-h-[96px] flex-col justify-center gap-1 bg-[#0b1016] p-5 transition-colors hover:bg-[#121a22]">
                  <span className="flex items-center justify-between gap-3 text-base font-semibold text-white">
                    {d.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ff5a75] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-[#a9b7c4]">{d.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Band>
  );
}

function NeumaticaTexto() {
  return (
    <>
      <Band tone="white" labelledBy="neumatica-suministro">
        <SectionHead kicker="Neumática" id="neumatica-suministro" title="Qué suministramos en neumática" />
        <ul className="mt-8 grid gap-4 text-base leading-relaxed text-steel-300">
          <li><b className="text-surface">Cilindros neumáticos.</b> Doble y simple efecto, compactos e ISO, en milímetros o pulgadas. También a la medida, bajo plano o muestra. <Link href="/cilindros-neumaticos" className="text-signal">Ver cilindros</Link>.</li>
          <li><b className="text-surface">Válvulas neumáticas y electroválvulas.</b> Direccionales y solenoides 2/2, 3/2, 5/2 y 5/3. <Link href="/valvulas-neumaticas" className="text-signal">Ver válvulas</Link>.</li>
          <li><b className="text-surface">Preparación del aire.</b> Unidades FRL, filtros, reguladores y lubricadores. <Link href="/neumatica#frl" className="text-signal">Ver unidades FRL</Link>.</li>
          <li><b className="text-surface">Conexiones.</b> Push-in (conectores, codos, tés, reguladores de flujo) y <Link href="/neumatica#conexiones-rapidas" className="text-signal">conexiones rápidas</Link> para manguera y herramienta. <Link href="/neumatica#conexiones" className="text-signal">Ver conexiones</Link>.</li>
          <li><b className="text-surface">Mangueras neumáticas.</b> Poliuretano, nylon y PVC. <Link href="/neumatica#mangueras" className="text-signal">Ver mangueras</Link>.</li>
          <li><b className="text-surface">Controles y accesorios.</b> Válvulas manuales, silenciadores y reguladores de caudal. También amortiguadores y generadores de vacío. <Link href="/neumatica#controles-neumaticos" className="text-signal">Ver controles</Link>. <Link href="/neumatica#accesorios" className="text-signal">Ver accesorios</Link>.</li>
          <li><b className="text-surface">Repuestos.</b> Kits de sellos y vástagos cromados. <Link href="/sellos-y-componentes" className="text-signal">Ver sellos y vástagos</Link>.</li>
          <li><b className="text-surface">Marcas originales.</b> Suministramos piezas originales Festo y SMC, y de otras marcas originales, bajo pedido por código.</li>
        </ul>
      </Band>
      <Band tone="light" labelledBy="neumatica-festo-smc">
        <SectionHead kicker="Por código" id="neumatica-festo-smc" title="¿Una alternativa para repuestos Festo o SMC?" />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">Sí. Suministramos piezas originales Festo y SMC bajo pedido por código. Envíanos el código de la placa y te cotizamos exactamente esa pieza original, no un equivalente. Si el cilindro ya no se fabrica, lo fabricamos a la medida a partir de la muestra o las medidas.</p>
      </Band>
      <Band tone="white" labelledBy="neumatica-taller">
        <SectionHead kicker="Taller" id="neumatica-taller" title="Servicios de taller" />
        <ul className="mt-8 grid gap-4 text-base leading-relaxed text-steel-300">
          <li><b className="text-surface">Reparación de cilindros.</b> Reparación, reconstrucción y cambio de sellos, con prueba de funcionamiento antes de entregar. <Link href="/servicios" className="text-signal">Ver reparación</Link>.</li>
          <li><b className="text-surface">Fabricación a la medida.</b> Cilindros nuevos bajo plano, muestra o medidas (ejemplo real del taller: 160 x 150 mm). <Link href="/cilindros-neumaticos" className="text-signal">Ver fabricación</Link>.</li>
          <li><b className="text-surface">Mecanizado.</b> Torno y fresadora, bajo plano o muestra. <Link href="/mecanizado" className="text-signal">Ver mecanizado</Link>.</li>
          <li><b className="text-surface">Cilindros hidráulicos.</b> Fabricación y reparación. <Link href="/cilindros-hidraulicos" className="text-signal">Ver cilindros hidráulicos</Link>.</li>
        </ul>
      </Band>
      <Band tone="light" labelledBy="neumatica-para-quien">
        <SectionHead kicker="Alcance" id="neumatica-para-quien" title="Para quién es" />
        <div className="mt-8 grid gap-8">
          <div>
            <h3 className="font-semibold text-surface">Sí</h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-steel-300">Compras, mantenimiento e ingeniería de manufactureras y empresas de zonas francas en República Dominicana que necesitan repuestos para máquinas y líneas de producción, sistemas de aire comprimido o reemplazo de componentes descontinuados.</p>
          </div>
          <div>
            <h3 className="font-semibold text-surface">No</h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-steel-300">En neumática solo suministramos. No instalamos ni programamos. Tampoco vendemos neumáticos (gomas) de vehículos.</p>
          </div>
          <div>
            <h3 className="font-semibold text-surface">Plazos de entrega</h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-steel-300">{ENTREGA}</p>
          </div>
        </div>
      </Band>
      <Band tone="white" labelledBy="neumatica-como-cotizar">
        <SectionHead kicker="Cotización" id="neumatica-como-cotizar" title="Cómo cotizar" />
        <ol className="mt-8 grid list-decimal gap-4 pl-5 text-base leading-relaxed text-steel-300">
          <li>Escribe por <a href={whatsappService("componente")} target="_blank" rel="noopener" className="text-signal">WhatsApp al {CONTACT.whatsappDisplay}</a> con el código o una foto del componente (y de su placa).</li>
          <li>Añade medidas de conexión y rosca, si las conoces; para electroválvulas, la etiqueta de la bobina y su voltaje.</li>
          <li>Indica la aplicación, la presión de trabajo, la cantidad y la ciudad de entrega.</li>
        </ol>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">Recibes precio, plazo y condiciones. Confirmas la orden, entrega y facturación. Entregamos en todo el país, incluidas las zonas francas del interior.</p>
      </Band>
      <Band tone="light" labelledBy="neumatica-donde">
        <SectionHead kicker="Santo Domingo" id="neumatica-donde" title="Dónde estamos" />
        <div className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">
          <p>{SITE.legalName} · RNC {SITE.rnc}</p>
          <p>{CONTACT.address}</p>
          <p>Tel.: {CALL_PHONES.map((p, i) => <span key={p}>{i > 0 && " · "}<a href={telHref(p)} className="text-signal">{p}</a></span>)} · <a href={emailHref()} className="text-signal">{CONTACT.email}</a></p>
          <p>{CONTACT.hours}</p>
        </div>
      </Band>
    </>
  );
}

export default function NeumaticaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <SolucionPage
        solucion={solucion}
        headline="¿Buscas un proveedor de neumática en República Dominicana?"
        lead={<p>Dynatech Ingeniería SRL es un suplidor de neumática industrial en Santo Domingo: cilindros, válvulas direccionales y solenoides (electroválvulas), unidades FRL, conexiones y mangueras para empresas y zonas francas. Además fabricamos y reparamos cilindros neumáticos en nuestro taller; cotizas por WhatsApp con una foto, código o plano.</p>}
        destacado={<><NeumaticaTexto /><CilindrosDestacado /></>}
        faqItems={FAQS}
      />
    </>
  );
}
