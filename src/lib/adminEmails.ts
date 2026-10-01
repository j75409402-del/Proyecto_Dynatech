/**
 * Correos con acceso al panel /admin. Se configura con ADMIN_EMAILS (separados por coma);
 * si no está definida, solo entra la cuenta de gerencia que existe hoy en Supabase Auth.
 * Tener sesión de Supabase NO basta: los registros de Auth pueden estar abiertos.
 */
export function adminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "dynatechgerencia@outlook.com";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && adminEmails().includes(email.toLowerCase());
}
