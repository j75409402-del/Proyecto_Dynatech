"use client";

import { useState, useTransition } from "react";
import { Check, Save } from "lucide-react";
import { updateSiteSettings } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/siteSettings";

const STAT_FIELDS = [
  ["stat_productos", "Productos"],
  ["stat_marcas", "Marcas"],
  ["stat_clientes", "Clientes"],
  ["stat_respuesta", "Tiempo de respuesta"],
] as const;

export function AdminSettingsForm({ settings }: { settings: SiteSettings }) {
  const [values, setValues] = useState(settings);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateSiteSettings({
        catalog_pdf_url: values.catalog_pdf_url ?? "",
        stat_productos: values.stat_productos,
        stat_marcas: values.stat_marcas,
        stat_clientes: values.stat_clientes,
        stat_respuesta: values.stat_respuesta,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-8">
      <fieldset className="space-y-3">
        <legend className="eyebrow mb-3 pb-2 border-b border-black/10 w-full">
          Catálogo descargable
        </legend>
        <div>
          <label htmlFor="catalog_pdf_url" className="block text-xs uppercase tracking-techno text-steel-400 mb-1.5">
            URL del PDF del catálogo
          </label>
          <input
            id="catalog_pdf_url"
            type="url"
            value={values.catalog_pdf_url ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, catalog_pdf_url: e.target.value }))}
            placeholder="https://..."
            className="w-full bg-carbon-800 border border-black/10 px-3 py-2.5 text-sm text-surface
                       placeholder:text-steel-500 focus:border-signal focus:ring-1 focus:ring-signal
                       focus:outline-none rounded-xs transition-colors"
          />
          <p className="mt-1.5 text-xs text-steel-400">
            Mientras esté vacío, el botón &quot;Descargar catálogo&quot; no se muestra en el sitio.
          </p>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="eyebrow mb-3 pb-2 border-b border-black/10 w-full">
          Sección &quot;Estadísticas&quot; del home
        </legend>
        <div className="grid grid-cols-2 gap-4">
          {STAT_FIELDS.map(([key, label]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-xs uppercase tracking-techno text-steel-400 mb-1.5">
                {label}
              </label>
              <input
                id={key}
                type="text"
                value={values[key]}
                onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                className="w-full bg-carbon-800 border border-black/10 px-3 py-2.5 text-sm text-surface
                           focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none rounded-xs transition-colors"
              />
            </div>
          ))}
        </div>
      </fieldset>

      <button type="submit" disabled={isPending} className="btn-primary">
        {saved ? (
          <>
            <Check className="h-4 w-4" />
            Guardado
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            {isPending ? "Guardando..." : "Guardar cambios"}
          </>
        )}
      </button>
    </form>
  );
}
