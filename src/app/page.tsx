import { Hero } from "@/components/home/Hero";
import { HomeSearch } from "@/components/home/HomeSearch";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { ValueProps } from "@/components/home/ValueProps";
import { ImportCTA } from "@/components/home/ImportCTA";
import { CatalogDownload } from "@/components/home/CatalogDownload";
import { Stats } from "@/components/home/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeSearch />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandsMarquee />
      <ValueProps />
      <ImportCTA />
      <CatalogDownload />
      <Stats />
    </>
  );
}
