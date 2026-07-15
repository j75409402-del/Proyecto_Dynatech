import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import type { ProductWithRelations } from "@/types";

export async function FeaturedProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("active", true)
    .eq("featured", true)
    .limit(6);

  if (!products || products.length === 0) return null;

  return (
    <section className="section-pad border-b border-black/5 bg-carbon-900">
      <div className="container-max">
        <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">02 · Productos destacados</div>
            <h2 className="font-display text-display-lg text-surface max-w-2xl">
              Del catálogo <br />esta semana.
            </h2>
          </div>
          <Link href="/productos" className="btn-ghost">
            Ver catálogo completo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(products as ProductWithRelations[]).map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
