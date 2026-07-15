import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
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

  // Subcategorías
  const { data: subcategories } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", category.id)
    .order("sort_order");

  // Productos: si es padre, buscar en padre + subcategorías
  const catIds = [category.id, ...(subcategories?.map((s) => s.id) ?? [])];

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("active", true)
    .in("category_id", catIds)
    .order("featured", { ascending: false })
    .limit(60);

  return (
    <div className="container-max py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-mono mb-8">
        <Link href="/" className="text-steel-400 hover:text-signal">Inicio</Link>
        <ChevronRight className="h-3 w-3 text-steel-500" />
        <Link href="/productos" className="text-steel-400 hover:text-signal">Catálogo</Link>
        <ChevronRight className="h-3 w-3 text-steel-500" />
        <span className="text-signal uppercase tracking-techno">{category.name}</span>
      </nav>

      {/* Header */}
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

      {/* Subcategorías chips */}
      {subcategories && subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/categorias/${sub.slug}`}
              className="border border-black/10 hover:border-signal px-3 py-1.5 text-sm text-steel-200 hover:text-signal transition-colors"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
