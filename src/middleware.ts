import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Se usa middleware.ts (runtime edge) y no proxy.ts (runtime Node de Next 16) porque el
// adaptador de Cloudflare (OpenNext) todavía no soporta el middleware en Node.
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
