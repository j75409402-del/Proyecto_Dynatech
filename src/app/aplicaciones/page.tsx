import type { Metadata } from "next";
import { Editorial } from "@/components/home/HomeSections";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aplicaciones",
  description: "Dónde se usan las líneas de suministro industrial de Dynatech. Empresas y zonas francas en República Dominicana.",
  alternates: { canonical: "/aplicaciones" },
};

export default function AplicacionesPage() {
  const [first, second, ...rest] = SOLUCIONES;
  return (
    <>
      <section className="hero" aria-labelledby="app-hero">
        <div className="hero-media">
          <Image src="/banners/neumatica-industrial.webp" alt="Imagen de referencia de componentes neumáticos industriales" fill priority sizes="100vw" className="hero-photo" />
        </div>
        <div className="hero-copy">
          <Breadcrumbs items={[{ label: "Aplicaciones" }]} />
          <p className="hero-kicker">Empresas y zonas francas</p>
          <h1 id="app-hero">Aplicaciones</h1>
          <p className="hero-lead">Dónde se usa cada línea.</p>
          <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">Cotizar por WhatsApp</a>
        </div>
      </section>
      <Editorial
        id="app-uno"
        kicker={first.name}
        title={first.aplicaciones[0]}
        text={first.short}
        href={`/${first.slug}`}
        quote={quoteHref(first.name, "Suministro industrial")}
        image={first.image}
        alt={first.imageAlt}
      />
      <Editorial
        id="app-dos"
        flip
        kicker={second.name}
        title={second.aplicaciones[0]}
        text={second.short}
        href={`/${second.slug}`}
        quote={quoteHref(second.name, "Suministro industrial")}
        image={second.image}
        alt={second.imageAlt}
      />
      <section className="band band-white">
        <div className="container-max">
          <h2 className="section-title">Más aplicaciones</h2>
          <ul className="industry-grid">
            {rest.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`}>
                  <span className="industry-photo"><Image src={s.image} alt="" fill sizes="33vw" className="object-cover" /></span>
                  <span className="industry-copy"><strong>{s.name}</strong><small>{s.aplicaciones[0]}</small></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <QuoteCTA eyebrow="Bajo cotización" title="Cuéntanos el uso" text="Foto, código o plano." whatsappHref={whatsappGeneral()} ctaLabel="Cotizar por WhatsApp" />
    </>
  );
}
