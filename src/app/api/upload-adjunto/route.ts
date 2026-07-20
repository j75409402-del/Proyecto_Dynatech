import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "El archivo supera los 10MB" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Formato no soportado (usa PDF, JPG, PNG o WEBP)" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("cotizacion-adjuntos")
    .upload(path, file, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: "No se pudo subir el archivo" }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage.from("cotizacion-adjuntos").getPublicUrl(path);
  return NextResponse.json({ url: publicUrl.publicUrl });
}
