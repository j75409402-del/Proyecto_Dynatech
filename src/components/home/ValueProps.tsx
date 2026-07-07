import { VALUE_PROPS } from "@/lib/constants";

export function ValueProps() {
  return (
    <section className="section-pad border-b border-white/5">
      <div className="container-max">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">03 · Por qué Dynatech</div>
          <h2 className="font-display text-display-lg text-surface">
            Distribuir bien es más <br />que tener la pieza.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.number}
              className="bg-carbon p-8 flex flex-col min-h-[220px]"
            >
              <div className="font-mono text-xs text-signal tracking-techno mb-6">
                {prop.number}
              </div>
              <h3 className="font-display text-xl text-surface mb-3">
                {prop.title}
              </h3>
              <p className="text-sm text-steel-300 leading-relaxed">
                {prop.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
