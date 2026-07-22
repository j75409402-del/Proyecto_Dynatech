import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product/ProductCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { ProductWithRelations } from "@/types";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("brands")
    .select("name, description")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return { title: "Marca no encontrada" };
  return { title: data.name, description: data.description ?? undefined };
}

export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!brand) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*), brand:brands(*)")
    .eq("active", true)
    .eq("brand_id", brand.id)
    .limit(60);

  return (
    <div className="container-max py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Marcas", href: "/productos" }, { label: brand.name }]} />

      <div className="mb-12 max-w-3xl">
        <div className="eyebrow mb-3">
          Distribuidor oficial {brand.country && `· ${brand.country}`}
        </div>
        <h1 className="font-display text-display-lg text-surface mb-4">
          {brand.name}
        </h1>
        {brand.description && (
          <p className="text-lg text-steel-300 leading-relaxed mb-4">
            {brand.description}
          </p>
        )}
        {brand.website && (
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-signal hover:underline"
          >
            Sitio del fabricante <ExternalLink className="h-3.5 w-3.5" />
          </a>
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
            Aún no publicamos productos de esta marca.
          </h2>
          <p className="text-steel-300 max-w-md mx-auto mb-6">
            Distribuimos el catálogo completo — cotiza lo que necesites y lo traemos.
          </p>
          <Link href="/cotizacion" className="btn-primary">
            Solicitar cotización
          </Link>
        </div>
      )}
    </div>
  );
}
