import React from 'react';

interface IconProps {
  name: 'chevron-down' | 'arrow-left' | 'arrow-right' | 'arrow-down';
  className?: string;
}

export function Icon({ name, className = "" }: IconProps) {
  const icons = {
    'chevron-down': (
      <svg className={`w-6 h-6 shrink-0 align-middle ${className}`} fill="none" viewBox="0 0 24 24">
        <path 
          d="M6 9L12 15L18 9" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
        />
      </svg>
    ),
    'arrow-left': (
      <svg className={`w-6 h-6 shrink-0 align-middle ${className}`} fill="none" viewBox="0 0 24 24">
        <path d="M21 12H3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M11 4L3 12L11 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    'arrow-right': (
      <svg className={`w-6 h-6 shrink-0 align-middle ${className}`} fill="none" viewBox="0 0 24 24">
        <path d="M3 12H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M13 20L21 12L13 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
    'arrow-down': (
      <svg className={`w-6 h-6 shrink-0 align-middle ${className}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  return icons[name] || null;
}
