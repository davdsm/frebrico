import React from 'react';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { ContentLink } from '../common/ContentLink';
import { FadeInUpInView } from '../atoms/FadeInUpInView';
import imgFeature from "figma:asset/2bb6574b0734ce3219f7f1db98d1151bdad77901.png";
import { useContent } from '../../content/useContent';
import { getApiBase } from '../../content/api';

export function FeaturesSection() {
  const title = useContent('home', 'features', 'title');
  const description = useContent('home', 'features', 'description');
  const overlayTitle = useContent('home', 'features', 'overlay_title');
  const overlayDescription = useContent('home', 'features', 'overlay_description');
  const buttonText = useContent('home', 'features', 'button');
  const buttonMobile = useContent('home', 'features', 'button_mobile');
  const buttonUrl = useContent('home', 'features', 'button_url');
  const image = useContent('home', 'features', 'image');
  const imageAlt = useContent('home', 'features', 'image_alt');
  const apiBase = getApiBase();
  const imageSrc = image ? `${apiBase}${image}` : imgFeature;

  return (
      <section className="w-full bg-gradient-to-b from-[#f5f5f5] to-white py-16 md:py-32">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 md:gap-12 mb-16 md:mb-24">
          <FadeInUpInView>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-full lg:max-w-[518px] leading-tight">
            {title}
          </h2>
          </FadeInUpInView>
          <FadeInUpInView delay={0.1}>
          <p className="text-base md:text-lg text-black/60 max-w-full lg:max-w-[363px] leading-relaxed">
            {description}
          </p>
          </FadeInUpInView>
        </div>

        {/* Feature Image with Overlay Content */}
        <FadeInUpInView delay={0.2}>
        <div className="relative h-[360px] sm:h-[420px] md:h-[500px] lg:h-[580px] rounded-[20px] md:rounded-[32px] overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt || "Soluções de vedação e estruturas metálicas"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/20"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%)'
            }}
          />

          {/* Content Overlay */}
          <div className="absolute right-0 bottom-0 max-w-full w-full h-full flex flex-col justify-end space-y-4 md:space-y-6 bg-gradient-to-t from-black/55 to-black/15 rounded-3xl px-4 py-8 sm:px-8 sm:py-10 lg:p-20">
            <div className="w-full md:w-2/3 lg:w-1/2 max-w-[640px]">
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-2xl md:text-3xl font-medium text-white">
                  {overlayTitle}
                </h3>
                <p className="w-full text-base md:text-lg lg:text-[22px] text-white leading-relaxed mb-6 md:mb-10">
                  {overlayDescription}
                </p>
              </div>
              <ContentLink to={buttonUrl}>
                <Button variant="secondary" size="lg" className="gap-3 w-full sm:w-auto">
                  <span className="hidden sm:inline">{buttonText}</span>
                  <span className="sm:hidden">{buttonMobile}</span>
                  <div className="transform">
                    <Icon name="arrow-right" />
                  </div>
                </Button>
              </ContentLink>
            </div>

          </div>
        </div>
        </FadeInUpInView>
      </div>
      </section>
  );
}