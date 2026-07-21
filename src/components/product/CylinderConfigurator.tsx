"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { ProductWithRelations } from "@/types";

export type ConfiguratorConfig = {
  diameters: number[];
  strokes: number[];
  sku_template: string; // ej. "FES-DSBC-{d}-{c}"
  part_template: string; // ej. "DSBC-{d}-{c}-PPVA-N3"
  default_diameter?: number;
  default_stroke?: number;
};

type Props = {
  product: Pick<ProductWithRelations, "id" | "slug" | "sku" | "name" | "thumbnail_url" | "brand">;
  config: ConfiguratorConfig;
};

function fill(template: string, diameter: number, stroke: number) {
  return template.replace("{d}", String(diameter)).replace("{c}", String(stroke));
}

export function CylinderConfigurator({ product, config }: Props) {
  const [diameter, setDiameter] = useState(config.default_diameter ?? config.diameters[0]);
  const [stroke, setStroke] = useState(config.default_stroke ?? config.strokes[0]);

  const sku = useMemo(() => fill(config.sku_template, diameter, stroke), [config.sku_template, diameter, stroke]);
  const partNumber = useMemo(
    () => fill(config.part_template, diameter, stroke),
    [config.part_template, diameter, stroke],
  );
  const variantName = `${product.name} · Ø${diameter}mm x ${stroke}mm`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="sku-tag">SKU · {sku}</span>
        <span className="font-mono text-[10px] uppercase tracking-techno text-steel-400">
          Código del fabricante ·{" "}
          <span className="text-steel-200">{partNumber}</span>
        </span>
      </div>

      {/* Configurador */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="cfg-diametro" className="block text-xs uppercase tracking-techno text-steel-400 mb-1.5">
            Diámetro
          </label>
          <select
            id="cfg-diametro"
            value={diameter}
            onChange={(e) => setDiameter(Number(e.target.value))}
            className="w-full bg-carbon-800 border border-black/10 px-3 py-2.5 text-sm text-surface
                       focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none rounded-xs transition-colors"
          >
            {config.diameters.map((d) => (
              <option key={d} value={d}>
                {d} mm
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cfg-carrera" className="block text-xs uppercase tracking-techno text-steel-400 mb-1.5">
            Carrera
          </label>
          <select
            id="cfg-carrera"
            value={stroke}
            onChange={(e) => setStroke(Number(e.target.value))}
            className="w-full bg-carbon-800 border border-black/10 px-3 py-2.5 text-sm text-surface
                       focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none rounded-xs transition-colors"
          >
            {config.strokes.map((c) => (
              <option key={c} value={c}>
                {c} mm
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CTAs — capturan exactamente la variante configurada */}
      <div className="flex flex-col sm:flex-row gap-3">
        <AddToCartButton
          product={product}
          overrideSku={sku}
          overrideName={variantName}
          variant="primary"
          className="flex-1"
        />
        <Link
          href={`/cotizacion?sku=${encodeURIComponent(sku)}&nombre=${encodeURIComponent(variantName)}`}
          className="btn-secondary flex-1"
        >
          <FileText className="h-4 w-4" />
          Cotización multi-ítem
        </Link>
      </div>
    </div>
  );
}
