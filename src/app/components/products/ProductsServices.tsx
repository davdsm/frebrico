import React from 'react';
import svgPaths from '../../../imports/svg-pejq6ihdyp';
import { ContentLink } from '../common/ContentLink';
import { useContent, useContentJson } from '../../content/useContent';
import { FadeInUpInView } from '../atoms/FadeInUpInView';
import { StaggeredFadeInUpInView } from '../atoms/StaggeredFadeInUpInView';

type ServiceItem = { number: string; title: string; description: string };

export function ProductsServices() {
  const badge = useContent('products', 'services', 'badge');
  const title = useContent('products', 'services', 'title');
  const description = useContent('products', 'services', 'description');
  const buttonText = useContent('products', 'services', 'button');
  const buttonUrl = useContent('products', 'services', 'button_url');
  const servicesData = useContentJson<ServiceItem[]>('products', 'services', 'items', []);
  const servicesList = Array.isArray(servicesData) ? servicesData : [];
  const services = servicesList.map((s, i) => ({
    ...s,
    icon: (
      <svg key={i} className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d={[svgPaths.p19f41f00, svgPaths.p26d46d00, svgPaths.p37505780][i]} stroke={i === 1 ? "#F7F7F7" : "white"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    )
  }));

  return (
    <FadeInUpInView>
      <section className="w-full bg-[#f7f7f7] py-12 md:py-[70px] px-4 md:px-8 lg:px-20 relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 md:mb-10 lg:mb-12">
          <div className="bg-white px-4 py-2 rounded-[100px] mb-3">
            <p className="text-sm font-medium text-[#5a5a59] leading-normal">{badge}</p>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-[72px] font-semibold text-black leading-tight md:leading-[1.1] mb-3 text-center">
            {title}
          </h2>
          
          <p className="text-base md:text-lg text-[#5a5a59] max-w-[951px] text-center leading-relaxed whitespace-pre-wrap px-1 md:px-0">
            {description}
          </p>
        </div>

        {/* Service Cards */}
        <StaggeredFadeInUpInView className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 justify-items-center mb-8 md:mb-10" stagger={0.1}>
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[20px] w-full max-w-[400px] p-6 md:p-6 relative group shadow-[0_8px_24px_rgba(149,157,165,0.12)]"
            >
              <div className="flex flex-col gap-[26px] h-full">
                
                {/* Content */}
                <div className="flex flex-col gap-2 leading-normal whitespace-pre-wrap">
                  <p className="text-xl md:text-2xl font-semibold text-[#131313]">
                    {service.title}
                  </p>
                  <p className="text-sm md:text-base text-[#5a5a59]">
                    {service.description}
                  </p>
                </div>

                {/* Icon & Number */}
                <div className="flex items-end justify-between">
                  <div className="bg-[#313b2e] p-3 rounded-[24px] w-12 h-12 flex items-center justify-center">
                    <div className="w-6 h-6 shrink-0">
                      {service.icon}
                    </div>
                  </div>
                  
                  <p className="text-[32px] font-semibold text-[#5a5a59] leading-normal">
                    {service.number}
                  </p>
                </div>
              </div>

              {/* Arrow Button */}
              <button className="absolute top-0 right-0 bg-white w-10 h-10 rounded-[66px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 -scale-y-100 rotate-[135deg]">
                  <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                    <path d="M14 8H2" stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p120d7880} stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </StaggeredFadeInUpInView>

        {/* CTA Button */}
        <div className="flex justify-center">
          <ContentLink to={buttonUrl}>
            <button type="button" className="bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white px-8 py-4 rounded-[80px] inline-flex items-center justify-center gap-2.5">
              <span className="text-base font-medium leading-normal">{buttonText}</span>
              <svg className="w-6 h-6 shrink-0 align-middle" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </button>
          </ContentLink>
        </div>
      </div>
      </section>
    </FadeInUpInView>
  );
}