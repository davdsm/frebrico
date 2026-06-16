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
      className="fixed inset-x-0 top-0 z-[60] bg-[#f5f5f5] text-[#131313] text-xs sm:text-sm text-center py-2 px-4 leading-tight"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: introduced
          ? 'opacity 300ms ease, transform 300ms ease'
          : 'opacity 700ms ease, transform 700ms ease',
      }}
    >
      {message}
    </div>
  );
}
