import React from "react";
import { CartHeader } from "../components/cart/CartHeader";
import { CartCheckoutForm } from "../components/cart/CartCheckoutForm";
import { CartSummary } from "../components/cart/CartSummary";
import { useCart } from "../cart/CartContext";
import { SEO } from "../components/common/SEO";
import { useContent } from "../content/useContent";
import { DominoFadeInDown } from "../components/atoms/DominoFadeInDown";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const total = subtotal;
  const seoTitle = useContent("cart", "seo", "title");
  const seoDescription = useContent("cart", "seo", "description");

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path="/cart" />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <div className="w-full bg-white min-h-screen py-8 md:py-12">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
            <CartHeader />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-16">
              <CartCheckoutForm />
              <CartSummary
                cartItems={items}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                subtotal={subtotal}
                total={total}
              />
            </div>
          </div>
        </div>
      </DominoFadeInDown>
    </>
  );
}
