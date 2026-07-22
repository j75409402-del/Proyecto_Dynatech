import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilters } from "@/components/product/ProductFilters";
import { MobileFilters } from "@/components/product/MobileFilters";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { computeCatalogCounts } from "@/lib/catalogCounts";
import type { ProductWithRelations, Category } from "@/types";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explora el catálogo completo de piezas industriales de Dynatech: neumática, eléctrica industrial, sensores e instrumentación.",
};

type SearchParams = Promise<{ categoria?: string; marca?: string; disponibilidad?: string; q?: string }>;

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const activeBrandSlugs = params.marca?.split(",").filter(Boolean) ?? [];
  const activeStock = params.disponibilidad?.split(",").filter(Boolean) ?? [];

  // Categorías completas — las necesitamos antes de armar la query si hay búsqueda por texto,
  // para poder expandir "cilindro" a la categoría Cilindros + sus subcategorías/accesorios.
  const { data: allCategories } = await supabase.from("categories").select("*");

  // Filtros dinámicos
  let query = supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)", { count: "exact" })
    .eq("active", true);

  if (params.categoria) {
    // Resolvemos la categoría por slug e incluimos TODOS sus descendientes (no solo un nivel),
    // pa' que filtrar por una categoría raíz también traiga productos de sub-subcategorías.
    const cat = (allCategories ?? []).find((c) => c.slug === params.categoria);
    if (cat) {
      const ids = new Set([cat.id]);
      let expanded = true;
      while (expanded) {
        expanded = false;
        for (const c of allCategories ?? []) {
          if (c.parent_id && ids.has(c.parent_id) && !ids.has(c.id)) {
            ids.add(c.id);
            expanded = true;
          }
        }
      }
      query = query.in("category_id", Array.from(ids));
    }
  }

  if (activeBrandSlugs.length > 0) {
    const { data: matchedBrands } = await supabase
      .from("brands")
      .select("id")
      .in("slug", activeBrandSlugs);
    if (matchedBrands?.length) {
      query = query.in("brand_id", matchedBrands.map((b) => b.id));
    }
  }

  if (activeStock.length > 0) {
    // El filtro público solo conoce "disponible"/"agotado" (ver decisión en stockDisplay());
    // "disponible" cubre en_stock/bajo_pedido/consultar, que de cara al cliente sí se consiguen.
    const statusValues = new Set<string>();
    if (activeStock.includes("disponible")) {
      statusValues.add("en_stock").add("bajo_pedido").add("consultar");
    }
    if (activeStock.includes("agotado")) statusValues.add("agotado");
    query = query.in("stock_status", Array.from(statusValues));
  }

  if (params.q) {
    // Búsqueda "a lo Amazon": además del texto, si el término coincide con el nombre de una
    // categoría (ej. "cilindro" → Cilindros neumáticos) traemos también sus subcategorías/accesorios.
    const qLower = params.q.toLowerCase();
    const matchedCatIds = new Set(
      (allCategories ?? []).filter((c) => c.name.toLowerCase().includes(qLower)).map((c) => c.id),
    );
    let expanded = true;
    while (expanded) {
      expanded = false;
      for (const c of allCategories ?? []) {
        if (c.parent_id && matchedCatIds.has(c.parent_id) && !matchedCatIds.has(c.id)) {
          matchedCatIds.add(c.id);
          expanded = true;
        }
      }
    }

    const orParts = [
      `name.ilike.%${params.q}%`,
      `sku.ilike.%${params.q}%`,
      `search_tags.ilike.%${params.q}%`,
    ];
    if (matchedCatIds.size > 0) {
      orParts.push(`category_id.in.(${Array.from(matchedCatIds).join(",")})`);
    }
    query = query.or(orParts.join(","));
  }

  const [{ data: products, count }, categoriesRes, brandsRes, allActiveRes] = await Promise.all([
    query.order("featured", { ascending: false }).order("created_at", { ascending: false }).limit(60),
    supabase.from("categories").select("*").is("parent_id", null).order("sort_order"),
    supabase.from("brands").select("*").order("sort_order"),
    supabase.from("products").select("category_id, brand_id").eq("active", true),
  ]);

  const { categoryCounts, brandCounts } = computeCatalogCounts(
    allActiveRes.data ?? [],
    allCategories ?? [],
  );

  const activeCategory = params.categoria
    ? (allCategories ?? []).find((c) => c.slug === params.categoria)
    : null;

  // Agrupamos por familia (categoría raíz) cuando se ve el catálogo completo sin filtrar,
  // y por subcategoría cuando el filtro activo es una categoría raíz (ej. "Neumática") —
  // en ese caso el listado sigue teniendo decenas de productos de familias distintas
  // (cilindros, válvulas, racores, mangueras...) y necesita el mismo orden visual.
  // Si el filtro ya es una subcategoría puntual, el listado está suficientemente acotado.
  const showGroupedByRoot = !params.categoria && !params.q;
  const showGroupedBySubcategory = !!activeCategory && !activeCategory.parent_id && !params.q;
  const groups = showGroupedByRoot
    ? groupByTopLevelCategory(
        (products as ProductWithRelations[]) ?? [],
        categoriesRes.data ?? [],
        allCategories ?? [],
      )
    : showGroupedBySubcategory
      ? groupBySubcategory((products as ProductWithRelations[]) ?? [])
      : null;

  return (
    <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Catálogo", href: "/productos" },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
        ]}
      />

      {/* Header — compacto */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-display-md text-surface mb-2">
            {activeCategory ? activeCategory.name : "Catálogo de productos"}
          </h1>
          <p className="text-sm text-steel-300 max-w-xl">
            {activeCategory?.description ??
              "Piezas y componentes industriales con inventario en Santo Domingo — neumática, eléctrica, sensores e instrumentación."}
          </p>
        </div>
        <div className="font-mono text-xs uppercase tracking-techno text-steel-400 shrink-0">
          {count ?? 0} {count === 1 ? "producto" : "productos"}
        </div>
      </div>

      <MobileFilters
        categories={categoriesRes.data ?? []}
        brands={brandsRes.data ?? []}
        categoryCounts={Object.fromEntries(categoryCounts)}
        brandCounts={Object.fromEntries(brandCounts)}
        totalCount={allActiveRes.data?.length ?? 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-8 xl:gap-10">
        {/* Filters — desktop */}
        <div className="hidden lg:block">
          <ProductFilters
            categories={categoriesRes.data ?? []}
            brands={brandsRes.data ?? []}
            categoryCounts={Object.fromEntries(categoryCounts)}
            brandCounts={Object.fromEntries(brandCounts)}
            totalCount={allActiveRes.data?.length ?? 0}
          />
        </div>

        {/* Grid */}
        <div className="min-w-0">
          {!products || products.length === 0 ? (
            <EmptyState />
          ) : groups ? (
            <div className="space-y-14">
              {groups.map(({ category, items }, i) => (
                <Reveal key={category.id} delay={i * 0.05}>
                  <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-black/10">
                    <h2 className="font-display text-xl text-surface">{category.name}</h2>
                    <span className="font-mono text-[11px] uppercase tracking-techno text-steel-400 shrink-0">
                      {items.length} {items.length === 1 ? "producto" : "productos"}
                    </span>
                  </div>
                  <ProductGrid products={items} />
                </Reveal>
              ))}
            </div>
          ) : (
            <ProductGrid products={products as ProductWithRelations[]} />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }: { products: ProductWithRelations[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 items-stretch">
      {products.map((product, i) => (
        <Reveal key={product.id} delay={Math.min(i, 8) * 0.04}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}

/** Agrupa productos bajo su categoría raíz (recorre parent_id hacia arriba), en el orden de sort_order. */
function groupByTopLevelCategory(
  products: ProductWithRelations[],
  topLevelCategories: Category[],
  allCategories: Category[],
) {
  const byId = new Map(allCategories.map((c) => [c.id, c]));

  function resolveTopLevel(categoryId: string | null): Category | null {
    let current = categoryId ? byId.get(categoryId) : undefined;
    if (!current) return null;
    while (current.parent_id) {
      const parent = byId.get(current.parent_id);
      if (!parent) break;
      current = parent;
    }
    return current;
  }

  const buckets = new Map<string, ProductWithRelations[]>();
  for (const product of products) {
    const top = resolveTopLevel(product.category_id);
    const key = top?.id ?? "sin-categoria";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(product);
  }

  const ordered = topLevelCategories
    .filter((c) => buckets.has(c.id))
    .map((category) => ({ category, items: buckets.get(category.id)! }));

  const orphan = buckets.get("sin-categoria");
  if (orphan?.length) {
    ordered.push({
      category: { id: "sin-categoria", name: "Otros", slug: "otros" } as Category,
      items: orphan,
    });
  }

  return ordered;
}

/** Agrupa productos por su categoría directa (subcategoría) — usado cuando el filtro activo ya es una categoría raíz. */
function groupBySubcategory(products: ProductWithRelations[]) {
  const buckets = new Map<string, { category: Category; items: ProductWithRelations[] }>();
  const otros: ProductWithRelations[] = [];

  for (const product of products) {
    const cat = product.category as Category | null;
    if (!cat) {
      otros.push(product);
      continue;
    }
    if (!buckets.has(cat.id)) buckets.set(cat.id, { category: cat, items: [] });
    buckets.get(cat.id)!.items.push(product);
  }

  const ordered = Array.from(buckets.values()).sort(
    (a, b) => (a.category.sort_order ?? 0) - (b.category.sort_order ?? 0),
  );

  if (otros.length > 0) {
    ordered.push({ category: { id: "sin-categoria", name: "Otros", slug: "otros" } as Category, items: otros });
  }

  return ordered;
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
