import React from "react";
import { Link } from "react-router";
import { Badge } from "../common/Badge";
import { PrimaryButton } from "../common/PrimaryButton";
import { SecondaryButton } from "../common/SecondaryButton";
import svgPaths from "../../../imports/svg-1kqjfus9mr";
import imgImage1 from "figma:asset/a1506335f9c1a5795534434dee96810d0a8b30ff.png";

export function ProductsHero() {
  const categories = [
    { name: "Arames", slug: "arames" },
    { name: "Vedações", slug: "vedacoes" },
    { name: "Correntes", slug: "correntes" },
  ];

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-[160px] md:py-16 lg:py-[136px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-20">
        {/* Top Section - Hero Content + Logos */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-[129px]">
          {/* Left - Hero Text & Buttons */}
          <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-auto">
            <div className="flex flex-col gap-6">
              <Badge variant="green">Produtos & Serviços</Badge>

              <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold text-black leading-none">
                Pensados para desempenho real
              </h1>
            </div>

            <p className="text-base md:text-lg text-black/40 max-w-[476px] leading-normal">
              Desenvolvidos para garantir durabilidade,
              segurança e fiabilidade em qualquer contexto.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryButton>Explorar produtos</PrimaryButton>

              <SecondaryButton
                icon={
                  <svg
                    className="block size-full"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      d={svgPaths.pb635400}
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                }
              >
                Apoio Técnico
              </SecondaryButton>
            </div>
          </div>

          {/* Right - Brand Logos */}
          <div className="hidden lg:flex gap-5 items-center h-[50px] opacity-20">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="h-[22px] w-[88px] relative overflow-hidden"
              >
                <img
                  alt=""
                  className="absolute h-[400%] left-0 max-w-none top-[-150%] w-full"
                  src={imgImage1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-[35px]">
          {categories.map((category, index) => (
            <Link key={index} to={`/category/${category.slug}`}>
              <div className="relative bg-[#f1f1f1] rounded-[26px] h-[200px] md:h-[214px] overflow-hidden group cursor-pointer hover:bg-[#e8e8e8] transition-colors">
                {/* Category Label */}
                <div className="absolute bottom-0 right-0 bg-white rounded-tl-[11px] px-6 py-4 h-[59px] flex items-center justify-center min-w-[146px]">
                  <p className="text-xl font-semibold text-black text-center">
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}