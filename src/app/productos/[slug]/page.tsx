import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SpecTable } from "@/components/product/SpecTable";
import { QuoteButton } from "@/components/product/QuoteButton";
import { VariantConfigurator, type ConfiguratorConfig } from "@/components/product/VariantConfigurator";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductQuoteForm } from "@/components/product/ProductQuoteForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ImportCTA } from "@/components/home/ImportCTA";
import { CatalogDownload } from "@/components/home/CatalogDownload";
import { buildCategoryTrail } from "@/lib/categoryBreadcrumb";
import { stockDisplay, cn } from "@/lib/utils";
import type { ProductWithRelations, Category } from "@/types";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, short_desc, thumbnail_url")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (!product) return { title: "Producto no encontrado" };

  return {
    title: product.name,
    description: product.short_desc ?? undefined,
    openGraph: {
      title: product.name,
      description: product.short_desc ?? undefined,
      images: product.thumbnail_url ? [product.thumbnail_url] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle<ProductWithRelations>();

  if (!product) notFound();

  const { data: allCategories } = await supabase.from("categories").select("*");
  const byId = new Map((allCategories ?? []).map((c) => [c.id, c]));

  function topLevelOf(categoryId: string | null): Category | null {
    let current = categoryId ? byId.get(categoryId) : undefined;
    if (!current) return null;
    while (current.parent_id) {
      const parent = byId.get(current.parent_id);
      if (!parent) break;
      current = parent;
    }
    return current;
  }

  // "Relacionados" incluye la misma subcategoría Y las subcategorías hermanas bajo la
  // misma familia (ej. ver un cilindro también sugiere racores, mangueras, válvulas, FRL).
  const topLevel = topLevelOf(product.category_id);
  const siblingIds = (allCategories ?? [])
    .filter((c) => c.parent_id && topLevelOf(c.id)?.id === topLevel?.id)
    .map((c) => c.id);
  const relatedCategoryIds = Array.from(new Set([product.category_id, ...siblingIds].filter(Boolean))) as string[];

  const { data: related } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("active", true)
    .in("category_id", relatedCategoryIds.length > 0 ? relatedCategoryIds : [""])
    .neq("id", product.id)
    .order("featured", { ascending: false })
    .limit(8);

  // Shape completo tal cual vive en la DB — incluye sku_template/part_template,
  // que son server-only y JAMÁS deben pasar como prop a un client component.
  type StoredConfiguratorConfig = ConfiguratorConfig & { sku_template: string; part_template: string };
  const rawSpecs =
    (product.specs as (Record<string, unknown> & { configurator?: StoredConfiguratorConfig }) | null) ?? null;
  const storedConfigurator = rawSpecs?.configurator ?? null;
  // Versión saneada para el cliente: solo attributes/description_template/defaults.
  const configurator: ConfiguratorConfig | null = storedConfigurator
    ? {
        attributes: storedConfigurator.attributes,
        description_template: storedConfigurator.description_template,
        defaults: storedConfigurator.defaults,
      }
    : null;
  const specs = rawSpecs
    ? (Object.fromEntries(
        Object.entries(rawSpecs).filter(([key]) => key !== "configurator"),
      ) as Record<string, string>)
    : null;
  // Objeto acotado para los client components de CTA — nunca el SKU real.
  const publicProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    thumbnail_url: product.thumbnail_url,
    brand: product.brand,
  };
  const galleryImages = Array.from(
    new Set([product.thumbnail_url, ...((product.images as string[] | null) ?? [])].filter(Boolean)),
  ) as string[];
  const stock = stockDisplay(product.stock_status, product.stock_quantity);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_desc ?? product.description ?? undefined,
    image: product.thumbnail_url ?? undefined,
    category: product.category?.name ?? undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
  };

  return (
    <div>
      <div className="container-max py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <Breadcrumbs
          items={[
            ...(product.category
              ? buildCategoryTrail(product.category, allCategories ?? []).map((c) => ({
                  label: c.name,
                  href: `/categorias/${c.slug}`,
                }))
              : [{ label: "Catálogo", href: "/productos" }]),
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen */}
          <ProductGallery images={galleryImages} alt={product.name} />

          {/* Info */}
          <div>
            {/* Brand + stock */}
            <div className="flex items-center justify-between mb-4">
              {product.brand && (
                <span className="font-mono text-xs uppercase tracking-techno text-signal">
                  {product.brand.name} {product.brand.country && `· ${product.brand.country}`}
                </span>
              )}
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full", stock.available ? "bg-emerald-500" : "bg-signal")} />
                  <span className="font-mono text-[10px] uppercase tracking-techno text-steel-200">
                    {stock.label}
                  </span>
                </div>
                {stock.sublabel && (
                  <span className="font-mono text-[10px] text-steel-400">{stock.sublabel}</span>
                )}
              </div>
            </div>

            <h1 className="font-display text-display-md text-surface mb-4">
              {product.name}
            </h1>

            {product.short_desc && (
              <p className="text-lg text-steel-200 leading-relaxed mb-6 mt-6">
                {product.short_desc}
              </p>
            )}

            {product.description && (
              <p className="text-sm text-steel-300 leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <FactBlock
                icon={<Clock className="h-4 w-4" />}
                label="Entrega"
                value={product.lead_time_days ? `${product.lead_time_days} días` : "Consultar"}
              />
              <FactBlock
                icon={<Building2 className="h-4 w-4" />}
                label="Marca"
                value={product.brand?.name ?? "—"}
              />
            </div>

            {/* CTAs — configurador pa' productos maestro con variantes, botones fijos pa' el resto */}
            {configurator ? (
              <VariantConfigurator product={publicProduct} config={configurator} />
            ) : (
              <QuoteButton product={publicProduct} />
            )}
          </div>
        </div>

        {/* Especificaciones / Ficha técnica */}
        <div className="mt-16">
          <ProductTabs
            tabs={[
              {
                id: "specs",
                label: "Especificaciones",
                content:
                  specs && Object.keys(specs).length > 0 ? (
                    <SpecTable specs={specs} />
                  ) : (
                    <p className="text-sm text-steel-400">Sin especificaciones cargadas para este producto.</p>
                  ),
              },
              {
                id: "ficha",
                label: "Ficha técnica",
                content: (
                  <div className="space-y-6">
                    {product.description ? (
                      <p className="text-sm text-steel-300 leading-relaxed max-w-2xl">{product.description}</p>
                    ) : (
                      <p className="text-sm text-steel-400">Sin ficha técnica adicional para este producto.</p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {product.datasheet_url && (
                        <a
                          href={product.datasheet_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          Descargar PDF
                        </a>
                      )}
                      {product.brand?.website && (
                        <a
                          href={product.brand.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                        >
                          Catálogo del fabricante
                        </a>
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Formulario de cotización inline */}
        <div className="mt-16 pt-16 border-t border-black/10 max-w-2xl">
          <div className="eyebrow mb-3">Cotización</div>
          <h2 className="font-display text-2xl text-surface mb-6">Solicitar cotización de este producto</h2>
          <ProductQuoteForm sku={product.sku} productName={product.name} />
        </div>

        {/* Related */}
        {related && related.length > 0 && (
          <div className="mt-16 pt-16 border-t border-black/10">
            <div className="eyebrow mb-6">Productos relacionados</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(related as ProductWithRelations[]).slice(0, 8).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ImportCTA />
      <CatalogDownload />
    </div>
  );
}

function FactBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-black/10 p-3">
      <div className="flex items-center gap-1.5 text-steel-400 mb-1.5">
        {icon}
        <span className="font-mono text-[9px] uppercase tracking-techno">{label}</span>
      </div>
      <div className="font-display text-sm text-surface">{value}</div>
    </div>
  );
}
