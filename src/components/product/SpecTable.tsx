type Props = {
  specs: Record<string, string | number> | null;
};

export function SpecTable({ specs }: Props) {
  if (!specs || Object.keys(specs).length === 0) return null;

  const entries = Object.entries(specs);

  return (
    <div className="border border-white/10">
      <div className="px-5 py-3 border-b border-white/10 bg-carbon-800 flex items-center gap-2">
        <span className="h-2 w-2 bg-signal" />
        <span className="eyebrow">Ficha técnica</span>
      </div>
      <dl className="divide-y divide-white/5">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="grid grid-cols-2 gap-4 px-5 py-3 hover:bg-carbon-800 transition-colors"
          >
            <dt className="spec-key capitalize">{key.replace(/_/g, " ")}</dt>
            <dd className="spec-val text-numeric">{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
