import React from "react";
import { Link } from "react-router";

export function CartHeader() {
  return (
    <div className="mb-8 md:mb-12">
      <Link to="/" className="text-sm font-medium text-[#667085] hover:text-[#313b2e] transition-colors inline-flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
          <path d="M10 4L6 8L10 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Voltar à loja
      </Link>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black">
        Finalizar Compra
      </h1>
    </div>
  );
}
