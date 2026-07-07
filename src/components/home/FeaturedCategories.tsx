import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function FeaturedCategories() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .eq("featured", true)
    .order("sort_order");

  if (!categories || categories.length === 0) return null;

  return (
    <section id="categorias" className="section-pad border-b border-white/5">
      <div className="container-max">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">01 · Catálogo</div>
            <h2 className="font-display text-display-lg text-surface max-w-2xl">
              Categorías técnicas que <br />mueven tu producción.
            </h2>
          </div>
          <Link href="/productos" className="btn-ghost">
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              className="group relative bg-carbon p-8 hover:bg-carbon-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-techno text-steel-400">
                  {String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-steel-500 group-hover:text-signal transition-colors" />
              </div>

              <h3 className="font-display text-2xl text-surface mb-3">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-sm text-steel-300 leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              )}

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
