import svgPaths from "./svg-smx0h2540w";
import imgFrame1116607089 from "figma:asset/2bb6574b0734ce3219f7f1db98d1151bdad77901.png";
import { imgGroup, imgGroup1 } from "./svg-vgazn";

function Frame8() {
  return (
    <div className="bg-[#313b2e] content-stretch flex items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[30px] shrink-0 w-[88px]">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-white">Início</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.6)]">Sobre Nós</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron down">
          <path d="M6 9L12 15L18 9" id="stroke" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[30px] shrink-0">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.6)]">Produtos</p>
      <ChevronDown />
    </div>
  );
}

function NavMenu() {
  return (
    <div className="absolute content-stretch flex gap-[22px] items-center justify-center left-0 top-[4px]" data-name="Nav menu">
      <Frame8 />
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Logo1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Logo">
      <p className="font-['Playfair_Display:Italic',sans-serif] font-normal italic leading-[normal] relative shrink-0 text-[24px] text-black">Logo</p>
    </div>
  );
}

function Logo() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center left-1/2 top-[8px]" data-name="Logo">
      <Logo1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#313b2e] content-stretch flex h-[48px] items-center justify-center left-0 overflow-clip px-[24px] py-[12px] rounded-[40px] top-0" data-name="Button">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-white">Contactos</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute h-[48px] left-[1065px] top-0 w-[131px]">
      <Button />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute left-[1025px] size-[24px] top-[12px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.p201a4480} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[1025px] top-[10px]">
      <Frame />
      <div className="absolute inset-[20.83%_12.58%_56.25%_86.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
          <g filter="url(#filter0_i_1_60460)" id="Ellipse 194">
            <circle cx="5.5" cy="5.5" fill="var(--fill-0, #313B2E)" r="5.5" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="27" id="filter0_i_1_60460" width="11" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="effect1_innerShadow_1_60460" />
              <feOffset dy="16" />
              <feGaussianBlur stdDeviation="16" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.1 0" />
              <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_60460" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[60.42%] flex flex-col font-['Outfit:Medium',sans-serif] font-medium justify-center leading-[0] left-[86.67%] right-[12.75%] text-[9px] text-center text-white top-1/4">
        <p className="leading-[1px] whitespace-pre-wrap">3</p>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[1025px] top-0">
      <Frame52 />
      <Group10 />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[48px] relative shrink-0 w-[1200px]" data-name="Header">
      <NavMenu />
      <Logo />
      <Group9 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#f8f8f8] h-[94px] overflow-clip relative rounded-[111px] shrink-0 w-[164px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Outfit:Regular',sans-serif] font-normal h-[94px] justify-center leading-[0] left-[82px] text-[72px] text-black text-center top-[46.5px] w-[164px]">
        <p className="leading-[normal] whitespace-pre-wrap">{`&`}</p>
      </div>
    </div>
  );
}

function Wrap1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Wrap">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[128px] text-black">VEDAÇÕES</p>
      <Frame7 />
    </div>
  );
}

function Wrap2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Wrap">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[128px] text-black">BRICOLAGE</p>
      <div className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.4)] w-[226px] whitespace-pre-wrap">
        <p className="mb-0">Produtos de confiança. Apoio técnico.</p>
        <p>Resultados duradouros.</p>
      </div>
      <div className="flex flex-col font-['Font_Awesome_6_Free:Solid',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#313b2e] text-[38px] text-right whitespace-nowrap">
        <p className="leading-[normal]">arrow-down</p>
      </div>
    </div>
  );
}

function Wrap() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1120px]" data-name="Wrap">
      <Wrap1 />
      <Wrap2 />
    </div>
  );
}

function Wrap4() {
  return (
    <div className="content-stretch flex font-['Outfit:Regular',sans-serif] font-normal items-center justify-between leading-[normal] relative shrink-0 text-[18px] w-full" data-name="Wrap">
      <p className="relative shrink-0 text-black">vedações, bricolage e construção</p>
      <p className="relative shrink-0 text-[#3d323d]">{` Explorar produtos`}</p>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative size-[24px]" data-name="arrow left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow left">
          <path d="M21 12H3" id="stroke" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M11 4L3 12L11 20" id="stroke_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative size-[24px]" data-name="arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow right">
          <path d="M3 12H21" id="stroke" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13 20L21 12L13 4" id="stroke_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Wrap5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Wrap">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowLeft />
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}

function Wrap3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[1120px]" data-name="Wrap">
      <Wrap4 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1120 1">
            <line id="Line 313" stroke="var(--stroke-0, black)" strokeOpacity="0.4" x2="1120" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Wrap5 />
    </div>
  );
}

function Frame3() {
  return <div className="bg-[#f1f1f1] h-[380px] rounded-[20px] shrink-0 w-[320px]" />;
}

function Frame4() {
  return <div className="bg-[#f1f1f1] h-[220px] rounded-[20px] shrink-0 w-[320px]" />;
}

function Frame5() {
  return <div className="bg-[#f1f1f1] h-[380px] rounded-[20px] shrink-0 w-[320px]" />;
}

function Frame6() {
  return <div className="bg-[#f1f1f1] h-[290px] rounded-[20px] shrink-0 w-[320px]" />;
}

function Wrap6() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Wrap">
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-[1304px]" data-name="Content">
      <Wrap />
      <Wrap3 />
      <Wrap6 />
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Hero">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center pl-[136px] py-[136px] relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-center justify-between leading-[normal] left-1/2 text-black top-[136px] w-[1240px] whitespace-pre-wrap">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[48px] w-[518px]">Cada espaço tem desafios diferentes.</p>
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal opacity-60 relative shrink-0 text-[18px] w-[363px]">{`Na Frebrico, desenvolvemos soluções completas em vedações e bricolage, adaptadas ao tipo de espaço, nível de segurança, durabilidade e estética pretendida. `}</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[normal] relative shrink-0 text-white w-full">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium relative shrink-0 text-[28px]">Construídas para durar.</p>
      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 text-[22px] w-[min-content] whitespace-pre-wrap">Criamos soluções específicas para habitação, agricultura, indústria e espaços profissionais.</p>
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="relative size-[24px]" data-name="arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow right">
          <path d="M3 12H21" id="stroke" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13 20L21 12L13 4" id="stroke_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[56px] items-center justify-center px-[26px] py-[12px] relative rounded-[100px] shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Saber Mais Sobre Serviços</p>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowRight1 />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[64px] top-[333px] w-[366px]">
      <Frame14 />
      <Frame11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="-translate-x-1/2 absolute h-[580px] left-1/2 overflow-clip rounded-[32px] top-[306px] w-[1240px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[32px] size-full" src={imgFrame1116607089} />
        <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(241, 241, 241) 0%, rgb(241, 241, 241) 100%)" }} />
      </div>
      <Frame13 />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-gradient-to-t from-white h-[1022px] overflow-clip relative shrink-0 to-[#f5f5f5] w-[1440px]" data-name="Content">
      <Frame1 />
      <Frame12 />
    </div>
  );
}

function ArrowLeft1() {
  return (
    <div className="relative size-[24px]" data-name="arrow left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow left">
          <path d="M21 12H3" id="stroke" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M11 4L3 12L11 20" id="stroke_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRight2() {
  return (
    <div className="relative size-[24px]" data-name="arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow right">
          <path d="M3 12H21" id="stroke" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M13 20L21 12L13 4" id="stroke_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Arrowes() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0" data-name="Arrowes">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowLeft1 />
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <ArrowRight2 />
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[605px] items-center relative shrink-0 w-full" data-name="Heading">
      <div className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[48px] text-black whitespace-nowrap">
        <p className="mb-0">Produtos pensados</p>
        <p>{`e preparados para a si `}</p>
      </div>
      <Arrowes />
    </div>
  );
}

function AspectRatioLock() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock1() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock1 />
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer />
      <Component21FixedAspectRatioSpacer1 />
    </div>
  );
}

function AspectRatioLock2() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock2 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock3() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock3 />
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer2 />
      <Component21FixedAspectRatioSpacer3 />
    </div>
  );
}

function AspectRatioLock4() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock4 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock5() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock5 />
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer4 />
      <Component21FixedAspectRatioSpacer5 />
    </div>
  );
}

function AspectRatioLock6() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock6 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock7() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock7 />
        </div>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer6 />
      <Component21FixedAspectRatioSpacer7 />
    </div>
  );
}

function AspectRatioLock8() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock8 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock9() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock9 />
        </div>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer8 />
      <Component21FixedAspectRatioSpacer9 />
    </div>
  );
}

function FixedAspectRatioSpacerVariants() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[256px]" data-name="🎛 Fixed Aspect Ratio Spacer (Variants)">
      <Component />
      <Component1 />
      <Component2 />
      <Component3 />
      <Component4 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[12px] overflow-clip px-[24px] py-[12px] rounded-[16px] top-[12px]" data-name="Button">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[16px] text-black">Destaque 🔥</p>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants />
      <Button1 />
    </div>
  );
}

function Ethereum() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Ethereum">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black">
        <span className="leading-[normal]">{`5.85 `}</span>
        <span className="leading-[normal] text-[#7c818f]">€</span>
      </p>
    </div>
  );
}

function DigitalArt1() {
  return (
    <div className="content-stretch flex gap-[133px] items-center justify-center relative shrink-0 w-[250px]" data-name="Digital art">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Armatek</p>
      <Ethereum />
    </div>
  );
}

function HighestBid() {
  return <div className="h-[20px] shrink-0 w-[73px]" data-name="Highest bid" />;
}

function DigitalArt() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-[344px] relative row-1" data-name="Digital art">
      <DigitalArt1 />
      <HighestBid />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card />
      <DigitalArt />
    </div>
  );
}

function AspectRatioLock10() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock10 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock11() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock11 />
        </div>
      </div>
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer10 />
      <Component21FixedAspectRatioSpacer11 />
    </div>
  );
}

function AspectRatioLock12() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock12 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock13() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock13 />
        </div>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer12 />
      <Component21FixedAspectRatioSpacer13 />
    </div>
  );
}

function AspectRatioLock14() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock14 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock15() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock15 />
        </div>
      </div>
    </div>
  );
}

function Component7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer14 />
      <Component21FixedAspectRatioSpacer15 />
    </div>
  );
}

function AspectRatioLock16() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock16 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock17() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock17 />
        </div>
      </div>
    </div>
  );
}

function Component8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer16 />
      <Component21FixedAspectRatioSpacer17 />
    </div>
  );
}

function AspectRatioLock18() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock18 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock19() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock19 />
        </div>
      </div>
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer18 />
      <Component21FixedAspectRatioSpacer19 />
    </div>
  );
}

function FixedAspectRatioSpacerVariants1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[256px]" data-name="🎛 Fixed Aspect Ratio Spacer (Variants)">
      <Component5 />
      <Component6 />
      <Component7 />
      <Component8 />
      <Component9 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants1 />
    </div>
  );
}

function Ethereum1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Ethereum">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black">
        <span className="leading-[normal]">{`5.85 `}</span>
        <span className="leading-[normal] text-[#7c818f]">€</span>
      </p>
    </div>
  );
}

function DigitalArt3() {
  return (
    <div className="content-stretch flex gap-[133px] items-center justify-center relative shrink-0 w-[250px]" data-name="Digital art">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Armatek</p>
      <Ethereum1 />
    </div>
  );
}

function HighestBid1() {
  return <div className="h-[20px] shrink-0 w-[73px]" data-name="Highest bid" />;
}

function DigitalArt2() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-[344px] relative row-1" data-name="Digital art">
      <DigitalArt3 />
      <HighestBid1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card1 />
      <DigitalArt2 />
    </div>
  );
}

function AspectRatioLock20() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock20 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock21() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock21 />
        </div>
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer20 />
      <Component21FixedAspectRatioSpacer21 />
    </div>
  );
}

function AspectRatioLock22() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock22 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock23() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock23 />
        </div>
      </div>
    </div>
  );
}

function Component11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer22 />
      <Component21FixedAspectRatioSpacer23 />
    </div>
  );
}

function AspectRatioLock24() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock24 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock25() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock25 />
        </div>
      </div>
    </div>
  );
}

function Component12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer24 />
      <Component21FixedAspectRatioSpacer25 />
    </div>
  );
}

function AspectRatioLock26() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock26 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock27() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock27 />
        </div>
      </div>
    </div>
  );
}

function Component13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer26 />
      <Component21FixedAspectRatioSpacer27 />
    </div>
  );
}

function AspectRatioLock28() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock28 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock29() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock29 />
        </div>
      </div>
    </div>
  );
}

function Component14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer28 />
      <Component21FixedAspectRatioSpacer29 />
    </div>
  );
}

function FixedAspectRatioSpacerVariants2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[256px]" data-name="🎛 Fixed Aspect Ratio Spacer (Variants)">
      <Component10 />
      <Component11 />
      <Component12 />
      <Component13 />
      <Component14 />
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants2 />
    </div>
  );
}

function Ethereum2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Ethereum">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black">
        <span className="leading-[normal]">{`5.85 `}</span>
        <span className="leading-[normal] text-[#7c818f]">€</span>
      </p>
    </div>
  );
}

function DigitalArt5() {
  return (
    <div className="content-stretch flex gap-[133px] items-center justify-center relative shrink-0 w-[250px]" data-name="Digital art">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Armatek</p>
      <Ethereum2 />
    </div>
  );
}

function HighestBid2() {
  return <div className="h-[20px] shrink-0 w-[73px]" data-name="Highest bid" />;
}

function DigitalArt4() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-[344px] relative row-1" data-name="Digital art">
      <DigitalArt5 />
      <HighestBid2 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card2 />
      <DigitalArt4 />
    </div>
  );
}

function AspectRatioLock30() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock30 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock31() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock31 />
        </div>
      </div>
    </div>
  );
}

function Component15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer30 />
      <Component21FixedAspectRatioSpacer31 />
    </div>
  );
}

function AspectRatioLock32() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock32 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock33() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock33 />
        </div>
      </div>
    </div>
  );
}

function Component16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer32 />
      <Component21FixedAspectRatioSpacer33 />
    </div>
  );
}

function AspectRatioLock34() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer34() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock34 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock35() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock35 />
        </div>
      </div>
    </div>
  );
}

function Component17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer34 />
      <Component21FixedAspectRatioSpacer35 />
    </div>
  );
}

function AspectRatioLock36() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock36 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock37() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock37 />
        </div>
      </div>
    </div>
  );
}

function Component18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer36 />
      <Component21FixedAspectRatioSpacer37 />
    </div>
  );
}

function AspectRatioLock38() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock38 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock39() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock39 />
        </div>
      </div>
    </div>
  );
}

function Component19() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer38 />
      <Component21FixedAspectRatioSpacer39 />
    </div>
  );
}

function FixedAspectRatioSpacerVariants3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[256px]" data-name="🎛 Fixed Aspect Ratio Spacer (Variants)">
      <Component15 />
      <Component16 />
      <Component17 />
      <Component18 />
      <Component19 />
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants3 />
    </div>
  );
}

function Ethereum3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Ethereum">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black">
        <span className="leading-[normal]">{`5.85 `}</span>
        <span className="leading-[normal] text-[#7c818f]">€</span>
      </p>
    </div>
  );
}

function DigitalArt7() {
  return (
    <div className="content-stretch flex gap-[133px] items-center justify-center relative shrink-0 w-[250px]" data-name="Digital art">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Armatek</p>
      <Ethereum3 />
    </div>
  );
}

function HighestBid3() {
  return <div className="h-[20px] shrink-0 w-[73px]" data-name="Highest bid" />;
}

function DigitalArt6() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-[344px] relative row-1" data-name="Digital art">
      <DigitalArt7 />
      <HighestBid3 />
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card3 />
      <DigitalArt6 />
    </div>
  );
}

function AspectRatioLock40() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock40 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock41() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock41 />
        </div>
      </div>
    </div>
  );
}

function Component20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer40 />
      <Component21FixedAspectRatioSpacer41 />
    </div>
  );
}

function AspectRatioLock42() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer42() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock42 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock43() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock43 />
        </div>
      </div>
    </div>
  );
}

function Component21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer42 />
      <Component21FixedAspectRatioSpacer43 />
    </div>
  );
}

function AspectRatioLock44() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock44 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock45() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock45 />
        </div>
      </div>
    </div>
  );
}

function Component22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer44 />
      <Component21FixedAspectRatioSpacer45 />
    </div>
  );
}

function AspectRatioLock46() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock46 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock47() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock47 />
        </div>
      </div>
    </div>
  );
}

function Component23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer46 />
      <Component21FixedAspectRatioSpacer47 />
    </div>
  );
}

function AspectRatioLock48() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer48() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock48 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock49() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock49 />
        </div>
      </div>
    </div>
  );
}

function Component24() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer48 />
      <Component21FixedAspectRatioSpacer49 />
    </div>
  );
}

function FixedAspectRatioSpacerVariants4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[256px]" data-name="🎛 Fixed Aspect Ratio Spacer (Variants)">
      <Component20 />
      <Component21 />
      <Component22 />
      <Component23 />
      <Component24 />
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants4 />
    </div>
  );
}

function Ethereum4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Ethereum">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black">
        <span className="leading-[normal]">{`5.85 `}</span>
        <span className="leading-[normal] text-[#7c818f]">€</span>
      </p>
    </div>
  );
}

function DigitalArt9() {
  return (
    <div className="content-stretch flex gap-[133px] items-center justify-center relative shrink-0 w-[250px]" data-name="Digital art">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Armatek</p>
      <Ethereum4 />
    </div>
  );
}

function HighestBid4() {
  return <div className="h-[20px] shrink-0 w-[73px]" data-name="Highest bid" />;
}

function DigitalArt8() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-[344px] relative row-1" data-name="Digital art">
      <DigitalArt9 />
      <HighestBid4 />
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card4 />
      <DigitalArt8 />
    </div>
  );
}

function AspectRatioLock50() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock50 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock51() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock51 />
        </div>
      </div>
    </div>
  );
}

function Component25() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer50 />
      <Component21FixedAspectRatioSpacer51 />
    </div>
  );
}

function AspectRatioLock52() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock52 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock53() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock53 />
        </div>
      </div>
    </div>
  );
}

function Component26() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer52 />
      <Component21FixedAspectRatioSpacer53 />
    </div>
  );
}

function AspectRatioLock54() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock54 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock55() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer55() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock55 />
        </div>
      </div>
    </div>
  );
}

function Component27() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer54 />
      <Component21FixedAspectRatioSpacer55 />
    </div>
  );
}

function AspectRatioLock56() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock56 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock57() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock57 />
        </div>
      </div>
    </div>
  );
}

function Component28() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer56 />
      <Component21FixedAspectRatioSpacer57 />
    </div>
  );
}

function AspectRatioLock58() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock58 />
        </div>
      </div>
    </div>
  );
}

function AspectRatioLock59() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1185", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock59 />
        </div>
      </div>
    </div>
  );
}

function Component29() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="4:1">
      <Component21FixedAspectRatioSpacer58 />
      <Component21FixedAspectRatioSpacer59 />
    </div>
  );
}

function FixedAspectRatioSpacerVariants5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[256px]" data-name="🎛 Fixed Aspect Ratio Spacer (Variants)">
      <Component25 />
      <Component26 />
      <Component27 />
      <Component28 />
      <Component29 />
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants5 />
    </div>
  );
}

function Ethereum5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Ethereum">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[0] relative shrink-0 text-[16px] text-black">
        <span className="leading-[normal]">{`5.85 `}</span>
        <span className="leading-[normal] text-[#7c818f]">ETH</span>
      </p>
    </div>
  );
}

function DigitalArt11() {
  return (
    <div className="content-stretch flex gap-[107px] items-center justify-center relative shrink-0 w-[250px]" data-name="Digital art">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-black">Armatek</p>
      <Ethereum5 />
    </div>
  );
}

function HighestBid5() {
  return <div className="h-[20px] shrink-0 w-[73px]" data-name="Highest bid" />;
}

function DigitalArt10() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start ml-0 mt-[344px] relative row-1" data-name="Digital art">
      <DigitalArt11 />
      <HighestBid5 />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card5 />
      <DigitalArt10 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[23px] items-start leading-[0] relative shrink-0 w-[1270px]" data-name="Content">
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[1270px]" data-name="Content">
      <Content4 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-[1240px]" data-name="Content">
      <Heading />
      <Content3 />
    </div>
  );
}

function Products() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[160px] py-[136px] relative shrink-0 w-[1240px]" data-name="Products">
      <Content2 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[normal] relative shrink-0 w-full whitespace-pre-wrap">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#131313] text-[24px] w-full">Ainda existem dúvidas?</p>
      <p className="font-['Outfit:Regular',sans-serif] font-normal relative shrink-0 text-[#5a5a59] text-[18px] w-full">We’re here to help you understand how we work, what we offer, how we can grow together, and build lasting brand impact.</p>
    </div>
  );
}

function ArrowRight3() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[16px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path d={svgPaths.p37fdd600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.66699 8H9.66699" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.pe75ff00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearArrowRight1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0" data-name="vuesax/linear/arrow-right">
      <ArrowRight3 />
    </div>
  );
}

function VuesaxLinearArrowRight() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="vuesax/linear/arrow-right">
      <VuesaxLinearArrowRight1 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white">Contactos</p>
      <VuesaxLinearArrowRight />
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#313b2e] content-stretch flex flex-col items-start overflow-clip px-[32px] py-[16px] relative rounded-[32px] shrink-0">
      <Frame37 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[29px] items-start left-[104px] overflow-clip p-[24px] rounded-[20px] top-[311px] w-[508px]">
      <Frame51 />
      <Frame39 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[100px] shrink-0">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#5a5a59] text-[14px]">FAQs</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[104px] top-[70px] w-[508px]">
      <Frame19 />
      <div className="font-['Outfit:SemiBold',sans-serif] font-semibold h-[154px] leading-[normal] relative shrink-0 text-[48px] text-black w-[508px] whitespace-pre-wrap">
        <p className="mb-0">Perguntas</p>
        <p>Frequentes</p>
      </div>
    </div>
  );
}

function VuesaxLinearMinus1() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/minus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="minus">
          <path d="M6 12H18" id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearMinus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="vuesax/linear/minus">
      <VuesaxLinearMinus1 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[576px] p-[12px] rounded-[24px] size-[40px] top-[24px]">
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <VuesaxLinearMinus />
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-white h-[187px] overflow-clip relative rounded-[20px] shrink-0 w-full">
      <p className="absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] left-[24px] text-[#131313] text-[24px] top-[28px]">Que tipo de produtos a Frebrico comercializa?</p>
      <Frame21 />
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal leading-[normal] left-[24px] text-[#5a5a59] text-[18px] top-[71px] w-[552px] whitespace-pre-wrap">A Frebrico é especializada no comércio de produtos de bricolage, ferragens e soluções de vedação. A nossa oferta inclui vedações residenciais, agrícolas e industriais, redes metálicas, painéis soldados, postes, portões, fixações e diversos materiais de apoio à construção.</p>
    </div>
  );
}

function VuesaxLinearAdd1() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <path d="M6 12H18" id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 18V6" id="Vector_2" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearAdd() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="vuesax/linear/add">
      <VuesaxLinearAdd1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[576px] p-[12px] rounded-[24px] size-[40px] top-1/2">
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <VuesaxLinearAdd />
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white h-[88px] overflow-clip relative rounded-[20px] shrink-0 w-full">
      <p className="absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] left-[24px] text-[#131313] text-[24px] top-[28px]">Prestam serviços de montagem de vedações?</p>
      <Frame22 />
    </div>
  );
}

function VuesaxLinearAdd3() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <path d="M6 12H18" id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 18V6" id="Vector_2" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearAdd2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="vuesax/linear/add">
      <VuesaxLinearAdd3 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[576px] p-[12px] rounded-[24px] size-[40px] top-1/2">
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <VuesaxLinearAdd2 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="bg-white h-[88px] overflow-clip relative rounded-[20px] shrink-0 w-full">
      <p className="absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] left-[24px] text-[#131313] text-[24px] top-[28px]">Posso pedir apoio técnico antes de comprar?</p>
      <Frame23 />
    </div>
  );
}

function VuesaxLinearAdd5() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <path d="M6 12H18" id="Vector" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 18V6" id="Vector_2" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_3" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearAdd4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="vuesax/linear/add">
      <VuesaxLinearAdd5 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex items-center justify-center left-[576px] p-[12px] rounded-[24px] size-[40px] top-1/2">
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <VuesaxLinearAdd4 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-white h-[88px] overflow-clip relative rounded-[20px] shrink-0 w-full">
      <p className="absolute font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] left-[24px] text-[#131313] text-[24px] top-[28px]">A Frebrico tem stock permanente?</p>
      <Frame24 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[700px] top-[70px] w-[640px]">
      <Frame35 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
    </div>
  );
}

function Faq() {
  return (
    <div className="bg-[#f1f1f1] h-[624px] overflow-clip relative shrink-0 w-[1440px]" data-name="FAQ">
      <Frame50 />
      <Frame38 />
      <Frame34 />
    </div>
  );
}

function VuesaxLinearArrowRight3() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="arrow-right">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.66667 8H9.66667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p26542a40} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_4" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearArrowRight2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="vuesax/linear/arrow-right">
      <VuesaxLinearArrowRight3 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white">Contactos</p>
      <VuesaxLinearArrowRight2 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#313b2e] content-stretch flex items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[40px] shrink-0">
      <Frame49 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#5a5a59] text-[18px] text-center w-[min-content] whitespace-pre-wrap">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.`}</p>
      <Frame17 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[599px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[32px] text-center w-full whitespace-pre-wrap">Vamos Conversar</p>
      <Frame40 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[-7.5%_-17%_-34.54%_-35.5%] mask-position-[7.81px_1.65px,_7.81px_1.65px]" data-name="Group" style={{ maskImage: `url('${imgGroup}'), url('${imgGroup1}')` }}>
      <div className="absolute inset-[-28.16%_-26.23%_-18.63%_-17.49%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.2164 45.8709">
          <g id="Group">
            <path d={svgPaths.p14bfd180} fill="var(--fill-0, white)" id="Vector" />
            <path d={svgPaths.p14bfd180} fill="var(--fill-0, white)" id="Vector_2" />
            <g filter="url(#filter0_f_1_35760)" id="Group_2">
              <path d={svgPaths.p21329180} fill="var(--fill-0, white)" id="Vector_3" />
              <path d={svgPaths.p6886180} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p735f280} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p15f10400} fill="var(--fill-0, white)" id="Vector_6" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="45.8709" id="filter0_f_1_35760" width="48.2164" x="-2.38419e-07" y="3.17891e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_1_35760" stdDeviation="4.4" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0_0_0.06%_0]" data-name="Mask group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0_0.06%_0]" data-name="Group">
      <MaskGroup />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[22px_21.987px] mix-blend-overlay" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Group" style={{ mixBlendMode: "overlay" }}>
          <path d="M22 0H0V22H22V0Z" fill="url(#paint0_linear_1_26501)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_26501" x1="11" x2="11" y1="0" y2="22">
            <stop stopColor="#3C3C3C" />
            <stop offset="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents inset-[0_0_0.06%_0]" data-name="Mask group">
      <Group2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <ClipPathGroup />
      <MaskGroup1 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#3b3b3b] content-stretch flex items-center overflow-clip p-[9px] relative rounded-[8px] shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame20 />
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[20px]">Frebrico</p>
    </div>
  );
}

function Twitter1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="twitter">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="twitter">
          <path clipRule="evenodd" d={svgPaths.p3fa7fa80} fill="var(--fill-0, #131313)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.p3e368c00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Twitter() {
  return (
    <div className="relative rounded-[40px] shrink-0" data-name="Twitter">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[16px] relative rounded-[inherit]">
        <Twitter1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Facebook1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="facebook">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="facebook">
          <path d={svgPaths.p28ce4740} fill="var(--fill-0, #131313)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Facebook() {
  return (
    <div className="relative rounded-[40px] shrink-0" data-name="Facebook">
      <div className="content-stretch flex items-start overflow-clip p-[16px] relative rounded-[inherit]">
        <Facebook1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function RemixIconsFillLogosInstagramFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="remix-icons/fill/logos/instagram-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p35d17b00} fill="var(--fill-0, #131313)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative rounded-[40px] shrink-0" data-name="Instagram">
      <div className="content-stretch flex items-start overflow-clip p-[16px] relative rounded-[inherit]">
        <RemixIconsFillLogosInstagramFill />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Linkedin1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="linkedin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_63545)" id="linkedin">
          <path d={svgPaths.p13132a00} fill="var(--fill-0, #131313)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_63545">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]">
      <Linkedin1 />
    </div>
  );
}

function Linkedin() {
  return (
    <div className="relative rounded-[40px] shrink-0" data-name="Linkedin">
      <div className="content-stretch flex items-start overflow-clip p-[16px] relative rounded-[inherit]">
        <Frame15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function SocialMedia() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[272px]" data-name="Social media">
      <Twitter />
      <Facebook />
      <Instagram />
      <Linkedin />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#5a5a59] text-[18px] w-[min-content] whitespace-pre-wrap">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. `}</p>
      <SocialMedia />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[400px]">
      <Frame18 />
      <Frame42 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0 text-[16px] w-full">
      <p className="relative shrink-0 w-full">Arames</p>
      <p className="relative shrink-0 w-full">Redes de Vedação</p>
      <p className="relative shrink-0 w-full">Teias</p>
      <p className="relative shrink-0 w-full">Postes</p>
      <p className="relative shrink-0 w-full">Paineis de Vedação</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[18px] w-full">Loja</p>
      <Frame25 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0 text-[16px] w-full">
      <p className="relative shrink-0 w-full">Início</p>
      <p className="relative shrink-0 w-full">Sobre Nós</p>
      <p className="relative shrink-0 w-full">Produtos</p>
      <p className="relative shrink-0 w-full">Serviços</p>
      <p className="relative shrink-0 w-full">Contactos</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[18px] w-full">Empresa</p>
      <Frame26 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0 text-[16px] w-full">
      <p className="relative shrink-0 w-full">Política de Privacidade</p>
      <p className="relative shrink-0 w-full">Termos e Condições</p>
      <p className="relative shrink-0 w-full">Livro de Reclamações</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[18px] w-full">Links Legais</p>
      <Frame27 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[100px] items-start leading-[normal] relative shrink-0 text-[#131313] whitespace-pre-wrap">
      <Frame28 />
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex h-[212px] items-start justify-between relative shrink-0 w-full">
      <Frame43 />
      <Frame41 />
    </div>
  );
}

function ArrowUp() {
  return (
    <div className="relative size-full" data-name="Arrow - Up">
      <div className="absolute inset-[-5%_-6.22%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.03267 11.0001">
          <g id="Arrow - Up">
            <path d="M4.5164 10.5V0.5" id="Stroke 1" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2f7d70c0} id="Stroke 3" stroke="var(--stroke-0, #131313)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconlyLightArrowUp() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Iconly/Light/Arrow - Up">
      <div className="absolute flex inset-[17.71%_26.04%_19.79%_23.76%] items-center justify-center">
        <div className="flex-none h-[10px] rotate-180 w-[8.033px]">
          <ArrowUp />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative rounded-[24px] shrink-0" data-name="Icon">
      <div className="content-stretch flex items-center overflow-clip p-[10px] relative rounded-[inherit]">
        <IconlyLightArrowUp />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[24px]" />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[139px]">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#131313] text-[18px] w-[118px] whitespace-pre-wrap">Voltar ao topo</p>
      <Icon />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#131313] text-[18px] w-[295px] whitespace-pre-wrap">© Frebrico Inc. All Rights Reserved.</p>
      <Frame47 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[40px] items-center left-[50px] top-1/2 w-[1140px]">
      <Frame45 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1140 1">
            <line id="Line 202" stroke="var(--stroke-0, #131313)" strokeOpacity="0.1" x2="1140" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame44 />
      <Frame16 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="h-[538px] relative shrink-0 w-full">
      <Frame46 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f7f7f7] content-stretch flex flex-col items-start left-[100px] overflow-clip py-[50px] rounded-[40px] top-[calc(50%+25px)] w-[1240px]">
      <Frame48 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[778px] overflow-clip relative shrink-0 w-[1440px]" data-name="Footer">
      <Frame36 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col h-[4658px] items-center justify-center left-0 py-[45px] top-0 w-[1440px]" data-name="List">
      <Header />
      <Hero />
      <Content1 />
      <Products />
      <Faq />
      <Footer />
    </div>
  );
}

export default function PaginaInicial() {
  return (
    <div className="bg-white relative size-full" data-name="Página Inicial">
      <List />
    </div>
  );
}