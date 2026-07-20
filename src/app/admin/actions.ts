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

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
