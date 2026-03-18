import React from "react";
import { ContactSection } from "../components/contact/ContactSection";
import { SEO } from "../components/common/SEO";
import { useContent } from "../content/useContent";
import { DominoFadeInDown } from "../components/atoms/DominoFadeInDown";

export default function Contact() {
  const seoTitle = useContent("contact", "seo", "title");
  const seoDescription = useContent("contact", "seo", "description");
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path="/contact" />
      <DominoFadeInDown initialDelay={0.15} stagger={0.05}>
        <ContactSection />
      </DominoFadeInDown>
    </>
  );
}
