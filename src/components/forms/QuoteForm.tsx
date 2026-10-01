"use client";

import { useState, type BaseSyntheticEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send, AlertCircle, Paperclip, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { whatsappQuoteRequest } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { HONEYPOT_FIELD } from "@/lib/antispam";
import { uploadAdjunto } from "@/lib/uploadAdjunto";
import { GRUPOS_DE_SOLICITUD, TIPOS_DE_SOLICITUD } from "@/lib/servicios";

/** Información con la que el cliente puede iniciar la cotización. */
const INFO_DISPONIBLE = ["Plano", "Muestra física", "Medidas", "Fotos", "Especificaciones"] as const;

const MAX_FILES = 3;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/png,image/jpeg,image/webp,application/pdf";

const quoteSchema = z.object({
  company_name: z.string().min(2, "Nombre de empresa requerido"),
  contact_name: z.string().min(2, "Tu nombre es requerido"),
  email:        z.string().email("Email inválido"),
  phone:        z.string().min(8, "Teléfono requerido"),
  rnc:          z.string().optional(),
  city:         z.string().optional(),
  tipo:         z.string().min(1, "Elige qué necesitas"),
  cantidad:     z.coerce.number().int("Cantidad inválida").min(1, "Mínimo 1"),
  descripcion:  z.string().min(5, "Cuéntanos qué necesitas (medidas, código, aplicación...)"),
  info:         z.array(z.string()).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

type State =
  | { status: "idle" | "submitting" }
  | { status: "success"; quoteNumber: string; whatsappLink: string }
  | { status: "error"; message: string; whatsappLink: string };

function initialValues(nombre: string | null, tipo: string | null): Partial<QuoteFormData> {
  const base = { cantidad: 1, info: [] as string[], tipo: "", descripcion: "" };
  const opciones = TIPOS_DE_SOLICITUD as readonly string[];
  // ?tipo= (opcional) preselecciona la línea y ?nombre= queda como punto de partida de la
  // descripción (ej. tipo "Sensores" + nombre "Sensores inductivos").
  if (tipo && opciones.includes(tipo)) {
    return { ...base, tipo, descripcion: nombre && nombre !== tipo ? nombre : "" };
  }
  if (!nombre) return base;
  // Los botones "Solicitar cotización" del sitio mandan el nombre del servicio; si coincide
  // con una opción se preselecciona, si no, se usa como punto de partida de la descripción.
  if (opciones.includes(nombre)) return { ...base, tipo: nombre };
  return { ...base, tipo: "Otro", descripcion: nombre };
}

export function QuoteForm() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>({ status: "idle" });
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: initialValues(searchParams.get("nombre"), searchParams.get("tipo")),
  });

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFileError(null);
    const next = [...files];
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        setFileError(`Máximo ${MAX_FILES} archivos.`);
        break;
      }
      if (f.size > MAX_BYTES) {
        setFileError(`"${f.name}" supera los 10 MB.`);
        continue;
      }
      next.push(f);
    }
    setFiles(next);
  }

  function buildItems(data: Pick<QuoteFormData, "tipo" | "cantidad" | "descripcion">) {
    return [{ sku: "", name: data.tipo || "Solicitud de cotización", quantity: data.cantidad || 1, notes: data.descripcion }];
  }

  const onSubmit = async (data: QuoteFormData, event?: BaseSyntheticEvent) => {
    setState({ status: "submitting" });
    const items = buildItems(data);
    const whatsappLink = whatsappQuoteRequest(items, data.company_name);

    try {
      const urls: string[] = [];
      for (const file of files) {
        urls.push(await uploadAdjunto(file));
      }

      const message = [
        data.info && data.info.length > 0 ? `Información disponible: ${data.info.join(", ")}` : null,
        urls.length > 0 ? `Adjuntos:\n${urls.join("\n")}` : null,
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: data.company_name,
          contact_name: data.contact_name,
          email: data.email,
          phone: data.phone,
          rnc: data.rnc,
          city: data.city,
          items,
          message: message || undefined,
          // Anti-spam (ver src/lib/antispam.ts): campo trampa y momento en que se cargó el form.
          [HONEYPOT_FIELD]: honeypotValue(event),
          _t: startedAt,
        }),
      });
      if (!res.ok) throw new Error("No se pudo enviar la solicitud");
      const json = await res.json();
      setFiles([]);
      setState({ status: "success", quoteNumber: json.quote_number, whatsappLink });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Error desconocido",
        whatsappLink,
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-surface mb-2">Solicitud recibida</h3>
        <p className="text-steel-300 mb-6">
          Tu solicitud <span className="font-mono text-signal">{state.quoteNumber}</span> ya está en
          cola. Un ingeniero de Dynatech te contactará en menos de 24 horas hábiles.
        </p>
        <a href={state.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <WhatsAppIcon className="h-4 w-4" />
          Continuar por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Campo trampa: invisible para personas, los bots lo llenan. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>No llenar este campo</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {/* 01 · Qué necesitas */}
      <fieldset className="space-y-4">
        <legend className="eyebrow mb-4 pb-2 border-b border-black/10 w-full">01 · ¿Qué necesitas?</legend>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div className="sm:col-span-5">
            <Label htmlFor="tipo">Tipo de solicitud *</Label>
            <select
              id="tipo"
              {...register("tipo")}
              className="block w-full bg-carbon-800 border border-black/10 px-4 py-2.5 text-sm text-surface
                         focus:border-signal focus:ring-1 focus:ring-signal focus:outline-none rounded-xs transition-colors"
            >
              <option value="">Elige una opción…</option>
              {GRUPOS_DE_SOLICITUD.map((g) => (
                <optgroup key={g.label} label={g.label}>
                  {g.options.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </optgroup>
              ))}
              <option value="Otro">Otro</option>
            </select>
            {errors.tipo && <FieldError msg={errors.tipo.message!} />}
          </div>
          <div className="sm:col-span-1">
            <Label htmlFor="cantidad">Cant. *</Label>
            <Input id="cantidad" type="number" min="1" {...register("cantidad")} />
            {errors.cantidad && <FieldError msg={errors.cantidad.message!} />}
          </div>
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción / especificaciones *</Label>
          <Textarea
            id="descripcion"
            {...register("descripcion")}
            rows={4}
            placeholder="Qué necesitas: producto o servicio, código o referencia si la tienes, medidas, aplicación y urgencia."
          />
          {errors.descripcion && <FieldError msg={errors.descripcion.message!} />}
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-techno text-steel-300 mb-1.5">¿Con qué información cuentas?</span>
          <div className="flex flex-wrap gap-2">
            {INFO_DISPONIBLE.map((op) => (
              <label key={op} className="cursor-pointer">
                <input type="checkbox" value={op} {...register("info")} className="peer sr-only" />
                <span
                  className="inline-block border border-black/15 px-3 py-1.5 text-sm text-steel-300 transition-colors
                             peer-checked:border-signal peer-checked:bg-signal-soft peer-checked:text-signal
                             peer-focus-visible:ring-2 peer-focus-visible:ring-signal/40 hover:border-signal/40"
                >
                  {op}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="block font-mono text-[10px] uppercase tracking-techno text-steel-300 mb-1.5">
            Adjuntar plano o fotos (opcional, hasta {MAX_FILES})
          </span>
          {files.length > 0 && (
            <ul className="space-y-2 mb-2">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 border border-black/10 px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 min-w-0 text-steel-200">
                    <Paperclip className="h-4 w-4 shrink-0 text-steel-400" />
                    <span className="truncate">{f.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    aria-label={`Quitar ${f.name}`}
                    className="shrink-0 text-steel-400 hover:text-signal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {files.length < MAX_FILES && (
            <label
              htmlFor="adjuntos"
              className="flex items-center gap-2 border border-dashed border-black/20 px-3 py-3 text-sm text-steel-400
                         hover:border-signal/40 hover:text-signal transition-colors cursor-pointer"
            >
              <Paperclip className="h-4 w-4" />
              Elegir archivos (PDF, JPG, PNG o WEBP — máx. 10 MB c/u)
            </label>
          )}
          <input
            id="adjuntos"
            type="file"
            multiple
            accept={ACCEPT}
            className="sr-only"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          {fileError && <FieldError msg={fileError} />}
        </div>
      </fieldset>

      {/* 02 · Contacto */}
      <fieldset className="space-y-4">
        <legend className="eyebrow mb-4 pb-2 border-b border-black/10 w-full">02 · Tus datos</legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company_name">Empresa *</Label>
            <Input id="company_name" {...register("company_name")} placeholder="Industrias XYZ SRL" />
            {errors.company_name && <FieldError msg={errors.company_name.message!} />}
          </div>
          <div>
            <Label htmlFor="contact_name">Nombre de contacto *</Label>
            <Input id="contact_name" {...register("contact_name")} placeholder="Juan Pérez" />
            {errors.contact_name && <FieldError msg={errors.contact_name.message!} />}
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" {...register("email")} placeholder="compras@empresa.do" />
            {errors.email && <FieldError msg={errors.email.message!} />}
          </div>
          <div>
            <Label htmlFor="phone">Teléfono *</Label>
            <Input id="phone" type="tel" {...register("phone")} placeholder="(809) 555-1234" />
            {errors.phone && <FieldError msg={errors.phone.message!} />}
          </div>
          <div>
            <Label htmlFor="rnc">RNC (opcional)</Label>
            <Input id="rnc" {...register("rnc")} placeholder="1-30-12345-6" />
          </div>
          <div>
            <Label htmlFor="city">Ciudad (opcional)</Label>
            <Input id="city" {...register("city")} placeholder="Santo Domingo" />
          </div>
        </div>
      </fieldset>

      {state.status === "error" && (
        <div className="flex items-start gap-3 border border-signal/40 bg-signal/5 p-4">
          <AlertCircle className="h-5 w-5 text-signal shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-surface mb-1">No se pudo enviar</div>
            <div className="text-sm text-steel-300 mb-3">
              {state.message}. Puedes enviarnos la misma solicitud por WhatsApp.
            </div>
            <a
              href={state.whatsappLink}
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
        className="btn-primary w-full sm:w-auto px-8 py-4"
      >
        <Send className="h-4 w-4" />
        {state.status === "submitting" ? "Enviando..." : "Solicitar cotización"}
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
