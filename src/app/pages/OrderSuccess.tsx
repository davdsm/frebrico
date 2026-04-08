import React from "react";
import { Link, useSearchParams } from "react-router";

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order") || "";

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-10 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#e5e5e3] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-7 md:p-10">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#5a5a59] mb-2">Encomenda concluida</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#131313] mb-3">
            Obrigado! A sua encomenda foi recebida.
          </h1>
          <p className="text-[#5a5a59] text-base md:text-lg">
            Recebemos o seu pedido e vamos trata-lo o mais rapidamente possivel.
          </p>

          {orderNumber && (
            <div className="mt-7 rounded-2xl border border-[#dcdcdc] bg-[#fafaf9] px-5 py-4">
              <p className="text-sm text-[#5a5a59]">Numero da encomenda</p>
              <p className="text-xl font-semibold text-[#131313] mt-1">{orderNumber}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/account/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#313b2e] hover:bg-[#3d4937] text-white font-semibold transition-colors"
            >
              Ver minha conta
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#dcdcdc] text-[#313b2e] font-semibold hover:bg-[#f7f7f5] transition-colors"
            >
              Continuar a comprar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
