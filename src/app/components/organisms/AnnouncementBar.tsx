import React from 'react';

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-[#313b2e] text-white text-xs sm:text-sm text-center py-2 px-4 leading-tight">
      Mercadorias com mais de 2 metros — os portes são <span className="font-semibold">sob consulta</span>
    </div>
  );
}
