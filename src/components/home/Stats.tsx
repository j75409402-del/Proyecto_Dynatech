import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { getSiteSettings } from "@/lib/siteSettings";

/** Separa "500+" en { value: 500, suffix: "+" } pa' animar el Counter; si no hay número, se muestra tal cual. */
function parseStat(raw: string): { value: number; suffix: string } | { text: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { text: raw };
  return { value: Number(match[1]), suffix: match[2] };
}

export async function Stats() {
  const settings = await getSiteSettings();

  const stats = [
    { label: "Productos", raw: settings.stat_productos },
    { label: "Marcas", raw: settings.stat_marcas },
    { label: "Clientes", raw: settings.stat_clientes },
    { label: "Tiempo de respuesta", raw: settings.stat_respuesta },
  ].filter((s) => s.raw?.trim());

  if (stats.length === 0) return null;

  return (
    <section className="section-pad border-b border-black/5 bg-carbon-900">
      <div className="container-max">
        <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, i) => {
            const parsed = parseStat(stat.raw);
            return (
              <div key={stat.label} className={i === 0 ? "border-l border-signal pl-5" : "border-l border-black/20 pl-5"}>
                <div className="font-display font-semibold text-3xl sm:text-4xl text-surface text-numeric">
                  {"text" in parsed ? parsed.text : <Counter value={parsed.value} suffix={parsed.suffix} />}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mt-2">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
