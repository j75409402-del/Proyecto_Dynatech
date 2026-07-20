import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AdminProductList } from "@/components/admin/AdminProductList";
import { signOutAdmin } from "./actions";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: products } = await supabase
    .from("products")
    .select("id, sku, name, stock_status, stock_quantity, featured")
    .order("name");

  return (
    <div className="container-max py-12 sm:py-16">
      <div className="flex items-start justify-between gap-6 mb-10 flex-wrap">
        <div>
          <div className="eyebrow mb-3">Panel interno</div>
          <h1 className="font-display text-display-md text-surface mb-2">
            Inventario
          </h1>
          <p className="text-sm text-steel-400">{user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/configuracion" className="btn-ghost text-sm">
            <Settings className="h-4 w-4" />
            Configuración del sitio
          </Link>
          <form action={signOutAdmin}>
            <button type="submit" className="btn-ghost text-sm">
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </form>
        </div>
      </div>

      <AdminProductList products={products ?? []} />
    </div>
  );
}
