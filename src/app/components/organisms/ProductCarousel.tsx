import React, { useRef, useEffect, useState } from 'react';
import { ProductCard } from '../molecules/ProductCard';
import { Icon } from '../atoms/Icon';

export function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const products = [
    { name: 'Armatek', price: '5.85', badge: 'Destaque 🔥' },
    { name: 'Armatek', price: '5.85' },
    { name: 'Armatek', price: '5.85' },
    { name: 'Armatek', price: '5.85' },
    { name: 'Armatek', price: '5.85' },
    { name: 'Armatek', price: '5.85' },
    { name: 'Armatek', price: '5.85' },
    { name: 'Armatek', price: '5.85' }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 282; // card width (250px) + gap (32px)
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
    <section className="w-full bg-white py-16 md:py-32">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Produtos pensados</h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">e preparados para a si</h2>
          </div>
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

        {/* Product Carousel - Full width edge-to-edge */}
        <div className="carousel-fade-wrapper w-screen -ml-[50vw] left-[50%] relative">
          <div 
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}