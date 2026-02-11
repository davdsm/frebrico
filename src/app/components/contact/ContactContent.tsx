import React from "react";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";
import { ContactInfo } from "./ContactInfo";

export function ContactContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-[100px] w-full">
      <ContactForm />
      <div className="flex flex-col gap-8 md:gap-10 w-full lg:w-[556px]">
        <ContactMap />
        <div className="h-px bg-[#dcdcdc] w-full" />
        <ContactInfo />
      </div>
    </div>
  );
}
