import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SolucionPage } from "@/components/soluciones/SolucionPage";
import { Band } from "@/components/page/Blocks";
import { Reveal } from "@/components/motion/Reveal";
import { getSolucion } from "@/lib/soluciones";

const solucion = getSolucion("neumatica");

export const metadata: Metadata = {
  title: `${solucion.title} en República Dominicana`,
  description: solucion.metaDescription,
  twitter: { card: "summary_large_image", title: `${solucion.title} en República Dominicana`, description: solucion.metaDescription, images: [solucion.image] },
  alternates: { canonical: "/neumatica" },
  openGraph: { title: `${solucion.title} en República Dominicana`, description: solucion.metaDescription, url: "/neumatica", images: [solucion.image] },
};

/**
 * Destacado de Neumática (mapa de intención WEB-010): reparte hacia las páginas propias sin
 * atacar "fabricación/reparación de cilindros" (eso vive en /cilindros-neumaticos y /servicios).
 */
const DESTACADOS = [
  { href: "/cilindros-neumaticos", title: "Cilindros neumáticos a la medida", desc: "Doble y simple efecto, compactos e ISO, en mm o pulgadas." },
  { href: "/valvulas-neumaticas", title: "Válvulas neumáticas", desc: "Direccionales y solenoides: 2/2, 3/2, 5/2 y 5/3." },
  { href: "/servicios", title: "Reparación de cilindros", desc: "Reparación y reconstrucción, con prueba antes de entregar." },
  { href: "/sellos-y-componentes", title: "Kits de sellos y vástagos", desc: "Repuestos para mantener tus cilindros." },
];

function CilindrosDestacado() {
  return (
    <Band tone="dark" labelledBy="neumatica-destacado">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#151d25] lg:aspect-[4/5]">
            <Image
              src="/cilindros/cilindros-nuevos.jpg"
              alt="Cilindro neumático nuevo sobre el banco del taller"
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="object-cover object-[center_70%]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <p className="section-kicker">Dentro de neumática</p>
          <h2 id="neumatica-destacado" className="section-title text-white">Cilindros, válvulas y conexiones</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#bcc8d2]">
            Los cilindros y las válvulas tienen su propia página, con los datos que necesitamos para cotizarlos.
          </p>
          <ul className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
            {DESTACADOS.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="group flex h-full min-h-[96px] flex-col justify-center gap-1 bg-[#0b1016] p-5 transition-colors hover:bg-[#121a22]">
                  <span className="flex items-center justify-between gap-3 text-base font-semibold text-white">
                    {d.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#ff5a75] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-[#a9b7c4]">{d.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Band>
  );
}

export default function NeumaticaPage() {
  return <SolucionPage solucion={solucion} destacado={<CilindrosDestacado />} />;
}
