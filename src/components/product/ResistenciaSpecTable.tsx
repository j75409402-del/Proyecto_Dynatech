"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResistenciaRow = {
  medida: string;
  potencia: string;
  voltaje: string;
  stock: number;
};

export function ResistenciaSpecTable({ rows }: { rows: ResistenciaRow[] }) {
  const [query, setQuery] = useState("");
  const [voltajeFilter, setVoltajeFilter] = useState<string>("todos");

  const voltajes = useMemo(
    () => Array.from(new Set(rows.map((r) => r.voltaje))).sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQuery = !q || r.medida.toLowerCase().includes(q);
      const matchesVoltaje = voltajeFilter === "todos" || r.voltaje === voltajeFilter;
      return matchesQuery && matchesVoltaje;
    });
  }, [rows, query, voltajeFilter]);

  return (
    <div>
      {/* Buscador + filtros */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="relative flex items-center flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-steel-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por medida (ej. 1-1/2 x 3/4)..."
            className="w-full rounded-xs border border-black/10 bg-carbon-800 py-2.5 pl-10 pr-3 text-sm
                       text-surface placeholder:text-steel-500 outline-none focus:border-signal/40"
          />
        </label>

        <div className="flex items-center gap-1.5">
          <FilterChip active={voltajeFilter === "todos"} onClick={() => setVoltajeFilter("todos")}>
            Todos
          </FilterChip>
          {voltajes.map((v) => (
            <FilterChip key={v} active={voltajeFilter === v} onClick={() => setVoltajeFilter(v)}>
              {v}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border border-black/10 bg-carbon-800">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-carbon-700">
              <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-techno text-steel-400">
                Medida
              </th>
              <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-techno text-steel-400">
                Potencia
              </th>
              <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-techno text-steel-400">
                Voltaje
              </th>
              <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-techno text-steel-400">
                Stock actual
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={`${r.medida}-${r.potencia}-${r.voltaje}`}
                className={cn(
                  "border-b border-black/5 last:border-b-0 hover:bg-carbon-700/60 transition-colors",
                  i % 2 === 1 && "bg-black/5",
                )}
              >
                <td className="px-4 py-3 text-surface font-medium">{r.medida}</td>
                <td className="px-4 py-3 text-steel-300">{r.potencia}</td>
                <td className="px-4 py-3 text-steel-300">{r.voltaje}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full shrink-0",
                        r.stock > 0 ? "bg-emerald-500" : "bg-signal",
                      )}
                    />
                    <span className="text-surface">{r.stock > 0 ? `${r.stock} unidades` : "Agotado"}</span>
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-steel-400">
                  No encontramos referencias con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-steel-300">
        ¿No encuentras la medida que necesitas?{" "}
        <Link href="/cotizacion" className="text-signal hover:underline">
          Solicita tu cotización
        </Link>{" "}
        y te confirmamos disponibilidad.
      </p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xs border px-3 py-2 text-xs font-mono uppercase tracking-techno transition-colors shrink-0",
        active
          ? "border-signal/40 bg-signal-soft text-signal"
          : "border-black/10 bg-carbon-800 text-steel-300 hover:text-surface",
      )}
    >
      {children}
    </button>
  );
}
