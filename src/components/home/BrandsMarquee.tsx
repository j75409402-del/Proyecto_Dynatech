import { createClient } from "@/lib/supabase/server";
import { Reveal } from "@/components/motion/Reveal";

export async function BrandsMarquee() {
  const supabase = await createClient();
  const { data: brands } = await supabase
    .from("brands")
    .select("*")
    .order("sort_order");

  if (!brands || brands.length === 0) return null;

  // Duplicamos pa' que el loop sea seamless
  const loop = [...brands, ...brands];

  return (
    <section id="marcas" className="py-12 border-b border-black/5 overflow-hidden bg-carbon-900">
      <Reveal className="container-max mb-6">
        <div className="eyebrow">04 · Distribución oficial de</div>
      </Reveal>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-carbon-900 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-carbon-900 to-transparent z-10" />

        <div className="flex animate-marquee gap-16 w-max hover:[animation-play-state:paused]">
          {loop.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="group flex items-center gap-3 px-6 py-4 shrink-0"
            >
              <span className="h-2 w-2 bg-signal rounded-full transition-transform duration-300 group-hover:scale-150" />
              <span className="font-display text-xl text-steel-200 whitespace-nowrap transition-colors duration-300 group-hover:text-surface">
                {brand.name}
              </span>
              {brand.country && (
                <span className="font-mono text-[10px] uppercase tracking-techno text-steel-500">
                  · {brand.country}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
