"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Result = {
  slug: string;
  sku: string;
  name: string;
  thumbnail_url: string | null;
  category: { name: string } | null;
  brand: { name: string } | null;
};

type Props = {
  className?: string;
  inputClassName?: string;
  onNavigate?: () => void;
};

export function SearchAutocomplete({ className, inputClassName, onNavigate }: Props) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (value.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value.trim())}`);
        const json = await res.json();
        setResults(json.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  function goToResults() {
    setOpen(false);
    onNavigate?.();
    router.push(value.trim() ? `/productos?q=${encodeURIComponent(value.trim())}` : "/productos");
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToResults();
        }}
      >
        <label className="relative flex w-full items-center">
          {loading ? (
            <Loader2 className="pointer-events-none absolute left-3 h-4 w-4 animate-spin text-steel-500" />
          ) : (
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-steel-500" />
          )}
          <input
            type="search"
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Buscar productos, SKU..."
            autoComplete="off"
            className={cn(
              "w-full bg-carbon-700 hover:bg-carbon-600 focus:bg-carbon-600 border border-transparent",
              "focus:border-signal/40 rounded-full py-2 pl-9 pr-3 text-sm text-surface",
              "placeholder:text-steel-500 outline-none transition-colors",
              inputClassName,
            )}
          />
        </label>
      </form>

      {open && value.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-sm border border-black/10 bg-carbon shadow-xl shadow-black/10">
          {results.length > 0 ? (
            <>
              <ul>
                {results.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/productos/${r.slug}`}
                      onClick={() => {
                        setOpen(false);
                        onNavigate?.();
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-carbon-700 transition-colors"
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xs bg-carbon-700 border border-black/5">
                        {r.thumbnail_url && (
                          <Image src={r.thumbnail_url} alt="" fill className="object-cover" sizes="40px" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-surface">{r.name}</span>
                        <span className="block truncate font-mono text-[10px] uppercase tracking-techno text-steel-400">
                          SKU {r.sku} {r.brand && `· ${r.brand.name}`}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goToResults}
                className="block w-full border-t border-black/10 px-3 py-2.5 text-center text-xs font-medium
                           uppercase tracking-wider text-signal hover:bg-carbon-700 transition-colors"
              >
                Ver todos los resultados
              </button>
            </>
          ) : !loading ? (
            <div className="px-3 py-4 text-center text-sm text-steel-400">Sin resultados para "{value}"</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
