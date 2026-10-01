"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/adminAuth";
import { QUOTE_STATUSES } from "@/lib/leads";

async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("No autorizado");
  return user;
}

export async function updateQuoteStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(QUOTE_STATUSES as readonly string[]).includes(status)) {
    throw new Error("Datos inválidos");
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("quotes")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error("No se pudo actualizar la cotización");

  revalidatePath("/admin");
}

export async function toggleMessageHandled(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const handled = formData.get("handled") === "true";
  if (!id) throw new Error("Datos inválidos");

  const supabase = createServiceClient();
  const { error } = await supabase.from("contact_messages").update({ handled }).eq("id", id);
  if (error) throw new Error("No se pudo actualizar el mensaje");

  revalidatePath("/admin");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
