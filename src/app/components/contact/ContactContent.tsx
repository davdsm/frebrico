import React from "react";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";
import { ContactInfo } from "./ContactInfo";
import { FadeInUpInView } from "../atoms/FadeInUpInView";

export function ContactContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-[100px] w-full">
      <FadeInUpInView>
        <ContactForm />
      </FadeInUpInView>
      <FadeInUpInView delay={0.1} className="flex flex-col gap-8 md:gap-10 w-full lg:w-[556px]">
        <ContactMap />
        <div className="h-px bg-[#dcdcdc] w-full" />
        <ContactInfo />
      </FadeInUpInView>
    </div>
  );
}
