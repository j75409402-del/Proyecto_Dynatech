import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Ping diario (cron de Vercel, ver vercel.json). Las páginas públicas ya no consultan
 * Supabase, y en el plan Free un proyecto sin actividad 7 días se pausa — lo que dejaría
 * caído el formulario de cotización. Lee una sola fila mínima.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("site_settings").select("key").limit(1);
  if (error) {
    console.error("Keepalive Supabase falló:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
