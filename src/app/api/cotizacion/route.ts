import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { badOrigin, bodyTooLarge, clientIp, looksLikeBot, rateLimited } from "@/lib/antispam";
import { notifyLead } from "@/lib/notify";

const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const bodySchema = z.object({
  company_name: text(2, 160),
  contact_name: text(2, 120),
  email:        z.string().trim().email().max(200),
  phone:        text(8, 40),
  rnc:          z.string().trim().max(20).optional(),
  city:         z.string().trim().max(80).optional(),
  items: z.array(z.object({
    sku:      z.string().trim().max(80).optional(),
    name:     text(2, 200),
    quantity: z.coerce.number().int().min(1).max(9999),
    notes:    z.string().trim().max(500).optional(),
  })).min(1).max(30),
  message: z.string().trim().max(4000).optional(),
});

export async function POST(req: Request) {
  if (badOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  if (rateLimited(`cotizacion:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta en unos minutos o escríbenos por WhatsApp." }, { status: 429 });
  }

  if (bodyTooLarge(req, 64 * 1024)) {
    return NextResponse.json({ error: "La solicitud es demasiado grande" }, { status: 413 });
  }
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  // Bot detectado: respondemos como si todo saliera bien, sin guardar nada.
  if (looksLikeBot(payload)) {
    return NextResponse.json({ quote_number: "COT-RECIBIDA" }, { status: 201 });
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

  const { data: quote, error } = await supabase
    .from("quotes")
    .insert({
      company_name: data.company_name,
      contact_name: data.contact_name,
      email:        data.email,
      phone:        data.phone,
      rnc:          data.rnc ?? null,
      city:         data.city ?? null,
      items:        data.items,
      message:      data.message ?? null,
      source:       "web",
    })
    .select("quote_number")
    .single();

  if (error || !quote) {
    console.error("Error insertando cotización:", error);
    return NextResponse.json(
      { error: "No se pudo guardar la cotización" },
      { status: 500 },
    );
  }

  // Webhook opcional pa' n8n / Slack / Discord
  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote.created",
          quote_number: quote.quote_number,
          ...data,
        }),
        signal: AbortSignal.timeout(8000),
      });
    } catch (err) {
      // No bloqueamos la respuesta al cliente si el webhook falla
      console.error("Webhook cotización falló:", err);
    }
  }

  await notifyLead(`Nueva cotización ${quote.quote_number} · ${data.company_name}`, [
    `Cotización: ${quote.quote_number}`,
    `Empresa: ${data.company_name}${data.rnc ? ` (RNC ${data.rnc})` : ""}`,
    `Contacto: ${data.contact_name}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone}`,
    `Ciudad: ${data.city || "-"}`,
    "",
    ...data.items.map(
      (it, i) => `${i + 1}. ${it.name} · Cant. ${it.quantity}${it.notes ? `
   ${it.notes}` : ""}`,
    ),
    ...(data.message ? ["", data.message] : []),
  ], data.email);

  return NextResponse.json({ quote_number: quote.quote_number }, { status: 201 });
}
