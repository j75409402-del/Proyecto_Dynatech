import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminEmails";

export { isAdminEmail };

/** Usuario autenticado Y autorizado, o null. */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user && isAdminEmail(user.email) ? user : null;
}
