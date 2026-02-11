import React from 'react';
import { Link } from 'react-router';
import svgPaths from '../../../imports/svg-1y6ddsd0a6';
import imgImage1 from 'figma:asset/28f9d735f4368ce680a1b628f52ec3a2079c6abc.png';
import imgImage2 from 'figma:asset/54af315f4b04f9d62134bf4a2d389532fea8fd69.png';

export function ProductHero() {
  const [selectedVariant, setSelectedVariant] = React.useState(0);
  const [showDownloads, setShowDownloads] = React.useState(false);

  const variants = [
    { name: 'Galva / Untreated', image: imgImage2 },
    { name: 'Galva / Untreated', image: imgImage2 },
    { name: 'Galva / Untreated', image: imgImage2 }
  ];

  const downloads = [
    'Datasheet técnica',
    'Tolerances and executions',
    'Ducting edge type'
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showDownloads) {
        setShowDownloads(false);
      }
    };

    if (showDownloads) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDownloads]);

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 md:mb-12 lg:mb-16">
          <Link to="/" className="text-sm font-medium text-[#667085] hover:text-[#313b2e] transition-colors">
            Início
          </Link>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
            <path d="M6 4L10 8L6 12" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Link to="/category/vedacoes" className="text-sm font-medium text-[#313b2e] hover:text-[#313b2e]/80 transition-colors">
            Vedações
          </Link>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
            <path d="M6 4L10 8L6 12" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-[#313b2e]">HV Curved branch</span>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[128px]">
          
          {/* Left - Product Image */}
          <div className="relative">
            <div className="bg-[#f1f1f1] rounded-[53px] w-full aspect-square max-w-[620px] relative flex items-center justify-center">
              <img 
                src={imgImage1} 
                alt="HV Curved branch 90°" 
                className="w-[68%] h-auto object-contain"
              />
              
              {/* Disponível Badge */}
              <div className="absolute top-8 left-8 bg-[#00c8b3] px-6 py-3 rounded-[53px]">
                <p className="text-lg font-semibold text-white leading-normal">Disponível</p>
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col gap-10 lg:pt-0">
            
            {/* Category Badge */}
            <div className="inline-flex">
              <div className="bg-[#f7f7f7] px-4 py-2 rounded-[100px] border border-[rgba(19,19,19,0.1)]">
                <p className="text-sm font-medium text-[#5a5a59] leading-normal">
                  Extração de poieras industrial
                </p>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-[42px] font-semibold text-[#1e1b13] leading-[74px]">
              HV Curved branch 90°
            </h1>

            {/* Description */}
            <p className="text-lg text-[#5a5a59] leading-normal">
              Longitudinally laser welded pipes 2m for use in overpressure, under-pressure and pressureless systems.
            </p>

            {/* Tipo Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[22px] font-semibold text-[#1e1b13] leading-normal">
                Tipo
              </h3>
              <p className="text-lg text-[#5a5a59] leading-normal">
                Rolled laser welded sheets with 6 mm edges for lock rings. Rolled laser welded sheets with 6 mm edges for lock rings.
              </p>
            </div>

            {/* Variant Selector */}
            <div className="flex items-center gap-8">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div 
                    className={`w-[60px] h-[60px] rounded-full border-[5px] transition-colors ${
                      selectedVariant === index 
                        ? 'border-[#36474f]' 
                        : 'border-[#f1f1f1] group-hover:border-[#dcdcdc]'
                    }`}
                  >
                    <img 
                      src={variant.image} 
                      alt={variant.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className={`text-base leading-normal text-center ${
                    selectedVariant === index ? 'font-semibold' : 'font-normal'
                  } text-black`}>
                    {variant.name.split(' / ')[0]} /<br />{variant.name.split(' / ')[1]}
                  </p>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 relative">
              <Link to="/cart">
                <button className="bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white px-8 py-4 rounded-[40px] inline-flex items-center justify-center gap-2.5">
                  <span className="text-base font-bold leading-normal">Encomendar Produto</span>
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                    <path d={svgPaths.p39ee6532} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M5.66667 8H9.66667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p26542a40} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </button>
              </Link>

              <div className="relative">
                <button 
                  onClick={() => setShowDownloads(!showDownloads)}
                  className="px-8 py-4 rounded-[40px] border border-[#dcdcdc] hover:border-[#313b2e] transition-colors"
                >
                  <span className="text-lg font-semibold text-black leading-normal">Downloads</span>
                </button>

                {/* Downloads Dropdown */}
                {showDownloads && (
                  <div className="absolute top-full mt-2 bg-white border border-[#eee] rounded-[10px] p-6 w-[211px] shadow-lg z-10">
                    <div className="flex flex-col gap-2">
                      {downloads.map((download, index) => (
                        <a
                          key={index}
                          href="#"
                          className="text-sm text-black hover:text-[#313b2e] transition-colors leading-normal"
                        >
                          {download}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}