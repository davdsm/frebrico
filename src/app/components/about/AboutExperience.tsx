import React from "react";

export function AboutExperience() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-[#f7f7f7] rounded-[20px] p-6 md:p-8 h-full flex flex-col justify-between min-h-[320px] md:min-h-[420px]">
              <div>
                <p className="text-[#5a5a59] text-5xl md:text-6xl font-semibold mb-4">01</p>
                <h3 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-black leading-tight">
                  20+ anos de experiência em vedações e bricolage profissional
                </h3>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#f1f1f1] rounded-[20px] h-[280px] md:h-[360px] lg:h-[420px]" />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-[#f1f1f1] rounded-[20px] h-[280px] md:h-[360px] lg:h-[420px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
