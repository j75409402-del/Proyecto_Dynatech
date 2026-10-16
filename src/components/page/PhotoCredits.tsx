import type { Subcategoria } from "@/lib/soluciones";

/**
 * Créditos de las fotos de referencia de terceros (Wikimedia Commons, licencias libres).
 * Las licencias CC BY / CC BY-SA exigen autor, licencia y enlace; las fotos se recortaron
 * y se difuminó el rótulo de marca cuando lo había («editada»).
 */
export function PhotoCredits({ items }: { items: Subcategoria[] }) {
  const conCredito = items.filter((s) => s.credit);
  if (!conCredito.length) return null;
  return (
    <p className="photo-credits">
      <span>Fotos de referencia (no son inventario ni trabajos de Dynatech):</span>{" "}
      {conCredito.map((s, i) => (
        <span key={s.id}>
          {s.title}: <a href={s.credit!.url} target="_blank" rel="noopener noreferrer">{s.credit!.author}</a>, {s.credit!.license}, Wikimedia Commons, editada{i < conCredito.length - 1 ? " · " : "."}
        </span>
      ))}
    </p>
  );
}
