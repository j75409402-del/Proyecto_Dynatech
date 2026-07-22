import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// A propósito NO incluye "sku" — la respuesta de esta API es pública y el
// código interno/de fabricante no debe viajar al navegador. El filtro por SKU
// más abajo (sku.ilike) sigue funcionando igual: filtrar no requiere seleccionarlo.
const SELECT = "id, slug, name, thumbnail_url, category:categories(name), brand:brands(name)";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ results: [] });

  const supabase = await createClient();
  const qLower = q.toLowerCase();

  const [{ data: textMatches }, { data: allCategories }] = await Promise.all([
    supabase
      .from("products")
      .select(SELECT)
      .eq("active", true)
      .or(`name.ilike.%${q}%,sku.ilike.%${q}%,search_tags.ilike.%${q}%`)
      .limit(6),
    supabase.from("categories").select("id, parent_id, name"),
  ]);

  const results = [...(textMatches ?? [])];
  const seenIds = new Set(results.map((p) => p.id));

  // Si el término coincide con una categoría (ej. "cilindro"), sumamos también sus accesorios/subcategorías.
  if (results.length < 6) {
    const matchedCatIds = new Set(
      (allCategories ?? []).filter((c) => c.name.toLowerCase().includes(qLower)).map((c) => c.id),
    );
    let expanded = true;
    while (expanded) {
      expanded = false;
      for (const c of allCategories ?? []) {
        if (c.parent_id && matchedCatIds.has(c.parent_id) && !matchedCatIds.has(c.id)) {
          matchedCatIds.add(c.id);
          expanded = true;
        }
      }
    }

    if (matchedCatIds.size > 0) {
      const { data: categoryMatches } = await supabase
        .from("products")
        .select(SELECT)
        .eq("active", true)
        .in("category_id", Array.from(matchedCatIds))
        .limit(6 - results.length + 6);

      for (const p of categoryMatches ?? []) {
        if (!seenIds.has(p.id)) {
          seenIds.add(p.id);
          results.push(p);
        }
      }
    }
  }

  return NextResponse.json({ results: results.slice(0, 6) });
}
