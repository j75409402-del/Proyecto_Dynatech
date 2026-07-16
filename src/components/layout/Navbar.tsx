"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, MessageSquare } from "lucide-react";
import { NAV, CONTACT, SITE } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";
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
        "sticky top-0 z-40 border-b border-black/10 bg-signal transition-all duration-300",
        scrolled && "shadow-[0_8px_30px_-16px_rgba(0,0,0,0.6)]",
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
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <Image
              src="/logo-mark.png"
              alt=""
              width={28}
              height={28}
              priority
              className="h-7 w-7 transition-transform duration-300 group-hover:scale-105 group-hover:[transform:rotateY(18deg)]"
            />
          </span>
          <div className="hidden sm:block">
            <div className="font-display font-semibold text-white leading-none">
              {SITE.shortName}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-techno text-white/70 mt-0.5">
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
              className="text-sm text-white/85 hover:text-white transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="font-mono">{CONTACT.whatsappDisplay}</span>
          </a>
          <Link
            href="/cotizacion"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-signal font-medium py-2 px-4 rounded-xs text-xs uppercase tracking-wider transition-colors"
          >
            Solicitar cotización
          </Link>
        </div>

        {/* Menú mobile */}
        <button
          className="lg:hidden text-white p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Panel mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-white/15",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-max py-6 flex flex-col gap-1">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b border-white/15 text-white/85 hover:text-white font-medium"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 text-white/85 hover:text-white font-mono text-sm"
          >
            <MessageSquare className="h-4 w-4" />
            {CONTACT.whatsappDisplay}
          </a>
          <Link
            href="/cotizacion"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-signal font-medium py-3 rounded-xs text-sm uppercase tracking-wider transition-colors mt-2"
          >
            Solicitar cotización
          </Link>
        </nav>
      </div>
    </header>
  );
}
