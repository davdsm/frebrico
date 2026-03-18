import React from "react";
import { AboutHero } from "../components/about/AboutHero";
import { ContentSection } from "../components/organisms/ContentSection";
import { AboutSolutions } from "../components/about/AboutSolutions";
import { SEO } from "../components/common/SEO";
import { DominoFadeInDown } from "../components/atoms/DominoFadeInDown";
import { useContent } from "../content/useContent";

export default function About() {
  const seoTitle = useContent("about", "seo", "title");
  const seoDescription = useContent("about", "seo", "description");
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path="/about" />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <AboutHero />
        <ContentSection />
        <AboutSolutions />
      </DominoFadeInDown>
    </>
  );
}
