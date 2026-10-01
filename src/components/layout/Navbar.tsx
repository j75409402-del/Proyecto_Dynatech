"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/lib/constants";
import { whatsappGeneral } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
      <div
        className={cn(
          "border-b border-black/10 bg-carbon transition-shadow duration-300",
          scrolled && "shadow-[0_8px_30px_-16px_rgba(0,0,0,0.15)]",
        )}
      >
        <div
          className={cn(
            "container-max flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-14" : "h-16",
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
            <div>
              <div className="font-display font-semibold text-signal leading-none">
                {SITE.shortName}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
                Ingeniería · SRL
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden xl:flex items-center gap-7">
            {NAV.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap",
                  isActive(pathname, item.href) ? "text-signal" : "text-steel-200 hover:text-signal",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <a
              href={whatsappGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 text-steel-200
                         hover:text-signal hover:border-signal/40 transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <Link
              href={NAV.cta.href}
              className="inline-flex items-center justify-center gap-2 bg-signal hover:bg-signal-hover
                         text-white font-medium py-2.5 px-5 rounded-full text-xs uppercase tracking-wider
                         transition-colors whitespace-nowrap"
            >
              {NAV.cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Menú mobile / tablet */}
          <button
            className="xl:hidden text-surface p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      <div
        className={cn(
          "xl:hidden overflow-hidden bg-carbon transition-[max-height,opacity] duration-300 ease-out border-b border-black/10",
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-max py-6 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {NAV.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "py-3 border-b border-black/5 text-sm font-medium uppercase tracking-wider",
                isActive(pathname, item.href) ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={NAV.cta.href}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-signal hover:bg-signal-hover
                       text-white font-medium py-3 rounded-full text-sm uppercase tracking-wider
                       transition-colors mt-4"
          >
            {NAV.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 border border-black/15 hover:border-signal/40
                       text-surface font-medium py-3 rounded-full text-sm uppercase tracking-wider
                       transition-colors mt-2"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
