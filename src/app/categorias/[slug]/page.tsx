import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildCategoryTrail } from "@/lib/categoryBreadcrumb";
import { computeCatalogCounts } from "@/lib/catalogCounts";
import type { ProductWithRelations } from "@/types";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("name, description")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return { title: "Categoría no encontrada" };
  return { title: data.name, description: data.description ?? undefined };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!category) notFound();

  const { data: allCategories } = await supabase.from("categories").select("*");
  const subcategories = (allCategories ?? [])
    .filter((c) => c.parent_id === category.id)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  const trail = buildCategoryTrail(category, allCategories ?? []);
  const breadcrumbItems = trail.map((c, i) => ({
    label: c.name,
    href: i < trail.length - 1 ? `/categorias/${c.slug}` : undefined,
  }));

  // Tiene subcategorías -> primero se elige subcategoría, los productos no se muestran acá todavía.
  if (subcategories.length > 0) {
    const { data: activeProducts } = await supabase
      .from("products")
      .select("category_id, brand_id")
      .eq("active", true);
    const { categoryCounts } = computeCatalogCounts(activeProducts ?? [], allCategories ?? []);

    return (
      <div className="container-max py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-12 max-w-3xl">
          <div className="eyebrow mb-3">Catálogo</div>
          <h1 className="font-display text-display-lg text-surface mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-lg text-steel-300 leading-relaxed">{category.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subcategories.map((sub) => {
            const count = categoryCounts.get(sub.id) ?? 0;
            return (
              <Link
                key={sub.id}
                href={`/categorias/${sub.slug}`}
                className="group relative flex flex-col border border-black/10 bg-carbon-800
                           hover:border-signal/50 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]
                           transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-white border-b border-black/5 overflow-hidden">
                  {sub.image_url ? (
                    <Image
                      src={sub.image_url}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-steel-500">
                      <ImageOff className="h-7 w-7" strokeWidth={1.25} />
                      <span className="font-mono text-[9px] uppercase tracking-techno">Imagen a reemplazar</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 items-center justify-between gap-3 p-5">
                  <div>
                    <h2 className="font-display text-lg text-surface mb-1">{sub.name}</h2>
                    <span className="font-mono text-[11px] uppercase tracking-techno text-steel-400">
                      {count} {count === 1 ? "producto" : "productos"}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-steel-500 shrink-0 group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Categoría hoja (sin subcategorías) -> se muestran los productos directamente.
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("active", true)
    .eq("category_id", category.id)
    .order("featured", { ascending: false })
    .limit(60);

  return (
    <div className="container-max py-12 sm:py-16">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-12 max-w-3xl">
        <div className="eyebrow mb-3">
          Categoría · {products?.length ?? 0} productos
        </div>
        <h1 className="font-display text-display-lg text-surface mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-lg text-steel-300 leading-relaxed">
            {category.description}
          </p>
        )}
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 items-stretch">
          {(products as ProductWithRelations[]).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="border border-black/10 p-12 text-center">
          <h2 className="font-display text-2xl text-surface mb-3">
            Estamos armando esta sección.
          </h2>
          <p className="text-steel-300 max-w-md mx-auto mb-6">
            ¿Necesitas algo puntual? Cotízalo directo y te contactamos.
          </p>
          <Link href="/cotizacion" className="btn-primary">
            Solicitar cotización
          </Link>
        </div>
      )}
    </div>
  );
}
