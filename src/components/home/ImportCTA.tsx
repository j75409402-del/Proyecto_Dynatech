import { Globe2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappImportRequest } from "@/lib/whatsapp";

export function ImportCTA() {
  return (
    <section className="section-pad border-b border-black/5">
      <div className="container-max">
        <Reveal>
          <div className="relative border border-black/10 bg-carbon-800 p-10 sm:p-14 overflow-hidden">
            <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal" />
            <div className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-signal" />
            <div className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-signal" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal" />

            <div className="max-w-2xl">
              <Globe2 className="h-8 w-8 text-signal mb-6" strokeWidth={1.5} />
              <h2 className="font-display text-display-md text-surface mb-4">
                ¿No encuentras el producto que buscas?
              </h2>
              <p className="text-steel-200 leading-relaxed mb-8">
                En Dynatech Ingeniería ofrecemos el servicio de importación de equipos, repuestos
                y componentes industriales bajo pedido. Importamos productos desde Estados
                Unidos, Europa y Asia. Solo envíanos el número de parte, modelo, fabricante o una
                fotografía del producto y nuestro equipo se encargará de localizarlo e
                importarlo.
              </p>
              <a
                href={whatsappImportRequest()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                📦 Solicitar importación de un producto
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
