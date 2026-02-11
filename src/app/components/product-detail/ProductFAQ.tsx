import React, { useState } from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../imports/svg-qsv76ypar4';

interface FAQItem {
  question: string;
  answer: string;
}

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs: FAQItem[] = [
    {
      question: 'A Frebrico consegue gerir um projeto completo?',
      answer: 'Sim. Acompanhamos todo o processo, desde a análise técnica e engenharia até ao fabrico, instalação e testes finais.'
    },
    {
      question: 'Os sistemas cumprem normas e regulamentação?',
      answer: 'Sim, todos os nossos sistemas são projetados e fabricados de acordo com as normas e regulamentações aplicáveis.'
    },
    {
      question: 'Disponibilizam assistência técnica e manutenção?',
      answer: 'Sim, oferecemos serviços completos de assistência técnica e manutenção para garantir o melhor desempenho dos nossos produtos.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-[#f7f7f7] py-16 md:py-20 lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-[129px] mb-12 md:mb-16 lg:mb-20">
          
          {/* Left - Title */}
          <div className="flex flex-col gap-6">
            <div className="bg-white px-4 py-2 rounded-[100px] inline-flex self-start">
              <p className="text-sm font-medium text-[#5a5a59] leading-normal">FAQs</p>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[72px] font-semibold text-[#1e1b13] leading-none lg:leading-[74px]">
              Perguntas<br />Frequentes
            </h2>
          </div>

          {/* Right - Description & CTA */}
          <div className="flex flex-col gap-6 lg:pt-[47px] max-w-[442px]">
            <p className="text-lg text-[#5a5a59] leading-normal">
              Encontra aqui as respostas para as perguntas que nos fazem mais vezes.
            </p>
            
            <Link to="/contact">
              <button className="bg-[#36474f] hover:bg-[#3d4937] transition-colors text-white px-8 py-4 rounded-[80px] inline-flex items-center justify-center gap-2.5">
                <span className="text-base font-medium leading-normal">Vamos Conversar</span>
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-8 lg:gap-10">
          
          {/* Left - Image Placeholder */}
          <div className="bg-white rounded-[20px] p-3.5 hidden lg:block">
            <div className="bg-[#eee] rounded-[12px] w-full h-[352px]" />
          </div>

          {/* Right - FAQ Items */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'rounded-[20px]' 
                    : 'rounded-[12px]'
                }`}
              >
                <div className="relative">
                  {/* Question */}
                  <div className={`${openIndex === index ? 'px-6 pt-[29px] pb-4' : 'px-6 py-[28px]'}`}>
                    <p className="text-2xl font-semibold text-[#131313] leading-normal pr-14">
                      {faq.question}
                    </p>
                  </div>

                  {/* Answer (only shown when open) */}
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-lg text-[#5a5a59] leading-normal max-w-[552px]">
                        {faq.answer}
                      </p>
                    </div>
                  )}

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`absolute ${
                      openIndex === index ? 'top-6 right-6' : 'top-6 right-6'
                    } w-10 h-10 rounded-[24px] border border-[rgba(19,19,19,0.1)] flex items-center justify-center hover:bg-[#f7f7f7] transition-colors`}
                  >
                    {openIndex === index ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d="M6 12H18" stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d="M6 12H18" stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        <path d="M12 18V6" stroke="#131313" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}