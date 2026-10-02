import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";
import { badOrigin, clientIp, looksLikeBot, rateLimited } from "@/lib/antispam";
import { notifyLead } from "@/lib/notify";

const bodySchema = z.object({
  company_name: z.string().min(2),
  contact_name: z.string().min(2),
  email:        z.string().email(),
  phone:        z.string().min(8),
  rnc:          z.string().optional(),
  city:         z.string().optional(),
  items: z.array(z.object({
    sku:      z.string().optional(),
    name:     z.string().min(2),
    quantity: z.coerce.number().min(1),
    notes:    z.string().optional(),
  })).min(1),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  if (badOrigin(req)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }
  if (rateLimited(`cotizacion:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta en unos minutos o escríbenos por WhatsApp." }, { status: 429 });
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
