/**
 * Sube un adjunto directo del navegador a Supabase Storage (sin pasar por Vercel, que
 * limita los cuerpos a 4,5 MB): 1) pide una URL firmada a /api/upload-adjunto, 2) sube el
 * archivo con PUT a esa URL. Devuelve la URL pública del archivo.
 */
export async function uploadAdjunto(file: File): Promise<string> {
  const prep = await fetch("/api/upload-adjunto", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
  });
  const json = await prep.json().catch(() => ({}));
  if (!prep.ok || !json.uploadUrl) {
    throw new Error(json.error ?? `No se pudo subir "${file.name}"`);
  }

  // Mismo formato que usa supabase-js (uploadToSignedUrl): multipart con cacheControl.
  const body = new FormData();
  body.append("cacheControl", "3600");
  body.append("", file);
  const headers: Record<string, string> = { "x-upsert": "false" };
  if (json.apikey) headers.apikey = json.apikey;

  const put = await fetch(json.uploadUrl, { method: "PUT", body, headers });
  if (!put.ok) {
    throw new Error(`No se pudo subir "${file.name}"`);
  }
  return json.publicUrl as string;
}
