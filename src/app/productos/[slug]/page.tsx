import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, Package, Clock, Ruler } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SpecTable } from "@/components/product/SpecTable";
import { QuoteButton } from "@/components/product/QuoteButton";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { stockStatusLabel, stockStatusColor, cn } from "@/lib/utils";
import type { ProductWithRelations } from "@/types";

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

  // Productos relacionados (misma categoría)
  const { data: related } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("active", true)
    .eq("category_id", product.category_id ?? "")
    .neq("id", product.id)
    .limit(3);

  const specs = product.specs as Record<string, string> | null;
  const galleryImages = Array.from(
    new Set([product.thumbnail_url, ...((product.images as string[] | null) ?? [])].filter(Boolean)),
  ) as string[];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.short_desc ?? product.description ?? undefined,
    image: product.thumbnail_url ?? undefined,
    category: product.category?.name ?? undefined,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
  };

  return (
    <div className="container-max py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Catálogo", href: "/productos" },
          ...(product.category
            ? [{ label: product.category.name, href: `/categorias/${product.category.slug}` }]
            : []),
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
            <div className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", stockStatusColor(product.stock_status))} />
              <span className="font-mono text-[10px] uppercase tracking-techno text-steel-200">
                {stockStatusLabel(product.stock_status)}
              </span>
            </div>
          </div>

          <h1 className="font-display text-display-md text-surface mb-4">
            {product.name}
          </h1>

          <span className="sku-tag mb-6">SKU · {product.sku}</span>

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
          <div className="grid grid-cols-3 gap-3 mb-8">
            <FactBlock
              icon={<Package className="h-4 w-4" />}
              label="Cant. mín."
              value={String(product.min_order_qty)}
            />
            <FactBlock
              icon={<Clock className="h-4 w-4" />}
              label="Entrega"
              value={product.lead_time_days ? `${product.lead_time_days} días` : "Consultar"}
            />
            <FactBlock
              icon={<Ruler className="h-4 w-4" />}
              label="Marca"
              value={product.brand?.name ?? "—"}
            />
          </div>

          {/* CTAs */}
          <QuoteButton product={product} />

          {/* Datasheet */}
          {product.datasheet_url && (
            <a
              href={product.datasheet_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-steel-300 hover:text-signal transition-colors"
            >
              <Download className="h-4 w-4" />
              Descargar datasheet (PDF)
            </a>
          )}
        </div>
      </div>

      {/* Specs */}
      {specs && Object.keys(specs).length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl text-surface mb-6">Especificaciones</h2>
          <SpecTable specs={specs} />
        </div>
      )}

      {/* Related */}
      {related && related.length > 0 && (
        <div className="mt-16 pt-16 border-t border-black/10">
          <div className="eyebrow mb-6">Productos relacionados</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(related as ProductWithRelations[]).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
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
