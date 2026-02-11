import svgPaths from "./svg-1kqjfus9mr";
import imgImage1 from "figma:asset/a1506335f9c1a5795534434dee96810d0a8b30ff.png";

function Button() {
  return (
    <div className="h-[36px] relative rounded-[40px] shrink-0" data-name="Button">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#313b2e] text-[14px]">{`Produtos & Serviços`}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Title">
      <Button />
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[72px] text-black w-[575px] whitespace-pre-wrap">Pensados para desempenho real</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-[476px]" data-name="Content">
      <Title />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Hero section">
      <Content5 />
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-[rgba(0,0,0,0.4)] w-[476px] whitespace-pre-wrap">Desenvolvidos para garantir durabilidade, segurança e fiabilidade em qualquer contexto.</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#313b2e] content-stretch flex h-[48px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[40px] shrink-0" data-name="Button">
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[18px] text-white">{` Explorar produtos`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute inset-[5%_0_5%_10%]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Frame">
          <path d={svgPaths.pb635400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Play() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="play">
      <Frame />
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[48px] relative rounded-[40px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[8px] h-full items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit]">
        <Play />
        <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[18px] text-black">Apoio Técnico</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function JoinUs() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Join us">
      <Button2 />
    </div>
  );
}

function CtaButton() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Cta button">
      <Button1 />
      <JoinUs />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-name="Content">
      <HeroSection />
      <CtaButton />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-end flex flex-wrap gap-[80px] items-end relative shrink-0 w-full" data-name="Content">
      <Content4 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[486px]" data-name="Content">
      <Content3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[49px] h-[50px] items-center opacity-20 relative shrink-0 w-full">
      <div className="h-[22px] relative shrink-0 w-[88px]" data-name="image 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[400%] left-0 max-w-none top-[-150%] w-full" src={imgImage1} />
        </div>
      </div>
      <div className="h-[22px] relative shrink-0 w-[88px]" data-name="image 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[400%] left-0 max-w-none top-[-150%] w-full" src={imgImage1} />
        </div>
      </div>
      <div className="h-[22px] relative shrink-0 w-[88px]" data-name="image 3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[400%] left-0 max-w-none top-[-150%] w-full" src={imgImage1} />
        </div>
      </div>
      <div className="h-[22px] relative shrink-0 w-[88px]" data-name="image 4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[400%] left-0 max-w-none top-[-150%] w-full" src={imgImage1} />
        </div>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative shrink-0 w-[505px]" data-name="Content">
      <Frame1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[129px] items-end justify-end relative shrink-0 w-full" data-name="Content">
      <Content2 />
      <Content6 />
    </div>
  );
}

function Picture1() {
  return <div className="bg-[#f1f1f1] col-1 h-[214px] ml-0 mt-0 rounded-[26px] row-1 w-[350px]" data-name="Picture" />;
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[204px] mt-[155px] relative row-1">
      <div className="col-1 h-[59px] ml-0 mt-0 relative row-1 w-[146px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146 59">
          <path d={svgPaths.pe7ee440} fill="var(--fill-0, white)" id="Rectangle 1" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 col-1 flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold h-[59px] justify-center ml-[71.5px] mt-[29.5px] relative row-1 text-[20px] text-black text-center w-[143px]">
        <p className="leading-[normal] whitespace-pre-wrap">Arames</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Picture1 />
      <Group1 />
    </div>
  );
}

function Picture2() {
  return <div className="bg-[#f1f1f1] col-1 h-[214px] ml-0 mt-0 rounded-[26px] row-1 w-[350px]" data-name="Picture" />;
}

function Group3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[204px] mt-[155px] relative row-1">
      <div className="bg-white col-1 h-[59px] ml-0 mt-0 rounded-tl-[11px] row-1 w-[146px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 col-1 flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold h-[59px] justify-center ml-[71.5px] mt-[29.5px] relative row-1 text-[20px] text-black text-center w-[143px]">
        <p className="leading-[normal] whitespace-pre-wrap">Vedações</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Picture2 />
      <Group3 />
    </div>
  );
}

function Picture3() {
  return <div className="bg-[#f1f1f1] col-1 h-[214px] ml-0 mt-0 rounded-[26px] row-1 w-[350px]" data-name="Picture" />;
}

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-[204px] mt-[155px] relative row-1">
      <div className="bg-white col-1 h-[59px] ml-0 mt-0 rounded-tl-[11px] row-1 w-[146px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 col-1 flex flex-col font-['Outfit:SemiBold',sans-serif] font-semibold h-[59px] justify-center ml-[71.5px] mt-[29.5px] relative row-1 text-[20px] text-black text-center w-[143px]">
        <p className="leading-[normal] whitespace-pre-wrap">Correntes</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Picture3 />
      <Group5 />
    </div>
  );
}

function Picture() {
  return (
    <div className="content-stretch flex gap-[35px] items-center leading-[0] relative shrink-0 w-full" data-name="Picture">
      <Group />
      <Group2 />
      <Group4 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start relative shrink-0 w-full" data-name="Content">
      <Content1 />
      <Picture />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[160px] py-[136px] relative size-full" data-name="Header">
      <Content />
    </div>
  );
}