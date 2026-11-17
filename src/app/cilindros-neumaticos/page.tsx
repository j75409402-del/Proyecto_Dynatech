import { ServiceAvailabilityNotice } from "@/components/page/ServiceAvailabilityNotice";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { commercialMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { whatsappService } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CylinderRelated } from "@/components/industrial/CylinderRelated";
import { TaHead, TaHero, TaLink, TaProductCard, TaSteps } from "@/components/taller/TallerA";
import { CONTACT, SITE } from "@/lib/constants";
import { ENTREGA_LINEA } from "@/lib/entrega";
import { FaqBlock, type Faq } from "@/components/page/FaqBlock";

const title = "Cilindros neumáticos en Santo Domingo · Cotiza";
const description =
  "Cilindros neumáticos para mantenimiento y compras de planta en Santo Domingo: ISO, compactos y a la medida, y reparación. Cotiza por WhatsApp.";

export const metadata: Metadata = {
  ...commercialMetadata(title, description, "/cilindros-neumaticos"),
  title: { absolute: title },
  description,
  alternates: { canonical: "/cilindros-neumaticos" },
};

/**
 * Tipos tomados del trabajo real de Dynatech (inventario y trabajos de taller) — no
 * agregar tipos que no manejen.
 */
const TIPOS = [
  { code: "D/E", title: "Doble efecto", desc: "Avance y retroceso por aire." },
  { code: "S/E", title: "Simple efecto", desc: "Retorno por resorte." },
  { code: "CPT", title: "Compactos", desc: "Para espacios reducidos." },
  { code: "ISO", title: "ISO", desc: "Cilindros de norma ISO." },
  { code: "TR", title: "De tirantes", desc: "Cilindro con tirantes, tie-rod." },
  { code: "MINI", title: "Mini redondo", desc: "Cilindro redondo de tamaño mini." },
  { code: "GUI", title: "Guiado", desc: "Cilindro con guía." },
  { code: "mm / in", title: "Métricos y en pulgadas", desc: "Diámetro y carrera en ambos sistemas." },
  { code: "ESP", title: "A la medida", desc: "Especiales, bajo plano o muestra." },
];

const NECESITAMOS = [
  { title: "Plano", desc: "Plano o dibujo técnico de la pieza." },
  { title: "Muestra", desc: "El cilindro o el componente original." },
  { title: "Medidas", desc: "Diámetro y carrera, como mínimo." },
  { title: "Fotos", desc: "Del cilindro, su placa y su montaje." },
  { title: "Código", desc: "La referencia del cilindro, si la tienes." },
];

/** Componentes para cilindro (textos de /sellos-y-componentes). Anclas existentes de esa página. */
const COMPONENTES_CIL = [
  { href: "/sellos-y-componentes#kits-de-sellos", title: "Kits de sellos", text: "Para reparación y mantenimiento.", image: "/products/kit-sellos-recorte.webp", alt: "Imagen de referencia: kit de sellos para cilindro neumático", imgClass: "p-5" },
  { href: "/sellos-y-componentes#vastagos", title: "Vástagos cromados a medida", text: "Con el acabado y la tolerancia del original.", image: "/products/vastago-cromado-cilindro-neumatico.webp", alt: "Vástago cromado para cilindro neumático, con rosca y tuerca en el extremo", imgClass: "p-4" },
];

const PASOS = [
  { title: "Envías el dato", text: "Plano, muestra, medidas o fotos." },
  { title: "Recibes la cotización", text: "Precio, plazo y condiciones." },
  { title: "Confirmas", text: "Orden, entrega y facturación." },
];

/** Solo hechos ya publicados en esta página y en /servicios (WEB-020). */
const FAQS: Faq[] = [
  { q: "¿Dónde comprar cilindros neumáticos en Santo Domingo?", a: "Puedes comprar cilindros neumáticos en Santo Domingo en Dynatech Ingeniería SRL. Trabajamos ISO, de tirantes, compactos, mini redondos y guiados." },
  { q: "¿Qué datos necesito enviar?", a: "Con cualquiera de estos datos podemos empezar: plano, muestra, medidas, fotos o el código. Lo mínimo: diámetro x carrera o una foto del cilindro y su placa." },
  { q: "¿Fabrican en milímetros y en pulgadas?", a: "Sí. Fabricamos el cilindro a partir de tu plano, una muestra o tus medidas, en milímetros o en pulgadas." },
  { q: "¿Pueden fabricarlo si el original ya no se consigue?", a: "Sí. Fabricamos cilindros completos a medida, incluso cuando el original ya no está disponible." },
  { q: "¿Y si mi cilindro está dañado?", a: "Lo reparamos o reconstruimos: desarme, reemplazo de los componentes dañados, ensamblaje y prueba de funcionamiento antes de entregar. Ver la página de reparación de cilindros." },
  { q: "¿Atienden empresas privadas y zonas francas?", a: "Sí. Atendemos solicitudes de empresas del sector privado y de zonas francas en República Dominicana." },
  { q: "¿Consiguen cilindros originales Festo o SMC?", a: "Sí. Suministramos piezas originales Festo y SMC, y de otras marcas, bajo pedido por código." },
  { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA },
  { q: "¿Dónde están y en qué horario atienden?", a: `En ${CONTACT.address}. Horario: ${CONTACT.hours.replace(/ · /g, " ")}.` },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cilindros neumáticos a la medida",
  serviceType: "Fabricación y reparación de cilindros neumáticos",
  provider: { "@id": `${SITE.url}/#business` },
  areaServed: "República Dominicana",
  url: `${SITE.url}/cilindros-neumaticos`,
  description: "Fabricación de cilindros neumáticos a la medida (doble y simple efecto, compactos, ISO y especiales, métricos y en pulgadas) y reparación bajo cotización.",
};

/**
 * Dirección A «Taller primero» (17-nov-2026, aprobada por el dueño). Sustituye la experiencia 3D
 * (CylinderExperience, que queda en el repo sin usar). Se conservan las anclas #cilindro-producto,
 * #interior-cilindro y #cilindro-aplicacion. Sin las fotos antes/después ISO 32 mm (retiradas por el dueño).
 */
export default function CilindrosNeumaticosPage() {
  const fabricar = whatsappService("neumatico-fabricar");
  return (
    <div className="taller-a">
      <ServiceAvailabilityNotice service={"pneumatic-cylinders"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <div className="ta-crumb"><div className="container-max"><Breadcrumbs items={[{ label: "Cilindros neumáticos" }]} /></div></div>

      <div id="cilindro-producto">
        <TaHero
          id="cilindros-hero-title"
          kicker="Fabricación · Reparación · Reconstrucción"
          title={<>Cilindros neumáticos <span>a la medida.</span></>}
          lead="Bajo plano, muestra o medidas. En milímetros o pulgadas."
          whatsappHref={fabricar}
          correoItem="Cilindro neumático"
          notes={["Aunque el original ya no se consiga"]}
          image="/cilindros/cilindros-fabricados-detalle.webp"
          imageAlt="Cilindros neumáticos nuevos fabricados en el taller de Dynatech junto al cilindro oxidado que sirvió de muestra"
          caption="Cilindros fabricados en nuestro taller"
          objectPosition="50% 70%"
        />
      </div>

      <section className="ta-sec" aria-labelledby="tipos-cilindro">
        <div className="container-max">
          <TaHead kicker="Qué fabricamos" id="tipos-cilindro" title="Tipos de cilindro" aside={<p>Si no ves el tuyo, envía una foto con la placa.</p>} />
          <div className="ta-types">
            <span className="ta-types-pic"><Image src="/cilindros/cilindro-fabricado-taller.webp" alt="Cilindro neumático de tirantes fabricado en el taller de Dynatech" fill sizes="340px" className="object-contain p-8" /></span>
            <ul className="ta-tg">
              {TIPOS.map((t, i) => (
                <li key={t.title}><i>{String(i + 1).padStart(2, "0")}</i><b>{t.title}</b><span>{t.desc}</span></li>
              ))}
            </ul>
          </div>
          <p className="ta-intro">Puedes comprar cilindros neumáticos en Santo Domingo en Dynatech Ingeniería SRL. Trabajamos ISO, de tirantes, compactos, mini redondos y guiados. Fabricamos a partir de tu plano, una muestra o tus medidas, y también suministramos piezas originales Festo y SMC por código.</p>
        </div>
      </section>

      <section className="ta-sec is-tint" id="cilindro-aplicacion" aria-labelledby="para-cotizar">
        <div className="container-max">
          <TaHead kicker="Para cotizar" id="para-cotizar" title="Envía cualquiera de estos datos" />
          <ul className="ta-need">
            {NECESITAMOS.map((n, i) => (
              <li key={n.title}><i>{String(i + 1).padStart(2, "0")}</i><b>{n.title}</b><span>{n.desc}</span></li>
            ))}
          </ul>
          <p className="ta-min">Lo mínimo: diámetro x carrera, o una foto del cilindro y su placa.</p>
          <p className="ta-std">¿Buscas un cilindro estándar? Envíanos su código o medidas y te confirmamos disponibilidad. <a href={quoteHref("Cilindro neumático estándar")} target="_blank" rel="noopener" className="ta-link"><WhatsAppIcon className="h-4 w-4" />Cotizar por WhatsApp<span className="sr-only">: cilindro neumático estándar</span></a></p>
          <p className="ta-deliv">{ENTREGA_LINEA}</p>
        </div>
      </section>

      <section className="ta-sec" aria-labelledby="reparacion-cilindro">
        <div className="container-max ta-rep">
          <Reveal className="ta-rep-pic">
            <Image src="/cilindros/cilindro-desgastado-taller.webp" alt="Cilindro neumático desgastado recibido en el taller de Dynatech" fill sizes="(max-width: 767px) 100vw, 55vw" className="object-contain p-6" />
          </Reveal>
          <div>
            <p className="ta-eyebrow">¿Tu cilindro está dañado?</p>
            <h2 id="reparacion-cilindro" className="ta-h2">Lo reparamos o lo reconstruimos</h2>
            <ol className="ta-proc">
              <li>Desarme y diagnóstico</li>
              <li>Reemplazo de componentes dañados</li>
              <li>Ensamblaje con las tolerancias correctas</li>
              <li>Prueba de funcionamiento antes de entregar</li>
            </ol>
            <div className="ta-ctas" data-fab-hide="">
              <a href={whatsappService("neumatico-reparar")} target="_blank" rel="noopener" className="ta-btn-red"><WhatsAppIcon className="h-[18px] w-[18px]" />Cotizar por WhatsApp<span className="sr-only">: reparación de cilindro neumático</span></a>
              <TaLink href="/servicios">Ver reparación de cilindros</TaLink>
            </div>
          </div>
        </div>
      </section>

      <section className="ta-sec is-tint" id="interior-cilindro" aria-labelledby="componentes-cilindro">
        <div className="container-max">
          <TaHead kicker="Componentes" id="componentes-cilindro" title="Sellos, vástagos y piezas" aside={<TaLink href="/sellos-y-componentes">Ver sellos y componentes</TaLink>} />
          <ul className="ta-parts">
            {COMPONENTES_CIL.map((c) => <TaProductCard key={c.href} {...c} />)}
            <li className="ta-pc">
              <Link href="/sellos-y-componentes#componentes">
                <span className="ta-pc-img is-photo"><Image src="/taller/torno-pieza-larga-polipasto.jpg" alt="Pieza larga montada en el torno del taller de Dynatech" fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover" style={{ objectPosition: "50% 62%" }} /></span>
                <span className="ta-pc-body"><span className="ta-pc-title">Componentes bajo medida</span><span className="ta-pc-text">Camisa, tapa y pistón.</span></span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CylinderRelated current="/cilindros-neumaticos" />

      <FaqBlock items={FAQS} kicker="Preguntas frecuentes" title="Sobre cilindros a la medida" tone="white" />

      <TaSteps id="como-cotizar-cilindro" steps={PASOS} whatsappHref={fabricar} correoItem="Cilindro neumático" />
    </div>
  );
}
