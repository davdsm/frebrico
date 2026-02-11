import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function SecondaryButton({ children, icon, className = '', ...props }: SecondaryButtonProps) {
  return (
    <button
      className={`border border-[#dcdcdc] hover:bg-black/5 transition-colors text-black font-semibold text-lg px-4 py-3 h-12 rounded-[40px] inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {icon && <span className="w-[18px] h-[18px] shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
