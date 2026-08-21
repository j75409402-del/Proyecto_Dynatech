"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappQuoteRequest } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { ReferenceTableRow } from "./ReferenceTable";

// "voltajes_disponibles" (ej. "220 VAC, 110 VAC, 24 VAC, 12 VDC, 24 VDC") marca una
// referencia que no tiene un único voltaje fijo por Part Number — la fila muestra
// "Seleccionar voltaje" y esta ficha ofrece un selector real en vez del texto estático.
const HIDDEN_KEYS = new Set(["stock", "voltajes_disponibles"]);
const LABELS: Record<string, string> = {
  modelo: "Modelo",
  marca: "Marca",
  descripcion: "Descripción",
  tipo: "Tipo",
  tipo_mac: "Tipo técnico (MAC)",
  serie: "Serie",
  conexion: "Conexión",
  rosca: "Rosca",
  voltaje: "Voltaje",
  frecuencia: "Frecuencia",
  potencia: "Potencia",
  configuracion: "Configuración",
  centro: "Centro",
  accionamiento: "Accionamiento",
  pilotaje: "Pilotaje",
  retorno: "Retorno",
  operador_manual: "Operador manual",
  conexion_electrica: "Conexión eléctrica",
  montaje: "Montaje",
  presion: "Presión de trabajo",
  caudal: "Caudal / Cv",
  puerto_piloto: "Puerto piloto",
  diametro: "Diámetro",
  carrera: "Carrera",
  amperaje: "Amperaje",
  capacidad: "Capacidad",
  medida: "Medida",
  estado: "Estado del dato",
  control: "Control",
  presion_maxima: "Presión máxima",
  temperatura: "Temperatura de trabajo",
  bobina: "Bobina",
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
  const voltageOptions = row.voltajes_disponibles
    ? row.voltajes_disponibles.split(",").map((v) => v.trim()).filter(Boolean)
    : [];
  const [selectedVoltage, setSelectedVoltage] = useState<string | null>(null);
  // Con selector de voltaje, el texto fijo "Seleccionar voltaje" del campo voltaje no debe
  // repetirse como spec estática — el selector interactivo lo reemplaza.
  const entries = Object.entries(row).filter(
    ([k, v]) => !HIDDEN_KEYS.has(k) && v && !(k === "voltaje" && voltageOptions.length > 0),
  );
  const waName = row.modelo ? `${familyName} — ${row.modelo}` : `${familyName} — ${title}`;
  const waNameWithVoltage = selectedVoltage ? `${waName} (${selectedVoltage})` : waName;

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

          {voltageOptions.length > 0 && (
            <div>
              <div className="eyebrow mb-2">Voltaje — seleccionar variante</div>
              <div className="flex flex-wrap gap-1.5">
                {voltageOptions.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVoltage(v)}
                    className={cn(
                      "rounded-xs border px-3 py-2 text-xs font-mono uppercase tracking-techno transition-colors",
                      selectedVoltage === v
                        ? "border-signal/40 bg-signal-soft text-signal"
                        : "border-black/10 text-steel-300 hover:text-surface",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
              {!selectedVoltage && (
                <p className="mt-2 text-xs text-steel-400">
                  Esta referencia se pide especificando el voltaje — elegí una opción o indicalo al cotizar.
                </p>
              )}
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

          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href={whatsappQuoteRequest([{ name: waNameWithVoltage, quantity: 1 }])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center bg-[#25D366] hover:bg-[#1ebe57] border-[#25D366] hover:border-[#1ebe57]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
            </a>
            <Link href="/cotizacion" className="btn-secondary flex-1 justify-center">
              Solicitar cotización
            </Link>
          </div>
          <button type="button" onClick={onClose} className="text-sm text-steel-400 hover:text-surface underline">
            Volver al catálogo
          </button>

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
