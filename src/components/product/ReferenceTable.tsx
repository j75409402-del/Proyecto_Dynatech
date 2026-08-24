"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { isOutOfStock } from "@/lib/stock";
import { ReferenceDetailPanel, type RelatedProductLink } from "./ReferenceDetailPanel";

type SortKey = string | "stock";
type SortDir = "asc" | "desc";

export type ReferenceTableColumn = { key: string; label: string };
export type ReferenceTableRow = Record<string, string> & { stock?: number | null };
export type ReferenceTableFilter = { key: string; label: string };

export function ReferenceTable({
  columns,
  rows,
  searchKeys,
  searchPlaceholder,
  filterKey,
  filters,
  showStock = false,
  familyName,
  internalCode,
  datasheetUrl,
  relatedProducts,
}: {
  columns: ReferenceTableColumn[];
  rows: ReferenceTableRow[];
  searchKeys: string[];
  searchPlaceholder: string;
  /** Un solo filtro de valor único sobre esta columna (ej. "voltaje"). Para varios filtros
   * simultáneos (ej. Cilindros: Diámetro + Carrera + Marca), usar `filters` en su lugar. */
  filterKey?: string;
  /** Varios grupos de chips de filtro (uno por campo declarado), combinados con AND. Solo se
   * declara para categorías cuyas filas ya traen esos campos estructurados. */
  filters?: ReferenceTableFilter[];
  /** Excepción explícita para mostrar stock real — default false en todo el catálogo
   * (pedido del cliente: nunca cantidades, nunca "Agotado", solo "Consultar disponibilidad"). */
  showStock?: boolean;
  /** Contexto para la ficha expandible por referencia (opcional) — cuando una fila trae
   * `marca` o `modelo`, gana una acción "Ver ficha" con specs/descargas/relacionados/WhatsApp
   * de esa referencia puntual, sin crear una URL/página nueva por cada una. */
  familyName?: string;
  internalCode?: string | null;
  datasheetUrl?: string | null;
  relatedProducts?: RelatedProductLink[];
}) {
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("todos");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [detailRow, setDetailRow] = useState<ReferenceTableRow | null>(null);

  // Stock 0 confirmado ("agotado") se oculta del todo — sin stock trackeado (null/undefined)
  // sigue visible, significa "consultar disponibilidad", no "confirmado agotado".
  const visibleRows = useMemo(() => rows.filter((r) => !isOutOfStock(r.stock)), [rows]);

  const hasDetailData = useMemo(() => visibleRows.some((r) => r.marca || r.modelo), [visibleRows]);

  const filterOptions = useMemo(() => {
    if (!filterKey) return [];
    return Array.from(new Set(visibleRows.map((r) => r[filterKey]))).sort();
  }, [visibleRows, filterKey]);

  // Una fila puede no tener un único valor fijo para un campo (ej. una electroválvula que
  // se pide especificando el voltaje entre varias opciones): en vez de "voltaje" trae
  // "voltaje_disponibles"/"voltajes_disponibles" con la lista real separada por comas. Esta
  // función junta ambas fuentes en un solo texto para filtrar y para generar los chips.
  const filterableText = (row: ReferenceTableRow, key: string): string => {
    const base = row[key] ?? "";
    const extra = row[`${key}_disponibles`] ?? row[`${key}s_disponibles`] ?? "";
    return `${base} ${extra}`;
  };

  // Coincidencia por inclusión (no igualdad estricta): una fila cuyo campo lista varias
  // opciones separadas por coma también debe aparecer cuando el cliente filtra por
  // cualquiera de esas opciones individuales — no solo cuando el campo es un valor único
  // idéntico al chip.
  const rowMatchesFilterValue = (row: ReferenceTableRow, key: string, value: string) =>
    filterableText(row, key).includes(value);

  // Las opciones de cada grupo de filtro se calculan sobre las filas que ya cumplen los
  // DEMÁS filtros activos (no el propio) — así un chip nunca ofrece una combinación que
  // no existe realmente entre las referencias visibles (ej. elegir Tipo=3/2 oculta los
  // voltajes que solo existen en válvulas 5/3).
  const multiFilterOptions = useMemo(() => {
    if (!filters) return {};
    return Object.fromEntries(
      filters.map((f) => {
        const rowsForThisFilter = visibleRows.filter((r) =>
          filters.every((other) => {
            if (other.key === f.key) return true;
            const v = filterValues[other.key];
            return !v || v === "todos" || rowMatchesFilterValue(r, other.key, v);
          }),
        );
        const options = Array.from(
          new Set(
            rowsForThisFilter.flatMap((r) => {
              const extra = r[`${f.key}_disponibles`] ?? r[`${f.key}s_disponibles`];
              if (extra) return extra.split(",").map((v) => v.trim()).filter(Boolean);
              return r[f.key] ? [r[f.key]] : [];
            }),
          ),
        ).sort();
        return [f.key, options];
      }),
    );
  }, [visibleRows, filters, filterValues]);

  const filtered = useMemo(() => {
    // Palabras sueltas (ej. "5/2 24V 1/4") — cada una debe aparecer en algún campo
    // buscable de la fila, en vez de exigir la frase completa como substring exacto.
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return visibleRows.filter((r) => {
      const matchesQuery =
        words.length === 0 ||
        words.every((w) => searchKeys.some((key) => r[key]?.toLowerCase().includes(w)));
      const matchesFilter = !filterKey || filterValue === "todos" || r[filterKey] === filterValue;
      const matchesMultiFilters =
        !filters ||
        filters.every((f) => !filterValues[f.key] || filterValues[f.key] === "todos" || rowMatchesFilterValue(r, f.key, filterValues[f.key]));
      return matchesQuery && matchesFilter && matchesMultiFilters;
    });
  }, [visibleRows, query, searchKeys, filterKey, filterValue, filters, filterValues]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortKey === "stock") {
        // Sin stock trackeado ("consultar") siempre al final, sin importar la dirección.
        const aStock = a.stock ?? null;
        const bStock = b.stock ?? null;
        if (aStock === null && bStock === null) return 0;
        if (aStock === null) return 1;
        if (bStock === null) return -1;
        return (aStock - bStock) * dir;
      }
      return a[sortKey].localeCompare(b[sortKey], "es") * dir;
    });
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

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

      {filters && filters.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-x-8 gap-y-4">
          {filters.map((f) => {
            const options = multiFilterOptions[f.key] ?? [];
            if (options.length < 2) return null;
            const active = filterValues[f.key] ?? "todos";
            return (
              <div key={f.key}>
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-techno text-steel-500">
                  {f.label}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip
                    active={active === "todos"}
                    onClick={() => setFilterValues((prev) => ({ ...prev, [f.key]: "todos" }))}
                  >
                    Todos
                  </FilterChip>
                  {options.map((v) => (
                    <FilterChip
                      key={v}
                      active={active === v}
                      onClick={() => setFilterValues((prev) => ({ ...prev, [f.key]: v }))}
                    >
                      {v}
                    </FilterChip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="overflow-x-auto border border-black/10 bg-carbon-800">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-carbon-700">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left">
                  <SortButton active={sortKey === col.key} dir={sortDir} onClick={() => toggleSort(col.key)}>
                    {col.label}
                  </SortButton>
                </th>
              ))}
              {showStock && (
                <th className="px-4 py-3 text-left">
                  <span className="font-mono text-[11px] uppercase tracking-techno text-steel-400">
                    Disponibilidad
                  </span>
                </th>
              )}
              {hasDetailData && <th className="px-4 py-3 text-left" />}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
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
                {showStock && (
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full shrink-0 bg-steel-400" />
                      <span className="text-surface">Consultar disponibilidad</span>
                    </span>
                  </td>
                )}
                {hasDetailData && (
                  <td className="px-4 py-3 text-right">
                    {(r.marca || r.modelo) && (
                      <button
                        type="button"
                        onClick={() => setDetailRow(r)}
                        className="font-mono text-[11px] uppercase tracking-techno text-signal hover:underline"
                      >
                        Ver ficha
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (showStock ? 1 : 0) + (hasDetailData ? 1 : 0)}
                  className="px-4 py-10 text-center text-steel-400"
                >
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

      {detailRow && familyName && (
        <ReferenceDetailPanel
          row={detailRow}
          familyName={familyName}
          internalCode={internalCode}
          datasheetUrl={datasheetUrl}
          relatedProducts={relatedProducts}
          onClose={() => setDetailRow(null)}
        />
      )}
    </div>
  );
}

function SortButton({
  active,
  dir,
  onClick,
  children,
}: {
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const Icon = active ? (dir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-techno transition-colors",
        active ? "text-signal" : "text-steel-400 hover:text-surface",
      )}
    >
      {children}
      <Icon className="h-3 w-3 shrink-0" />
    </button>
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
