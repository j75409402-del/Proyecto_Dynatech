import { VALUE_PROPS } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function ValueProps() {
  return (
    <section className="section-pad border-b border-black/5">
      <div className="container-max">
        <Reveal className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">03 · Por qué Dynatech</div>
          <h2 className="font-display text-display-lg text-surface">
            ¿Por qué elegir Dynatech?
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5 border border-black/5">
          {VALUE_PROPS.map((prop, i) => (
            <Reveal key={prop.number} delay={i * 0.08}>
              <TiltCard max={5} className="h-full">
                <div className="group bg-carbon hover:bg-carbon-800 p-8 flex flex-col min-h-[220px] h-full transition-colors duration-300">
                  <div className="font-mono text-xs text-signal tracking-techno mb-6 transition-transform duration-300 group-hover:scale-110 origin-left">
                    {prop.number}
                  </div>
                  <h3 className="font-display text-xl text-surface mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-steel-300 leading-relaxed">
                    {prop.body}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
