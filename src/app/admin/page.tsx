import { redirect } from "next/navigation";
import { LogOut, Paperclip } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";
import { getAdminUser } from "@/lib/adminAuth";
import { QUOTE_STATUSES, QUOTE_STATUS_LABEL } from "@/lib/leads";
import { signOutAdmin, toggleMessageHandled, updateQuoteStatus } from "./actions";

export const dynamic = "force-dynamic";

type QuoteItem = { name?: string; quantity?: number; notes?: string; sku?: string };

const fecha = new Intl.DateTimeFormat("es-DO", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santo_Domingo",
});

/** Convierte las URLs del mensaje (adjuntos) en enlaces. */
function MessageText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/\S+)/g);
  return (
    <p className="whitespace-pre-line break-words text-sm text-steel-300">
      {parts.map((p, i) =>
        /^https?:\/\//.test(p) ? (
          <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-signal hover:underline">
            <Paperclip className="h-3.5 w-3.5" />
            Ver adjunto
          </a>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </p>
  );
}

export default async function AdminPage() {
  // El proxy ya exige sesión de un correo autorizado; esto es defensa en profundidad.
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const supabase = createServiceClient();
  const [{ data: quotes }, { data: messages }] = await Promise.all([
    supabase
      .from("quotes")
      .select("id, quote_number, created_at, company_name, contact_name, email, phone, rnc, city, items, message, status")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("contact_messages")
      .select("id, created_at, name, company, email, phone, subject, message, handled")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const nuevas = (quotes ?? []).filter((q) => (q.status ?? "nuevo") === "nuevo").length;
  const pendientes = (messages ?? []).filter((m) => !m.handled).length;

  return (
    <div className="container-max py-12 sm:py-16">
      <div className="flex items-start justify-between gap-6 mb-10 flex-wrap">
        <div>
          <div className="eyebrow mb-3">Panel interno</div>
          <h1 className="font-display text-display-md text-surface mb-2">Solicitudes recibidas</h1>
          <p className="text-sm text-steel-400">{user.email}</p>
        </div>
        <form action={signOutAdmin}>
          <button type="submit" className="btn-ghost text-sm">
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </form>
      </div>

      {/* COTIZACIONES */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between gap-4 mb-4 border-b border-black/10 pb-2">
          <h2 className="eyebrow">Cotizaciones · últimas 100</h2>
          <span className="font-mono text-xs text-signal">{nuevas} nuevas</span>
        </div>

        {!quotes || quotes.length === 0 ? (
          <p className="text-steel-400 text-sm py-6">Todavía no hay cotizaciones.</p>
        ) : (
          <ul className="space-y-4">
            {quotes.map((q) => {
              const items = (Array.isArray(q.items) ? q.items : []) as QuoteItem[];
              return (
                <li key={q.id} className="border border-black/10 bg-carbon p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-mono text-xs text-signal">{q.quote_number}</div>
                      <div className="font-display text-lg text-surface">{q.company_name}</div>
                      <div className="text-sm text-steel-300">
                        {q.contact_name} ·{" "}
                        <a href={`mailto:${q.email}`} className="hover:text-signal">{q.email}</a> ·{" "}
                        <a href={`tel:${q.phone.replace(/\s/g, "")}`} className="hover:text-signal">{q.phone}</a>
                        {q.city ? ` · ${q.city}` : ""}
                        {q.rnc ? ` · RNC ${q.rnc}` : ""}
                      </div>
                      {q.created_at && <div className="text-xs text-steel-400 mt-1">{fecha.format(new Date(q.created_at))}</div>}
                    </div>
                    <form action={updateQuoteStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={q.id} />
                      <select
                        name="status"
                        defaultValue={q.status ?? "nuevo"}
                        aria-label={`Estado de ${q.quote_number}`}
                        className="bg-carbon-800 border border-black/10 px-3 py-2 text-sm text-surface rounded-xs"
                      >
                        {QUOTE_STATUSES.map((s) => (
                          <option key={s} value={s}>{QUOTE_STATUS_LABEL[s]}</option>
                        ))}
                      </select>
                      <button type="submit" className="btn-secondary px-3 py-2 text-xs">Guardar</button>
                    </form>
                  </div>
                  <ul className="mb-2 space-y-1">
                    {items.map((it, i) => (
                      <li key={i} className="text-sm text-surface">
                        <span className="font-medium">{it.name}</span>
                        {it.quantity ? <span className="text-steel-400"> · Cant. {it.quantity}</span> : null}
                        {it.notes ? <span className="block text-steel-300 whitespace-pre-line">{it.notes}</span> : null}
                      </li>
                    ))}
                  </ul>
                  {q.message && <MessageText text={q.message} />}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* MENSAJES DE CONTACTO */}
      <section>
        <div className="flex items-baseline justify-between gap-4 mb-4 border-b border-black/10 pb-2">
          <h2 className="eyebrow">Mensajes de contacto · últimos 100</h2>
          <span className="font-mono text-xs text-signal">{pendientes} sin atender</span>
        </div>

        {!messages || messages.length === 0 ? (
          <p className="text-steel-400 text-sm py-6">Todavía no hay mensajes.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((m) => (
              <li key={m.id} className={`border border-black/10 p-5 ${m.handled ? "bg-carbon-800 opacity-70" : "bg-carbon"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="font-display text-lg text-surface">{m.subject || "Sin asunto"}</div>
                    <div className="text-sm text-steel-300">
                      {m.name}
                      {m.company ? ` · ${m.company}` : ""} ·{" "}
                      <a href={`mailto:${m.email}`} className="hover:text-signal">{m.email}</a>
                      {m.phone ? ` · ${m.phone}` : ""}
                    </div>
                    {m.created_at && <div className="text-xs text-steel-400 mt-1">{fecha.format(new Date(m.created_at))}</div>}
                  </div>
                  <form action={toggleMessageHandled}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="handled" value={m.handled ? "false" : "true"} />
                    <button type="submit" className="btn-secondary px-3 py-2 text-xs">
                      {m.handled ? "Marcar pendiente" : "Marcar atendido"}
                    </button>
                  </form>
                </div>
                <p className="whitespace-pre-line break-words text-sm text-steel-300">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
