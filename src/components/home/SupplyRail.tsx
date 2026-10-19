"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { VitrinaItem } from "@/lib/vitrina-suministro";

/**
 * Pasarela de suministros en la portada (oct-2026).
 * - Avanza sola, despacio (una foto cada 4 s), y vuelve al inicio al llegar al final.
 * - Se detiene al pasar el ratón, al enfocar con el teclado y mientras no está en pantalla.
 * - Si la persona toca, desliza o usa las flechas, deja de moverse sola (manda la persona).
 * - Botón para pausar o reanudar. Con «reducir movimiento» activado, no se mueve sola.
 */
const INTERVALO = 4000;

export function SupplyRail({ items }: { items: VitrinaItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const hold = useRef({ hover: false, focus: false, visible: false });

  const step = useCallback((dir: 1 | -1, smooth = true) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 10 : el.clientWidth / 3;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    const behavior: ScrollBehavior = smooth ? "smooth" : "auto";
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior });
    else el.scrollBy({ left: dir * w, behavior });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { hold.current.visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      const h = hold.current;
      if (h.hover || h.focus || !h.visible || document.hidden) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      step(1);
    }, INTERVALO);
    return () => window.clearInterval(id);
  }, [paused, step]);

  const manual = (dir: 1 | -1) => { setPaused(true); step(dir); };

  return (
    <div
      className="sx"
      onMouseEnter={() => { hold.current.hover = true; }}
      onMouseLeave={() => { hold.current.hover = false; }}
      onFocus={() => { hold.current.focus = true; }}
      onBlur={() => { hold.current.focus = false; }}
    >
      <div className="sx-head">
        <p className="sx-title">Lo que suministramos <span>· Imágenes de referencia</span></p>
        <div className="sx-controls" data-fab-hide="">
          <button type="button" onClick={() => manual(-1)} aria-label="Productos anteriores"><ChevronLeft className="h-4 w-4" aria-hidden="true" /></button>
          <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Reanudar el desplazamiento" : "Pausar el desplazamiento"}>
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => manual(1)} aria-label="Productos siguientes"><ChevronRight className="h-4 w-4" aria-hidden="true" /></button>
        </div>
      </div>
      <ul
        ref={track}
        className="sx-track"
        aria-label="Productos que suministramos"
        onPointerDown={() => setPaused(true)}
        onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setPaused(true); }}
      >
        {items.map((it, i) => (
          <li key={it.key}>
            <Link href={it.href} className="sx-card">
              <span className="sx-tile">
                <Image src={it.image} alt="" fill sizes="(max-width: 639px) 42vw, (max-width: 1023px) 30vw, 180px" loading={i < 4 ? "eager" : "lazy"} className="object-contain" />
              </span>
              <small>{it.grupo}</small>
              <b>{it.title}</b>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
