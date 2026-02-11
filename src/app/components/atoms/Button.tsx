import React from 'react';
import { cn } from '../ui/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors";
  
  const variants = {
    primary: "bg-[#313b2e] text-white hover:bg-[#3d4937]",
    secondary: "bg-white text-black hover:bg-gray-50",
    ghost: "text-black hover:bg-gray-100",
    badge: "bg-white text-black rounded-2xl"
  };
  
  const sizes = {
    sm: "px-6 py-2 text-base",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}