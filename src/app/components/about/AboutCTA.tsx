import React from "react";

export function AboutCTA() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="bg-[#f7f7f7] rounded-[40px] px-6 md:px-12 lg:px-[50px] py-8 md:py-12 lg:py-[50px] text-center">
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#131313] mb-4">Vamos Conversar</h2>
          <p className="text-base md:text-lg text-[#5a5a59] max-w-[599px] mx-auto mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-[#313b2e] text-white px-8 py-4 rounded-[40px] inline-flex items-center gap-2.5 hover:bg-[#3d4937] transition-colors">
            <span className="font-medium text-base">Contactar</span>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6.667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.66667 8H9.66667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.33333 10L10.3333 8L8.33333 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
