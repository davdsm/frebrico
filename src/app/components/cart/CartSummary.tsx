import React from "react";

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSummaryProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  subtotal: number;
  shipping: number;
  total: number;
}

export function CartSummary({ cartItems, updateQuantity, removeItem, subtotal, shipping, total }: CartSummaryProps) {
  return (
    <div className="lg:sticky lg:top-8 lg:self-start">
      <div className="bg-[#f7f7f7] rounded-[20px] p-6 md:p-8">
        <h2 className="text-xl font-semibold text-black mb-6">Resumo do Pedido</h2>

        <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-[#dcdcdc]">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 bg-white rounded-lg border border-[#dcdcdc] p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#5a5a59] text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-black leading-tight">{item.name}</h3>
                <p className="text-xs text-[#5a5a59]">{item.variant}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center border border-[#dcdcdc] rounded hover:bg-white transition-colors">
                    <span className="text-sm font-medium">−</span>
                  </button>
                  <span className="text-sm font-medium text-black w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center border border-[#dcdcdc] rounded hover:bg-white transition-colors">
                    <span className="text-sm font-medium">+</span>
                  </button>
                  <button onClick={() => removeItem(item.id)} className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.75 4.5h4.5" />
                      <path d="M4.5 6.75h15" />
                      <path d="M18 6.75 17.25 18a1.5 1.5 0 0 1-1.5 1.5h-7.5A1.5 1.5 0 0 1 6.75 18L6 6.75" />
                    </svg>
                    <span>Remover</span>
                  </button>
                </div>
              </div>
              <div className="text-sm font-semibold text-black">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 pb-6 border-b border-[#dcdcdc]">
          <div className="flex gap-2">
            <input type="text" placeholder="Código de desconto" className="flex-1 px-4 py-3 border border-[#dcdcdc] rounded-lg text-sm text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
            <button className="px-6 py-3 bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white rounded-lg font-medium text-sm">Aplicar</button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-base text-[#5a5a59]">Subtotal</span>
            <span className="text-base font-medium text-black">€{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-[#5a5a59]">Envio</span>
            <span className="text-base font-medium text-black">€{shipping.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#313b2e]">
          <span className="text-lg font-semibold text-black">Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-[#5a5a59]">EUR</span>
            <span className="text-2xl font-bold text-black">€{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
