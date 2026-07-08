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

export function stockStatusLabel(status: string | null): string {
  if (!status) return "Consultar disponibilidad";
  const map: Record<string, string> = {
    en_stock: "En stock",
    bajo_pedido: "Bajo pedido",
    consultar: "Consultar disponibilidad",
    agotado: "Agotado",
  };
  return map[status] ?? status;
}

export function stockStatusColor(status: string | null): string {
  if (!status) return "bg-steel-400";
  const map: Record<string, string> = {
    en_stock: "bg-emerald-500",
    bajo_pedido: "bg-warning",
    consultar: "bg-steel-400",
    agotado: "bg-signal",
  };
  return map[status] ?? "bg-steel-400";
}
