import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Resuelve URL y claves soportando dos convenciones de nombres:
 *  - NEXT_PUBLIC_SUPABASE_* : las que incrustamos en build (setup manual)
 *  - SUPABASE_*             : las que agrega la integración Supabase↔Vercel (runtime)
 * Se lee dentro de la función pa' garantizar evaluación en tiempo de request.
 */
function resolveConfig() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan credenciales de Supabase. Define NEXT_PUBLIC_SUPABASE_URL y " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY (o SUPABASE_URL / SUPABASE_ANON_KEY) " +
        "en las variables de entorno.",
    );
  }
  return { url, anonKey, serviceKey };
}

export async function createClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = resolveConfig();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components can't set cookies — safe to ignore
        }
      },
    },
  });
}

/**
 * Client con service_role — SOLO usar en API routes protegidas o Server Actions.
 * Nunca importar desde Client Components. Bypasea RLS.
 */
export function createServiceClient() {
  const { url, serviceKey } = resolveConfig();

  return createServerClient<Database>(url, serviceKey!, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  });
}
