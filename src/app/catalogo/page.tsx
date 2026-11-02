import type { Metadata } from "next";
import Link from "next/link";
import { CatalogBoard, type CatalogTile } from "@/components/catalog/CatalogBoard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { PhotoCredits } from "@/components/page/PhotoCredits";
import { GRUPOS_SUMINISTRO, SOLO_SUMINISTRO, SOLUCIONES, type Solucion, type Subcategoria } from "@/lib/soluciones";
import { whatsappGeneral, whatsappService } from "@/lib/whatsapp";

const title = "Catálogo industrial en Santo Domingo";
const description =
  "Neumática, control industrial, automatización, instrumentación, resistencias y termocuplas bajo cotización en Santo Domingo. Cotiza por WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/catalogo" },
  openGraph: { title, description, url: "/catalogo", images: ["/banners/neumatica-industrial-conectores.webp"] },
};

function productos(s: Solucion): Subcategoria[] {
  return s.subcategorias.filter((sub) => {
    if (!sub.href) return true;
    if (sub.href.startsWith("/servicios")) return false;
    const destino = sub.href.split("#")[0].slice(1);
    return !SOLUCIONES.some((o) => o.slug === destino && o.slug !== s.slug);
  });
}

function cotizar(s: Solucion, sub: Subcategoria) {
  return s.slug === "neumatica" ? whatsappService("componente", sub.title) : quoteHref(sub.title, s.name);
}

export default function ProductosPage() {
  const usadas = new Set<string>();
  const tiles: CatalogTile[] = SOLUCIONES.flatMap((s) =>
    productos(s).map((sub) => {
      const image = sub.image && !usadas.has(sub.image) ? sub.image : undefined;
      if (image) usadas.add(image);
      return {
        id: `${s.slug}-${sub.id}`,
        category: s.slug,
        title: sub.title,
        fact: sub.desc,
        image,
        alt: image ? sub.imageAlt : undefined,
        quote: cotizar(s, sub),
        href: sub.href ?? `/${s.slug}#${sub.id}`,
      };
    }),
  );
  const sides = SOLUCIONES.map((s) => ({ id: s.slug, label: s.name }));

  return (
    <>
      <header className="catalog-top">
        <div className="container-max">
          <Breadcrumbs items={[{ label: "Catálogo" }]} />
          <h1>Catálogo</h1>
          <p>Elige una categoría y cotiza por WhatsApp. Sin precios ni inventario.</p>
          <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary min-h-12 px-6">Cotizar por WhatsApp</a>
        </div>
      </header>
      <div className="container-max catalog-body">
        <CatalogBoard sides={sides} tiles={tiles} heading="Familias" />
        <p className="scope-note catalog-scope">{SOLO_SUMINISTRO} <Link href="/control-electrico">Control</Link>, <Link href="/sensores">sensores</Link> e <Link href="/instrumentacion">instrumentación</Link>.</p>
        <PhotoCredits items={SOLUCIONES.flatMap((s) => productos(s))} />
        <p className="sr-only">{GRUPOS_SUMINISTRO.map((g) => g.title).join(", ")}</p>
      </div>
      <QuoteCTA eyebrow="Catálogo" title="¿No ves la pieza?" text="Código, foto o placa." whatsappHref={whatsappService("foto")} ctaLabel="Cotizar por WhatsApp" />
    </>
  );
}
