import React from "react";
import { AboutHero } from "../components/about/AboutHero";
import { ContentSection } from "../components/organisms/ContentSection";
import { AboutSolutions } from "../components/about/AboutSolutions";

export default function About() {
  return (
    <>
      <AboutHero />
      <ContentSection />
      <AboutSolutions />
    </>
  );
}
