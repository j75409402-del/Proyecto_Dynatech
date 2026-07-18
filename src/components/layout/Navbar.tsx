"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, CONTACT, SITE } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SearchAutocomplete } from "@/components/layout/SearchAutocomplete";
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
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Franja utilitaria — WhatsApp */}
      <div
        className={cn(
          "overflow-hidden bg-signal transition-[max-height,opacity] duration-300",
          scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100",
        )}
      >
        <div className="container-max flex h-7 items-center justify-end">
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/90 hover:text-white transition-colors"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="font-mono">{CONTACT.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      {/* Nav principal */}
      <div
        className={cn(
          "border-b border-black/10 bg-carbon transition-shadow duration-300",
          scrolled && "shadow-[0_8px_30px_-16px_rgba(0,0,0,0.15)]",
        )}
      >
        <div
          className={cn(
            "container-max flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-12" : "h-14",
          )}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group [perspective:400px] shrink-0">
            <Image
              src="/logo-mark.png"
              alt=""
              width={32}
              height={32}
              priority
              className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:[transform:rotateY(18deg)]"
            />
            <div className="hidden sm:block">
              <div className="font-display font-semibold text-signal leading-none">
                {SITE.shortName}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
                Ingeniería · SRL
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-7 shrink-0">
            {NAV.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-steel-200 hover:text-signal transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Buscador */}
          <SearchAutocomplete className="hidden md:flex flex-1 max-w-xs" />

          {/* CTA */}
          <Link
            href="/cotizacion"
            className="hidden lg:inline-flex items-center justify-center gap-2 bg-signal hover:bg-signal-hover
                       text-white font-medium py-2.5 px-5 rounded-full text-xs uppercase tracking-wider
                       transition-colors shrink-0"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Solicitar cotización
          </Link>

          {/* Menú mobile */}
          <button
            className="lg:hidden text-surface p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden bg-carbon transition-[max-height,opacity] duration-300 ease-out border-b border-black/10",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-max py-6 flex flex-col gap-1">
          <SearchAutocomplete className="mb-3" onNavigate={() => setOpen(false)} />

          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-black/5 text-steel-200 hover:text-signal font-medium"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 text-steel-200 hover:text-signal font-mono text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {CONTACT.whatsappDisplay}
          </a>
          <Link
            href="/cotizacion"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-signal hover:bg-signal-hover
                       text-white font-medium py-3 rounded-full text-sm uppercase tracking-wider
                       transition-colors mt-2"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Solicitar cotización
          </Link>
        </nav>
      </div>
    </header>
  );
}
