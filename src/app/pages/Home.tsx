import React from 'react';
import {
  Hero,
  FeaturesSection,
  ProductCarousel,
  FAQSectionNew,
} from '../components';
import { SEO } from '../components/common/SEO';
import { useContent } from '../content/useContent';
import { DominoFadeInDown } from '../components/atoms/DominoFadeInDown';

export default function Home() {
  const seoTitle = useContent('home', 'seo', 'title');
  const seoDescription = useContent('home', 'seo', 'description');

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path="/" />
      <DominoFadeInDown initialDelay={0.1} stagger={0.06}>
        <Hero />
        <FeaturesSection />
        <ProductCarousel />
        <FAQSectionNew />
      </DominoFadeInDown>
    </>
  );
}