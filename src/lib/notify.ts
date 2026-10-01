/**
 * Aviso por correo de leads nuevos vía Resend (API HTTP, sin dependencias).
 * Solo se activa si existen RESEND_API_KEY y LEAD_NOTIFY_EMAIL en Vercel; si faltan, no
 * hace nada. Nunca bloquea ni hace fallar el guardado del lead.
 */
export async function notifyLead(subject: string, lines: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const from = process.env.RESEND_FROM ?? "Dynatech Web <onboarding@resend.dev>";
  const text = lines.join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#0B0D10">${lines
    .map((l) => escapeHtml(l).replace(/(https?:\/\/\S+)/g, '<a href="$1">$1</a>') || "&nbsp;")
    .join("<br>")}</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((e) => e.trim()).filter(Boolean),
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("Aviso de lead por correo falló:", res.status, await res.text());
  } catch (err) {
    console.error("Aviso de lead por correo falló:", err);
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
