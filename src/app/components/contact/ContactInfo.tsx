import React from "react";
import svgPaths from "../../../imports/svg-ksvalsn2ex";

export function ContactInfo() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-[58px] w-full">
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-[20px] border border-[#dcdcdc] flex items-center justify-center shrink-0">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="block size-full align-middle" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p3dbd5a00} fill="black" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg leading-normal text-black">Contacto</p>
          <p className="text-base md:text-lg leading-normal text-black/40">+351 229 826 344</p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 rounded-[20px] border border-[#dcdcdc] flex items-center justify-center shrink-0">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="block size-full align-middle" fill="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2dd77e00} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.2" />
              <path d={svgPaths.p2cae5180} stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg leading-normal text-black">Email</p>
          <p className="text-base md:text-lg leading-normal text-black/40">info@frebrico.pt</p>
        </div>
      </div>
    </div>
  );
}
