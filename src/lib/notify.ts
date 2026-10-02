/**
 * Aviso por correo de leads nuevos vía Resend (API HTTP, sin dependencias).
 * Solo se activa si existen RESEND_API_KEY y LEAD_NOTIFY_EMAIL en Vercel; si faltan, no
 * hace nada. Nunca bloquea ni hace fallar el guardado del lead.
 */
export async function notifyLead(subject: string, lines: string[], replyTo?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const recipients = to?.split(",").map((e) => e.trim()).filter(Boolean) ?? [];
  if (!apiKey || recipients.length === 0) {
    console.error("Aviso de lead no configurado: faltan RESEND_API_KEY o LEAD_NOTIFY_EMAIL");
    return;
  }

  const from = process.env.RESEND_FROM ?? "Dynatech Web <onboarding@resend.dev>";
  const text = lines.join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#0B0D10">${lines
    .map((l) => escapeHtml(l) || "&nbsp;")
    .join("<br>")}</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: subject.replace(/[\r\n]/g, " "),
        ...(replyTo ? { reply_to: replyTo } : {}),
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    // No imprimir respuestas del proveedor ni datos del cliente en los logs.
    if (!res.ok) console.error("Aviso de lead por correo falló; HTTP:", res.status);
  } catch {
    console.error("Aviso de lead por correo falló: conexión o tiempo de espera");
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
