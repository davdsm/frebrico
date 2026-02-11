import React from 'react';

interface CategoryHeroProps {
  title: string;
}

export function CategoryHero({ title }: CategoryHeroProps) {
  return (
    <section className="w-full bg-white px-4 md:px-8 lg:px-[160px] py-16 md:py-24 lg:py-[136px]">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold text-black leading-none lg:leading-[74px] text-center">
          {title}
        </h1>
      </div>
    </section>
  );
}
