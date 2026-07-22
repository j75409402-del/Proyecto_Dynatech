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
 * De cara al público mostramos 3 estados: En stock (verde), Importación (ámbar —
 * "bajo_pedido"/"consultar", se consigue pero hay que traerlo) y Agotado (rojo).
 */
export function stockDisplay(
  status: string | null,
  quantity?: number | null,
): { available: boolean; label: string; sublabel: string; dotClass: string } {
  if (status === "agotado") {
    return { available: false, label: "Agotado", sublabel: "Stock: 0 unidades", dotClass: "bg-signal" };
  }
  if (status === "en_stock") {
    return {
      available: true,
      label: "En stock",
      sublabel: typeof quantity === "number" ? `Stock: ${quantity} unidad${quantity === 1 ? "" : "es"}` : "",
      dotClass: "bg-emerald-500",
    };
  }
  return { available: true, label: "Importación", sublabel: "Disponible bajo pedido", dotClass: "bg-amber-500" };
}
