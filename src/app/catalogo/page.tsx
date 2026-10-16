import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { PageHero } from "@/components/page/PageHero";
import { Band, SectionHead } from "@/components/page/Blocks";
import { QuoteCTA, quoteHref } from "@/components/cta/QuoteCTA";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { GRUPOS_SUMINISTRO, SOLO_SUMINISTRO, SOLUCIONES, type Solucion, type Subcategoria } from "@/lib/soluciones";
import { whatsappGeneral, whatsappService } from "@/lib/whatsapp";

const title = "Catálogo de productos industriales en República Dominicana";
const description =
  "Neumática, control industrial, automatización, instrumentación, resistencias eléctricas y termocuplas bajo cotización en Santo Domingo. Cotiza cada categoría por WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/catalogo" },
  openGraph: { title, description, url: "/catalogo", images: ["/banners/neumatica-industrial-conectores.webp"] },
};

/**
 * Catálogo por categorías (oct-2026). Fuente única: SOLUCIONES (solo categorías y tipos ya
 * documentados; sin SKUs, marcas, stock ni precios). Cada categoría tiene su botón de
 * cotización con el nombre de la categoría y de la línea en el mensaje de WhatsApp.
 * Se omiten las subcategorías que solo enlazan a otra línea (ya aparecen en su grupo) y la
 * reparación de cilindros (es un servicio del taller).
 */
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
  return (
    <>
      <PageHero
        crumbs={[{ label: "Productos" }]}
        kicker="Suministro industrial · Bajo cotización"
        title="Catálogo de productos industriales"
        lead={<p>Neumática, control industrial, automatización, instrumentación, resistencias eléctricas y termocuplas. Cada categoría tiene su botón para cotizar por WhatsApp con el mensaje listo.</p>}
        quoteHref={whatsappGeneral()}
        secondary={{ href: "#categorias", label: "Ver categorías" }}
        note="Envía el código, una foto de la placa o la descripción. Sin precios ni inventario publicados: todo se confirma en la cotización."
        image={{ src: "/banners/neumatica-industrial-conectores.webp", alt: "Imagen de referencia: componentes neumáticos sobre una mesa de trabajo" }}
        caption={{ label: "Imagen de referencia", text: "Neumática · Control · Automatización · Instrumentación" }}
      />

      <nav id="categorias" aria-label="Categorías del catálogo" className="catalog-index scroll-mt-28" data-fab-hide="">
        <ul className="container-max chip-nav">
          {GRUPOS_SUMINISTRO.map((g) => <li key={g.id}><a href={`#${g.id}`}>{g.title}</a></li>)}
        </ul>
      </nav>

      {GRUPOS_SUMINISTRO.map((g, gi) => {
        const lineas = SOLUCIONES.filter((s) => s.grupo === g.id);
        return (
          <Band key={g.id} tone={gi % 2 ? "white" : "light"} id={g.id} labelledBy={`grupo-${g.id}`}>
            <SectionHead kicker={`${String(gi + 1).padStart(2, "0")} · Suministro`} id={`grupo-${g.id}`} title={g.title} intro={g.desc} />
            {lineas.some((l) => l.soloSuministro) && (
              <p className="scope-note mb-8"><Info className="h-4 w-4 shrink-0" aria-hidden="true" /><span>En {g.title.toLowerCase()} {SOLO_SUMINISTRO}</span></p>
            )}
            {lineas.map((s) => (
              <div key={s.slug} className="catalog-line">
                {lineas.length > 1 && <h3 className="catalog-line-title">{s.name}</h3>}
                <ul className="prod-grid" data-fab-hide="">
                  {productos(s).map((sub) => (
                    <li key={sub.id} className="prod-card">
                      <span className={`prod-thumb ${sub.image ? (sub.imageFit === "cover" ? "is-photo" : "") : "is-icon"}`}>
                        {sub.image
                          ? <Image src={sub.image} alt={sub.imageAlt ?? sub.title} fill sizes="96px" className={sub.imageFit === "cover" ? "object-cover" : "object-contain p-2"} />
                          : <sub.icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.4} />}
                        {sub.image && sub.imageNote && <span className="prod-note">{sub.imageNote}</span>}
                      </span>
                      <div className="prod-body">
                        <h4>{sub.title}</h4>
                        <p>{sub.desc}</p>
                        <div className="prod-actions">
                          <a href={cotizar(s, sub)} target="_blank" rel="noopener" className="prod-quote">
                            <WhatsAppIcon className="h-4 w-4" />Cotizar<span className="sr-only">: {sub.title} por WhatsApp</span>
                          </a>
                          <Link href={sub.href ?? `/${s.slug}#${sub.id}`} className="prod-link">Detalles <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> de {sub.title}</span></Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href={`/${s.slug}`} className="catalog-line-link">Ver la página de {s.name.toLowerCase()} <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            ))}
          </Band>
        );
      })}

      <QuoteCTA
        eyebrow="Suministro industrial · Catálogo"
        title="¿No ves lo que buscas?"
        text="Envíanos el código, una foto de la pieza o de su placa, o la descripción, y te decimos si podemos conseguirlo."
        whatsappHref={whatsappService("foto")}
      />
    </>
  );
}
