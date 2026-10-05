import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

type Section = { heading: string; body: ReactNode };

type Props = {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: Section[];
};

/** Páginas legales con el sistema visual WEB-010 (cabecera oscura + cuerpo legible). */
export function LegalPage({ eyebrow, title, updated, intro, sections }: Props) {
  return (
    <div>
      <section className="home-hero page-hero" aria-labelledby="legal-title">
        <div className="container-max page-hero-crumbs max-w-3xl"><Breadcrumbs items={[{ label: title }]} /></div>
        <div className="container-max max-w-3xl pb-12 pt-6 sm:pb-16">
          <p className="home-hero-kicker"><span aria-hidden="true" />{eyebrow}</p>
          <h1 id="legal-title" className="home-hero-title">{title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[#97a7b5]">Última actualización: {updated}</p>
        </div>
      </section>
      <div className="container-max max-w-3xl py-12 sm:py-16">
        {intro && <p className="mb-6 text-lg leading-relaxed text-steel-200">{intro}</p>}
        <div className="legal-body">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3">{s.heading}</h2>
              <div className="space-y-3 text-[15px] leading-relaxed text-steel-300">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
