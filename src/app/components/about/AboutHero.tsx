import React from "react";
import svgPaths from "../../../imports/svg-wf7psdblus";

export function AboutHero() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <p className="text-[#313b2e] text-sm md:text-[14px] font-normal">
                Experiência sólida
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-semibold text-black leading-none whitespace-pre-wrap">
                Soluções de{"\n"}confiança.
              </h1>
            </div>

            <p className="text-base md:text-lg text-black/40 max-w-[428px] leading-relaxed">
              Fundada em 2004, a Frebrico nasceu com um objetivo
              claro: disponibilizar produtos fiáveis, duradouros
              e tecnicamente adequados, acompanhados por um
              serviço próximo e especializado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="h-12 px-6 py-3 rounded-full border border-[#dcdcdc] flex items-center justify-center hover:bg-black/5 transition-colors">
                <span className="text-lg font-semibold text-black">Saber Mais</span>
              </button>
              <button className="bg-[#313b2e] h-12 px-6 py-3 rounded-full flex items-center justify-center hover:bg-[#3d4937] transition-colors">
                <span className="text-lg font-semibold text-white">Contactos</span>
              </button>
            </div>

            <div className="flex gap-5 items-center h-[50px]">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="h-[43px] w-[37px] opacity-40">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 43">
                    <g clipPath="url(#clip0_5_45202)">
                      <path clipRule="evenodd" d={svgPaths.p2a5cad80} fill="black" fillOpacity="0.4" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p1f0c11f0} fill="black" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p3d7ee1b0} fill="black" fillOpacity="0.4" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.p136e1ac0} fill="black" fillOpacity="0.4" fillRule="evenodd" />
                    </g>
                    <defs>
                      <clipPath id="clip0_5_45202">
                        <rect fill="white" height="43" width="37" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f1f1f1] rounded-[20px] md:rounded-[32px] h-[300px] md:h-[400px] lg:h-[500px]" />
        </div>
      </div>
    </section>
  );
}
