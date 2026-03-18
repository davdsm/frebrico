import React from 'react';

interface PageTemplateProps {
  children?: React.ReactNode;
}

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <div className="min-h-screen bg-white antialiased">
      {children}
    </div>
  );
}
