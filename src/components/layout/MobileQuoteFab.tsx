"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { quoteBridgeHref } from "@/lib/quote";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/**
 * Botón flotante de cotización, solo en móvil (<768 px, ver CSS `md:hidden`).
 * - Es un <a href="/cotizacion"> generado por quoteBridgeHref(): CommercialTracking lo mide
 *   como quote_whatsapp_click (placement "content"); nunca enlaza directo a wa.me.
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
    const update = () => setVisible(scrolled && blockers.size === 0);
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
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
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
      aria-label="Cotizar por WhatsApp"
      className="mobile-quote-fab md:hidden"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>Cotizar</span>
    </a>
  );
}
