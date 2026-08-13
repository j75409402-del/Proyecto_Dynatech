import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { buildCategoryTrail } from "@/lib/categoryBreadcrumb";
import { computeCatalogCounts } from "@/lib/catalogCounts";
import { ReferenceTable, type ReferenceTableRow } from "@/components/product/ReferenceTable";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ConsultAvailabilityButton } from "@/components/product/ConsultAvailabilityButton";
import { TABLE_CATEGORIES } from "@/lib/tableCategories";
import type { ProductWithRelations } from "@/types";

type Params = Promise<{ slug: string }>;

// Orden secundario por nombre (después de featured) para que productos de la misma familia
// (mismo prefijo, ej. "Fusible Gould AT...") queden siempre agrupados en la grilla, nunca
// intercalados con otras familias.
function sortByFeaturedThenName<T extends { featured: boolean | null; name: string }>(
  products: T[] | null,
): T[] {
  return [...(products ?? [])].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name, "es");
  });
}

// Bloque CTA opcional al final de una categoría con subcategorías (ej. Fusibles).
const CATEGORY_CTA_BLOCKS: Record<
  string,
  { heading: string; body: string; buttonLabel: string }
> = {
  fusibles: {
    heading: "¿Necesitas un fusible industrial específico?",
    body: "Contamos con diferentes modelos y capacidades para aplicaciones industriales.",
    buttonLabel: "Solicita tu cotización",
  },
};

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
      .select("category_id")
      .eq("active", true);
    const { categoryCounts } = computeCatalogCounts(activeProducts ?? [], allCategories ?? []);
    // Subcategorías sin productos activos todavía no se muestran como tarjeta (evita tiles
    // vacíos con "Imagen a reemplazar" + "0 productos") — la categoría sigue existiendo,
    // solo se oculta de esta vista hasta que tenga contenido real.
    const visibleSubcategories = subcategories.filter((sub) => (categoryCounts.get(sub.id) ?? 0) > 0);

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

        {visibleSubcategories.length === 0 ? (
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
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSubcategories.map((sub) => {
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
        )}

        {CATEGORY_CTA_BLOCKS[category.slug] && (
          <div className="mt-12 border border-black/10 bg-carbon-800 p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl text-surface mb-3">
              {CATEGORY_CTA_BLOCKS[category.slug].heading}
            </h2>
            <p className="text-steel-300 max-w-xl mx-auto mb-6">
              {CATEGORY_CTA_BLOCKS[category.slug].body}
            </p>
            <Link href="/cotizacion" className="btn-primary">
              {CATEGORY_CTA_BLOCKS[category.slug].buttonLabel}
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Categoría "tabla de referencias" -> además de su ficha de producto normal (galería,
  // WhatsApp, etc. en /productos/[slug]), esta vista de categoría muestra todas las
  // referencias de una vez en una tabla con buscador/orden/stock.
  const tableConfig = TABLE_CATEGORIES[category.slug];
  if (tableConfig) {
    const { data: holder } = await createServiceClient()
      .from("products")
      .select("slug, name, short_desc, thumbnail_url, images, specs")
      .eq("slug", tableConfig.holderSlug)
      .maybeSingle();

    const rows =
      ((holder?.specs as Record<string, ReferenceTableRow[]> | null)?.[tableConfig.specsKey] as
        | ReferenceTableRow[]
        | undefined) ?? [];
    const galleryImages = holder
      ? (Array.from(
          new Set([holder.thumbnail_url, ...((holder.images as string[] | null) ?? [])].filter(Boolean)),
        ) as string[])
      : [];

    // Algunos modelos de esta misma categoría piden ficha propia en vez de ir en la tabla
    // unificada (ej. R432-08/R432-10) — se muestran aparte, como tarjetas normales.
    const { data: standaloneProductsRaw } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("active", true)
      .eq("category_id", category.id)
      .neq("slug", tableConfig.holderSlug);
    const standaloneProducts = sortByFeaturedThenName(standaloneProductsRaw);

    return (
      <div className="container-max py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Presentación visual de la familia — imagen (cargable desde el admin) + botón
            de WhatsApp, para que esto se sienta como catálogo, no como lista de texto. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <ProductGallery images={galleryImages} alt={category.name} />
          <div className="flex flex-col justify-center">
            <div className="eyebrow mb-3">Catálogo · {rows.length} referencias</div>
            <h1 className="font-display text-display-lg text-surface mb-4">{category.name}</h1>
            <p className="text-lg text-steel-200 leading-relaxed mb-2">
              {holder?.short_desc || category.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ConsultAvailabilityButton
                productName={category.name}
                label="Cotizar por WhatsApp"
              />
              {holder && (
                <Link href={`/productos/${holder.slug}`} className="btn-secondary">
                  Ver ficha completa
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="eyebrow mb-1">Referencias disponibles</div>
          <h2 className="font-display text-xl text-surface">Todas las medidas y capacidades</h2>
        </div>

        <ReferenceTable
          columns={tableConfig.columns}
          rows={rows}
          searchKeys={tableConfig.searchKeys}
          searchPlaceholder={tableConfig.searchPlaceholder}
          filterKey={tableConfig.filterKey}
          showStock={tableConfig.showStock ?? false}
        />

        {standaloneProducts && standaloneProducts.length > 0 && (
          <div className="mt-14 pt-14 border-t border-black/10">
            <div className="eyebrow mb-5">Otros modelos</div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 items-stretch">
              {(standaloneProducts as ProductWithRelations[]).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Categoría hoja (sin subcategorías) -> se muestran los productos directamente. Orden
  // alfabético por nombre como criterio secundario para que las familias (mismo prefijo,
  // ej. "Fusible Gould AT...") queden siempre agrupadas y nunca intercaladas.
  const { data: productsRaw } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("active", true)
    .eq("category_id", category.id)
    .limit(60);
  const products = sortByFeaturedThenName(productsRaw);

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
