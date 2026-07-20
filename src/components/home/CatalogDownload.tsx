import { FileDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/siteSettings";

export async function CatalogDownload() {
  const settings = await getSiteSettings();
  if (!settings.catalog_pdf_url) return null;

  return (
    <section className="section-pad border-b border-black/5 bg-carbon-900">
      <div className="container-max">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border border-black/10 bg-carbon p-10 sm:p-12">
          <div className="max-w-xl">
            <FileDown className="h-8 w-8 text-signal mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-2xl text-surface mb-3">
              ¿Prefieres explorar todos nuestros productos?
            </h2>
            <p className="text-steel-300 leading-relaxed">
              Descarga nuestro catálogo completo en PDF y conoce toda nuestra línea de productos
              industriales.
            </p>
          </div>
          <a
            href={settings.catalog_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0"
          >
            📘 Descargar nuestro catálogo
          </a>
        </Reveal>
      </div>
    </section>
  );
}
