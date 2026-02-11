import React from 'react';

interface Specification {
  diameter: number;
  width: number;
  length: number;
  edges: string;
  id: string;
  price: number;
}

export function ProductSpecs() {
  const specifications: Specification[] = [
    { diameter: 80, width: 0.75, length: 1994, edges: 'fb', id: 'AAAA000001', price: 29.60 },
    { diameter: 100, width: 0.75, length: 1994, edges: 'fb', id: 'AAAA000002', price: 32.20 },
    { diameter: 125, width: 0.75, length: 1994, edges: 'fb', id: 'AAAA000003', price: 34.90 },
    { diameter: 140, width: 0.75, length: 1994, edges: 'fb', id: 'AAAA000004', price: 43.30 },
    { diameter: 150, width: 0.75, length: 1994, edges: 'fb', id: 'AAAA000005', price: 44.90 }
  ];

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
        
        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            
            {/* Table Header */}
            <div className="grid grid-cols-[120px_120px_160px_100px_140px_1fr] gap-4 pb-4 border-b-[3px] border-[#36474f]">
              <div className="text-xs text-[#36474f] font-normal">
                Diâmetro (Ød, mm)
              </div>
              <div className="text-xs text-[#36474f] font-normal">
                Largura (s, mm)
              </div>
              <div className="text-xs text-[#36474f] font-normal">
                Comprimento (L, mm)
              </div>
              <div className="text-xs text-[#36474f] font-normal">
                Bordas
              </div>
              <div className="text-xs text-[#36474f] font-normal">
                ID
              </div>
              <div className="text-xs text-[#36474f] font-normal flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 8 12">
                  <path 
                    d="M3.32843 11.3536C3.52369 11.5488 3.84027 11.5488 4.03553 11.3536L7.21751 8.17157C7.41278 7.97631 7.41278 7.65973 7.21751 7.46447C7.02225 7.2692 6.70567 7.2692 6.51041 7.46447L3.68198 10.2929L0.853554 7.46447C0.658291 7.2692 0.341709 7.2692 0.146447 7.46447C-0.0488155 7.65973 -0.0488155 7.97631 0.146447 8.17157L3.32843 11.3536ZM3.68198 0H3.18198V11H3.68198H4.18198V0H3.68198Z" 
                    fill="#36474F"
                  />
                </svg>
                <span className="border-b-[3px] border-[#1e1b13] pb-0.5">Preço (€)</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#d6d6d6]">
              {specifications.map((spec, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-[120px_120px_160px_100px_140px_1fr] gap-4 py-6"
                >
                  <div className="text-base font-medium text-black">
                    {spec.diameter}
                  </div>
                  <div className="text-base text-[#3f3f3f]">
                    {spec.width}
                  </div>
                  <div className="text-base text-[#3f3f3f]">
                    {spec.length.toLocaleString()}
                  </div>
                  <div className="text-base text-[#3f3f3f]">
                    {spec.edges}
                  </div>
                  <div className="text-base text-[#3f3f3f]">
                    {spec.id}
                  </div>
                  <div className="text-base text-[#3f3f3f]">
                    €{spec.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
