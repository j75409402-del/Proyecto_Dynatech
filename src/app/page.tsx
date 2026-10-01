import { Hero } from "@/components/home/Hero";
import { QueHacemos, FabricamosReparamos, ComoTrabajamos } from "@/components/home/HomeSections";
import { QuoteCTA } from "@/components/cta/QuoteCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QueHacemos />
      <FabricamosReparamos />
      <ComoTrabajamos />
      <QuoteCTA />
    </>
  );
}
