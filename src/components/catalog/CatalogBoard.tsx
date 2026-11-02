"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export type CatalogTile = {
  id: string;
  category: string;
  title: string;
  fact: string;
  image?: string;
  alt?: string;
  quote: string;
  href?: string;
};

export type CatalogSide = { id: string; label: string; href?: string };

export function CatalogBoard({
  sides,
  tiles,
  current,
  heading,
}: {
  sides: CatalogSide[];
  tiles: CatalogTile[];
  /** Si viene, el filtro es navegación. Si no, filtra la grilla en la página. */
  current?: string;
  heading?: string;
}) {
  const [active, setActive] = useState(current ?? "todas");
  const filtering = current === undefined;
  const shown = useMemo(
    () => (filtering && active !== "todas" ? tiles.filter((t) => t.category === active) : tiles),
    [active, filtering, tiles],
  );

  return (
    <div className="radwell">
      <aside className="radwell-side" aria-label="Filtrar por categoría">
        <p>Categorías</p>
        <ul>
          {filtering && (
            <li>
              <button type="button" aria-pressed={active === "todas"} onClick={() => setActive("todas")}>Todas</button>
            </li>
          )}
          {sides.map((s) => (
            <li key={s.id}>
              {s.href ? (
                <Link href={s.href} aria-current={s.id === current ? "page" : undefined}>{s.label}</Link>
              ) : (
                <button type="button" aria-pressed={active === s.id} onClick={() => setActive(s.id)}>{s.label}</button>
              )}
            </li>
          ))}
        </ul>
      </aside>
      <div>
        {heading && <h2 className="radwell-heading">{heading}</h2>}
        <ul className="radwell-grid" data-fab-hide="">
          {shown.map((t) => (
            <li key={t.id} id={t.id}>
              <article className="radwell-tile">
                {t.image && (
                  <div className="radwell-photo">
                    <Image src={t.image} alt={t.alt ?? ""} fill sizes="(max-width: 699px) 50vw, 22vw" className="object-contain" />
                  </div>
                )}
                <h3>{t.href ? <Link href={t.href}>{t.title}</Link> : t.title}</h3>
                <p>{t.fact}</p>
                <a href={t.quote} target="_blank" rel="noopener">
                  <WhatsAppIcon className="h-4 w-4" />
                  Cotizar por WhatsApp
                  <span className="sr-only">: {t.title}</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
