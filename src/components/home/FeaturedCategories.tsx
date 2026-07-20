import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

export async function FeaturedCategories() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .eq("featured", true)
    .order("sort_order");

  if (!categories || categories.length === 0) return null;

  return (
    <section id="categorias" className="section-pad border-b border-black/5">
      <div className="container-max">
        <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <div className="eyebrow mb-3">01 · Catálogo</div>
            <h2 className="font-display text-display-lg text-surface max-w-2xl">
              Nuestras categorías
            </h2>
          </div>
          <Link href="/productos" className="btn-ghost">
            Ver todas
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {categories.map((cat, i) => {
            const isLast = i === categories.length - 1;
            const remSm = categories.length % 2;
            const remLg = categories.length % 3;
            // Cuando la última tarjeta queda sola en su fila, ocupa todo el ancho —
            // en ese caso pasa a layout horizontal (imagen a la izquierda, texto centrado
            // verticalmente a la derecha) en vez de quedar una imagen angosta con texto
            // desalineado flotando en un contenedor gigante.
            const spansFullLg = isLast && remLg === 1;
            const spanClass = [
              isLast && remSm === 1 && "sm:col-span-2",
              spansFullLg && "lg:col-span-3",
              isLast && remLg === 2 && "lg:col-span-2",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <Reveal key={cat.id} delay={i * 0.07} className={spanClass}>
                <TiltCard max={4} className="h-full">
                  <Link
                    href={`/categorias/${cat.slug}`}
                    className={cn(
                      "group relative flex h-full bg-carbon hover:bg-carbon-800",
                      "hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] transition-all duration-300",
                      spansFullLg ? "flex-col lg:flex-row" : "flex-col",
                    )}
                  >
                    {cat.image_url && (
                      <div
                        className={cn(
                          "relative bg-white border-black/5 overflow-hidden shrink-0",
                          spansFullLg
                            ? "aspect-[16/9] border-b lg:aspect-auto lg:w-2/5 lg:border-b-0 lg:border-r"
                            : "aspect-[16/9] border-b",
                        )}
                      >
                        <Image
                          src={cat.image_url}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div
                      className={cn(
                        "flex flex-1 flex-col p-8",
                        spansFullLg && "lg:justify-center",
                      )}
                    >
                      <div className="flex items-start justify-between mb-8">
                        <span className="font-mono text-[10px] uppercase tracking-techno text-steel-400">
                          {String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-steel-500 group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <h3 className="font-display text-2xl text-surface mb-3">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p
                          className={cn(
                            "text-sm text-steel-300 leading-relaxed",
                            spansFullLg ? "lg:max-w-md" : "line-clamp-2",
                          )}
                        >
                          {cat.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-signal group-hover:w-full transition-all duration-500" />
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
