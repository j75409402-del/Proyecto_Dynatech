"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setStatus("error");
      setError("Correo o contraseña incorrectos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="container-max py-24 max-w-sm">
      <div className="eyebrow mb-3">Panel interno</div>
      <h1 className="font-display text-display-md text-surface mb-8">Entrar</h1>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {status === "error" && (
          <div className="flex items-start gap-3 border border-signal/40 bg-signal/5 p-4">
            <AlertCircle className="h-5 w-5 text-signal shrink-0 mt-0.5" />
            <div className="text-sm text-steel-300">{error}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full"
        >
          <LogIn className="h-4 w-4" />
          {status === "submitting" ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
