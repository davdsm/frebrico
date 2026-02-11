import React from "react";

export function ContactHero() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[375px]">
      <div className="h-[36px] rounded-[40px] border border-[#dcdcdc] px-4 py-2 w-fit">
        <p className="text-sm leading-normal text-black">Contactos</p>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-semibold text-black leading-normal">
        Deixe a sua mensagem.
      </h1>
      <p className="text-base md:text-lg leading-normal text-black/40">
        Disponibiliza os seus contactos directos para assim tornar mais simples e eficaz a comunicação.
      </p>
    </div>
  );
}
