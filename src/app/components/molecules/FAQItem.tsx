import React, { useState } from 'react';
import { Icon } from '../atoms/Icon';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-4 md:py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg md:text-xl font-medium pr-4">{question}</h3>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} shrink-0`}>
          <Icon name="chevron-down" />
        </div>
      </button>
      {isOpen && (
        <p className="mt-3 md:mt-4 text-base md:text-lg text-black/60 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
}