import React from "react";
import svgPaths from "../../../imports/svg-ksvalsn2ex";

export function ContactForm() {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-[464px]">
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div className="flex flex-col gap-4 w-full sm:w-[220px]">
          <label className="text-base font-medium leading-normal text-black/40">Nome</label>
          <input type="text" placeholder="David" className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors" />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-[220px]">
          <label className="text-base font-medium leading-normal text-black/40">Apelido</label>
          <input type="text" placeholder="Teste Apelido" className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors" />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="text-base font-medium leading-normal text-black/40">EMAIL</label>
        <input type="email" placeholder="hello@sazconpt.co" className="h-12 w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors" />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="text-base font-medium leading-normal text-black/40">Mensagem</label>
        <textarea placeholder="Omega Orion" className="h-[177px] w-full px-4 py-3 rounded-xl border border-[#dcdcdc] text-lg leading-normal text-black outline-none focus:border-[#313b2e] transition-colors resize-none" />
      </div>

      <button className="bg-[#313b2e] hover:bg-[#3d4937] transition-colors rounded-[40px] px-8 py-4 flex items-center justify-center gap-2.5 w-fit">
        <span className="text-base font-bold leading-normal text-white">Mandar Mensagem</span>
        <div className="w-6 h-6 shrink-0 flex items-center justify-center">
          <svg className="block size-full align-middle" fill="none" viewBox="0 0 16 16">
            <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </button>
    </div>
  );
}
