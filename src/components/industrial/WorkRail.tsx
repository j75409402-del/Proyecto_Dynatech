"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { TrabajoNeumatico } from "@/lib/trabajos-neumaticos";

/**
 * Pasarela horizontal de fotos reales (oct-2026).
 * - Computadora: varias fotos a la vez, flechas y desplazamiento suave.
 * - Móvil: se desliza con el dedo; la siguiente foto asoma por el borde.
 * - Cada foto se amplía en un visor (<dialog>) con la foto original; un toque acerca el detalle.
 * - Sin movimiento automático (el dueño pidió evitar animaciones que distraigan).
 * - Las flechas solo aparecen si hay más fotos de las que caben.
 */
export function WorkRail({ items, label }: { items: readonly TrabajoNeumatico[]; label: string }) {
  const rail = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", update); ro.disconnect(); };
  }, [update]);

  const move = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
  };

  const show = (i: number) => { setZoom(null); setOpen(i); if (!dialog.current?.open) dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const step = (dir: 1 | -1) => { if (open === null) return; setZoom(null); setOpen((open + dir + items.length) % items.length); };

  const scrollable = !(edges.start && edges.end);
  const current = open !== null ? items[open] : null;

  return (
    <div className={`work-rail-wrap ${items.length === 1 ? "is-single" : ""}`} style={{ "--per-view": Math.min(items.length, 3) } as React.CSSProperties}>
      {scrollable && (
        <div className="work-rail-nav" data-fab-hide="">
          <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Fotos anteriores"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Fotos siguientes"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
        </div>
      )}
      <ul ref={rail} className="work-rail" aria-label={label} tabIndex={scrollable ? 0 : undefined}>
        {items.map((it, i) => (
          <li key={it.src}>
            <figure>
              <button type="button" className="work-rail-photo" onClick={() => show(i)} aria-label={`Ampliar foto: ${it.caption}`}>
                <Image src={it.src} alt={it.alt} width={it.width} height={it.height} sizes="(max-width: 767px) 82vw, (max-width: 1279px) 45vw, 400px" className="h-full w-full object-cover" />
                <span className="work-rail-zoom" aria-hidden="true"><ZoomIn className="h-4 w-4" /></span>
              </button>
              <figcaption><span className="work-rail-label">Foto real · taller Dynatech</span>{it.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="work-viewer"
        aria-label="Foto ampliada"
        onClose={() => { setOpen(null); setZoom(null); }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
      >
        {current && (
          <figure>
            <div
              className={`work-viewer-frame ${zoom ? "is-zoomed" : ""}`}
              onClick={(e) => {
                if (zoom) { setZoom(null); return; }
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
              onPointerMove={(e) => {
                if (!zoom || e.pointerType !== "mouse") return;
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
              }}
            >
              <Image
                src={current.full}
                alt={current.alt}
                width={current.fullWidth}
                height={current.fullHeight}
                sizes="100vw"
                className="work-viewer-img"
                style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
            </div>
            <figcaption>
              <span className="work-rail-label">Foto real · taller Dynatech</span>
              <span>{current.caption}</span>
              <span className="work-viewer-hint">{zoom ? "Toca para alejar" : "Toca la foto para acercar"}</span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="work-viewer-close" onClick={close} aria-label="Cerrar"><X className="h-5 w-5" aria-hidden="true" /></button>
        {items.length > 1 && (
          <>
            <button type="button" className="work-viewer-prev" onClick={() => step(-1)} aria-label="Foto anterior"><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
            <button type="button" className="work-viewer-next" onClick={() => step(1)} aria-label="Foto siguiente"><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
          </>
        )}
      </dialog>
    </div>
  );
}
