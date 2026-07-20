"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const VALID_STATUSES = ["en_stock", "bajo_pedido", "consultar", "agotado"] as const;
type StockStatus = (typeof VALID_STATUSES)[number];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");
  return user;
}

export async function updateStockStatus(productId: string, status: string) {
  await requireAdmin();

  if (!VALID_STATUSES.includes(status as StockStatus)) {
    throw new Error("Estado de stock inválido");
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("products")
    .update({ stock_status: status })
    .eq("id", productId);

  if (error) throw new Error("No se pudo actualizar el stock");

  revalidatePath("/admin");
  revalidatePath("/productos");
}

export async function updateStockQuantity(productId: string, quantity: number | null) {
  await requireAdmin();

  if (quantity !== null && (!Number.isInteger(quantity) || quantity < 0)) {
    throw new Error("Cantidad de stock inválida");
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("products")
    .update({ stock_quantity: quantity })
    .eq("id", productId);

  if (error) throw new Error("No se pudo actualizar la cantidad de stock");

  revalidatePath("/admin");
  revalidatePath("/productos");
}

export async function toggleFeatured(productId: string, featured: boolean) {
  await requireAdmin();

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("products")
    .update({ featured })
    .eq("id", productId);

  if (error) throw new Error("No se pudo actualizar el producto destacado");

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/productos");
}

const SETTINGS_KEYS = [
  "catalog_pdf_url",
  "stat_productos",
  "stat_marcas",
  "stat_clientes",
  "stat_respuesta",
] as const;

export async function updateSiteSettings(values: Record<string, string>) {
  await requireAdmin();

  const rows = SETTINGS_KEYS.filter((key) => key in values).map((key) => ({
    key,
    value: values[key],
    updated_at: new Date().toISOString(),
  }));

  const supabase = createServiceClient();
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });

  if (error) throw new Error("No se pudo guardar la configuración");

  revalidatePath("/admin/configuracion");
  revalidatePath("/");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
