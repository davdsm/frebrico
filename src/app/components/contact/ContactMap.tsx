import React from "react";

export function ContactMap() {
  return (
    <div className="relative bg-[#f1f1f1] h-[280px] md:h-[367px] rounded-xl overflow-hidden w-full">
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white rounded-xl p-4 max-w-[calc(100%-32px)] md:max-w-[508px] h-auto md:h-[80px]">
        <p className="text-base md:text-lg font-medium leading-normal text-black mb-1">Visite-nos</p>
        <p className="text-base md:text-lg leading-normal text-black/40">
          Rua de Mogege de certeza, n12, 4810-291, Santo Tirso
        </p>
      </div>
    </div>
  );
}
