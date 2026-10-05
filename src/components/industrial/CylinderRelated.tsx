import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Enlazado interno entre las páginas de cilindros (AP-007). Cada página se excluye a sí misma. */
const PAGES = [
  { href: "/cilindros-neumaticos", title: "Cilindros neumáticos a la medida", desc: "Tipos de cilindro y fabricación bajo plano, muestra o medidas." },
  { href: "/servicios", title: "Reparación y reconstrucción", desc: "Cambio de sellos, vástagos y componentes, con prueba antes de entregar." },
  { href: "/sellos-y-componentes", title: "Sellos y componentes", desc: "Kits de sellos, vástagos y piezas para tu cilindro." },
  { href: "/cilindros-hidraulicos", title: "Cilindros hidráulicos", desc: "Fabricación y reparación de cilindros hidráulicos." },
];

export function CylinderRelated({ current }: { current: string }) {
  return (
    <section className="section-pad border-t border-black/5" aria-labelledby="cilindros-relacionado">
      <div className="container-max">
        <div className="eyebrow mb-3">Relacionado</div>
        <h2 id="cilindros-relacionado" className="font-display text-2xl sm:text-3xl text-surface mb-8">Más sobre cilindros</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {PAGES.filter((p) => p.href !== current).slice(0, 3).map((p) => (
            <Link key={p.href} href={p.href} className="group flex h-full flex-col border border-black/10 bg-carbon p-6 transition-colors hover:border-signal">
              <h3 className="font-display text-xl text-surface mb-2">{p.title}</h3>
              <p className="text-sm text-steel-300 leading-relaxed mb-4 flex-1">{p.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal group-hover:gap-2.5 transition-all">Ver página <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
