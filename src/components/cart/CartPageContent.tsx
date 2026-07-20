"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { whatsappQuoteRequest } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function CartPageContent() {
  const { items, updateQuantity, removeItem, clearCart, totalCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="border border-black/10 p-12 text-center">
        <ShoppingCart className="h-10 w-10 text-steel-400 mx-auto mb-4" />
        <h2 className="font-display text-2xl text-surface mb-3">
          Tu carrito de cotización está vacío
        </h2>
        <p className="text-steel-300 max-w-md mx-auto mb-6">
          Agrega los productos que necesites desde el catálogo y solicita una sola cotización
          con todo lo que necesitás.
        </p>
        <Link href="/productos" className="btn-primary">
          Explorar catálogo
        </Link>
      </div>
    );
  }

  const whatsappHref = whatsappQuoteRequest(
    items.map((it) => ({ name: it.name, sku: it.sku, quantity: it.quantity })),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-steel-300">
          {totalCount} {totalCount === 1 ? "ítem" : "ítems"} en tu solicitud
        </p>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-steel-400 hover:text-signal transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="border border-black/10 divide-y divide-black/10 mb-8">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-4">
            <Link
              href={`/productos/${item.slug}`}
              className="relative h-16 w-16 shrink-0 bg-white border border-black/10 overflow-hidden"
            >
              {item.thumbnailUrl && (
                <Image src={item.thumbnailUrl} alt="" fill sizes="64px" className="object-contain p-1.5" />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/productos/${item.slug}`}
                className="block text-sm font-medium text-surface hover:text-signal transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <div className="font-mono text-[10px] uppercase tracking-techno text-steel-400 mt-1">
                SKU {item.sku} {item.brand && `· ${item.brand}`}
              </div>
            </div>

            <div className="flex items-center border border-black/10 shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="p-2 text-steel-300 hover:text-signal transition-colors"
                aria-label="Reducir cantidad"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-mono">{item.quantity}</span>
              <button
                type="button"
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="p-2 text-steel-300 hover:text-signal transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              className="p-2 text-steel-400 hover:text-signal transition-colors shrink-0"
              aria-label="Quitar del carrito"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Continuar por WhatsApp
        </a>
        <Link href="/cotizacion" className="btn-primary flex-1">
          Solicitar cotización formal
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
