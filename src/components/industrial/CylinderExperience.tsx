import { ArrowDown, ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { IndustrialStage } from "./IndustrialStage";

/** Presentation layer only: the shared stage, commercial links and route stay intact. */
export function CylinderExperience() {
  return <section className="cylinder-experience" data-phase="0" id="cilindro-producto" aria-label="Cilindros neumáticos: del producto a sus componentes">
    <span id="interior-cilindro" className="cylinder-marker cylinder-marker-interior" />
    <span id="cilindro-aplicacion" className="cylinder-marker cylinder-marker-application" />
    <div className="cylinder-sticky">
      <div className="cylinder-wordmark" aria-hidden="true">CILINDROS</div>
      <IndustrialStage scene="cilindros" presentation image="/banners/cilindros-taller-wide.webp" imageAlt="Referencia editorial de un cilindro neumático" />
      <div className="cylinder-watermark" aria-hidden="true"><span>Dynatech</span><small>Ingeniería · SRL</small></div>
      <div className="cylinder-editorial">
        <div className="cylinder-breadcrumb"><Breadcrumbs items={[{label:"Cilindros neumáticos"}]} /></div>
        <div className="cylinder-copy">
          <article className="cylinder-story cylinder-story-0">
            <p className="cylinder-kicker">Dynatech · Ingeniería en movimiento</p>
            <h1>Cilindros neumáticos<br/>a la medida<span className="cylinder-period">.</span></h1>
            <p>Fabricamos y reparamos el cilindro que tu máquina necesita, a partir de tu plano, una muestra o tus medidas. Envíanos una foto y te decimos si se repara o se fabrica.</p>
            <div className="cylinder-story-actions"><a href={quoteHref("Fabricación de cilindros neumáticos")} target="_blank" rel="noopener" className="btn-primary"><WhatsAppIcon className="h-4 w-4" />Cotizar por WhatsApp <ArrowUpRight size={16}/></a><a href="#interior-cilindro" className="cylinder-text-link">Descubre el interior <ArrowDown size={15}/></a></div>
            <p className="cylinder-trust">Santo Domingo, RD · RNC {SITE.rnc}</p>
          </article>
          <article className="cylinder-story cylinder-story-1">
            <p className="cylinder-kicker">01 / Desde el interior</p>
            <h2>Cada pieza.<br/>Un propósito<span className="cylinder-period">.</span></h2>
            <p>Camisa, pistón, vástago, tapas y sellos. Explora cómo se relacionan los componentes que hacen posible el movimiento.</p>
            <span className="cylinder-copy-note">Selecciona una pieza para conocer su función.</span>
          </article>
          <article className="cylinder-story cylinder-story-2">
            <p className="cylinder-kicker">02 / Para tu aplicación</p>
            <h2>Tu equipo.<br/>Nuestro punto<br/>de partida<span className="cylinder-period">.</span></h2>
            <p>Fabricación, reparación y reconstrucción. Comparte lo que necesitas y definimos el alcance en la cotización.</p>
            <div className="cylinder-story-actions"><a href={quoteHref("Fabricación de cilindros neumáticos")} target="_blank" rel="noopener" className="btn-primary"><WhatsAppIcon className="h-4 w-4" />Cotizar por WhatsApp <ArrowUpRight size={16}/></a></div>
          </article>
        </div>
        <nav className="cylinder-chapters" aria-label="Recorrido del cilindro"><a href="#cilindro-producto"><span>01</span> Producto</a><a href="#interior-cilindro"><span>02</span> Interior</a><a href="#cilindro-aplicacion"><span>03</span> Tu aplicación</a></nav>
      </div>
    </div>
  </section>;
}
