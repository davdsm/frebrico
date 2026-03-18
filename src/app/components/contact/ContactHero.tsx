import React from "react";
import { useContent } from "../../content/useContent";

export function ContactHero() {
  const badge = useContent("contact", "hero", "badge", "Contactos");
  const title = useContent("contact", "hero", "title", "Deixe a sua mensagem.");
  const description = useContent(
    "contact",
    "hero",
    "description",
    "Disponibilizamos os nossos contactos para tornar a comunicação mais simples e eficaz."
  );

  return (
    <div className="flex flex-col gap-4 w-full max-w-[375px]">
      <div className="h-[36px] rounded-[40px] border border-[#dcdcdc] px-4 py-2 w-fit">
        <p className="text-sm leading-normal text-black">{badge}</p>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-semibold text-black leading-normal">
        {title}
      </h1>
      <p className="text-base md:text-lg leading-normal text-black/40">
        {description}
      </p>
    </div>
  );
}
