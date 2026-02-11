import React, { useState } from 'react';
import svgPaths from "../../../imports/svg-vhld1ns7ue";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordionItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div 
      className={`bg-white overflow-hidden relative rounded-[20px] shrink-0 w-full transition-all duration-300 ${
        isOpen ? 'h-auto' : 'h-[88px]'
      }`}
    >
      <p className="absolute font-semibold leading-normal left-[24px] text-[#131313] text-[20px] md:text-[24px] top-[28px] pr-[80px]">
        {question}
      </p>
      <button
        onClick={onToggle}
        className="absolute content-stretch flex items-center justify-center right-[16px] md:right-[24px] p-[12px] rounded-[24px] size-[40px] top-[24px] hover:bg-black/5 transition-colors"
      >
        <div className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
        <div className="relative shrink-0 size-[24px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <path 
              d="M6 12H18" 
              stroke="#131313" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="1.5" 
            />
            {!isOpen && (
              <path 
                d="M12 18V6" 
                stroke="#131313" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
              />
            )}
          </svg>
        </div>
      </button>
      {isOpen && (
        <p className="font-normal leading-normal left-[24px] text-[#5a5a59] text-[16px] md:text-[18px] mt-[71px] pb-[24px] px-[24px] pr-[24px] md:pr-[64px]">
          {answer}
        </p>
      )}
    </div>
  );
}

export function FAQSectionNew() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Que tipo de produtos a Frebrico comercializa?',
      answer: 'A Frebrico é especializada no comércio de produtos de bricolage, ferragens e soluções de vedação. A nossa oferta inclui vedações residenciais, agrícolas e industriais, redes metálicas, painéis soldados, postes, portões, fixações e diversos materiais de apoio à construção.'
    },
    {
      question: 'Prestam serviços de montagem de vedações?',
      answer: 'Sim, prestamos serviços completos de montagem e instalação de vedações. A nossa equipa técnica especializada garante uma instalação profissional e duradoura.'
    },
    {
      question: 'Posso pedir apoio técnico antes de comprar?',
      answer: 'Claro! A nossa equipa de apoio técnico está disponível para esclarecer todas as suas dúvidas e ajudá-lo a escolher a solução mais adequada às suas necessidades.'
    },
    {
      question: 'A Frebrico tem stock permanente?',
      answer: 'Sim, mantemos stock permanente dos nossos produtos principais. Para artigos específicos, podemos encomendar com prazos de entrega rápidos.'
    }
  ];

  return (
    <section className="w-full bg-[#f1f1f1] py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_640px] gap-8 lg:gap-12 xl:gap-20">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* FAQs Badge and Title */}
            <div className="flex flex-col gap-[12px]">
              <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[16px] py-[8px] rounded-[100px] w-fit">
                <p className="font-medium leading-normal text-[#5a5a59] text-[14px]">FAQs</p>
              </div>
              <h2 className="font-semibold leading-normal text-[40px] md:text-[48px] text-black whitespace-pre-wrap">
                Perguntas{'\n'}Frequentes
              </h2>
            </div>

            {/* White Card - Ainda existem dúvidas */}
            <div className="bg-white content-stretch flex flex-col gap-[24px] md:gap-[29px] items-start overflow-clip p-[24px] rounded-[20px] max-w-[508px]">
              <div className="content-stretch flex flex-col gap-[8px] items-start leading-normal w-full">
                <p className="font-semibold text-[#131313] text-[20px] md:text-[24px] w-full">
                  Ainda existem dúvidas?
                </p>
                <p className="font-normal text-[#5a5a59] text-[16px] md:text-[18px] w-full">
                  We're here to help you understand how we work, what we offer, how we can grow together, and build lasting brand impact.
                </p>
              </div>
              
              {/* Contactos Button */}
              <button className="bg-[#313b2e] content-stretch flex gap-[12px] items-center overflow-clip px-[32px] py-[16px] rounded-[32px] hover:bg-[#3d4937] transition-colors">
                <p className="font-medium leading-normal text-[16px] text-white">Contactos</p>
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] shrink-0">
                  <div className="relative size-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path 
                        d={svgPaths.p37fdd600} 
                        stroke="white" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                      />
                      <path 
                        d="M5.66699 8H9.66699" 
                        stroke="white" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                      />
                      <path 
                        d={svgPaths.pe75ff00} 
                        stroke="white" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="flex flex-col gap-[16px]">
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
