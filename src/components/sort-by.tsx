import { useState } from 'react';

import { AltArrowDown, SortVertical } from '../assets';
import { cn } from '../lib/utils';
import { Order, ProductField, SortOption } from '../types';

interface SortByProps {
  options: SortOption[];
  setSort: (sortBy: ProductField, order: Order) => void;
}

export const SortBy = ({ options, setSort }: SortByProps) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('Sort By');

  return (
    <div className="relative">
      <button
        className={cn(
          'relative flex items-center gap-2 rounded-md transition-all focus-within:border-orange-600 md:border md:border-techie-gray-300 md:p-2',
          open && 'border-orange-600',
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="hidden min-w-28 text-start font-text text-techie-gray-300 md:block">
          {label}
        </span>
        <div className="hidden md:block">
          <AltArrowDown />
        </div>
        <div className="md:hidden">
          <SortVertical />
        </div>
      </button>

      <div
        className={cn(
          'absolute right-0 top-12 hidden w-[60vw] flex-col gap-3 rounded-md border border-techie-gray-300 bg-white p-4 py-5 shadow-md md:w-[150%]',
          open && 'flex',
        )}
      >
        <button className="text-start font-text" onClick={() => {}}>
          My favorites
        </button>
        {options.map((option, index) => (
          <button
            key={index}
            className="text-start font-text"
            onClick={() => {
              setSort(option.sortBy, option.order);
              setLabel(option.label);
              setOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
