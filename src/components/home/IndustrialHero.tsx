import { PageHero } from "@/components/page/PageHero";
import { whatsappGeneral } from "@/lib/whatsapp";

/**
 * Hero de la portada (WEB-010). Intención: marca + taller + suministro industrial en Santo Domingo
 * (MENSAJES-Y-SEO A, opción 1). No ataca "fabricación/reparación de cilindros neumáticos",
 * que pertenecen a /cilindros-neumaticos y /servicios.
 */
export function Hero() {
  return (
    <PageHero
      size="home"
      titleId="home-hero-title"
      kicker="Santo Domingo · República Dominicana"
      title={<>
        <span className="home-hero-brand">Dynatech Ingeniería<span className="sr-only"> —</span></span>{" "}
        Taller de cilindros y suministro industrial <span className="text-signal">en Santo Domingo.</span>
      </>}
      lead={<p>Reparamos y fabricamos cilindros neumáticos. Cotizamos neumática, válvulas, sensores, instrumentación, control eléctrico y resistencias para tu planta.</p>}
      quoteHref={whatsappGeneral()}
      secondary={{ href: "#soluciones", label: "Ver líneas industriales" }}
      note="Envía foto, código, plano o medidas. Te confirmamos alcance y condiciones en la cotización."
      image={{ src: "/cilindros/taller-reparando.jpg", alt: "Imagen de referencia: técnico reparando un cilindro neumático en el taller" }}
      caption={{ label: "Taller y suministro", text: "Reparación · Fabricación · Suministro" }}
      trust="cilindros"
    />
  );
}
