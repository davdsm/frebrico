import React from "react";
import { ContentLink } from "../common/ContentLink";
import { useContent } from "../../content/useContent";

export function CartCheckoutForm() {
  const contactTitle = useContent("cart", "checkout", "contact_title");
  const loginLink = useContent("cart", "checkout", "login_link");
  const loginLinkUrl = useContent("cart", "checkout", "login_link_url");
  const continueShopping = useContent("cart", "checkout", "continue_shopping");
  const continueShoppingUrl = useContent("cart", "checkout", "continue_shopping_url");
  const submitButton = useContent("cart", "checkout", "submit_button");
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">{contactTitle}</h2>
          <ContentLink to={loginLinkUrl} className="text-sm text-[#313b2e] hover:underline">
            {loginLink}
          </ContentLink>
        </div>
        <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-5 h-5 border-2 border-[#dcdcdc] rounded accent-[#313b2e]" />
          <span className="text-sm text-[#5a5a59]">Enviar-me novidades e ofertas por email</span>
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-black">Morada de envio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
          <input type="text" placeholder="Apelido" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        </div>
        <input type="text" placeholder="Morada" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <input type="text" placeholder="Apartamento, suite, etc. (opcional)" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Código Postal" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
          <input type="text" placeholder="Cidade" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
          <select className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors appearance-none bg-white" defaultValue="">
            <option value="" disabled>País/Região</option>
            <option value="PT">Portugal</option>
            <option value="ES">Espanha</option>
            <option value="FR">França</option>
          </select>
        </div>
        <input type="tel" placeholder="Telemóvel" className="w-full px-4 py-3 border border-[#dcdcdc] rounded-lg text-base text-black placeholder:text-[#5a5a59] focus:border-[#313b2e] focus:outline-none transition-colors" />
      </div>
      <div className="flex flex-col gap-4 pt-4 border-t border-[#dcdcdc]">
        <button type="submit" className="w-full bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white px-8 py-4 rounded-lg font-semibold text-base">
          {submitButton}
        </button>
        <ContentLink to={continueShoppingUrl} className="text-sm text-[#313b2e] hover:underline text-center">
          {continueShopping}
        </ContentLink>
      </div>
    </div>
  );
}
