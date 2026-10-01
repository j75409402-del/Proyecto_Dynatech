import { redirect } from "next/navigation";
import { whatsappGeneral } from "@/lib/whatsapp";

export default function CotizacionPage() {
  redirect(whatsappGeneral());
}
