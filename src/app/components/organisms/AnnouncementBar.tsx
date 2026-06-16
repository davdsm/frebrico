import React from 'react';
import { useContent } from '../../content/useContent';

export function AnnouncementBar() {
  const enabled = useContent('_settings', 'announcement', 'enabled', 'true');
  const message = useContent(
    '_settings',
    'announcement',
    'message',
    'Mercadorias com mais de 2 metros — os portes são sob consulta'
  );

  if (enabled === 'false' || !message) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-[#f5f5f5] text-[#131313] text-xs sm:text-sm text-center py-2 px-4 leading-tight border-b border-[#e5e5e3]">
      {message}
    </div>
  );
}
