import React, { useRef } from "react";
import svgPaths2 from "../../../imports/svg-vhld1ns7ue";

export function AboutSolutions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const solutions = [
    { number: "01/03", title: "Vedações residenciais", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { number: "02/03", title: "Redes metálicas", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { number: "03/03", title: "Portões metálicos", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4">Soluções Completas</h2>
          <p className="text-base md:text-lg text-[#5a5a59] max-w-2xl leading-relaxed">
            As nossas áreas de foco. Criámos soluções para cada área de mercado considerando as exigências específicas: tipos de utilização, níveis de segurança e estética do espaço.
          </p>
        </div>

        <div className="carousel-fade-wrapper-widescreen w-screen -ml-[50vw] left-[50%] relative mb-8 md:mb-12">
          <div ref={scrollContainerRef} className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-16 justify-center">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-[20px] shrink-0 w-[280px] md:w-[360px] lg:w-[400px] border border-[#f1f1f1]">
                <div className="bg-[#f1f1f1] rounded-t-[20px] h-[200px] md:h-[240px]" />
                <div className="p-6">
                  <p className="text-sm text-[#5a5a59] mb-2">{solution.number}</p>
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">{solution.title}</h3>
                  <p className="text-base text-[#5a5a59] leading-relaxed mb-4">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-[#313b2e] px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[#3d4937] transition-colors">
            <span className="text-white font-medium text-base">Ver Tudo</span>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths2.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M5.66699 8H9.66699" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths2.pe75ff00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
