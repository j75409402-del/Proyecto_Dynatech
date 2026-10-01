"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { NAV, SITE } from "@/lib/constants";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const SOLUCIONES_HREFS = [...SOLUCIONES.map((s) => `/${s.slug}`), ...NAV.cilindros.map((c) => c.href)];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desplegable: se cierra con Escape o al hacer clic fuera.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menuOpen]);

  const solucionesActive = SOLUCIONES_HREFS.some((h) => h !== "/cilindros-neumaticos" && h !== "/servicios" && isActive(pathname, h));

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
              <div className="font-display font-semibold text-signal leading-none">{SITE.shortName}</div>
              <div className="font-mono text-[9px] uppercase tracking-techno text-steel-400 mt-0.5">
                Ingeniería · SRL
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Principal">
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                type="button"
                // Solo abre: con mouse el hover ya lo abrió y un toggle lo cerraría al hacer clic.
                // Se cierra con Escape, clic fuera o al salir con el mouse.
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="menu-soluciones"
                className={cn(
                  "flex items-center gap-1 py-1 text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap",
                  solucionesActive || menuOpen ? "text-signal" : "text-steel-200 hover:text-signal",
                )}
              >
                Productos
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menuOpen && "rotate-180")} />
              </button>

              {/* Panel (pt-4 deja un "puente" para que el hover no se corte al bajar el mouse) */}
              <div
                id="menu-soluciones"
                hidden={!menuOpen}
                className="absolute left-0 top-full pt-4 w-[min(640px,calc(100vw-2rem))]"
              >
                <div className="grid grid-cols-5 border border-black/10 bg-carbon shadow-[0_24px_60px_-24px_rgba(0,0,0,0.3)]">
                  <div className="col-span-3 p-5">
                    <div className="eyebrow mb-3">Líneas de productos</div>
                    <ul className="space-y-1">
                      {SOLUCIONES.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/${s.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "group flex items-start gap-3 p-2 -mx-2 hover:bg-carbon-800 transition-colors",
                              isActive(pathname, `/${s.slug}`) && "bg-carbon-800",
                            )}
                          >
                            <s.icon className="h-4 w-4 text-signal mt-0.5 shrink-0" />
                            <span>
                              <span className="block text-sm font-medium text-surface group-hover:text-signal">{s.name}</span>
                              <span className="block text-xs text-steel-400 leading-snug">{s.short}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-2 border-l border-black/10 bg-carbon-800 p-5 flex flex-col">
                    <div className="eyebrow mb-3">Línea destacada</div>
                    <ul className="space-y-1 mb-4">
                      {NAV.cilindros.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-1.5 text-sm text-steel-200 hover:text-signal transition-colors"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={NAV.cta.href}
                      onClick={() => setMenuOpen(false)}
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                    >
                      {NAV.cta.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {NAV.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "py-1 text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap",
                  isActive(pathname, item.href) ? "text-signal" : "text-steel-200 hover:text-signal",
                )}
              >
                <span className="xl:hidden">{item.short}</span>
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={whatsappGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-xs border border-black/10 text-steel-200
                         hover:text-signal hover:border-signal/40 transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <Link
              href={NAV.cta.href}
              className="inline-flex items-center justify-center gap-2 bg-signal hover:bg-signal-hover
                         text-white font-medium py-2.5 px-4 xl:px-5 rounded-xs text-xs uppercase tracking-wider
                         transition-colors whitespace-nowrap"
            >
              {NAV.cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Menú mobile / tablet */}
          <button
            className="lg:hidden text-surface p-2 -mr-2"
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
          "lg:hidden overflow-hidden bg-carbon transition-[max-height,opacity] duration-300 ease-out border-b border-black/10",
          open ? "max-h-[48rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-max py-5 flex flex-col max-h-[calc(100vh-4rem)] overflow-y-auto" aria-label="Menú móvil">
          <div className="eyebrow mb-1">Productos</div>
          {SOLUCIONES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 py-2.5 border-b border-black/5 text-sm font-medium",
                isActive(pathname, `/${s.slug}`) ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              <s.icon className="h-4 w-4 text-signal" />
              {s.name}
            </Link>
          ))}
          <div className="eyebrow mt-5 mb-1">Cilindros y empresa</div>
          {[
            NAV.main[0],
            NAV.main[1],
            { label: "Sellos y componentes", short: "Sellos", href: "/sellos-y-componentes" },
            ...NAV.main.slice(2),
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "py-2.5 border-b border-black/5 text-sm font-medium",
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
                       text-white font-medium py-3 rounded-xs text-sm uppercase tracking-wider transition-colors mt-5"
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
                       text-surface font-medium py-3 rounded-xs text-sm uppercase tracking-wider transition-colors mt-2"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
