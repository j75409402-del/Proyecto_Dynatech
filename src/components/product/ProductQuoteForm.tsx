"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Paperclip, Send, CheckCircle2, AlertCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  sku: string;
  productName: string;
};

// Mismo nivel de validación que ContactForm/QuoteForm (zod + react-hook-form) — antes este
// formulario solo tenía `required` nativo de HTML, sin mensajes de error por campo ni
// validación de formato (ver auditoría pre-lanzamiento).
const productQuoteSchema = z.object({
  nombre: z.string().min(2, "Tu nombre es requerido"),
  empresa: z.string().min(2, "Nombre de empresa requerido"),
  correo: z.string().email("Email inválido"),
  telefono: z.string().min(8, "Teléfono requerido"),
  cantidad: z.coerce.number().int("Cantidad inválida").min(1, "Mínimo 1"),
  comentario: z.string().optional(),
});

type ProductQuoteFormData = z.infer<typeof productQuoteSchema>;

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function ProductQuoteForm({ sku, productName }: Props) {
  const [state, setState] = useState<State>({ status: "idle" });
  const [file, setFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductQuoteFormData>({
    resolver: zodResolver(productQuoteSchema),
    defaultValues: { cantidad: 1 },
  });

  const onSubmit = async (data: ProductQuoteFormData) => {
    setState({ status: "submitting" });

    try {
      let attachmentUrl: string | null = null;
      if (file) {
        const uploadForm = new FormData();
        uploadForm.append("file", file);
        const uploadRes = await fetch("/api/upload-adjunto", { method: "POST", body: uploadForm });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error ?? "No se pudo subir el adjunto");
        attachmentUrl = uploadJson.url;
      }

      const message = [data.comentario?.trim(), attachmentUrl ? `Adjunto: ${attachmentUrl}` : null]
        .filter(Boolean)
        .join("\n\n");

      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: data.empresa,
          contact_name: data.nombre,
          email: data.correo,
          phone: data.telefono,
          items: [{ sku, name: productName, quantity: data.cantidad }],
          message,
        }),
      });

      if (!res.ok) throw new Error("No se pudo enviar la solicitud");
      setState({ status: "success" });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Error desconocido",
      });
    }
  };

  if (state.status === "success") {
    return (
      <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
        <div className="font-display text-lg text-surface mb-1">Solicitud enviada</div>
        <p className="text-sm text-steel-300">
          Un ingeniero de Dynatech te contactará en menos de 24 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pq-nombre">Nombre *</Label>
          <Input id="pq-nombre" {...register("nombre")} placeholder="Juan Pérez" />
          {errors.nombre && <FieldError msg={errors.nombre.message!} />}
        </div>
        <div>
          <Label htmlFor="pq-empresa">Empresa *</Label>
          <Input id="pq-empresa" {...register("empresa")} placeholder="Industrias XYZ SRL" />
          {errors.empresa && <FieldError msg={errors.empresa.message!} />}
        </div>
        <div>
          <Label htmlFor="pq-correo">Correo *</Label>
          <Input id="pq-correo" type="email" {...register("correo")} placeholder="compras@empresa.do" />
          {errors.correo && <FieldError msg={errors.correo.message!} />}
        </div>
        <div>
          <Label htmlFor="pq-telefono">Teléfono *</Label>
          <Input id="pq-telefono" type="tel" {...register("telefono")} placeholder="(809) 555-1234" />
          {errors.telefono && <FieldError msg={errors.telefono.message!} />}
        </div>
        <div>
          <Label htmlFor="pq-producto">Producto</Label>
          <Input id="pq-producto" value={productName} readOnly className="bg-carbon-800 text-steel-400" />
        </div>
        <div>
          <Label htmlFor="pq-cantidad">Cantidad *</Label>
          <Input id="pq-cantidad" type="number" min="1" {...register("cantidad")} />
          {errors.cantidad && <FieldError msg={errors.cantidad.message!} />}
        </div>
      </div>

      <div>
        <Label htmlFor="pq-comentario">Comentario</Label>
        <Textarea id="pq-comentario" {...register("comentario")} rows={3} placeholder="Aplicación, urgencia, especificaciones..." />
      </div>

      <div>
        <Label htmlFor="pq-archivo">Adjuntar foto o archivo (opcional)</Label>
        {file ? (
          <div className="flex items-center justify-between gap-3 border border-black/10 px-3 py-2.5 text-sm">
            <span className="flex items-center gap-2 min-w-0 text-steel-200">
              <Paperclip className="h-4 w-4 shrink-0 text-steel-400" />
              <span className="truncate">{file.name}</span>
            </span>
            <button type="button" onClick={() => setFile(null)} aria-label="Quitar archivo" className="shrink-0 text-steel-400 hover:text-signal">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="pq-archivo"
            className="flex items-center gap-2 border border-dashed border-black/20 px-3 py-2.5 text-sm text-steel-400
                       hover:border-signal/40 hover:text-signal transition-colors cursor-pointer"
          >
            <Paperclip className="h-4 w-4" />
            Elegir archivo (PDF, JPG, PNG — máx. 10MB)
          </label>
        )}
        <input
          id="pq-archivo"
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      {state.status === "error" && (
        <div className="flex items-start gap-3 border border-signal/40 bg-signal/5 p-3">
          <AlertCircle className="h-4 w-4 text-signal shrink-0 mt-0.5" />
          <div className="text-sm text-steel-300">{state.message}</div>
        </div>
      )}

      <button type="submit" disabled={state.status === "submitting"} className="btn-primary w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {state.status === "submitting" ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p className="mt-1 text-xs text-signal font-mono">{msg}</p>;
}
