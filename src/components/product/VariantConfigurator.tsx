"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { useCart } from "@/components/cart/CartContext";
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

/**
 * Shape pública (client-safe) del configurador — NO incluye sku_template ni
 * part_template a propósito: esos viven solo en el objeto que arma el server
 * component (page.tsx) y nunca deben pasar como prop a este componente, pa'
 * que el código del fabricante no quede embebido en el HTML/RSC payload.
 */
export type ConfiguratorConfig = {
  attributes: ConfiguratorAttribute[];
  description_template?: string; // opcional — resuelto con option.label, reemplaza la descripción estática
  defaults?: Record<string, string>; // key -> option.value preseleccionado
};

type Props = {
  product: Pick<ProductWithRelations, "id" | "slug" | "name" | "thumbnail_url" | "brand">;
  config: ConfiguratorConfig;
};

function fillText(template: string, attributes: ConfiguratorAttribute[], values: Record<string, string>) {
  let out = template;
  for (const attr of attributes) {
    const opt = attr.options.find((o) => o.value === values[attr.key]);
    out = out.split(`{${attr.key}}`).join(opt?.label ?? "");
  }
  return out;
}

export function VariantConfigurator({ product, config }: Props) {
  const router = useRouter();
  const { addItem } = useCart();

  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const attr of config.attributes) {
      initial[attr.key] = config.defaults?.[attr.key] ?? attr.options[0]?.value ?? "";
    }
    return initial;
  });

  // Clave interna solo para deduplicar en el carrito — no es un código de
  // fabricante, no se muestra en ningún lado, y no depende de ninguna
  // plantilla enviada al navegador (se arma con datos que ya están en el DOM).
  const variantKey = useMemo(
    () => `${product.id}:${config.attributes.map((a) => `${a.key}=${values[a.key]}`).join("&")}`,
    [product.id, config.attributes, values],
  );

  const dynamicDescription = useMemo(
    () => (config.description_template ? fillText(config.description_template, config.attributes, values) : null),
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

  function handleQuoteClick() {
    addItem({
      productId: product.id,
      slug: product.slug,
      sku: variantKey,
      name: variantName,
      brand: product.brand?.name ?? null,
      thumbnailUrl: product.thumbnail_url,
    });
    router.push("/cotizacion");
  }

  return (
    <div>
      {dynamicDescription && (
        <p className="text-sm text-steel-300 leading-relaxed mb-6">{dynamicDescription}</p>
      )}

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
          overrideSku={variantKey}
          overrideName={variantName}
          variant="primary"
          className="flex-1"
        />
        <button type="button" onClick={handleQuoteClick} className="btn-secondary flex-1">
          <FileText className="h-4 w-4" />
          Cotización multi-ítem
        </button>
      </div>
    </div>
  );
}
