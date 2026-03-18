import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../atoms/Icon';
import { ContentLink } from '../common/ContentLink';
import { useContent } from '../../content/useContent';

export function Hero() {
  const title = useContent('home', 'hero', 'title');
  const title2 = useContent('home', 'hero', 'title2');
  const subtitle = useContent('home', 'hero', 'subtitle');
  const description = useContent('home', 'hero', 'description');
  const linkText = useContent('home', 'hero', 'link_text');
  const linkUrl = useContent('home', 'hero', 'link_url');
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
          <div className="flex flex-row items-start md:items-center gap-4 md:gap-6 mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[128px] font-semibold leading-none">{title}</motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="bg-[#f8f8f8] rounded-full w-[100px] h-[60px] md:w-[164px] md:h-[94px] flex items-center justify-center"
            >
              <span className="text-4xl md:text-[72px]">&</span>
            </motion.div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[128px] font-semibold leading-none">{title2}</motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="w-full md:w-[226px]"
            >
              <p className="text-base md:text-lg text-black/40 leading-relaxed">
                {description}
              </p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              type="button"
              onClick={() => carouselSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#313b2e] hidden md:block animate-arrow-bounce cursor-pointer"
              aria-label="Ver imagens"
            >
              <Icon name="arrow-down" />
            </motion.button>
          </div>
        </div>

        {/* Subtitle and Navigation */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-10 pb-6 md:pb-10 border-b border-black/40">
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
              className="text-base md:text-lg">{subtitle}</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            >
              <ContentLink
                to={linkUrl || "/"}
                className="text-base md:text-lg text-[#3d323d] hover:text-[#313b2e] transition-colors"
              >
                {linkText}
              </ContentLink>
            </motion.div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-6 md:gap-10">
              <motion.button
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
                onClick={() => scroll('left')}
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Slide anterior"
              >
                <Icon name="arrow-left" className="text-black/40 hover:text-black transition-colors" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
                onClick={() => scroll('right')}
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Próximo slide"
              >
                <Icon name="arrow-right" className="hover:text-black/60 transition-colors" />
              </motion.button>
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
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
              className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[340px] sm:w-[280px] md:h-[380px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              className="bg-[#f1f1f1] h-[180px] w-[240px] sm:h-[200px] sm:w-[280px] md:h-[220px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
              className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[340px] sm:w-[280px] md:h-[380px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
              className="bg-[#f1f1f1] h-[240px] w-[240px] sm:h-[270px] sm:w-[280px] md:h-[290px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
              className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[300px] sm:w-[280px] md:h-[320px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
              className="bg-[#f1f1f1] h-[240px] w-[240px] sm:h-[260px] sm:w-[280px] md:h-[280px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
              className="bg-[#f1f1f1] h-[280px] w-[240px] sm:h-[300px] sm:w-[280px] md:h-[320px] md:w-[320px] rounded-[20px] shrink-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.7 }}
              className="bg-[#f1f1f1] h-[240px] w-[240px] sm:h-[260px] sm:w-[280px] md:h-[280px] md:w-[320px] rounded-[20px] shrink-0"
            />

          </div>
        </div>
      </div>
    </section >
  );
}