import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { commercialMetadata } from "@/lib/seo";
import { CONTACT, SITE, emailHref } from "@/lib/constants";
import { QuoteCTA } from "@/components/cta/QuoteCTA";
import { PageHero } from "@/components/page/PageHero";
import { Band, SectionHead, Steps } from "@/components/page/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral } from "@/lib/whatsapp";
import { hoursLines } from "@/components/page/TrustStrip";

export const metadata: Metadata = {
  ...commercialMetadata("Dynatech Ingeniería SRL en República Dominicana", "Conoce a Dynatech Ingeniería SRL: servicios de cilindros neumáticos y suministros industriales bajo cotización.", "/nosotros"),
  title: "Nosotros",
  description: `Conoce a ${SITE.name}: proveedor industrial B2B y taller de cilindros neumáticos en República Dominicana.`,
  alternates: { canonical: "/nosotros" },
};

const TALLER = [
  { href: "/servicios", label: "Reparación de cilindros neumáticos" },
  { href: "/cilindros-neumaticos", label: "Cilindros neumáticos a la medida" },
  { href: "/sellos-y-componentes", label: "Sellos y componentes" },
  { href: "/cilindros-hidraulicos", label: "Cilindros hidráulicos" },
  { href: "/mecanizado", label: "Mecanizado" },
];

const PROCESO = [
  { title: "Compartes tu necesidad", text: "Referencia, fotos, plano, muestra o medidas, por WhatsApp." },
  { title: "Evaluamos la solicitud", text: "Revisamos la aplicación y los datos de tu equipo." },
  { title: "Recibes la cotización", text: "Con alcance, condiciones y disponibilidad confirmados." },
  { title: "Coordinamos tu pedido", text: "Fabricamos, reparamos o conseguimos la pieza y coordinamos la entrega." },
];

const PRINCIPIOS = [
  { title: "Con los datos de tu equipo", body: "Evaluamos cada solicitud con la referencia, las fotos, el plano o la muestra que nos compartas, antes de cotizar." },
  { title: "A la medida", body: "Trabajamos a partir de lo que tengas. Si el repuesto original de un cilindro ya no existe, fabricamos el componente." },
  { title: "Local", body: "Taller en Santo Domingo. Lo que no fabricamos, lo conseguimos bajo pedido, con el plazo confirmado en la cotización." },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Nosotros" }]}
        kicker={`${SITE.legalName} · ${CONTACT.locality}`}
        title={<>La referencia exacta. <span className="text-signal">No la más parecida.</span></>}
        lead={<p>{SITE.legalName} es un proveedor industrial B2B y taller de cilindros neumáticos en República Dominicana. Reparamos y fabricamos cilindros, y cotizamos neumática, control eléctrico, sensores, instrumentación y resistencias eléctricas.</p>}
        quoteHref={whatsappGeneral()}
        secondary={{ href: "#empresa", label: "Ver datos de la empresa" }}
        note="Trabajamos bajo cotización: nos envías las especificaciones, cotizamos y coordinamos la entrega."
        // PENDIENTE CAPITÁN: sustituir por una foto real de la fachada, el taller o el equipo (hoy es imagen de referencia).
        // WEB-011: distinta del hero de /servicios (antes compartían taller-portada-v2).
        image={{ src: "/cilindros/cilindros-nuevos.jpg", alt: "Imagen de referencia: cilindro neumático sobre el banco de un taller", position: "center 6%" }}
        caption={{ label: "Imagen de referencia", text: "Taller de cilindros · Suministro industrial" }}
        trust="lineas"
      />

      <Band tone="light" labelledBy="que-hacemos">
        <SectionHead kicker="01 · Qué hacemos" id="que-hacemos" title="Taller de cilindros y suministro industrial" intro="Atendemos a empresas y zonas francas en República Dominicana." />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full bg-[#0b1016] p-6 text-white sm:p-8">
              <h3 className="text-xl font-semibold">Taller</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#bcc8d2]">Reparación, reconstrucción y fabricación de cilindros neumáticos, sellos y componentes, y servicios complementarios.</p>
              <ul className="mt-6 grid border-t border-white/10">
                {TALLER.map((t) => (
                  <li key={t.href} className="border-b border-white/10"><Link href={t.href} className="group flex min-h-12 items-center justify-between gap-3 text-[15px] hover:text-[#ff5a75]">{t.label}<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="h-full border border-black/10 bg-white p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Suministro industrial</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-steel-300">Componentes para mantenimiento y automatización, cotizados con la referencia o una foto.</p>
              <ul className="mt-6 grid border-t border-black/10">
                {SOLUCIONES.map((s) => (
                  <li key={s.slug} className="border-b border-black/10"><Link href={`/${s.slug}`} className="group flex min-h-12 items-center justify-between gap-3 text-[15px] hover:text-signal"><span className="flex items-center gap-3"><s.icon className="h-4 w-4 text-signal" aria-hidden="true" />{s.name}</span><ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Band>

      <Band tone="white" labelledBy="como-trabajamos">
        <SectionHead kicker="02 · Cómo trabajamos" id="como-trabajamos" title="Bajo cotización, paso a paso" />
        <Steps items={PROCESO} />
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PRINCIPIOS.map((p) => (
            <Reveal key={p.title} className="border-l-2 border-signal pl-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-300">{p.body}</p>
            </Reveal>
          ))}
        </div>
        {/* PENDIENTE CAPITÁN: años en el mercado / año de constitución de la SRL. No publicar hasta confirmarlo. */}
        {/* PENDIENTE CAPITÁN: industrias o clientes atendidos, solo con permiso escrito. */}
      </Band>

      <Band tone="light" id="empresa" labelledBy="empresa-titulo">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-kicker">03 · Datos de la empresa</p>
            <h2 id="empresa-titulo" className="section-title">Dónde estamos</h2>
          </div>
          <dl className="fact-list lg:col-span-8">
            <div><dt>Razón social</dt><dd>{SITE.legalName}</dd></div>
            <div><dt>RNC</dt><dd>{SITE.rnc}</dd></div>
            {/* PENDIENTE CAPITÁN: número en Av. Rómulo Betancourt y enlace de Google Maps. */}
            <div><dt>Dirección</dt><dd>{CONTACT.address}</dd></div>
            <div><dt>Horario</dt><dd>{hoursLines().map((l) => <span key={l} className="block">{l}</span>)}</dd></div>
            <div><dt>WhatsApp</dt><dd><a href={whatsappGeneral()} target="_blank" rel="noopener">{CONTACT.whatsappDisplay}</a></dd></div>
            <div><dt>Teléfono</dt><dd><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a></dd></div>
            <div><dt>Correo</dt><dd><a href={emailHref()} className="[overflow-wrap:anywhere]">{CONTACT.email}</a></dd></div>
          </dl>
        </div>
      </Band>

      <QuoteCTA
        eyebrow="Proveedor industrial B2B"
        title="¿Qué necesita tu planta?"
        text="Envíanos el código, una foto, el plano o la descripción y te cotizamos."
        whatsappHref={whatsappGeneral()}
      />
    </>
  );
}
