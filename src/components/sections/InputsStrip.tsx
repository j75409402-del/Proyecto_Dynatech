import { FileText, Box, Ruler, Camera, ClipboardList } from "lucide-react";
import { INPUTS } from "@/lib/constants";

const ICONS = [FileText, Box, Ruler, Camera, ClipboardList];

/** "Trabajamos a partir de…" — lo que el cliente nos puede enviar. */
export function InputsStrip({ title = "Trabajamos a partir de" }: { title?: string }) {
  return (
    <div>
      <div className="eyebrow mb-5">{title}</div>
      <ul className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-black/10 border border-black/10">
        {INPUTS.map((label, i) => {
          const Icon = ICONS[i];
          return (
            <li key={label} className="bg-carbon flex flex-col items-start gap-3 p-5">
              <Icon className="h-5 w-5 text-signal" />
              <span className="font-display text-base text-surface">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
