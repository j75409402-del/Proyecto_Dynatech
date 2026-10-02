import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { Reveal } from "@/components/motion/Reveal";
import { quoteHref } from "@/components/cta/QuoteCTA";
import { getSolucion } from "@/lib/soluciones";
import { SERVICIOS, COMPONENTES } from "@/lib/servicios";

const solucion = getSolucion("neumatica");

export const metadata: Metadata = {
  title: `${solucion.title} en República Dominicana`,
  description: solucion.metaDescription,
  twitter: { card: "summary_large_image", title: `${solucion.title} en República Dominicana`, description: solucion.metaDescription, images: [solucion.image] },
  alternates: { canonical: "/neumatica" },
  openGraph: { title: `${solucion.title} en República Dominicana`, description: solucion.metaDescription, url: "/neumatica", images: [solucion.image] },
};

/** Cilindros: línea destacada dentro de Neumática (mismo contenido que /servicios y /sellos-y-componentes). */
function CilindrosDestacado() {
  const oferta = [...SERVICIOS, ...COMPONENTES];
  return (
    <section className="section-pad border-b border-black/5 bg-carbon-900">
      <div className="container-max grid lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative border border-black/10 bg-white aspect-[3/2]">
            <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal z-10" />
            <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal z-10" />
            <Image
              src="/banners/neumatica-industrial-conectores.webp"
              alt="Componentes neumáticos: cilindros, conectores push-in, válvulas y filtro regulador"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-6"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="eyebrow mb-3">Línea destacada · Cilindros neumáticos</div>
          <h2 className="font-display text-display-lg text-surface mb-4">Fabricamos, reparamos y reconstruimos</h2>
          <p className="text-steel-300 leading-relaxed mb-6 max-w-xl">
            Trabajamos a partir de un plano, una muestra, tus medidas, fotos o especificaciones.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
            {oferta.map((o) => (
              <li key={o.id}>
                <Link href={o.href} className="group flex items-center gap-2 py-1 text-sm text-steel-200 hover:text-signal transition-colors">
                  <o.icon className="h-4 w-4 text-signal shrink-0" />
                  {o.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-steel-500 group-hover:text-signal" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <a href={quoteHref("Fabricación de cilindros neumáticos")} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Cotizar cilindro
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/cilindros-neumaticos" className="btn-secondary">
              Ver cilindros neumáticos
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function NeumaticaPage() {
  return <SolucionPage solucion={solucion} destacado={<CilindrosDestacado />} />;
}
