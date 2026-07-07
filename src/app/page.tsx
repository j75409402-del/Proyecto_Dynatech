import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { ValueProps } from "@/components/home/ValueProps";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandsMarquee />
      <ValueProps />
    </>
  );
}
