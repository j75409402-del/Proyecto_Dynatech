"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Plus, Trash2, Send, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const quoteSchema = z.object({
  company_name: z.string().min(2, "Nombre de empresa requerido"),
  contact_name: z.string().min(2, "Tu nombre es requerido"),
  email:        z.string().email("Email inválido"),
  phone:        z.string().min(8, "Teléfono requerido"),
  rnc:          z.string().optional(),
  city:         z.string().optional(),
  items: z.array(z.object({
    sku:      z.string().optional(),
    name:     z.string().min(2, "Descripción del ítem requerida"),
    quantity: z.coerce.number().min(1, "Mínimo 1"),
    notes:    z.string().optional(),
  })).min(1, "Agrega al menos un ítem"),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const searchParams = useSearchParams();
  const prefilledSku = searchParams.get("sku") ?? "";
  const prefilledName = searchParams.get("nombre") ?? "";

  const [state, setState] = useState<
    { status: "idle" | "submitting" } |
    { status: "success"; quoteNumber: string } |
    { status: "error"; message: string }
  >({ status: "idle" });

  const { register, control, handleSubmit, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      items: [{ sku: prefilledSku, name: prefilledName, quantity: 1, notes: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data: QuoteFormData) => {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo enviar la cotización");
      const json = await res.json();
      setState({ status: "success", quoteNumber: json.quote_number });
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
        <h3 className="font-display text-2xl text-surface mb-2">
          Cotización recibida
        </h3>
        <p className="text-steel-300 mb-4">
          Tu solicitud <span className="font-mono text-signal">{state.quoteNumber}</span> ya
          está en cola. Un ingeniero de Dynatech te contactará en menos de 24 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Datos empresa */}
      <fieldset className="space-y-4">
        <legend className="eyebrow mb-4 pb-2 border-b border-black/10 w-full">
          01 · Datos de la empresa
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company_name">Empresa *</Label>
            <Input id="company_name" {...register("company_name")} placeholder="Industrias XYZ SRL" />
            {errors.company_name && <FieldError msg={errors.company_name.message!} />}
          </div>
          <div>
            <Label htmlFor="rnc">RNC (opcional)</Label>
            <Input id="rnc" {...register("rnc")} placeholder="1-30-12345-6" />
          </div>
          <div>
            <Label htmlFor="contact_name">Nombre de contacto *</Label>
            <Input id="contact_name" {...register("contact_name")} placeholder="Juan Pérez" />
            {errors.contact_name && <FieldError msg={errors.contact_name.message!} />}
          </div>
          <div>
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" {...register("city")} placeholder="Santo Domingo" />
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
        </div>
      </fieldset>

      {/* Ítems */}
      <fieldset className="space-y-4">
        <legend className="eyebrow mb-4 pb-2 border-b border-black/10 w-full">
          02 · Ítems a cotizar
        </legend>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-black/10 p-4 bg-carbon-800">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-signal">
                  ÍTEM {String(index + 1).padStart(2, "0")}
                </span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-steel-400 hover:text-signal transition-colors"
                    aria-label="Eliminar ítem"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                <div className="sm:col-span-2">
                  <Label htmlFor={`items.${index}.sku`}>SKU / referencia</Label>
                  <Input
                    id={`items.${index}.sku`}
                    {...register(`items.${index}.sku`)}
                    placeholder="Opcional"
                  />
                </div>
                <div className="sm:col-span-3">
                  <Label htmlFor={`items.${index}.name`}>Descripción *</Label>
                  <Input
                    id={`items.${index}.name`}
                    {...register(`items.${index}.name`)}
                    placeholder="Cilindro neumático 32x100"
                  />
                  {errors.items?.[index]?.name && (
                    <FieldError msg={errors.items[index]!.name!.message!} />
                  )}
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor={`items.${index}.quantity`}>Cant. *</Label>
                  <Input
                    id={`items.${index}.quantity`}
                    type="number"
                    min="1"
                    {...register(`items.${index}.quantity`)}
                  />
                </div>
                <div className="sm:col-span-6">
                  <Label htmlFor={`items.${index}.notes`}>Notas (opcional)</Label>
                  <Input
                    id={`items.${index}.notes`}
                    {...register(`items.${index}.notes`)}
                    placeholder="Especificaciones adicionales, aplicación, urgencia..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ sku: "", name: "", quantity: 1, notes: "" })}
          className="btn-secondary w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Agregar otro ítem
        </button>
      </fieldset>

      {/* Mensaje adicional */}
      <fieldset>
        <legend className="eyebrow mb-4 pb-2 border-b border-black/10 w-full">
          03 · Información adicional
        </legend>
        <Label htmlFor="message">¿Algo más que debamos saber?</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Aplicación, urgencia, condiciones especiales..."
          rows={4}
        />
      </fieldset>

      {state.status === "error" && (
        <div className="flex items-start gap-3 border border-signal/40 bg-signal/5 p-4">
          <AlertCircle className="h-5 w-5 text-signal shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-surface mb-1">No se pudo enviar</div>
            <div className="text-sm text-steel-300">{state.message}</div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="btn-primary w-full sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {state.status === "submitting" ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p className="mt-1 text-xs text-signal font-mono">{msg}</p>;
}
