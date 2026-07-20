import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number | null | undefined,
  currency: string = "DOP",
): string {
  if (value === null || value === undefined) return "A consultar";
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * De cara al público solo mostramos 2 estados (En stock / Agotado) — "bajo_pedido" y
 * "consultar" se muestran como En stock con una aclaración, pa' no perder ventas reales
 * de productos que sí se consiguen aunque no estén físicamente en el almacén hoy.
 */
export function stockDisplay(
  status: string | null,
  quantity?: number | null,
): { available: boolean; label: string; sublabel: string } {
  if (status === "agotado") {
    return { available: false, label: "Agotado", sublabel: "Stock: 0 unidades" };
  }
  if (status === "en_stock" && typeof quantity === "number") {
    return {
      available: true,
      label: "En stock",
      sublabel: `Stock: ${quantity} unidad${quantity === 1 ? "" : "es"}`,
    };
  }
  if (status === "en_stock") {
    return { available: true, label: "En stock", sublabel: "" };
  }
  return { available: true, label: "En stock", sublabel: "Disponible bajo pedido" };
}
