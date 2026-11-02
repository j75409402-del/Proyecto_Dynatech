import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { badOrigin, bodyTooLarge, clientIp, looksLikeBot, rateLimited } from "@/lib/antispam";
import { pageLabel } from "@/lib/correo";
import { notifyLead } from "@/lib/notify";
import { cleanPath } from "@/lib/quote";

const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const bodySchema = z.object({
  name:    text(2, 120),
  email:   z.string().trim().email().max(200),
  phone:   z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  subject: z.string().trim().max(160).optional(),
  message: text(10, 4000),
});

export async function POST(req: Request) {
  if (badOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  if (rateLimited(`contacto:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiados envíos. Intenta en unos minutos o escríbenos por WhatsApp." }, { status: 429 });
  }

  if (bodyTooLarge(req, 64 * 1024)) {
    return NextResponse.json({ error: "El mensaje es demasiado grande" }, { status: 413 });
  }
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  // Bot detectado: respondemos como si todo saliera bien, sin guardar nada.
  if (looksLikeBot(payload)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos incompletos", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  let supabase;
  try {
    supabase = createServiceClient();
  } catch (err) {
    console.error("Supabase sin configurar:", err);
    return NextResponse.json({ error: "Servicio no disponible" }, { status: 503 });
  }

  const { error } = await supabase.from("contact_messages").insert({
    name:    data.name,
    email:   data.email,
    phone:   data.phone ?? null,
    company: data.company ?? null,
    subject: data.subject ?? null,
    message: data.message,
  });

  if (error) {
    console.error("Error insertando mensaje contacto:", error);
    return NextResponse.json(
      { error: "No se pudo guardar el mensaje" },
      { status: 500 },
    );
  }

  // Webhook opcional
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact.created", ...data }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (err) {
      console.error("Webhook contacto falló:", err);
    }
  }

  const sourcePage = cleanPath(req.headers.get("referer"), req.headers.get("x-forwarded-host") ?? req.headers.get("host")) || "/contacto";
  const page = pageLabel(sourcePage);
  await notifyLead(`Cotización – ${page} (web) · ${data.name}`, [
    `Nombre: ${data.name}`,
    `Empresa: ${data.company || "-"}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone || "-"}`,
    `Asunto: ${data.subject || "-"}`,
    "",
    data.message,
  ], data.email);

  return NextResponse.json({ ok: true }, { status: 201 });
}
