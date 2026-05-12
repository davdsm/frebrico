import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../atoms/Icon';
import { ContentLink } from '../common/ContentLink';
import { useContent } from '../../content/useContent';
import { getApiBase } from '../../content/api';

type WeatherType = 'sun' | 'partly-cloudy' | 'cloud' | 'rain' | 'storm';
const WEATHER_SEQUENCE: WeatherType[] = ['sun', 'partly-cloudy', 'cloud', 'rain', 'storm'];

function WeatherIcon({ type }: { type: WeatherType }) {
  const p = { fill: 'none', stroke: 'white', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', className: 'w-7 h-7 md:w-9 md:h-9 lg:w-14 lg:h-14' };
  if (type === 'sun') return (
    <svg {...p}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
  if (type === 'partly-cloudy') return (
    <svg {...p}>
      <circle cx="9.5" cy="9" r="3"/>
      <path d="M9.5 6V4.5M5.44 6.44 4.38 5.38M4 9H2.5M5.44 11.56 4.38 12.62"/>
      <path d="M17.5 14h-.8a5.5 5.5 0 1 0-9.2 4H17.5a3.5 3.5 0 0 0 0-7z"/>
    </svg>
  );
  if (type === 'cloud') return (
    <svg {...p}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  );
  if (type === 'rain') return (
    <svg {...p}>
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
      <line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="23" x2="8" y2="23.01"/>
      <line x1="12" y1="18" x2="12" y2="20"/><line x1="12" y1="22" x2="12" y2="22.01"/>
      <line x1="16" y1="19" x2="16" y2="21"/><line x1="16" y1="23" x2="16" y2="23.01"/>
    </svg>
  );
  if (type === 'storm') return (
    <svg {...p}>
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
      <polyline points="13 11 9 17 15 17 11 23"/>
    </svg>
  );
  return null;
}

export function Hero() {
  const title = useContent('home', 'hero', 'title');
  const title2 = useContent('home', 'hero', 'title2');
  const subtitle = useContent('home', 'hero', 'subtitle');
  const description = useContent('home', 'hero', 'description');
  const accentChar = useContent('home', 'hero', 'accent_char');
  const weatherModeRaw = useContent('home', 'hero', 'weather_mode');
  const isWeatherMode = weatherModeRaw === 'true';
  const linkText = useContent('home', 'hero', 'link_text');
  const linkUrl = useContent('home', 'hero', 'link_url');
  const imagesJson = useContent('home', 'hero', 'images');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const carouselSectionRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [weatherIdx, setWeatherIdx] = useState(0);
  const apiBase = getApiBase();

  useEffect(() => {
    if (!isWeatherMode) return;
    const t = setInterval(() => setWeatherIdx(i => (i + 1) % WEATHER_SEQUENCE.length), 2000);
    return () => clearInterval(t);
  }, [isWeatherMode]);

  const heroImages = (() => {
    try {
      const parsed = JSON.parse(imagesJson || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((item) => (typeof item?.path === "string" ? item.path : ""))
        .filter(Boolean);
    } catch {
      return [];
    }
  })();

  const fallbackCardHeights = [
    "h-[280px] sm:h-[340px] md:h-[380px]",
    "h-[180px] sm:h-[200px] md:h-[220px]",
    "h-[280px] sm:h-[340px] md:h-[380px]",
    "h-[240px] sm:h-[270px] md:h-[290px]",
    "h-[280px] sm:h-[300px] md:h-[320px]",
    "h-[240px] sm:h-[260px] md:h-[280px]",
    "h-[280px] sm:h-[300px] md:h-[320px]",
    "h-[240px] sm:h-[260px] md:h-[280px]",
  ];
  const cardHeightPattern = [
    "h-[280px] sm:h-[340px] md:h-[380px]",
    "h-[180px] sm:h-[200px] md:h-[220px]",
    "h-[280px] sm:h-[340px] md:h-[380px]",
    "h-[240px] sm:h-[270px] md:h-[290px]",
  ];

  const sliderImages = heroImages.length > 1 ? [...heroImages, ...heroImages] : heroImages;

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
      const hasLoopSet = heroImages.length > 1;
      const loopLimit = hasLoopSet ? container.scrollWidth / 2 : maxScroll;

      // If we're at the end, scroll back to the beginning
      if (container.scrollLeft >= loopLimit - 10) {
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
    <section className="w-full overflow-x-clip bg-white py-12 md:py-24">
      <div className="max-w-[1304px] mx-auto px-4 md:px-8">
        {/* Main Title */}
        <div className="mb-8 md:mb-16">
          <div className="flex flex-row items-start md:items-center gap-4 md:gap-6 mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="animate-hero-title-gradient text-5xl sm:text-7xl md:text-8xl lg:text-[128px] font-semibold leading-[1.06] pb-2 bg-gradient-to-r from-[#0f0f0f] via-[#1d2b1a] to-[#313b2e] bg-clip-text text-transparent bg-[length:220%_220%]">{title}</motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="bg-[#313b2e] rounded-full w-[72px] h-[52px] md:w-[100px] md:h-[72px] lg:w-[164px] lg:h-[110px] flex items-center justify-center overflow-hidden"
            >
              {isWeatherMode ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={weatherIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <WeatherIcon type={WEATHER_SEQUENCE[weatherIdx]} />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <span className="text-2xl md:text-4xl lg:text-[72px] text-white">{accentChar || 'à'}</span>
              )}
            </motion.div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="animate-hero-title-gradient text-5xl sm:text-7xl md:text-8xl lg:text-[128px] font-semibold leading-[1.06] pb-2 bg-gradient-to-r from-[#0f0f0f] via-[#1d2b1a] to-[#313b2e] bg-clip-text text-transparent bg-[length:220%_220%]">{title2}</motion.h1>
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
        <div ref={carouselSectionRef} className="carousel-fade-wrapper relative left-1/2 w-[100dvw] -translate-x-1/2">
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex gap-6 md:gap-10 overflow-x-auto scrollbar-hide scroll-smooth pl-4 md:pl-8 lg:pl-0"
          >
            {(heroImages.length ? sliderImages : fallbackCardHeights).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 1.0 + index * 0.1 }}
                className={
                  heroImages.length
                    ? `w-[240px] sm:w-[280px] md:w-[320px] ${cardHeightPattern[index % cardHeightPattern.length]} rounded-[20px] shrink-0 overflow-hidden bg-[#f1f1f1]`
                    : `bg-[#f1f1f1] ${item} w-[240px] sm:w-[280px] md:w-[320px] rounded-[20px] shrink-0`
                }
              >
                {heroImages.length ? (
                  <img
                    src={`${apiBase}${item}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section >
  );
}