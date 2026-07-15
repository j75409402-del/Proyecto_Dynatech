import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import type { ProductWithRelations } from "@/types";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explora el catálogo completo de piezas industriales de Dynatech.",
};

type SearchParams = Promise<{ categoria?: string; marca?: string; q?: string }>;

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  // Filtros dinámicos
  let query = supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)", { count: "exact" })
    .eq("active", true);

  if (params.categoria) {
    // Resolvemos la categoría por slug pa' obtener el id (incluye subcategorías si es padre)
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", params.categoria)
      .maybeSingle();
    if (cat) {
      // Obtener también subcategorías
      const { data: children } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", cat.id);
      const ids = [cat.id, ...(children?.map((c) => c.id) ?? [])];
      query = query.in("category_id", ids);
    }
  }

  if (params.marca) {
    const { data: brand } = await supabase
      .from("brands")
      .select("id")
      .eq("slug", params.marca)
      .maybeSingle();
    if (brand) query = query.eq("brand_id", brand.id);
  }

  if (params.q) {
    query = query.or(`name.ilike.%${params.q}%,sku.ilike.%${params.q}%`);
  }

  const [{ data: products, count }, categoriesRes, brandsRes] = await Promise.all([
    query.order("featured", { ascending: false }).order("created_at", { ascending: false }).limit(60),
    supabase.from("categories").select("*").is("parent_id", null).order("sort_order"),
    supabase.from("brands").select("*").order("sort_order"),
  ]);

  return (
    <div className="container-max py-12 sm:py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="eyebrow mb-3">Catálogo · {count ?? 0} productos</div>
        <h1 className="font-display text-display-lg text-surface">
          Piezas industriales <br />pa' tu operación.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Filters */}
        <div className="lg:col-span-1">
          <ProductFilters
            categories={categoriesRes.data ?? []}
            brands={brandsRes.data ?? []}
          />
        </div>

        {/* Grid */}
        <div className="lg:col-span-3">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {(products as ProductWithRelations[]).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border border-black/10 p-12 text-center">
      <div className="eyebrow mb-3">Sin resultados</div>
      <h2 className="font-display text-2xl text-surface mb-3">
        No encontramos productos con esos filtros.
      </h2>
      <p className="text-steel-300 max-w-md mx-auto">
        Prueba con menos filtros, o cuéntanos qué necesitas por{" "}
        <a href="/cotizacion" className="text-signal hover:underline">
          formulario de cotización
        </a>{" "}
        y lo conseguimos.
      </p>
    </div>
  );
}
