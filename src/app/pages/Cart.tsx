import React, { useState } from "react";
import imgProduct from "figma:asset/28f9d735f4368ce680a1b628f52ec3a2079c6abc.png";
import { CartHeader } from "../components/cart/CartHeader";
import { CartCheckoutForm } from "../components/cart/CartCheckoutForm";
import { CartSummary, type CartItem } from "../components/cart/CartSummary";

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "HV Curved branch 90°", variant: "Galva / Untreated", price: 125.0, quantity: 2, image: imgProduct },
    { id: "2", name: "HV Curved branch 90°", variant: "Galva / Treated", price: 145.0, quantity: 1, image: imgProduct },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.0;
  const total = subtotal + shipping;

  return (
    <div className="w-full bg-white min-h-screen py-8 md:py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        <CartHeader />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-16">
          <CartCheckoutForm />
          <CartSummary cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  );
}
