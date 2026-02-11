function Frame() {
  return (
    <div className="absolute bg-[#f7f7f7] left-0 rounded-[40px] top-0">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit]">
        <p className="font-['Outfit:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#5a5a59] text-[14px]">Produtos</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(19,19,19,0.1)] border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-[46px] w-[1240px]">
      <div className="font-['Outfit:SemiBold',sans-serif] font-semibold leading-[74px] relative shrink-0 text-[#282828] text-[72px] w-[734px] whitespace-pre-wrap">
        <p className="mb-0">Produtos</p>
        <p>Recomendados</p>
      </div>
    </div>
  );
}

function RecommendedProducts() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Recommended Products">
      <Frame />
      <Frame1 />
    </div>
  );
}

function AspectRatioLock() {
  return <div className="h-0 w-full" data-name="Aspect Ratio Lock - 30°" />;
}

function Component21FixedAspectRatioSpacer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px min-w-px overflow-clip relative" data-name="2:1 Fixed Aspect Ratio Spacer">
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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

function Card() {
  return (
    <div className="bg-[#f1f1f1] col-1 h-[320px] ml-0 mt-0 overflow-clip relative rounded-[24px] row-1 w-[250px]" data-name="Card">
      <FixedAspectRatioSpacerVariants />
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

function Group() {
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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

function Group1() {
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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

function Group2() {
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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

function Group3() {
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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
      <div className="flex h-[64px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
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

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
      <Card4 />
      <DigitalArt8 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex gap-[23px] items-center justify-center leading-[0] left-[20px] top-[290px] w-[1234px]" data-name="Content">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

export default function Group5() {
  return (
    <div className="relative size-full">
      <RecommendedProducts />
      <Content />
    </div>
  );
}