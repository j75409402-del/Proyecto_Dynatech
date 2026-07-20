import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSiteSettings } from "@/lib/siteSettings";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default async function AdminConfigPage() {
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
