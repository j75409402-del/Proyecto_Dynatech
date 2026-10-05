import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="container-max py-20 sm:py-28">
      <div className="max-w-2xl">
        <div className="eyebrow mb-3">Error 404</div>
        <h1 className="font-display text-display-lg text-surface mb-4">Esta página no existe.</h1>
        <p className="text-lg text-steel-300 mb-8">
          Puede que el enlace sea viejo. Elige una línea o envíanos tu solicitud directamente.
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          <a href={whatsappGeneral()} target="_blank" rel="noopener" className="btn-primary">
            Solicita tu cotización
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/" className="btn-secondary">Ir al inicio</Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/5 border border-black/5">
          {[...SOLUCIONES.map((s) => ({ href: `/${s.slug}`, label: s.name })), { href: "/cilindros-neumaticos", label: "Cilindros neumáticos" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block bg-carbon hover:bg-carbon-800 px-5 py-4 text-sm font-medium text-surface hover:text-signal transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
