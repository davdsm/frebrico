import svgPaths from "./svg-r95mhu04wd";
import { imgGroup, imgGroup1 } from "./svg-lx37m";

function VuesaxLinearArrowRight1() {
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

function VuesaxLinearArrowRight() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="vuesax/linear/arrow-right">
      <VuesaxLinearArrowRight1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white">Contactos</p>
      <VuesaxLinearArrowRight />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#313b2e] content-stretch flex items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[40px] shrink-0">
      <Frame22 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#5a5a59] text-[18px] text-center w-[min-content] whitespace-pre-wrap">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.`}</p>
      <Frame3 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[599px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#131313] text-[32px] text-center w-full whitespace-pre-wrap">Vamos Conversar</p>
      <Frame13 />
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
            <g filter="url(#filter0_f_4_178)" id="Group_2">
              <path d={svgPaths.p21329180} fill="var(--fill-0, white)" id="Vector_3" />
              <path d={svgPaths.p6886180} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p735f280} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p15f10400} fill="var(--fill-0, white)" id="Vector_6" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="45.8709" id="filter0_f_4_178" width="48.2164" x="-2.38419e-07" y="3.17891e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_4_178" stdDeviation="4.4" />
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

function Frame() {
  return (
    <div className="overflow-clip relative shrink-0 size-[22px]" data-name="Frame">
      <ClipPathGroup />
      <MaskGroup1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#3b3b3b] content-stretch flex items-center overflow-clip p-[9px] relative rounded-[8px] shrink-0">
      <Frame />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame5 />
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
        <g clipPath="url(#clip0_4_190)" id="linkedin">
          <path d={svgPaths.p13132a00} fill="var(--fill-0, #131313)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_4_190">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
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
        <Frame1 />
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

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[#5a5a59] text-[18px] w-[min-content] whitespace-pre-wrap">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. `}</p>
      <SocialMedia />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[400px]">
      <Frame4 />
      <Frame15 />
    </div>
  );
}

function Frame6() {
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

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[18px] w-full">Loja</p>
      <Frame6 />
    </div>
  );
}

function Frame7() {
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

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[18px] w-full">Empresa</p>
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start relative shrink-0 text-[16px] w-full">
      <p className="relative shrink-0 w-full">Política de Privacidade</p>
      <p className="relative shrink-0 w-full">Termos e Condições</p>
      <p className="relative shrink-0 w-full">Livro de Reclamações</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[107px]">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold relative shrink-0 text-[18px] w-full">Links Legais</p>
      <Frame8 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[100px] items-start leading-[normal] relative shrink-0 text-[#131313] whitespace-pre-wrap">
      <Frame9 />
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex h-[212px] items-start justify-between relative shrink-0 w-full">
      <Frame16 />
      <Frame14 />
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

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[139px]">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#131313] text-[18px] w-[118px] whitespace-pre-wrap">Voltar ao topo</p>
      <Icon />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#131313] text-[18px] w-[295px] whitespace-pre-wrap">© Frebrico Inc. All Rights Reserved.</p>
      <Frame20 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[40px] items-center left-[50px] top-1/2 w-[1140px]">
      <Frame18 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1140 1">
            <line id="Line 202" stroke="var(--stroke-0, #131313)" strokeOpacity="0.1" x2="1140" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame17 />
      <Frame2 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="h-[538px] relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f7f7f7] content-stretch flex flex-col items-start left-[100px] overflow-clip py-[50px] rounded-[40px] top-[calc(50%+25px)] w-[1240px]">
      <Frame21 />
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-white relative size-full" data-name="Footer">
      <Frame12 />
    </div>
  );
}