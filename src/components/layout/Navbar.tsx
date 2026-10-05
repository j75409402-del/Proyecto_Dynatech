"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { NAV, SITE, CONTACT } from "@/lib/constants";
import { SOLUCIONES } from "@/lib/soluciones";
import { whatsappGeneral } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const SOLUCIONES_HREFS = [...SOLUCIONES.map((s) => `/${s.slug}`), ...NAV.cilindros.map((c) => c.href), ...NAV.especialidades.map((e) => e.href)];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menú móvil: Escape lo cierra.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        // Accesibilidad: el foco vuelve al botón que abrió el menú.
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

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
    <header className="industrial-navbar sticky top-0 z-40 transition-all duration-300">
      <div className="hidden bg-surface py-2 text-white md:block">
        <div className="container-max flex items-center justify-between gap-6 text-xs">
          <span className="text-white/70">{CONTACT.locality}, República Dominicana · Soluciones industriales bajo cotización</span>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="-my-2 inline-flex min-h-10 items-center font-mono text-white/85 hover:text-white">{CONTACT.phone}</a>
        </div>
      </div>
      <div
        className={cn(
          "border-b border-black/10 bg-carbon transition-shadow duration-300",
          scrolled && "shadow-[0_8px_30px_-16px_rgba(0,0,0,0.15)]",
        )}
      >
        <div
          className={cn(
            "container-max flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-[72px]",
          )}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group [perspective:400px] shrink-0">
            <Image
              src="/brand/dynatech-badge.png"
              alt=""
              width={40}
              height={40}
              priority
              className="h-10 w-10 shrink-0"
            />
            <div>
              <div className="font-display text-xl font-semibold tracking-tight text-surface leading-none">{SITE.shortName}</div>
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-steel-400 mt-0.5">
                Ingeniería · SRL
              </div>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Principal">
            <Link
              href="/cilindros-neumaticos"
              aria-current={isActive(pathname, "/cilindros-neumaticos") ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap",
                isActive(pathname, "/cilindros-neumaticos") ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              {NAV.main[0].label}
            </Link>
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
                  "flex min-h-10 items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap",
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
                className="absolute left-0 top-full pt-4 w-[min(680px,calc(100vw-2rem))]"
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
                    <div className="eyebrow mb-3">Cilindros y servicios</div>
                    <ul className="space-y-1 mb-4">
                      {[...NAV.cilindros, ...NAV.especialidades].map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex min-h-10 items-center text-sm text-steel-200 hover:text-signal transition-colors"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappGeneral()}
                      target="_blank"
                      rel="noopener"
                      onClick={() => setMenuOpen(false)}
                      className="mt-auto inline-flex min-h-10 items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-signal hover:gap-2.5 transition-all"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {NAV.cta.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {NAV.main.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap",
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
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-signal hover:bg-signal-hover
                         text-white font-medium min-h-11 py-2.5 px-4 xl:px-5 rounded-xs text-xs uppercase tracking-wider
                         transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {NAV.cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Menú mobile / tablet */}
          <button
            ref={menuButtonRef}
            className="lg:hidden grid h-11 w-11 place-items-center text-surface -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Panel mobile */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "lg:hidden overflow-hidden bg-carbon transition-[max-height,opacity] duration-300 ease-out border-b border-black/10",
          open ? "max-h-[48rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-max pb-6 flex flex-col max-h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain" aria-label="Menú móvil">
          {/* CTA primero: visible sin desplazarse dentro del menú. */}
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            className="sticky top-0 z-10 -mx-4 mb-2 flex min-h-14 items-center justify-center gap-2 bg-signal px-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-signal-hover sm:-mx-6"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {NAV.cta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="eyebrow mt-4 mb-1">Línea principal</div>
          {NAV.cilindros.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center border-b border-black/5 text-sm font-medium",
                isActive(pathname, item.href) ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="eyebrow mt-5 mb-1">Especialidades</div>
          {NAV.especialidades.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center border-b border-black/5 text-sm font-medium",
                isActive(pathname, item.href) ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="eyebrow mt-5 mb-1">Líneas de productos</div>
          {SOLUCIONES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, `/${s.slug}`) ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 border-b border-black/5 text-sm font-medium",
                isActive(pathname, `/${s.slug}`) ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              <s.icon className="h-4 w-4 text-signal" aria-hidden="true" />
              {s.name}
            </Link>
          ))}
          <div className="eyebrow mt-5 mb-1">Empresa</div>
          {NAV.main.slice(2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center border-b border-black/5 text-sm font-medium",
                isActive(pathname, item.href) ? "text-signal" : "text-steel-200 hover:text-signal",
              )}
            >
              {item.label}
            </Link>
          ))}
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="mt-5 flex min-h-11 items-center font-mono text-sm text-steel-400 hover:text-signal">
            {CONTACT.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
