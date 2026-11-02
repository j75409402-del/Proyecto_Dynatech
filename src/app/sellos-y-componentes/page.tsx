import type { Metadata } from "next";
import { CONTACT } from "@/lib/constants";
import { FaqBlock, landingFaqs } from "@/components/page/FaqBlock";
import Link from "next/link";
import { ArrowUpRight, Cog, Ruler } from "lucide-react";
import { commercialMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { Band, SectionHead, OfferGrid, QuoteButton } from "@/components/page/Blocks";
import { CylinderRelated } from "@/components/industrial/CylinderRelated";
import { ENTREGA_LINEA } from "@/lib/entrega";

export const metadata: Metadata = {
  ...commercialMetadata("Sellos y componentes para cilindros neumáticos", "Cotiza kits de sellos, vástagos y componentes bajo medida para cilindros neumáticos en República Dominicana.", "/sellos-y-componentes"),
  title: { absolute: "Proveedor de sellos para cilindros neumáticos en República Dominicana · Dynatech" },
  description:
    "Suplidor de kits de sellos, vástagos y componentes bajo medida para cilindros neumáticos en Santo Domingo. Cotiza con código, foto o muestra.",
  alternates: { canonical: "/sellos-y-componentes" },
};

/** Se conservan las anclas #kits-de-sellos, #vastagos y #componentes. */
const BLOQUES = [
  {
    id: "kits-de-sellos",
    title: "Kits de sellos para cilindros neumáticos",
    desc: "Kits de sellos para cilindros neumáticos, de 32 a 100 mm.",
    need: "Diámetro de la camisa, diámetro del vástago y la marca.",
    image: "/products/kits-sello-smc.jpg",
    imageAlt: "Kits de sellos para cilindros neumáticos en sus bolsas",
    item: "Kits de sellos",
  },
  {
    id: "vastagos",
    icon: Ruler,
    title: "Vástagos y barras cromadas",
    desc: "Vástagos cromados fabricados a medida, con el acabado y la tolerancia del original.",
    need: "Diámetro y largo, un plano o el vástago de muestra.",
    item: "Vástagos y barras cromadas",
  },
  {
    id: "componentes",
    icon: Cog,
    title: "Componentes bajo medida",
    desc: "Camisas, tapas y pistones fabricados bajo medida cuando no hay repuesto original disponible.",
    need: "La pieza original o el plano.",
    item: "Componentes bajo medida (camisa, tapa, pistón)",
  },
];

/** Qué datos o medidas pedir por pieza (solo orientación para la solicitud; no son especificaciones). */
const MEDIDAS = [
  { pieza: "Kit de sellos", minimo: "Diámetro de la camisa, diámetro del vástago y la marca. De 32 a 100 mm.", ayuda: "Foto de la placa del cilindro y de los sellos usados." },
  { pieza: "Vástago o barra cromada", minimo: "Diámetro y largo total; tipo y largo de la rosca en el extremo.", ayuda: "El vástago de muestra o un plano." },
  { pieza: "Camisa", minimo: "Diámetro interior y largo.", ayuda: "La camisa original o un plano." },
  { pieza: "Tapas", minimo: "Diámetro, tipo de montaje y conexiones de aire.", ayuda: "La tapa original o fotos con una referencia de tamaño." },
  { pieza: "Pistón", minimo: "Diámetro, ancho y ranuras para sellos.", ayuda: "El pistón original o un plano." },
];

export default function SellosYComponentesPage() {
  return (
    <div>
      <PageHero
        crumbs={[{ label: "Sellos y componentes" }]}
        kicker="Repuestos para cilindros neumáticos"
        title={<>Kits de sellos y componentes <span className="text-signal">para cilindros neumáticos</span></>}
        lead={<p>Dynatech Ingeniería SRL es un suplidor de kits de sellos para cilindros neumáticos, de 32 a 100 mm, además de vástagos cromados y componentes bajo medida. Para el kit envía el diámetro de la camisa, el del vástago y la marca.</p>}
        quoteHref={quoteHref("Kits de sellos")}
        secondary={{ href: "#medidas", label: "Ver qué medidas enviar" }}
        note="Indica si tus medidas son en mm o en pulgadas, y la cantidad."
        image={{ src: "/products/kit-sello-cilindro-neumatico.jpg", alt: "Kit de sellos para cilindro neumático", fit: "contain" }}
        trust="lineas"
      />

      <Band tone="light" labelledBy="sellos-oferta">
        <SectionHead kicker="01 · Qué cotizamos" id="sellos-oferta" title="Sellos, vástagos y componentes" intro={<>¿Prefieres que cambiemos los sellos por ti? <Link href="/servicios#cambio-de-sellos" className="inline-flex min-h-10 items-center gap-1 font-semibold text-surface underline decoration-signal underline-offset-4 hover:text-signal">Ver reparación de cilindros <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></>} />
        <OfferGrid items={BLOQUES.map((b) => ({ ...b, quote: quoteHref(b.item) }))} />
      </Band>

      <Band tone="white" id="medidas" labelledBy="medidas-titulo">
        <SectionHead kicker="02 · Para cotizar" id="medidas-titulo" title="Qué datos y medidas enviar" intro="Con el código o una foto de la placa podemos empezar. Si no los tienes, estas medidas ayudan a identificar la pieza." />
        <Reveal>
          <table className="spec-table">
            <caption className="sr-only">Datos mínimos y ayuda adicional para cotizar cada pieza</caption>
            <thead><tr><th scope="col">Pieza</th><th scope="col">Datos mínimos</th><th scope="col">Ayuda adicional</th></tr></thead>
            <tbody>
              {MEDIDAS.map((m) => (
                <tr key={m.pieza}><th scope="row">{m.pieza}</th><td data-label="Datos mínimos">{m.minimo}</td><td data-label="Ayuda adicional">{m.ayuda}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <QuoteButton href={quoteHref("Sellos y componentes")} />
            <p className="text-sm text-steel-300">Indica siempre si las medidas son en mm o en pulgadas.</p>
          </div>
        </Reveal>
      </Band>

      <CylinderRelated current="/sellos-y-componentes" />

      <FaqBlock items={[{ q: "¿Dónde consigo kits de sellos para cilindros neumáticos?", a: "En Dynatech Ingeniería SRL, en Santo Domingo. Kits de sellos para cilindros neumáticos de 32 a 100 mm. Envía el diámetro de la camisa, el del vástago y la marca." }, ...landingFaqs({ name: "Sellos y componentes", datos: MEDIDAS.map((m) => `${m.pieza}: ${m.minimo.charAt(0).toLowerCase()}${m.minimo.slice(1).replace(/\.$/, "")}`), address: CONTACT.address, hours: CONTACT.hours }), { q: "¿Cuánto tarda la entrega?", a: ENTREGA_LINEA }]} kicker="Preguntas frecuentes" title="Sobre sellos y componentes" tone="light" />

      <QuoteCTA
        eyebrow="Sellos · Vástagos · Componentes"
        title="¿Necesitas sellos o una pieza para tu cilindro?"
        quoteItem="Kits de sellos"
      />
    </div>
  );
}
