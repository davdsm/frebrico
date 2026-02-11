import React from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../imports/svg-pejq6ihdyp';

export function ProductsServices() {
  const services = [
    {
      number: '01',
      title: 'Apoio técnico',
      description: 'Aconselhamento para escolher os produtos mais adequados a cada aplicação com  segurança e durabilidade.',
      icon: (
        <svg className="block size-full" fill="none" viewBox="0 0 24 24">
          <path d={svgPaths.p19f41f00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Orçamentos à medida',
      description: 'Propostas claras e personalizados, ajustadas às necessidades reais de cada projeto, sem compromisso.',
      icon: (
        <svg className="block size-full" fill="none" viewBox="0 0 24 24">
          <path d={svgPaths.p26d46d00} stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Execução e montagem',
      description: 'Serviços de montagem dos nossos produtos através de parceiros especializados, com resultados profissionais e duradouros.',
      icon: (
        <svg className="block size-full" fill="none" viewBox="0 0 24 24">
          <path d={svgPaths.p37505780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-[#f7f7f7] py-[70px] px-4 md:px-8 lg:px-20 relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-[237px]">
          <div className="bg-white px-4 py-2 rounded-[100px] mb-3">
            <p className="text-sm font-medium text-[#5a5a59] leading-normal">Serviços</p>
          </div>
          
          <h2 className="text-[72px] font-semibold text-black leading-[74px] mb-2 text-center">
            Soluções que vão além do produto
          </h2>
          
          <p className="text-lg text-[#5a5a59] max-w-[951px] text-center leading-normal whitespace-pre-wrap">
            Dispomos de serviços especializados que complementam a nossa gama de produtos, garantindo apoio técnico, orçamentos ajustados e execução profissional para que cada projeto seja realizado com segurança, eficiência e durabilidade.
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex gap-10 justify-center mb-[60px]">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[20px] w-[400px] h-[222px] p-6 relative group">
              <div className="flex flex-col gap-[26px] h-full">
                
                {/* Content */}
                <div className="flex flex-col gap-2 leading-normal whitespace-pre-wrap">
                  <p className="text-2xl font-semibold text-[#131313]">
                    {service.title}
                  </p>
                  <p className="text-lg text-[#5a5a59]">
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
                <div className="w-4 h-4 -scale-y-100 rotate-[135deg]">
                  <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                    <path d="M14 8H2" stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p120d7880} stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link to="/contact">
            <button className="bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white px-8 py-4 rounded-[80px] inline-flex items-center justify-center gap-2.5">
              <span className="text-base font-medium leading-normal">Contactos</span>
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}