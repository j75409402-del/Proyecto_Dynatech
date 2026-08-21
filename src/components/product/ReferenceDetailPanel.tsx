"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappQuoteRequest } from "@/lib/whatsapp";
import type { ReferenceTableRow } from "./ReferenceTable";

const HIDDEN_KEYS = new Set(["stock"]);
const LABELS: Record<string, string> = {
  modelo: "Modelo",
  marca: "Marca",
  descripcion: "Descripción",
  tipo: "Tipo",
  conexion: "Conexión",
  voltaje: "Voltaje",
  configuracion: "Configuración",
  diametro: "Diámetro",
  carrera: "Carrera",
  amperaje: "Amperaje",
  capacidad: "Capacidad",
  potencia: "Potencia",
  medida: "Medida",
};

function labelFor(key: string): string {
  return LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
}

export type RelatedProductLink = { name: string; slug: string };

export function ReferenceDetailPanel({
  row,
  familyName,
  internalCode,
  datasheetUrl,
  relatedProducts,
  onClose,
}: {
  row: ReferenceTableRow;
  familyName: string;
  internalCode?: string | null;
  datasheetUrl?: string | null;
  relatedProducts?: RelatedProductLink[];
  onClose: () => void;
}) {
  const title = row.modelo || row.descripcion || familyName;
  const entries = Object.entries(row).filter(([k, v]) => !HIDDEN_KEYS.has(k) && v);
  const waName = row.modelo ? `${familyName} — ${row.modelo}` : `${familyName} — ${title}`;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={String(title)}
        className="relative my-8 w-full max-w-2xl border border-black/10 bg-carbon shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          <div>
            <div className="eyebrow mb-1">{familyName}</div>
            <h3 className="font-display text-xl text-surface">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 text-steel-400 hover:text-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {(row.marca || row.modelo || internalCode) && (
            <div className="flex flex-wrap gap-3">
              {row.marca && <FactChip label="Marca" value={row.marca} />}
              {row.modelo && <FactChip label="Modelo" value={row.modelo} />}
              {internalCode && <FactChip label="Código Dynatech" value={internalCode} />}
            </div>
          )}

          <div className="border border-black/10">
            <div className="border-b border-black/10 bg-carbon-800 px-4 py-2.5">
              <span className="eyebrow">Especificaciones</span>
            </div>
            <dl className="divide-y divide-black/5">
              {entries.map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 gap-4 px-4 py-2.5">
                  <dt className="font-mono text-xs uppercase tracking-techno text-steel-400">{labelFor(k)}</dt>
                  <dd className="text-sm text-surface">{String(v)}</dd>
                </div>
              ))}
            </dl>
          </div>

          {datasheetUrl && (
            <div>
              <div className="eyebrow mb-2">Descargas</div>
              <a href={datasheetUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Descargar datasheet
              </a>
            </div>
          )}

          <a
            href={whatsappQuoteRequest([{ name: waName, quantity: 1 }])}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center bg-[#25D366] hover:bg-[#1ebe57] border-[#25D366] hover:border-[#1ebe57]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Cotizar por WhatsApp
          </a>

          {relatedProducts && relatedProducts.length > 0 && (
            <div>
              <div className="eyebrow mb-3">Productos relacionados</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {relatedProducts.slice(0, 6).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/productos/${p.slug}`}
                    className="border border-black/10 p-2 text-center hover:border-signal"
                  >
                    <div className="line-clamp-2 text-xs text-steel-300">{p.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FactChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-black/10 px-3 py-1.5">
      <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400">{label}</div>
      <div className="text-sm text-surface">{value}</div>
    </div>
  );
}
