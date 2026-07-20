"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const src = images[active];

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div>
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-square bg-carbon-800 border border-black/10 overflow-hidden",
          src && "cursor-zoom-in",
        )}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className={cn(
              "object-contain p-8 transition-transform duration-200 ease-out",
              zoom && "scale-[2.2] p-0",
            )}
            style={zoom ? { transformOrigin: `${pos.x}% ${pos.y}%` } : undefined}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-steel-600 opacity-30">
              <svg width="180" height="180" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        )}

        <div className="absolute -top-2 -left-2 h-4 w-4 border-l-2 border-t-2 border-signal" />
        <div className="absolute -top-2 -right-2 h-4 w-4 border-r-2 border-t-2 border-signal" />
        <div className="absolute -bottom-2 -left-2 h-4 w-4 border-l-2 border-b-2 border-signal" />
        <div className="absolute -bottom-2 -right-2 h-4 w-4 border-r-2 border-b-2 border-signal" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square border bg-carbon-800 overflow-hidden transition-colors",
                i === active ? "border-signal" : "border-black/10 hover:border-black/30",
              )}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
