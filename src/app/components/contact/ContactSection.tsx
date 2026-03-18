import React from "react";
import { ContactHero } from "./ContactHero";
import { ContactContent } from "./ContactContent";
import { FadeInUpInView } from "../atoms/FadeInUpInView";

export function ContactSection() {
  return (
      <section className="w-full bg-white py-12 px-4 md:px-8 lg:px-[160px] lg:py-[136px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            <FadeInUpInView>
              <ContactHero />
            </FadeInUpInView>
            <FadeInUpInView delay={0.2}>
              <ContactContent />
            </FadeInUpInView>
          </div>
        </div>
      </section>
  );
}
