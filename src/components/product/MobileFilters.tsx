"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductFilters } from "./ProductFilters";
import type { Category, Brand } from "@/types";

type Props = {
  categories: Category[];
  brands: Brand[];
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  totalCount: number;
};

export function MobileFilters(props: Props) {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del body mientras el panel está abierto.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 bg-signal
                   hover:bg-signal-hover text-white font-medium py-3 px-6 rounded-full text-xs
                   uppercase tracking-wider shadow-lg shadow-black/20 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm overflow-y-auto bg-carbon
                    border-r border-black/10 p-6 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-lg text-surface">Filtros</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar filtros"
            className="p-1.5 text-steel-400 hover:text-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ProductFilters {...props} />
      </div>
    </div>
  );
}
