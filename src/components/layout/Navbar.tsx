"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, CONTACT, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-carbon/85 backdrop-blur-md transition-all duration-300",
        scrolled ? "border-black/10 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.6)]" : "border-black/5",
      )}
    >
      <div
        className={cn(
          "container-max flex items-center justify-between transition-[height] duration-300",
          scrolled ? "h-14" : "h-16",
        )}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group [perspective:400px]">
          <Image
            src="/logo-mark.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:[transform:rotateY(18deg)]"
          />
          <div className="hidden sm:block">
            <div className="font-display font-semibold text-surface leading-none">
              {SITE.shortName}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
              Ingeniería · SRL
            </div>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-steel-200 hover:text-surface transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-steel-300 hover:text-surface transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="font-mono">{CONTACT.phone}</span>
          </a>
          <Link href="/cotizacion" className="btn-primary py-2 px-4 text-xs">
            Solicitar cotización
          </Link>
        </div>

        {/* Menú mobile */}
        <button
          className="lg:hidden text-surface p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panel mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-black/5",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-max py-6 flex flex-col gap-1">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-black/5 text-steel-200 hover:text-surface font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cotizacion"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4"
          >
            Solicitar cotización
          </Link>
        </nav>
      </div>
    </header>
  );
}
