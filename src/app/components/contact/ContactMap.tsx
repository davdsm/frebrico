import React from "react";
import { useContent } from "../../content/useContent";
import { resolveImageUrl } from "../../api/shop";

export function ContactMap() {
  const image = useContent("contact", "map", "image", "");
  const title = useContent("contact", "map", "title", "Visite-nos");
  const address1 = useContent(
    "contact",
    "map",
    "address_1",
    "Sede na Urbanização Ind. do Soeiro, Lote 21, 4745-457 S. Mamede do Coronado"
  );
  const address2 = useContent(
    "contact",
    "map",
    "address_2",
    "Rua Delfim Ferreira, Lote 133, Zona Industrial da Maia I, Sector VII, 4470-436 Maia"
  );
  const imageUrl = resolveImageUrl(image);

  return (
    <div className="relative bg-[#f1f1f1] h-[280px] md:h-[367px] rounded-xl overflow-hidden w-full flex justify-center items-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/10" />
      <div className="w-[90%] absolute bottom-4 md:bottom-6 bg-white rounded-xl p-4 max-w-[calc(100%-32px)] md:max-w-[760px] h-auto">
        <p className="text-base md:text-lg font-medium leading-normal text-black mb-1">{title}</p>
        <p className="text-sm md:text-base leading-normal text-black/40">{address1}</p>
        <p className="text-sm md:text-base leading-normal text-black/40 mt-1">{address2}</p>
      </div>
    </div>
  );
}
