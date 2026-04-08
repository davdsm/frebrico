import React, { useRef, useEffect, useMemo, useState } from 'react';
import {
  ProductCard,
  cmsProductItemKey,
  cmsProductItemToCardProduct,
} from '../common/ProductCard';
import { Icon } from '../atoms/Icon';
import { useContent } from '../../content/useContent';
import { FadeInUpInView } from '../atoms/FadeInUpInView';
import { StaggeredFadeInUpInView } from '../atoms/StaggeredFadeInUpInView';

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const title = useContent('home', 'carousel', 'title');
  const productsRaw = useContent('home', 'carousel', 'products', '');
  const productList = useMemo(() => {
    if (!productsRaw) return [];
    try {
      const parsed = JSON.parse(productsRaw) as unknown;
      if (!Array.isArray(parsed)) return [];
      return shuffleArray(parsed as Record<string, unknown>[]);
    } catch {
      return [];
    }
  }, [productsRaw]);

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
    <FadeInUpInView>
      <section className="w-full overflow-x-clip bg-white py-16 md:py-32">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">{title}</h2>
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
        <div className="carousel-fade-wrapper relative left-1/2 w-[100dvw] -translate-x-1/2">
          <StaggeredFadeInUpInView
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            stagger={0.1}
          >
            {productList.map((raw, index) => (
              <ProductCard
                key={cmsProductItemKey(raw, index)}
                product={cmsProductItemToCardProduct(raw)}
                className="w-[200px] sm:w-[220px] md:w-[250px] shrink-0"
              />
            ))}
          </StaggeredFadeInUpInView>
        </div>
      </div>
      </section>
    </FadeInUpInView>
  );
}