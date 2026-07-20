import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mapa del sitio",
  description: "Todas las secciones y categorías del sitio de Dynatech Ingeniería en un solo lugar.",
};

export default async function SitemapPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, name")
    .is("parent_id", null)
    .order("sort_order");

  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "/" },
        { label: "Catálogo completo", href: "/productos" },
        { label: "Marcas", href: "/#marcas" },
        { label: "Nosotros", href: "/nosotros" },
        { label: "Contacto", href: "/contacto" },
      ],
    },
    {
      title: "Categorías",
      links: (categories ?? []).map((c) => ({ label: c.name, href: `/categorias/${c.slug}` })),
    },
    {
      title: "Cotización",
      links: [
        { label: "Carrito de cotización", href: "/carrito" },
        { label: "Solicitar cotización", href: "/cotizacion" },
      ],
    },
    {
      title: "Ayuda y legal",
      links: [
        { label: "Preguntas frecuentes", href: "/faq" },
        { label: "Garantías", href: "/garantias" },
        { label: "Política de devoluciones", href: "/devoluciones" },
        { label: "Política de privacidad", href: "/privacidad" },
        { label: "Términos y condiciones", href: "/terminos" },
      ],
    },
  ];

  return (
    <div className="container-max py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Mapa del sitio" }]} />
      <div className="eyebrow mb-3">Navegación</div>
      <h1 className="font-display text-display-md text-surface mb-10">Mapa del sitio</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-mono text-xs uppercase tracking-techno text-steel-400 mb-4">
              {group.title}
            </h2>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-steel-200 hover:text-signal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
