import React from 'react';

interface LogoProps {
  compact?: boolean;
  logoSrc?: string;
  logoMobileSrc?: string;
}

export function Logo({ compact = false, logoSrc = "/logo.svg", logoMobileSrc = "/logo-mobile.svg" }: LogoProps) {
  return (
    <div className="flex items-center transition-all duration-500">
      <picture>
        <source srcSet={logoMobileSrc} media="(max-width: 768px)" />
        <img
          src={logoSrc}
          alt="Frebrico"
          className={`${compact ? "h-12 md:h-14 lg:h-16" : "h-12 md:h-16 lg:h-20"} w-auto transition-all duration-500`}
        />
      </picture>
      <span className="sr-only">Frebrico</span>
    </div>
  );
}
