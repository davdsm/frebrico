import React, { useRef, useMemo } from "react";
import svgPaths2 from "../../../imports/svg-vhld1ns7ue";
import { ContentLink } from "../../components/common/ContentLink";
import { useContent } from "../../content/useContent";
import { getApiBase } from "../../content/api";
import { FadeInUpInView } from "../../components/atoms/FadeInUpInView";
import { StaggeredFadeInUpInView } from "../../components/atoms/StaggeredFadeInUpInView";

type SolutionItem = { number: string; title: string; description: string; image?: string };

const defaultSolutions: SolutionItem[] = [
  { number: "01/03", title: "Vedações residenciais", description: "Soluções de vedação para habitação, jardins e perímetros residenciais, com foco em durabilidade e estética.", image: "" },
  { number: "02/03", title: "Redes metálicas", description: "Redes e malhas metálicas para aplicações agrícolas, industriais e de segurança.", image: "" },
  { number: "03/03", title: "Portões metálicos", description: "Portões automáticos e manuais para garagens, entradas e áreas industriais.", image: "" },
];

function normalizeSolutions(parsed: unknown): SolutionItem[] {
  if (!Array.isArray(parsed)) return defaultSolutions;
  return parsed.map((x) => ({
    number: typeof (x as SolutionItem)?.number === "string" ? (x as SolutionItem).number : "",
    title: typeof (x as SolutionItem)?.title === "string" ? (x as SolutionItem).title : "",
    description: typeof (x as SolutionItem)?.description === "string" ? (x as SolutionItem).description : "",
    image: typeof (x as SolutionItem)?.image === "string" ? (x as SolutionItem).image : "",
  }));
}

export function AboutSolutions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const title = useContent("about", "solutions", "title");
  const description = useContent("about", "solutions", "description");
  const ctaButton = useContent("about", "solutions", "cta_button");
  const ctaButtonUrl = useContent("about", "solutions", "cta_button_url");
  const itemsJson = useContent("about", "solutions", "items");
  const apiBase = getApiBase();
  const solutions = useMemo(() => {
    try {
      const parsed = itemsJson ? JSON.parse(itemsJson) : defaultSolutions;
      return normalizeSolutions(parsed);
    } catch {
      return defaultSolutions;
    }
  }, [itemsJson]);

  return (
    <FadeInUpInView>
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4">{title}</h2>
          <p className="text-base md:text-lg text-[#5a5a59] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="carousel-fade-wrapper-widescreen w-screen -ml-[50vw] left-[50%] relative mb-8 md:mb-12">
          <StaggeredFadeInUpInView
            ref={scrollContainerRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-16 justify-center"
            stagger={0.1}
          >
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-[20px] shrink-0 w-[280px] md:w-[360px] lg:w-[400px] border border-[#f1f1f1]">
                <div className="bg-[#f1f1f1] rounded-t-[20px] h-[200px] md:h-[240px] overflow-hidden">
                  {solution.image ? (
                    <img
                      src={`${apiBase}${solution.image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#5a5a59] mb-2">{solution.number}</p>
                  <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">{solution.title}</h3>
                  <p className="text-base text-[#5a5a59] leading-relaxed mb-4">{solution.description}</p>
                </div>
              </div>
            ))}
          </StaggeredFadeInUpInView>
        </div>

        <div className="flex justify-center">
          <ContentLink to={ctaButtonUrl} className="bg-[#313b2e] px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[#3d4937] transition-colors">
            <span className="text-white font-medium text-base">{ctaButton}</span>
            <svg className="w-6 h-6 shrink-0 align-middle" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths2.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M5.66699 8H9.66699" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths2.pe75ff00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </ContentLink>
        </div>
      </div>
      </section>
    </FadeInUpInView>
  );
}
