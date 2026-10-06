import { whatsappChat } from "@/lib/whatsapp";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { IndustrialStage } from "./IndustrialStage";

/**
 * Experiencia de cilindros (WEB-010 F3).
 * - Los tres capítulos están en el flujo normal del documento: siempre visibles y legibles por
 *   lectores de pantalla, con o sin 3D. El visor (o su imagen fija) queda fijo (sticky) al lado
 *   en escritorio y debajo del texto inicial en móvil (texto → CTA → visual).
 * - Las anclas #cilindro-producto, #interior-cilindro y #cilindro-aplicacion se conservan.
 */
export function CylinderExperience() {
  return <section className="cylinder-experience" data-phase="0" id="cilindro-producto" aria-label="Cilindros neumáticos: del producto a sus componentes">
    <div className="cylinder-sticky" data-fab-hide="">
      <div className="cylinder-wordmark" aria-hidden="true">CILINDROS</div>
      <IndustrialStage scene="cilindros" presentation image="/banners/cilindros-taller-wide.webp" imageAlt="Imagen de referencia de un cilindro neumático sobre el banco de trabajo" />
      <div className="cylinder-watermark" aria-hidden="true"><span>Dynatech</span><small>Ingeniería · SRL</small></div>
      <nav className="cylinder-chapters" aria-label="Recorrido del cilindro"><a href="#cilindro-producto"><span>01</span> Producto</a><a href="#interior-cilindro"><span>02</span> Interior</a><a href="#cilindro-aplicacion"><span>03</span> Tu aplicación</a></nav>
    </div>
    <div className="cylinder-editorial">
      <div className="cylinder-breadcrumb"><Breadcrumbs items={[{label:"Cilindros neumáticos"}]} /></div>
      <article className="cylinder-story cylinder-story-0" data-story="0">
        <p className="cylinder-kicker">Dynatech · Ingeniería en movimiento</p>
        <h1>Cilindros neumáticos{" "}<br/>a la medida<span className="cylinder-period">.</span></h1>
        <p>Fabricamos el cilindro que tu máquina necesita a partir de tu plano, una muestra o tus medidas, en milímetros o en pulgadas. ¿El tuyo está dañado? <Link href="/servicios" className="cylinder-inline-link">Ver reparación de cilindros</Link>.</p>
        <div className="cylinder-story-actions" data-fab-hide=""><a href={quoteHref("Fabricación de cilindros neumáticos")} target="_blank" rel="noopener" className="btn-primary">Solicitar cotización <ArrowRight size={16} aria-hidden="true"/></a><a href={whatsappChat()} target="_blank" rel="noopener" className="btn-secondary home-hero-secondary home-hero-wa"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a><a href="#interior-cilindro" className="cylinder-text-link">Descubre el interior <ArrowDown size={15}/></a></div>
        <p className="cylinder-trust">Santo Domingo, RD · RNC {SITE.rnc}</p>
      </article>
      <article className="cylinder-story cylinder-story-1" data-story="1" id="interior-cilindro">
        <p className="cylinder-kicker">Desde el interior</p>
        <h2>Cada pieza.{" "}<br/>Un propósito<span className="cylinder-period">.</span></h2>
        <p>Camisa, pistón, vástago, tapas y sellos. Explora cómo se relacionan los componentes que hacen posible el movimiento.</p>
        <span className="cylinder-copy-note">Selecciona una pieza para conocer su función.</span>
      </article>
      <article className="cylinder-story cylinder-story-2" data-story="2" id="cilindro-aplicacion">
        <p className="cylinder-kicker">Para tu aplicación</p>
        <h2>Tu equipo.{" "}<br/>Nuestro punto{" "}<br/>de partida<span className="cylinder-period">.</span></h2>
        <p>Fabricación a la medida, bajo plano o muestra. Comparte lo que necesitas y definimos el alcance en la cotización.</p>
        <div className="cylinder-story-actions"><a href={quoteHref("Fabricación de cilindros neumáticos")} target="_blank" rel="noopener" className="btn-primary">Solicitar cotización <ArrowRight size={16} aria-hidden="true"/></a></div>
      </article>
    </div>
  </section>;
}
