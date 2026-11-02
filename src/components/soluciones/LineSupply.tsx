import Link from "next/link";
import { Band, SectionHead } from "@/components/page/Blocks";
import { ENTREGA } from "@/lib/entrega";

export function LineSupply({
  id,
  items,
}: {
  id: string;
  items: { label: string; text: string; href: string }[];
}) {
  return (
    <Band tone="white" labelledBy={id}>
      <SectionHead kicker="Suministro" id={id} title="Qué suministramos" />
      <ul className="mt-8 grid gap-4 text-base leading-relaxed text-steel-300">
        {items.map((item) => (
          <li key={item.href}>
            <b className="text-surface">{item.label}.</b> {item.text}{" "}
            <Link href={item.href} className="text-signal">Ver en el catálogo</Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-steel-300">{ENTREGA}</p>
    </Band>
  );
}
