import React from 'react';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import imgFeature from "figma:asset/2bb6574b0734ce3219f7f1db98d1151bdad77901.png";

export function FeaturesSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#f5f5f5] to-white py-16 md:py-32">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-12 mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-full lg:max-w-[518px] leading-tight">
            Cada espaço tem desafios diferentes.
          </h2>
          <p className="text-base md:text-lg text-black/60 max-w-full lg:max-w-[363px] leading-relaxed">
            Na Frebrico, desenvolvemos soluções completas em vedações e bricolage, adaptadas ao tipo de espaço, nível de segurança, durabilidade e estética pretendida.
          </p>
        </div>

        {/* Feature Image with Overlay Content */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[580px] rounded-[20px] md:rounded-[32px] overflow-hidden">
          <img
            src={imgFeature}
            alt="Feature"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)'
            }}
          />

          {/* Content Overlay */}
          <div className="absolute max-w-full w-full h-full flex flex-col justify-end space-y-4 md:space-y-6 bg-gradient-to-t from-black/50 to-black/10 rounded-3xl p-20">
            <div className="w-1/2">
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-2xl md:text-3xl font-medium text-white">
                  Construídas para durar.
                </h3>
                <p className="text-lg md:text-[22px] text-white leading-relaxed mb-12">
                  Criamos soluções específicas para habitação, agricultura, indústria e espaços profissionais.
                </p>
              </div>
              <Button variant="secondary" size="lg" className="gap-3 w-full sm:w-auto">
                <span className="hidden sm:inline">Saber Mais Sobre Serviços</span>
                <span className="sm:hidden">Saber Mais</span>
                <div className="transform">
                  <Icon name="arrow-right" />
                </div>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}