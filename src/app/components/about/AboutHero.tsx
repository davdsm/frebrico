import React from "react";
import svgPaths from "../../../imports/svg-wf7psdblus";
import { ContentLink } from "../../components/common/ContentLink";
import { useContent } from "../../content/useContent";
import { getApiBase } from "../../content/api";
import { FadeInUpInView } from "../../components/atoms/FadeInUpInView";

export function AboutHero() {
  const badge = useContent("about", "hero", "badge");
  const title = useContent("about", "hero", "title");
  const description = useContent("about", "hero", "description");
  const ctaPrimary = useContent("about", "hero", "cta_primary");
  const ctaPrimaryUrl = useContent("about", "hero", "cta_primary_url");
  const ctaSecondary = useContent("about", "hero", "cta_secondary");
  const ctaSecondaryUrl = useContent("about", "hero", "cta_secondary_url");
  const image = useContent("about", "hero", "image");
  const apiBase = getApiBase();

  return (
      <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeInUpInView>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <p className="text-[#313b2e] text-sm md:text-[14px] font-normal">
                {badge}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-semibold text-black leading-none whitespace-pre-wrap">
                {title}
              </h1>
            </div>

            <p className="text-base md:text-lg text-black/40 max-w-[428px] leading-relaxed">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <ContentLink to={ctaPrimaryUrl} className="h-12 px-6 py-3 rounded-full border border-[#dcdcdc] flex items-center justify-center hover:bg-black/5 transition-colors">
                <span className="text-lg font-semibold text-black">{ctaPrimary}</span>
              </ContentLink>
              <ContentLink to={ctaSecondaryUrl} className="bg-[#313b2e] h-12 px-6 py-3 rounded-full flex items-center justify-center hover:bg-[#3d4937] transition-colors">
                <span className="text-lg font-semibold text-white">{ctaSecondary}</span>
              </ContentLink>
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
          </FadeInUpInView>

          <FadeInUpInView delay={0.1}>
          <div className="bg-[#f1f1f1] rounded-[20px] md:rounded-[32px] h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            {image ? (
              <img src={apiBase + image} alt="" className="w-full h-full object-cover" />
            ) : null}
          </div>
          </FadeInUpInView>
        </div>
      </div>
      </section>
  );
}
