import React from "react";
import { FAQItem } from "../molecules/FAQItem";
import { Button } from "../atoms/Button";

export function FAQSection() {
  const faqs = [
    {
      question: "Onde colocar dúvidas?",
      answer:
        "Pode entrar em contacto connosco através do email info@frebrico.com ou através do nosso número de telefone. A nossa equipa está disponível para esclarecer todas as suas dúvidas.",
    },
    {
      question:
        "Que tipo de soluções e instalação comercializa?",
      answer:
        "Oferecemos uma vasta gama de soluções em vedações, bricolage e construção, incluindo instalação profissional e garantia de qualidade.",
    },
    {
      question: "Prazo pelo qual responderemos?",
      answer:
        "Respondemos a todos os contactos no prazo máximo de 24 horas úteis. Para situações urgentes, disponibilizamos contacto telefónico direto.",
    },
    {
      question: "A Frebrico tem stock permanente?",
      answer:
        "Sim, mantemos stock permanente dos nossos produtos principais. Para artigos específicos, podemos encomendar com prazos de entrega rápidos.",
    },
  ];

  return (
    <section className="w-full bg-[#f1f1f1] py-16 md:py-32">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Left Column - FAQ Title */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Perguntas
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Frequentes
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div>
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}