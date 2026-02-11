import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'green';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'border border-[#dcdcdc] text-black',
    green: 'border border-[#dcdcdc] text-[#313b2e]'
  };

  return (
    <div className={`h-9 px-4 py-2 rounded-[40px] w-fit ${variants[variant]}`}>
      <p className="text-sm leading-normal">{children}</p>
    </div>
  );
}
