"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú mobile al navegar.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-carbon/95 backdrop-blur">
      <div className="container-max flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo-mark.png" alt="" width={32} height={32} priority className="h-8 w-8" />
          <div>
            <div className="font-display font-semibold text-signal leading-none">{SITE.shortName}</div>
            <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
              Ingeniería · SRL
            </div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-7">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-signal",
                pathname === item.href ? "text-signal" : "text-steel-200",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={NAV.quote.href} className="hidden xl:inline-flex btn-primary py-2.5 text-xs shrink-0">
          {NAV.quote.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <button
          className="xl:hidden text-surface p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-black/10 bg-carbon">
          <div className="container-max py-4 flex flex-col">
            {NAV.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-3 border-b border-black/5 font-medium",
                  pathname === item.href ? "text-signal" : "text-steel-200",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href={NAV.quote.href} className="btn-primary mt-4">
              {NAV.quote.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
