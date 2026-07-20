import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { ValueProps } from "@/components/home/ValueProps";
import { createClient } from "@/lib/supabase/server";
import { computeCatalogCounts } from "@/lib/catalogCounts";

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: activeProducts }] = await Promise.all([
    supabase.from("categories").select("*"),
    supabase.from("products").select("category_id, brand_id").eq("active", true),
  ]);

  const { categoryCounts, brandCounts } = computeCatalogCounts(activeProducts ?? [], categories ?? []);
  const familiasCount = (categories ?? []).filter(
    (c) => !c.parent_id && (categoryCounts.get(c.id) ?? 0) > 0,
  ).length;
  const marcasCount = Array.from(brandCounts.values()).filter((n) => n > 0).length;

  return (
    <>
      <Hero stats={{ familias: familiasCount, marcas: marcasCount }} />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandsMarquee />
      <ValueProps />
    </>
  );
}
