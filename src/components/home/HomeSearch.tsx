import { SearchAutocomplete } from "@/components/layout/SearchAutocomplete";
import { Reveal } from "@/components/motion/Reveal";

export function HomeSearch() {
  return (
    <section className="border-b border-black/5 bg-carbon-900">
      <div className="container-max py-14 sm:py-16">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl text-surface mb-6">
            ¿Qué producto estás buscando?
          </h2>
          <SearchAutocomplete
            className="w-full"
            inputClassName="py-4 pl-12 text-base bg-carbon border border-black/10 hover:border-black/20"
          />
          <p className="mt-4 text-xs text-steel-400">
            Busca por nombre, número de parte, marca o categoría.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
