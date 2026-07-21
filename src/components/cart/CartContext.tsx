"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  brand: string | null;
  thumbnailUrl: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (sku: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "dynatech-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // localStorage no disponible o corrupto — arrancamos con carrito vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  // Se identifica por SKU (no por productId) — un mismo producto maestro configurable
  // (ej. cilindro ISO con diámetro/carrera variables) comparte productId entre variantes
  // distintas, así que el SKU es lo único que identifica la variante exacta en el carrito.
  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.sku === item.sku);
      if (existing) {
        return prev.map((it) =>
          it.sku === item.sku
            ? { ...it, quantity: it.quantity + quantity }
            : it,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((it) => it.sku !== sku));
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    setItems((prev) => {
      if (quantity < 1) return prev.filter((it) => it.sku !== sku);
      return prev.map((it) => (it.sku === sku ? { ...it, quantity } : it));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (sku: string) => items.some((it) => it.sku === sku),
    [items],
  );

  const totalCount = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, totalCount, addItem, removeItem, updateQuantity, clearCart, isInCart }),
    [items, totalCount, addItem, removeItem, updateQuantity, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
