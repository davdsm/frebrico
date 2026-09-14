import React, { useMemo, useState } from "react";
import type { CartItem } from "../../cart/cartTypes";
import { useContent } from "../../content/useContent";
import { resolveImageUrl } from "../../api/shop";
import type { ShippingResult } from "../../cart/shippingUtils";
import { useCustomerAuth } from "../../auth/CustomerAuthContext";

const API_BASE = (() => {
  const raw =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE != null
      ? String(import.meta.env.VITE_API_BASE).replace(/\/$/, "")
      : "";
  return raw.endsWith("/api") ? raw.slice(0, -4) : raw;
})();

interface CartSummaryProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  subtotal: number;
  shipping: ShippingResult;
  total: number;
  couponCode: string;
  couponDiscount: number;
  onCouponApplied: (code: string, discount: number) => void;
  onCouponCleared: () => void;
}

export function CartSummary({
  cartItems,
  updateQuantity,
  removeItem,
  subtotal,
  shipping,
  total,
  couponCode,
  couponDiscount,
  onCouponApplied,
  onCouponCleared,
}: CartSummaryProps) {
  const summaryTitle = useContent("cart", "summary", "title");
  const discountPlaceholder = useContent("cart", "summary", "discount_placeholder");
  const applyButton = useContent("cart", "summary", "apply_button");
  const subtotalLabel = useContent("cart", "summary", "subtotal_label");
  const totalLabel = useContent("cart", "summary", "total_label");
  const currency = useContent("cart", "summary", "currency");
  const removeButton = useContent("cart", "summary", "remove_button");
  const { user } = useCustomerAuth();
  const [codeInput, setCodeInput] = useState(couponCode);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const showDiscount = Boolean(user?.showDiscountPercent);
  const discountMeta = useMemo(() => {
    if (!showDiscount) return null;
    let catalog = 0;
    let paid = 0;
    for (const item of cartItems) {
      const cat = item.catalogPrice != null ? item.catalogPrice : item.price;
      catalog += cat * item.quantity;
      paid += item.price * item.quantity;
    }
    if (catalog <= paid || catalog <= 0) return null;
    const pct = Math.round(((catalog - paid) / catalog) * 1000) / 10;
    return { catalog, paid, pct, saved: catalog - paid };
  }, [cartItems, showDiscount]);

  const applyCoupon = async () => {
    setCouponError("");
    const code = codeInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Indique um código.");
      return;
    }
    setCouponLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error || "Cupão inválido");
      onCouponApplied(String((data as { code: string }).code), Number((data as { discount: number }).discount));
    } catch (e) {
      onCouponCleared();
      setCouponError(e instanceof Error ? e.message : "Cupão inválido");
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <div className="lg:sticky lg:top-8 lg:self-start">
      <div className="bg-[#f7f7f7] rounded-[20px] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-black mb-6">{summaryTitle}</h2>

        <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-[#dcdcdc]">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-start">
              <div className="relative shrink-0">
                <div className="w-16 h-16 bg-white rounded-lg border border-[#dcdcdc] p-2">
                  <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#5a5a59] text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-black leading-tight">{item.name}</h3>
                <p className="text-xs text-[#5a5a59]">{item.variant}</p>
                {showDiscount &&
                  item.discountPercent != null &&
                  item.discountPercent > 0 &&
                  item.catalogPrice != null && (
                    <p className="text-xs text-emerald-700">
                      Catálogo €{item.catalogPrice.toFixed(2)} (−{item.discountPercent}%)
                    </p>
                  )}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center border border-[#dcdcdc] rounded hover:bg-white transition-colors"
                  >
                    <span className="text-sm font-medium">−</span>
                  </button>
                  <span className="text-sm font-medium text-black w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center border border-[#dcdcdc] rounded hover:bg-white transition-colors"
                  >
                    <span className="text-sm font-medium">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between sm:self-start self-end mt-1 sm:mt-0 gap-2">
                <div className="text-sm font-semibold text-black">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                >
                  <span>{removeButton}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 pb-6 border-b border-[#dcdcdc]">
          <div className="flex gap-2">
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder={discountPlaceholder}
              className="flex-1 px-4 py-3 border border-[#dcdcdc] rounded-lg text-sm text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={applyCoupon}
              disabled={couponLoading}
              className="px-6 py-3 bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white rounded-lg font-medium text-sm disabled:opacity-70"
            >
              {couponLoading ? "..." : applyButton}
            </button>
          </div>
          {couponError && <p className="text-xs text-red-600 mt-2">{couponError}</p>}
          {couponCode && couponDiscount > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-emerald-700">
                Cupão {couponCode} (−€{couponDiscount.toFixed(2)})
              </span>
              <button type="button" className="text-xs text-[#5a5a59] hover:underline" onClick={onCouponCleared}>
                Remover
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-base text-[#5a5a59]">{subtotalLabel}</span>
            <span className="text-base font-medium text-black">€{subtotal.toFixed(2)}</span>
          </div>
          {discountMeta && (
            <div className="flex items-center justify-between">
              <span className="text-base text-emerald-700">Desconto cliente (−{discountMeta.pct}%)</span>
              <span className="text-base font-medium text-emerald-700">−€{discountMeta.saved.toFixed(2)}</span>
            </div>
          )}
          {couponDiscount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-base text-[#5a5a59]">Cupão</span>
              <span className="text-base font-medium text-black">−€{couponDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-base text-[#5a5a59]">Portes</span>
            <span className={`text-base font-medium ${shipping.type === "free" ? "text-emerald-600" : "text-black"}`}>
              {shipping.label}
            </span>
          </div>
          {shipping.type === "on_request" && (
            <p className="text-xs text-[#5a5a59] leading-snug">
              O custo de envio será calculado e comunicado após a encomenda.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#313b2e]">
          <span className="text-lg font-semibold text-black">{totalLabel}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#5a5a59]">{currency}</span>
            <span className="text-2xl font-bold text-black">€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
