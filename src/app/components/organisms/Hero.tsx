import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '../atoms/Icon';

export function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360; // card width (320px) + gap (40px)
      const newPosition = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // If we're at the end, scroll back to the beginning
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        scroll('right');
      }
    }
  };

  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        scrollNext();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="max-w-[1304px] mx-auto px-4 md:px-8">
        {/* Main Title */}
        <div className="mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[128px] font-semibold leading-none">VEDAÇÕES</h1>
            <div className="bg-[#f8f8f8] rounded-full w-[100px] h-[60px] md:w-[164px] md:h-[94px] flex items-center justify-center">
              <span className="text-4xl md:text-[72px]">&</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[128px] font-semibold leading-none">BRICOLAGE</h1>
            <div className="w-full md:w-[226px]">
              <p className="text-base md:text-lg text-black/40 leading-relaxed">
                Produtos de confiança. Apoio técnico. Resultados duradouros.
              </p>
            </div>
            <button
              type="button"
              onClick={() => carouselSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#313b2e] hidden md:block animate-arrow-bounce cursor-pointer"
              aria-label="Ver imagens"
            >
              <Icon name="arrow-down" />
            </button>
          </div>
        </div>

        {/* Subtitle and Navigation */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-10 pb-6 md:pb-10 border-b border-black/40">
            <p className="text-base md:text-lg">vedações, bricolage e construção</p>
            <Link to="/products" className="text-base md:text-lg text-[#3d323d] hover:text-[#313b2e] transition-colors">
              Explorar produtos
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-6 md:gap-10">
              <button 
                onClick={() => scroll('left')}
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Slide anterior"
              >
                <Icon name="arrow-left" className="text-black/40 hover:text-black transition-colors" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Próximo slide"
              >
                <Icon name="arrow-right" className="hover:text-black/60 transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Cards - Scrollable - Full width edge-to-edge */}
        <div ref={carouselSectionRef} className="carousel-fade-wrapper w-screen -ml-[50vw] left-[50%] relative">
          <div 
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[340px] sm:w-[280px] md:h-[380px] md:w-[320px] rounded-[20px] shrink-0" />
            <div className="bg-[#f1f1f1] h-[180px] w-[240px] sm:h-[200px] sm:w-[280px] md:h-[220px] md:w-[320px] rounded-[20px] shrink-0" />
            <div className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[340px] sm:w-[280px] md:h-[380px] md:w-[320px] rounded-[20px] shrink-0" />
            <div className="bg-[#f1f1f1] h-[240px] w-[240px] sm:h-[270px] sm:w-[280px] md:h-[290px] md:w-[320px] rounded-[20px] shrink-0" />
            <div className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[300px] sm:w-[280px] md:h-[320px] md:w-[320px] rounded-[20px] shrink-0" />
            <div className="bg-[#f1f1f1] h-[240px] w-[240px] sm:h-[260px] sm:w-[280px] md:h-[280px] md:w-[320px] rounded-[20px] shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}