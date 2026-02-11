import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function PrimaryButton({ children, icon, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      className={`bg-[#313b2e] hover:bg-[#3d4937] transition-colors text-white font-semibold text-lg px-6 py-3 h-12 rounded-[40px] inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="w-[18px] h-[18px] shrink-0">{icon}</span>}
    </button>
  );
}
