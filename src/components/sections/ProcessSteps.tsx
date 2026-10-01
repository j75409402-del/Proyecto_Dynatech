import { PROCESS } from "@/lib/constants";

/** Flujo bajo pedido: datos → cotización → fabricación/importación → entrega. */
export function ProcessSteps() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
      {PROCESS.map((step, i) => (
        <li key={step.title} className="bg-carbon p-6">
          <span className="font-mono text-xs text-signal tracking-techno">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="font-display text-lg text-surface mt-3 mb-2">{step.title}</h3>
          <p className="text-sm text-steel-400 leading-relaxed">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
