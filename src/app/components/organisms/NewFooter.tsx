import React from "react";
import svgPaths from "../../../imports/svg-r95mhu04wd";
import { Button } from "../atoms/Button";
import {
  imgGroup,
  imgGroup1,
} from "../../../imports/svg-lx37m";

export function NewFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="bg-[#f7f7f7] rounded-[40px] px-6 md:px-12 lg:px-[50px] py-8 md:py-12 lg:py-[50px]">
          {/* Vamos Conversar Section */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#131313] mb-3 md:mb-4">
              Vamos Conversar
            </h2>
            <p className="text-base md:text-lg text-[#5a5a59] max-w-[599px] mb-4 md:mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua.
            </p>
            <button className="bg-[#313b2e] text-white px-8 py-4 rounded-[40px] flex items-center gap-2.5 hover:bg-[#3d4937] transition-colors">
              <span className="font-medium text-base">
                Contactos
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 16 16"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6.667"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.66667 8H9.66667"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33333 10L10.3333 8L8.33333 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#131313] opacity-10 mb-8 md:mb-12 lg:mb-16" />

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 mb-8 md:mb-12 lg:mb-16">
            {/* Left Column - Company Info */}
            <div className="flex flex-col gap-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="bg-[#3b3b3b] rounded-lg p-2.5 w-10 h-10 flex items-center justify-center">
                  <div className="relative w-[22px] h-[22px]">
                    <svg
                      className="absolute inset-0"
                      fill="none"
                      viewBox="0 0 22 22"
                    >
                      <path d="M0 0H22V22H0V0Z" fill="white" />
                    </svg>
                    <div
                      className="absolute inset-0"
                      style={{
                        WebkitMaskImage: `url('${imgGroup1}')`,
                        maskImage: `url('${imgGroup1}')`,
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        background:
                          "linear-gradient(180deg, #3C3C3C 0%, #000000 100%)",
                        mixBlendMode: "overlay",
                      }}
                    />
                  </div>
                </div>
                <span className="text-xl font-semibold text-[#131313]">
                  Frebrico
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-[#5a5a59] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                {/* Twitter */}
                <a
                  href="#"
                  className="border border-[rgba(19,19,19,0.1)] rounded-[40px] p-4 hover:bg-black/5 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d={svgPaths.p3fa7fa80}
                      fill="#131313"
                    />
                    <path d={svgPaths.p3e368c00} fill="white" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  className="border border-[rgba(19,19,19,0.1)] rounded-[40px] p-4 hover:bg-black/5 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d={svgPaths.p28ce4740}
                      fill="#131313"
                    />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  className="border border-[rgba(19,19,19,0.1)] rounded-[40px] p-4 hover:bg-black/5 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d={svgPaths.p35d17b00}
                      fill="#131313"
                    />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="border border-[rgba(19,19,19,0.1)] rounded-[40px] p-4 hover:bg-black/5 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d={svgPaths.p13132a00}
                      fill="#131313"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-[100px] text-[#131313]">
              {/* Loja */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Loja</h3>
                <ul className="flex flex-col gap-2 text-base">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Arames
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Redes de Vedação
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Teias
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Postes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Paineis de Vedação
                    </a>
                  </li>
                </ul>
              </div>

              {/* Empresa */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">
                  Empresa
                </h3>
                <ul className="flex flex-col gap-2 text-base">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Início
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Sobre Nós
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Produtos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Contactos
                    </a>
                  </li>
                </ul>
              </div>

              {/* Links Legais */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">
                  Links Legais
                </h3>
                <ul className="flex flex-col gap-2 text-base">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Termos e Condições
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#313b2e] transition-colors"
                    >
                      Livro de Reclamações
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-lg text-[#131313]">
            <p>© Frebrico Inc. All Rights Reserved.</p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
              aria-label="Voltar ao topo"
            >
              <span>Voltar ao topo</span>
              <div className="border border-[rgba(19,19,19,0.1)] rounded-[24px] p-2.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5M12 5l-6 6M12 5l6 6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}