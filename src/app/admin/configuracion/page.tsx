import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/siteSettings";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default async function AdminConfigPage() {
  // El proxy (src/proxy.ts) ya redirige /admin/* sin sesión a /admin/login — esto es
  // defensa en profundidad por si la página se renderiza fuera de ese camino.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const settings = await getSiteSettings();

  return (
    <div className="container-max py-12 sm:py-16">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-steel-400 hover:text-signal transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" />
        Volver al inventario
      </Link>

      <div className="eyebrow mb-3">Panel interno</div>
      <h1 className="font-display text-display-md text-surface mb-10">
        Configuración del sitio
      </h1>

      <AdminSettingsForm settings={settings} />
    </div>
  );
}
