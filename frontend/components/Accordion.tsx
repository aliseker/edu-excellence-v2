'use client';

import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
}

const Accordion = ({ items, defaultOpen }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-900">{item.title}</span>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="text-gray-700">{item.content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;









