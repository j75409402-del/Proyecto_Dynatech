"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  /** Relación de aspecto del marco (ancho / alto). */
  ratio?: number;
  sizes?: string;
  className?: string;
};

/**
 * Comparador antes/después accesible:
 * - Teclado: el control es un <input type="range"> nativo (flechas, Inicio/Fin, RePág/AvPág).
 * - Táctil y ratón: arrastre horizontal en toda la imagen (el desplazamiento vertical sigue
 *   funcionando gracias a `touch-action: pan-y`).
 * - Sin JS: se ve mitad y mitad (posición inicial en CSS).
 */
export function BeforeAfterSlider({ before, after, ratio = 1290 / 435, sizes = "(max-width: 1023px) 100vw, 1100px", className }: Props) {
  const [value, setValue] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || !rect.width) return;
    setValue(Math.round(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)) * 100));
  }, []);

  return (
    <div className={className}>
      <div
        ref={frame}
        className="before-after"
        style={{ aspectRatio: String(ratio), "--split": `${value}%` } as React.CSSProperties}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => { if (dragging.current) fromPointer(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="before-after-img" draggable={false} />
        <div className="before-after-after">
          <Image src={after.src} alt={after.alt} fill sizes={sizes} className="before-after-img" draggable={false} />
        </div>
        <div className="before-after-handle" aria-hidden="true"><span /></div>
        <span className="before-after-tag before-after-tag-before" aria-hidden="true">Antes</span>
        <span className="before-after-tag before-after-tag-after" aria-hidden="true">Después</span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Comparar antes y después (antes a la izquierda, después a la derecha)"
          aria-valuetext={`División al ${value} %`}
          className="before-after-range"
        />
      </div>
    </div>
  );
}
