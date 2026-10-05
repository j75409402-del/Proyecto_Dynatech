import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { SITE } from "@/lib/constants";
import { SERVICIOS_ADICIONALES } from "@/lib/servicios";

export function IndustrialServicePage({ service: s }: { service: (typeof SERVICIOS_ADICIONALES)[number] }) {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Service",
    name: s.title, serviceType: s.name, description: s.description, url: `${SITE.url}/${s.slug}`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "Country", name: "República Dominicana" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-max py-12 sm:py-16">
        <Breadcrumbs items={[{ label: "Servicios", href: "/servicios" }, { label: s.name }]} />
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Servicios complementarios · Bajo cotización</p>
          <h1 className="font-display text-display-xl mb-6">{s.title}</h1>
          <p className="text-lg text-steel-300 leading-relaxed mb-8">{s.intro}</p>
          <a href={quoteHref(s.name)} target="_blank" rel="noopener" className="btn-primary">Cotiza {s.name.toLowerCase()} por WhatsApp</a>
        </div>
      </section>
      <section className="section-pad bg-carbon-900 border-y border-black/5">
        <div className="container-max grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-display-lg mb-5">¿Qué necesitas cotizar?</h2>
            <ul className="space-y-4 text-steel-300 list-disc pl-5">{s.situations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h2 className="font-display text-display-lg mb-5">Información para tu cotización</h2>
            <ul className="space-y-4 text-steel-300 list-disc pl-5">{s.information.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="container-max py-12 sm:py-16">
        <div className="max-w-3xl">
          <h2 className="font-display text-display-lg mb-4">Evaluamos tu solicitud</h2>
          <p className="text-steel-300 leading-relaxed mb-5">{s.note}</p>
          <p className="text-steel-300 leading-relaxed mb-8">Indica si solicitas la cotización para mantenimiento, compras o un proyecto de tu empresa. El alcance, plazo y condiciones se confirman al responder tu solicitud.</p>
          <Link href="/servicios" className="text-signal underline">Ver servicios de cilindros neumáticos</Link>
          {SERVICIOS_ADICIONALES.filter((other) => other.slug !== s.slug).map((other) => <Link key={other.slug} href={`/${other.slug}`} className="block mt-4 text-signal underline">Ver {other.name.toLowerCase()}</Link>)}
        </div>
      </section>
      <QuoteCTA eyebrow={s.name} title={`Solicita tu cotización de ${s.name.toLowerCase()}`} text="Comparte las fotos, plano o descripción disponibles, la cantidad y tu ciudad." quoteItem={s.name} />
    </>
  );
}
