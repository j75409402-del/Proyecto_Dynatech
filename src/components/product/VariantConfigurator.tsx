"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { ProductWithRelations } from "@/types";

export type ConfiguratorOption = {
  value: string;
  label: string;
};

export type ConfiguratorAttribute = {
  key: string;
  label: string;
  options: ConfiguratorOption[];
};

export type ConfiguratorConfig = {
  attributes: ConfiguratorAttribute[];
  sku_template: string; // ej. "FES-DSBC-{d}-{c}" — placeholders resueltos con option.value
  part_template: string; // ej. "DSBC-{d}-{c}-PPVA-N3"
  description_template?: string; // opcional — si existe, se resuelve con option.label y reemplaza la descripción estática
  defaults?: Record<string, string>; // key -> option.value preseleccionado
};

type Props = {
  product: Pick<ProductWithRelations, "id" | "slug" | "sku" | "name" | "thumbnail_url" | "brand">;
  config: ConfiguratorConfig;
};

function fill(
  template: string,
  attributes: ConfiguratorAttribute[],
  values: Record<string, string>,
  useLabel: boolean,
) {
  let out = template;
  for (const attr of attributes) {
    const opt = attr.options.find((o) => o.value === values[attr.key]);
    const token = useLabel ? (opt?.label ?? "") : (opt?.value ?? "");
    out = out.split(`{${attr.key}}`).join(token);
  }
  return out;
}

export function VariantConfigurator({ product, config }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const attr of config.attributes) {
      initial[attr.key] = config.defaults?.[attr.key] ?? attr.options[0]?.value ?? "";
    }
    return initial;
  });

  const sku = useMemo(
    () => fill(config.sku_template, config.attributes, values, false),
    [config, values],
  );
  const partNumber = useMemo(
    () => fill(config.part_template, config.attributes, values, false),
    [config, values],
  );
  const dynamicDescription = useMemo(
    () =>
      config.description_template
        ? fill(config.description_template, config.attributes, values, true)
        : null,
    [config, values],
  );

  const variantLabel = config.attributes
    .map((attr) => attr.options.find((o) => o.value === values[attr.key])?.label)
    .filter(Boolean)
    .join(" · ");
  const variantName = `${product.name} · ${variantLabel}`;

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      {dynamicDescription && (
        <p className="text-sm text-steel-300 leading-relaxed mb-6">{dynamicDescription}</p>
      )}

      <div className="mb-6">
        <span className="font-mono text-[10px] uppercase tracking-techno text-steel-400">
          Código del fabricante · <span className="text-steel-200">{partNumber}</span>
        </span>
      </div>

      {/* Configurador — un <select> por atributo declarado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {config.attributes.map((attr) => (
          <div key={attr.key}>
            <label
              htmlFor={`cfg-${attr.key}`}
              className="block text-xs uppercase tracking-techno text-steel-400 mb-1.5"
            >
              {attr.label}
            </label>
            <select
              id={`cfg-${attr.key}`}
              value={values[attr.key]}
              onChange={(e) => setValue(attr.key, e.target.value)}
              className="w-full bg-carbon-800 border border-black/10 px-3 py-2.5 text-sm text-surface
                         focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none rounded-xs transition-colors"
            >
              {attr.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
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
