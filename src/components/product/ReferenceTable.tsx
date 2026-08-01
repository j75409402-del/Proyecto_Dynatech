"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReferenceTableColumn = { key: string; label: string };
export type ReferenceTableRow = Record<string, string> & { stock: number | null };

function stockCell(stock: number | null) {
  if (stock === null) {
    return { dot: "bg-amber-500", text: "Consultar disponibilidad" };
  }
  if (stock === 0) {
    return { dot: "bg-signal", text: "Agotado" };
  }
  return { dot: "bg-emerald-500", text: `${stock} unidad${stock === 1 ? "" : "es"}` };
}

export function ReferenceTable({
  columns,
  rows,
  searchKeys,
  searchPlaceholder,
  filterKey,
}: {
  columns: ReferenceTableColumn[];
  rows: ReferenceTableRow[];
  searchKeys: string[];
  searchPlaceholder: string;
  /** Si se define, agrega chips de filtro de valor único sobre esta columna (ej. "voltaje"). */
  filterKey?: string;
}) {
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("todos");

  const filterOptions = useMemo(() => {
    if (!filterKey) return [];
    return Array.from(new Set(rows.map((r) => r[filterKey]))).sort();
  }, [rows, filterKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchesQuery = !q || searchKeys.some((key) => r[key]?.toLowerCase().includes(q));
      const matchesFilter = !filterKey || filterValue === "todos" || r[filterKey] === filterValue;
      return matchesQuery && matchesFilter;
    });
  }, [rows, query, searchKeys, filterKey, filterValue]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className="relative flex items-center flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-steel-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xs border border-black/10 bg-carbon-800 py-2.5 pl-10 pr-3 text-sm
                       text-surface placeholder:text-steel-500 outline-none focus:border-signal/40"
          />
        </label>

        {filterKey && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <FilterChip active={filterValue === "todos"} onClick={() => setFilterValue("todos")}>
              Todos
            </FilterChip>
            {filterOptions.map((v) => (
              <FilterChip key={v} active={filterValue === v} onClick={() => setFilterValue(v)}>
                {v}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto border border-black/10 bg-carbon-800">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-carbon-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-techno text-steel-400"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-techno text-steel-400">
                Stock actual
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const stock = stockCell(r.stock);
              return (
                <tr
                  key={columns.map((c) => r[c.key]).join("|")}
                  className={cn(
                    "border-b border-black/5 last:border-b-0 hover:bg-carbon-700/60 transition-colors",
                    i % 2 === 1 && "bg-black/5",
                  )}
                >
                  {columns.map((col, ci) => (
                    <td
                      key={col.key}
                      className={cn("px-4 py-3", ci === 0 ? "text-surface font-medium" : "text-steel-300")}
                    >
                      {r[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={cn("h-2 w-2 rounded-full shrink-0", stock.dot)} />
                      <span className="text-surface">{stock.text}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-steel-400">
                  No encontramos referencias con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-steel-300">
        ¿No encuentras la referencia que necesitas?{" "}
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
