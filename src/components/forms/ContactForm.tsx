"use client";

import { useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { trackCommercialEvent } from "@/lib/conversions";
import { HONEYPOT_FIELD, looksLikeBot } from "@/lib/antispam";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * «¿Qué necesitas?» (oct-2026): reemplaza el asunto libre por opciones de la oferta confirmada.
 * Se guarda en el mismo campo `subject` (contrato de /api/contacto sin cambios). Opcional.
 */
const NECESIDADES = [
  { group: "Fabricación, reparación y mecanizado", options: ["Reparación de cilindro neumático", "Fabricación de cilindro neumático", "Cilindro hidráulico", "Mecanizado de piezas"] },
  { group: "Suministro industrial", options: ["Neumática", "Control industrial", "Automatización (sensores)", "Instrumentación", "Resistencias y termocuplas"] },
  { group: "Otro", options: ["Otra consulta"] },
] as const;

const contactSchema = z.object({
  name:    z.string().min(2, "Tu nombre es requerido"),
  email:   z.string().email("Correo inválido"),
  phone:   z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [state, setState] = useState<
    { status: "idle" | "submitting" | "success" } |
    { status: "error"; message: string }
  >({ status: "idle" });

  const [startedAt] = useState(() => Date.now());

  const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData, event?: BaseSyntheticEvent) => {
    const botLike = looksLikeBot({ [HONEYPOT_FIELD]: honeypotValue(event), _t: startedAt });
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          // Anti-spam (ver src/lib/antispam.ts).
          [HONEYPOT_FIELD]: honeypotValue(event),
          _t: startedAt,
        }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el mensaje");
      if (!botLike) trackCommercialEvent("generate_lead", "contact_form");
      setState({ status: "success" });
      reset();
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Error desconocido",
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-surface mb-2">Mensaje enviado</h3>
        <p className="text-steel-300">Te contactamos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Campo trampa: invisible para personas, los bots lo llenan. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>No llenar este campo</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre *</Label>
          <Input id="name" {...register("name")} placeholder="Tu nombre" />
          {errors.name && <FieldError msg={errors.name.message!} />}
        </div>
        <div>
          <Label htmlFor="company">Empresa</Label>
          <Input id="company" {...register("company")} placeholder="Opcional" />
        </div>
        <div>
          <Label htmlFor="email">Correo *</Label>
          <Input id="email" type="email" {...register("email")} placeholder="tu@empresa.do" />
          {errors.email && <FieldError msg={errors.email.message!} />}
        </div>
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" {...register("phone")} placeholder="(809) 555-1234" />
        </div>
      </div>

      <div>
        <Label htmlFor="subject">¿Qué necesitas?</Label>
        <select
          id="subject"
          {...register("subject")}
          defaultValue=""
          className="block w-full min-h-11 bg-carbon-800 border border-black/10 px-4 py-2.5 text-base text-surface focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none rounded-xs transition-colors"
        >
          <option value="">Elige una opción (opcional)</option>
          {NECESIDADES.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea id="message" {...register("message")} rows={5} placeholder="Referencia o código, medidas, cantidad y ciudad." />
        {errors.message && <FieldError msg={errors.message.message!} />}
      </div>

      {state.status === "error" && (
        <div className="flex items-start gap-3 border border-signal/40 bg-signal/5 p-4">
          <AlertCircle className="h-5 w-5 text-signal shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-surface mb-1">No se pudo enviar</div>
            <div className="text-sm text-steel-300 mb-3">{state.message}. Puedes escribirnos por WhatsApp.</div>
            <a
              href={whatsappLink(`Hola Dynatech, soy ${getValues("name") || ""}. ${getValues("message") || ""}`.trim())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-signal hover:underline"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Enviar por WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="btn-primary w-full sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {state.status === "submitting" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}

/** Valor del campo trampa, leído del formulario al enviar. */
function honeypotValue(event?: BaseSyntheticEvent): string {
  const form = event?.target;
  if (!(form instanceof HTMLFormElement)) return "";
  return String(new FormData(form).get(HONEYPOT_FIELD) ?? "");
}

function FieldError({ msg }: { msg: string }) {
  return <p className="mt-1 text-xs text-signal font-mono">{msg}</p>;
}
