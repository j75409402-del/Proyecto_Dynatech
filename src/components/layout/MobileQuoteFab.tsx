"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { quoteBridgeHref } from "@/lib/quote";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/**
 * Botón flotante de cotización, solo en móvil (<768 px, ver CSS `md:hidden`).
 * - Es un <a href="/cotizacion"> generado por quoteBridgeHref(): CommercialTracking lo mide
 *   como quote_whatsapp_click (placement "content"); nunca enlaza directo a wa.me.
 * - Se oculta si debajo hay un enlace o botón del contenido.
 * - Se oculta mientras se ve un CTA principal (`[data-fab-hide]`: hero, experiencia 3D) o el
 *   <footer>, y antes de desplazarse, para no duplicar el CTA ni tapar el pie.
 */
export function MobileQuoteFab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const blocking = useRef(new Set<Element>());

  useEffect(() => {
    const blockers = blocking.current;
    blockers.clear();
    let scrolled = window.scrollY > 320;
    let covering = false;
    const update = () => setVisible(scrolled && blockers.size === 0 && !covering);
    // Nunca tapar un enlace o botón del contenido (auditoría H-W5): se comprueba qué hay bajo el
    // botón (esquinas y centro) en cada frame de scroll.
    const fab = () => document.querySelector<HTMLElement>(".mobile-quote-fab");
    const checkCover = () => {
      const el = fab();
      if (!el || getComputedStyle(el).display === "none") return false;
      const r = el.getBoundingClientRect();
      const pts: [number, number][] = [[r.left + 2, r.top - 6], [r.right - 2, r.top - 6], [r.left + r.width / 2, r.top - 6], [r.left + 2, r.bottom - 2], [r.right - 2, r.bottom - 2], [r.left + r.width / 2, r.top + r.height / 2]];
      return pts.some(([x, y]) => document.elementsFromPoint(x, y).some((n) => n !== el && !el.contains(n) && !!n.closest("main a, main button, main input, main textarea, main select, main [role='button']")));
    };
    let frameCheck = 0;
    const scheduleCover = () => {
      if (frameCheck) return;
      frameCheck = requestAnimationFrame(() => { frameCheck = 0; const next = checkCover(); if (next !== covering) { covering = next; update(); } });
    };
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) blockers.add(e.target);
        else blockers.delete(e.target);
      }
      update();
    });
    // Tras el render de la nueva ruta.
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll("[data-fab-hide], footer").forEach((el) => observer.observe(el));
    });
    const onScroll = () => {
      const next = window.scrollY > 320;
      if (next !== scrolled) { scrolled = next; update(); }
      scheduleCover();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(frameCheck);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <a
      href={quoteBridgeHref()}
      target="_blank"
      rel="noopener"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      data-visible={visible}
      aria-label="Solicitar cotización"
      className="mobile-quote-fab md:hidden"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>Cotizar</span>
    </a>
  );
}
