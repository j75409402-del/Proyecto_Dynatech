"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type Props = {
  items: string[];
  /** Clases del grid de disparadores, ej. "grid-cols-2 lg:grid-cols-4". */
  gridClassName?: string;
};

/**
 * Galería con lightbox — autocontenido a propósito (no recibe funciones como props) pa'
 * poder usarse directo desde un Server Component sin cruzar la frontera RSC con closures.
 */
export function Lightbox({ items, gridClassName = "grid-cols-2 lg:grid-cols-4" }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, items.length]);

  return (
    <>
      <div className={cn("grid gap-4", gridClassName)}>
        {items.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-square w-full border border-black/10 overflow-hidden"
          >
            <ImagePlaceholder label={label} className="group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
              <Maximize2 className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            onClick={() => setIndex(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
            }}
            aria-label="Anterior"
            className={cn(
              "absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors",
              items.length < 2 && "hidden",
            )}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] border border-white/10">
              <ImagePlaceholder label={items[index]} className="bg-carbon-900" />
            </div>
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-techno text-white/60">
              {items[index]} · {index + 1}/{items.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === null ? i : (i + 1) % items.length));
            }}
            aria-label="Siguiente"
            className={cn(
              "absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors",
              items.length < 2 && "hidden",
            )}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
}
