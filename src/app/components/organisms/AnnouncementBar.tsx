import React, { useState, useEffect } from 'react';
import { useContent } from '../../content/useContent';

interface AnnouncementBarProps {
  show: boolean;
}

export function AnnouncementBar({ show }: AnnouncementBarProps) {
  const enabled = useContent('_settings', 'announcement', 'enabled', 'true');
  const message = useContent(
    '_settings',
    'announcement',
    'message',
    'Mercadorias com mais de 2 metros — os portes são sob consulta'
  );

  const [introduced, setIntroduced] = useState(false);

  useEffect(() => {
    if (enabled === 'false' || !message) return;
    const t = window.setTimeout(() => setIntroduced(true), 3000);
    return () => window.clearTimeout(t);
  }, [enabled, message]);

  if (enabled === 'false' || !message) return null;

  const visible = introduced && show;

  return (
    <div
      className="w-full bg-[#f5f5f5] text-[#131313] text-xs sm:text-sm text-center py-2 px-4 leading-tight overflow-hidden"
      style={{
        maxHeight: visible ? '3rem' : '0',
        opacity: visible ? 1 : 0,
        transition: introduced
          ? 'max-height 300ms ease, opacity 300ms ease'
          : 'max-height 700ms ease, opacity 700ms ease',
      }}
    >
      {message}
    </div>
  );
}
