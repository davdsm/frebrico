import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../../content/useContent';
import { getApiBase } from '../../content/api';
import { FadeInUpInView } from '../atoms/FadeInUpInView';

// Decorative grid background
function GridBackground() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] h-[1076px] opacity-40 overflow-hidden pointer-events-none">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1076">
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0" x1="-0.5" x2="-0.499961" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1" x1="89.5" x2="89.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2" x1="179.5" x2="179.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3" x1="269.5" x2="269.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint4" x1="359.5" x2="359.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint5" x1="449.5" x2="449.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint6" x1="539.5" x2="539.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint7" x1="629.5" x2="629.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint8" x1="719.5" x2="719.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint9" x1="809.5" x2="809.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint10" x1="899.5" x2="899.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint11" x1="989.5" x2="989.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint12" x1="1079.5" x2="1079.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint13" x1="1169.5" x2="1169.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint14" x1="1259.5" x2="1259.5" y1="0" y2="898">
            <stop stopOpacity="0" />
            <stop offset="0.5" />
            <stop offset="1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g>
          <line opacity="0.4" stroke="url(#paint0)" strokeOpacity="0.2" x1="0.5" x2="0.500039" y1="0" y2="898" />
          <line opacity="0.6" stroke="url(#paint1)" strokeOpacity="0.2" x1="90.5" x2="90.5" y1="0" y2="898" />
          <line stroke="url(#paint2)" strokeOpacity="0.2" x1="180.5" x2="180.5" y1="0" y2="898" />
          <line stroke="url(#paint3)" strokeOpacity="0.2" x1="270.5" x2="270.5" y1="0" y2="898" />
          <line stroke="url(#paint4)" strokeOpacity="0.2" x1="360.5" x2="360.5" y1="0" y2="898" />
          <line stroke="url(#paint5)" strokeOpacity="0.2" x1="450.5" x2="450.5" y1="0" y2="898" />
          <line stroke="url(#paint6)" strokeOpacity="0.2" x1="540.5" x2="540.5" y1="0" y2="898" />
          <line stroke="url(#paint7)" strokeOpacity="0.2" x1="630.5" x2="630.5" y1="0" y2="898" />
          <line stroke="url(#paint8)" strokeOpacity="0.2" x1="720.5" x2="720.5" y1="0" y2="898" />
          <line stroke="url(#paint9)" strokeOpacity="0.2" x1="810.5" x2="810.5" y1="0" y2="898" />
          <line stroke="url(#paint10)" strokeOpacity="0.2" x1="900.5" x2="900.5" y1="0" y2="898" />
          <line stroke="url(#paint11)" strokeOpacity="0.2" x1="990.5" x2="990.5" y1="0" y2="898" />
          <line stroke="url(#paint12)" strokeOpacity="0.2" x1="1080.5" x2="1080.5" y1="0" y2="898" />
          <line opacity="0.6" stroke="url(#paint13)" strokeOpacity="0.2" x1="1170.5" x2="1170.5" y1="0" y2="898" />
          <line opacity="0.4" stroke="url(#paint14)" strokeOpacity="0.2" x1="1260.5" x2="1260.5" y1="0" y2="898" />
        </g>
      </svg>
    </div>
  );
}

// Vertical Carousel Component
function VerticalCarousel({ contentPage = "about" }: { contentPage?: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const itemsJson = useContent(contentPage, "content_images", "items");
  const apiBase = getApiBase();

  const items: { path: string }[] = (() => {
    try {
      const arr = JSON.parse(itemsJson || "[]");
      return Array.isArray(arr) ? arr.map((x) => ({ path: typeof x?.path === "string" ? x.path : "" })) : [];
    } catch {
      return [];
    }
  })();

  const imagesWithPath = items.filter((i) => i.path);
  const hasImages = imagesWithPath.length > 0;
  const images = hasImages
    ? imagesWithPath.map((item, i) => (
        <img
          key={i}
          src={`${apiBase}${item.path}`}
          alt=""
          className="w-full aspect-square rounded-[40px] shrink-0 object-cover"
        />
      ))
    : [
        <div key="img1" className="bg-[#f1f1f1] w-full aspect-square rounded-[40px] shrink-0" />,
        <div key="img2" className="bg-[#f1f1f1] w-full aspect-square rounded-[40px] shrink-0" />,
        <div key="img3" className="bg-[#f1f1f1] w-full aspect-square rounded-[40px] shrink-0" />,
        <div key="img4" className="bg-[#f1f1f1] w-full aspect-square rounded-[40px] shrink-0" />,
      ];

  // Auto-scroll effect with infinite loop
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isPaused) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = (timestamp: number) => {
      if (lastTimestamp === 0) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      if (delta > 16) { // ~60fps
        lastTimestamp = timestamp;
        
        // Calculate half point for seamless loop
        const halfScroll = scrollContainer.scrollHeight / 2;
        
        if (scrollContainer.scrollTop >= halfScroll) {
          scrollContainer.scrollTop = 0;
        } else {
          scrollContainer.scrollTop += scrollSpeed;
        }
      }
      
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="relative w-full lg:w-[552px] h-[400px] md:h-[552px] overflow-hidden rounded-[40px]">
      <div 
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex flex-col gap-6 overflow-y-hidden scrollbar-hide h-full"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* First set */}
        {images}
        {/* Duplicate set for infinite scroll */}
        {images}
      </div>
    </div>
  );
}

// Tab button with dot indicator
function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 md:px-12 flex items-center gap-[10px] py-3 md:py-[38px] rounded-[100px] transition-all ${
        isActive ? 'bg-[#313b2e]' : 'bg-transparent'
      }`}
    >
      <div className="relative shrink-0 size-[14px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <rect fill="#F7F7F7" height="14" rx="7" width="14" />
          <circle cx="7" cy="7" fill="#5A5A59" r="2" />
        </svg>
      </div>
      <p className={`font-semibold text-lg whitespace-nowrap ${isActive ? 'text-white' : 'text-[#5a5a59]'}`}>
        {label}
      </p>
    </button>
  );
}

// Main content section (contentPage e.g. "about" loads tab copy from CMS)
export function 
ContentSection({ contentPage = 'about' }: { contentPage?: string }) {
  const [activeTab, setActiveTab] = useState(0);

  const tab1Label = useContent(contentPage, 'content_tab1', 'label');
  const tab1Number = useContent(contentPage, 'content_tab1', 'number');
  const tab1Title = useContent(contentPage, 'content_tab1', 'title');
  const tab1TitleGray = useContent(contentPage, 'content_tab1', 'title_gray');
  const tab2Label = useContent(contentPage, 'content_tab2', 'label');
  const tab2Number = useContent(contentPage, 'content_tab2', 'number');
  const tab2Title = useContent(contentPage, 'content_tab2', 'title');
  const tab2TitleGray = useContent(contentPage, 'content_tab2', 'title_gray');
  const tab3Label = useContent(contentPage, 'content_tab3', 'label');
  const tab3Number = useContent(contentPage, 'content_tab3', 'number');
  const tab3Title = useContent(contentPage, 'content_tab3', 'title');
  const tab3TitleGray = useContent(contentPage, 'content_tab3', 'title_gray');

  const tabs = [
    { label: tab1Label, number: tab1Number, title: tab1Title, titleGray: tab1TitleGray },
    { label: tab2Label, number: tab2Number, title: tab2Title, titleGray: tab2TitleGray },
    { label: tab3Label, number: tab3Number, title: tab3Title, titleGray: tab3TitleGray },
  ];

  const currentTab = tabs[activeTab];

  return (
    <FadeInUpInView>
      <section className="relative bg-[#f7f7f7] py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Grid */}
      <GridBackground />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
        <div className="flex flex-col gap-10 items-center">
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-[100px] overflow-hidden w-full">
            <div className="flex flex-row items-stretch px-2 md:px-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => (
                <React.Fragment key={index}>
                  <TabButton
                    label={tab.label}
                    isActive={activeTab === index}
                    onClick={() => setActiveTab(index)}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-[40px] w-full overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-[178px] p-6 md:p-10 lg:px-[40px] lg:py-10">
              
              {/* Left Side - Text Content */}
              <div className="flex flex-col gap-8 w-full lg:w-[430px]">
                {/* Number Badge */}
                <div className="flex items-center justify-center p-[26px] rounded-[40px] w-fit border border-[rgba(19,19,19,0.1)]">
                  <p className="font-semibold text-[32px] text-[#131313]">{currentTab.number}</p>
                </div>
                
                {/* Heading */}
                <h2 className="font-semibold text-3xl md:text-4xl lg:text-[48px] leading-tight">
                  <span className="text-[#131313]">{currentTab.title}</span>
                  <span className="text-[#5a5a59]">{currentTab.titleGray}</span>
                </h2>
              </div>

              {/* Right Side - Image Blocks */}
              <VerticalCarousel contentPage={contentPage} />

            </div>
          </div>

        </div>
      </div>
      </section>
    </FadeInUpInView>
  );
}