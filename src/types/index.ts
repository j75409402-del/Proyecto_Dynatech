import type { Database } from "./database.types";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Brand    = Database["public"]["Tables"]["brands"]["Row"];
export type Product  = Database["public"]["Tables"]["products"]["Row"];
export type Quote    = Database["public"]["Tables"]["quotes"]["Row"];

export type ProductWithRelations = Product & {
  category: Category | null;
  brand: Brand | null;
};

export type QuoteItem = {
  product_id: string;
  sku: string;
  name: string;
  quantity: number;
  notes?: string;
};

export type ProductSpecs = Record<string, string | number>;
