import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "./cartTypes";

interface AddCartItemInput {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  productId?: number;
  variantKey?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: AddCartItemInput) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "frebrico_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item): item is CartItem =>
          item &&
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          typeof item.variant === "string" &&
          typeof item.price === "number" &&
          typeof item.quantity === "number" &&
          typeof item.image === "string"
      );
    } catch {
      return [];
    }
  });

  const addItem = (input: AddCartItemInput) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === input.id && item.variant === input.variant
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem: CartItem = {
        ...input,
        quantity: 1,
      };

      return [...prev, newItem];
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const { totalCount, subtotal } = useMemo(() => {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { totalCount, subtotal };
  }, [items]);

  // Persist cart to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

