"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { TrabajoTaller } from "@/lib/trabajos-taller";

/**
 * Pasarela horizontal de fotos y videos reales del taller (oct-2026).
 * - Computadora: hasta 3 piezas a la vez, flechas y desplazamiento suave.
 * - Móvil: se desliza con el dedo; la siguiente pieza asoma por el borde.
 * - Las fotos se amplían en un visor (<dialog>); un toque acerca el detalle.
 * - Los videos se reproducen ahí mismo, sin sonido, y solo se descargan al darles play.
 * - Sin movimiento automático (el dueño pidió evitar animaciones que distraigan).
 * - Las flechas solo aparecen si hay más piezas de las que caben.
 */
export function WorkRail({ items, label }: { items: readonly TrabajoTaller[]; label: string }) {
  const rail = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const fotos = items.filter((it): it is Extract<TrabajoTaller, { kind: "foto" }> => it.kind === "foto");

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

  const show = (src: string) => { setZoom(null); setOpen(fotos.findIndex((f) => f.src === src)); if (!dialog.current?.open) dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const step = (dir: 1 | -1) => { if (open === null) return; setZoom(null); setOpen((open + dir + fotos.length) % fotos.length); };

  const scrollable = !(edges.start && edges.end);
  const current = open !== null ? fotos[open] : null;

  const pointZoom = (e: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
  };

  return (
    <div className={`work-rail-wrap ${items.length === 1 ? "is-single" : ""}`} style={{ "--per-view": Math.min(items.length, 3) } as React.CSSProperties}>
      {scrollable && (
        <div className="work-rail-nav" data-fab-hide="">
          <button type="button" onClick={() => move(-1)} disabled={edges.start} aria-label="Trabajos anteriores"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => move(1)} disabled={edges.end} aria-label="Trabajos siguientes"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
        </div>
      )}
      <ul ref={rail} className="work-rail" aria-label={label} tabIndex={scrollable ? 0 : undefined}>
        {items.map((it) => (
          <li key={it.src}>
            <figure>
              {it.kind === "foto" ? (
                <button type="button" className="work-rail-photo" onClick={() => show(it.src)} aria-label={`Ampliar foto: ${it.caption}`}>
                  <Image src={it.src} alt={it.alt} width={it.width} height={it.height} sizes="(max-width: 767px) 82vw, (max-width: 1279px) 32vw, 400px" className="h-full w-full object-cover" />
                  <span className="work-rail-zoom" aria-hidden="true"><ZoomIn className="h-4 w-4" /></span>
                </button>
              ) : (
                <div className="work-rail-photo is-video">
                  <video src={it.src} poster={it.poster} controls playsInline muted preload="none" width={480} height={848} className="h-full w-full object-cover" aria-label={it.alt} />
                </div>
              )}
              <figcaption><span className="work-rail-label">{it.kind === "foto" ? "Foto real" : "Video real"} · taller Dynatech</span>{it.caption}</figcaption>
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
              onClick={(e) => setZoom(zoom ? null : pointZoom(e))}
              onPointerMove={(e) => { if (zoom && e.pointerType === "mouse") setZoom(pointZoom(e)); }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
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
        {fotos.length > 1 && (
          <>
            <button type="button" className="work-viewer-prev" onClick={() => step(-1)} aria-label="Foto anterior"><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
            <button type="button" className="work-viewer-next" onClick={() => step(1)} aria-label="Foto siguiente"><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
          </>
        )}
      </dialog>
    </div>
  );
}
