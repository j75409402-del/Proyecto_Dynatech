"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Microanimación de entrada (WEB-010): IntersectionObserver + CSS (`[data-reveal]`).
 * Solo se ocultan los bloques que al montar están por debajo del pliegue, así no hay
 * parpadeo ni cambio de layout (solo opacidad y transform). Respeta prefers-reduced-motion.
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.reveal = "shown";
        observer.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    const frame = requestAnimationFrame(() => {
      const fold = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-reveal=""]').forEach((el) => {
        if (el.getBoundingClientRect().top < fold) { el.dataset.reveal = "shown"; return; }
        el.dataset.reveal = "pending";
        observer.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((el) => { el.dataset.reveal = "shown"; });
    };
  }, [pathname]);
  return null;
}
