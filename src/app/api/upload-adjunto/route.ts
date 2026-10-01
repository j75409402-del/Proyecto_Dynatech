import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { badOrigin, clientIp, rateLimited } from "@/lib/antispam";

/**
 * Prepara la subida de un adjunto (plano, foto o PDF) del formulario de cotización.
 *
 * El archivo YA NO pasa por esta función: Vercel corta los cuerpos de más de 4,5 MB. Aquí
 * solo se valida nombre/tipo/tamaño y se devuelve una URL firmada de un solo uso; el
 * navegador sube el archivo directo a Supabase Storage. El bucket además tiene sus propios
 * límites (10 MB y tipos permitidos), así que Storage rechaza lo que no cumpla.
 */

const MAX_BYTES = 10 * 1024 * 1024;
const BUCKET = "cotizacion-adjuntos";
const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  type: z.string(),
  size: z.number().int().positive(),
});

export async function POST(req: Request) {
  if (badOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  // 3 archivos por solicitud: alcanza para ~5 solicitudes en 10 minutos por IP.
  if (rateLimited(`adjunto:${clientIp(req)}`, 15, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiados archivos. Intenta en unos minutos." }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos del archivo inválidos" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos del archivo inválidos" }, { status: 400 });
  }

  const { type, size } = parsed.data;
  const ext = EXT_BY_TYPE[type];
  if (!ext) {
    return NextResponse.json({ error: "Formato no soportado (usa PDF, JPG, PNG o WEBP)" }, { status: 400 });
  }
  if (size > MAX_BYTES) {
    return NextResponse.json({ error: "El archivo supera los 10 MB" }, { status: 400 });
  }

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  let supabase;
  try {
    supabase = createServiceClient();
  } catch (err) {
    console.error("Supabase sin configurar:", err);
    return NextResponse.json({ error: "Servicio no disponible" }, { status: 503 });
  }

  // El nombre lo pone el servidor (fecha + aleatorio): nunca se usa el nombre del cliente.
  const path = `${new Date().toISOString().slice(0, 10)}/${Date.now()}-${crypto.randomUUID().slice(0, 12)}.${ext}`;
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    console.error("No se pudo crear la URL de subida:", error);
    return NextResponse.json({ error: "No se pudo preparar la subida" }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({
    uploadUrl: data.signedUrl,
    publicUrl: pub.publicUrl,
    // Clave pública (anon/publishable): el gateway de Supabase la pide en cada request.
    apikey: anonKey ?? null,
  });
}
