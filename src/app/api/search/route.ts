import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ results: [] });

  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("slug, sku, name, thumbnail_url, category:categories(name), brand:brands(name)")
    .eq("active", true)
    .or(`name.ilike.%${q}%,sku.ilike.%${q}%,search_tags.ilike.%${q}%`)
    .limit(6);

  return NextResponse.json({ results: data ?? [] });
}
