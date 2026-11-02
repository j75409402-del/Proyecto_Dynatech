"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { buildSearchIndex, filterSearch } from "@/lib/search-index";

export function SiteSearch({ onNavigate }: { onNavigate?: () => void }) {
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const index = useMemo(() => buildSearchIndex(), []);
  const results = filterSearch(query, index);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={box} className="site-search">
      <Search className="site-search-icon" aria-hidden="true" />
      <input
        type="search"
        value={query}
        placeholder="Buscar línea o familia"
        aria-label="Buscar línea o familia"
        aria-controls={listId}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      {open && query.trim().length >= 2 && (
        <ul id={listId} aria-label="Resultados" className="site-search-results">
          {results.length === 0 ? (
            <li className="site-search-empty">Sin resultados</li>
          ) : (
            results.map((r) => (
              <li key={`${r.href}-${r.title}`}>
                <Link
                  href={r.href}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    onNavigate?.();
                  }}
                >
                  <span>{r.title}</span>
                  <small>{r.group}{r.hint ? ` · ${r.hint}` : ""}</small>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
