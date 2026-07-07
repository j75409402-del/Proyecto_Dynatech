import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
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
      });
    } catch (err) {
      console.error("Webhook contacto falló:", err);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
