import svgPaths from "./svg-ksvalsn2ex";

function Button() {
  return (
    <div className="h-[36px] relative rounded-[40px] shrink-0" data-name="Button">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black">Contactos</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[374px]" data-name="Heading">
      <Button />
      <p className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[normal] min-w-full relative shrink-0 text-[64px] text-black w-[min-content] whitespace-pre-wrap">Deixe a sua mensagem.</p>
    </div>
  );
}

function Wrap() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[375px]" data-name="Wrap">
      <Heading />
      <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] min-w-full relative shrink-0 text-[18px] text-[rgba(0,0,0,0.4)] w-[min-content] whitespace-pre-wrap">{`Disponibiliza os seus contactos directos para assim tornar mais simples e  eficaz a comunicação.`}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[48px] relative rounded-[12px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[147px] py-[13px] relative size-full">
          <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-black">David</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Cards() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[220px]" data-name="Cards">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)]">Nome</p>
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[48px] relative rounded-[12px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[147px] py-[13px] relative size-full">
          <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-black">Teste Apelido</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Cards1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[220px]" data-name="Cards">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)]">Apelido</p>
      <Frame1 />
    </div>
  );
}

function Wrap3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Wrap">
      <Cards />
      <Cards1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[48px] relative rounded-[12px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[147px] py-[13px] relative size-full">
          <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-black">hello@sazconpt.co</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Cards2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Cards">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] w-full whitespace-pre-wrap">EMAIL</p>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[177px] relative rounded-[12px] shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start pl-[16px] pr-[240px] py-[12px] relative size-full">
          <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[18px] text-black">Omega Orion</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Cards3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Cards">
      <p className="font-['Outfit:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.4)] w-full whitespace-pre-wrap">Mensagem</p>
      <Frame3 />
    </div>
  );
}

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

function Frame6() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <p className="font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-white">Mandar Mensagem</p>
      <VuesaxLinearArrowRight />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#313b2e] content-stretch flex items-center justify-center overflow-clip px-[32px] py-[16px] relative rounded-[40px] shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between ml-0 mt-0 relative row-1 w-[401px]">
      <Frame5 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Wrap2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[464px]" data-name="Wrap">
      <Wrap3 />
      <Cards2 />
      <Cards3 />
      <Group />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white h-[80px] leading-[normal] left-[24px] overflow-clip rounded-[12px] text-[18px] top-[263px] w-[508px]">
      <p className="absolute font-['Outfit:Medium',sans-serif] font-medium left-[16px] text-black top-[16px]">Visite-nos</p>
      <p className="absolute font-['Outfit:Regular',sans-serif] font-normal left-[16px] text-[rgba(0,0,0,0.4)] top-[41px]">{`Rua de  Mogege de certeza, n12, 4810-291, Santo Tirso`}</p>
    </div>
  );
}

function Wrap5() {
  return (
    <div className="bg-[#f1f1f1] h-[367px] overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Wrap">
      <Frame4 />
    </div>
  );
}

function VuesaxOutlineCall() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/outline/call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="call">
          <path d={svgPaths.p3dbd5a00} fill="var(--fill-0, black)" id="Vector" />
          <g id="Vector_2" opacity="0" />
        </g>
      </svg>
    </div>
  );
}

function OutlineCall() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Outline / call">
      <VuesaxOutlineCall />
    </div>
  );
}

function PhoneIcon() {
  return (
    <div className="content-stretch flex items-center p-[12px] relative rounded-[20px] shrink-0 size-[40px]" data-name="Phone icon">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <OutlineCall />
    </div>
  );
}

function PhoneNumber() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start leading-[normal] relative shrink-0 text-[18px] w-[186px] whitespace-pre-wrap" data-name="Phone number">
      <p className="min-w-full relative shrink-0 text-black w-[min-content]">Contacto</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.4)] w-[186px]">+351 123 321 123</p>
    </div>
  );
}

function Wrap7() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Wrap">
      <PhoneIcon />
      <PhoneNumber />
    </div>
  );
}

function VuesaxLinearSms1() {
  return (
    <div className="absolute contents inset-0" data-name="vuesax/linear/sms">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="sms">
          <path d={svgPaths.p2dd77e00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.2" />
          <path d={svgPaths.p2cae5180} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.2" />
          <path d={svgPaths.pea5b900} id="Vector_3" opacity="0" stroke="var(--stroke-0, black)" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}

function VuesaxLinearSms() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="vuesax/linear/sms">
      <VuesaxLinearSms1 />
    </div>
  );
}

function PhoneIcon1() {
  return (
    <div className="content-stretch flex items-center p-[12px] relative rounded-[20px] shrink-0 size-[40px]" data-name="Phone icon">
      <div aria-hidden="true" className="absolute border border-[#dcdcdc] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <VuesaxLinearSms />
    </div>
  );
}

function PhoneNumber1() {
  return (
    <div className="content-stretch flex flex-col font-['Outfit:Regular',sans-serif] font-normal gap-[8px] items-start leading-[normal] relative shrink-0 text-[18px] w-[200px] whitespace-pre-wrap" data-name="Phone number">
      <p className="relative shrink-0 text-black w-full">Email</p>
      <p className="relative shrink-0 text-[rgba(0,0,0,0.4)] w-full">hello@febrico.pt</p>
    </div>
  );
}

function Wrap8() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Wrap">
      <PhoneIcon1 />
      <PhoneNumber1 />
    </div>
  );
}

function Wrap6() {
  return (
    <div className="content-stretch flex gap-[58px] items-center relative shrink-0 w-full" data-name="Wrap">
      <Wrap7 />
      <Wrap8 />
    </div>
  );
}

function Wrap4() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[556px]" data-name="Wrap">
      <Wrap5 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 556 1">
            <line id="Line 7" stroke="var(--stroke-0, #DCDCDC)" x2="556" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Wrap6 />
    </div>
  );
}

function Wrap1() {
  return (
    <div className="content-stretch flex gap-[100px] items-center relative shrink-0 w-full" data-name="Wrap">
      <Wrap2 />
      <Wrap4 />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0" data-name="Content">
      <Wrap />
      <Wrap1 />
    </div>
  );
}

export default function Contact() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[160px] py-[136px] relative size-full" data-name="Contact">
      <Content />
    </div>
  );
}