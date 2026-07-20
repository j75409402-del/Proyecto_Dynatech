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

export function LegalPage({ eyebrow, title, updated, intro, sections }: Props) {
  return (
    <div className="container-max max-w-3xl py-12 sm:py-16">
      <Breadcrumbs items={[{ label: title }]} />
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h1 className="font-display text-display-md text-surface mb-3">{title}</h1>
      <p className="font-mono text-xs text-steel-400 mb-8">Última actualización: {updated}</p>
      {intro && <p className="text-steel-200 leading-relaxed mb-10">{intro}</p>}
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl text-surface mb-3">{s.heading}</h2>
            <div className="text-sm text-steel-300 leading-relaxed space-y-3">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
