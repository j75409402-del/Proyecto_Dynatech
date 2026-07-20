import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Carrito de cotización",
  description: "Revisa los productos que agregaste y solicita una cotización formal a Dynatech Ingeniería.",
};

export default function CartPage() {
  return (
    <div className="container-max max-w-3xl py-12 sm:py-16">
      <div className="eyebrow mb-3">Solicitud de cotización</div>
      <h1 className="font-display text-display-md text-surface mb-8">Carrito de cotización</h1>
      <CartPageContent />
    </div>
  );
}
