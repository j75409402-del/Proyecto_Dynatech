import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

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
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos incompletos", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const supabase = createServiceClient();

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
      });
    } catch (err) {
      // No bloqueamos la respuesta al cliente si el webhook falla
      console.error("Webhook cotización falló:", err);
    }
  }

  return NextResponse.json({ quote_number: quote.quote_number }, { status: 201 });
}
