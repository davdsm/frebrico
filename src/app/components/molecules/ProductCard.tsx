import React from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  badge?: string;
  imageBg?: string;
}

export function ProductCard({ name, price, badge, imageBg = '#f1f1f1' }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 w-[200px] sm:w-[220px] md:w-[250px] shrink-0">
      <div 
        className="relative h-[260px] sm:h-[290px] md:h-[320px] rounded-2xl md:rounded-3xl overflow-hidden"
        style={{ backgroundColor: imageBg }}
      >
        {badge && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl">
            <span className="text-sm md:text-base">{badge}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-base md:text-lg">{name}</span>
        <span className="text-sm md:text-base">
          {price} <span className="text-[#7c818f]">€</span>
        </span>
      </div>
    </div>
  );
}