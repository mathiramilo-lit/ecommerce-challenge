import { ComponentPropsWithoutRef, ChangeEventHandler } from 'react';

import { Magnifier } from '@/assets';
import { cn } from '@/lib/utils';

type SearchBarProps = ComponentPropsWithoutRef<'div'> & {
  onChangeQuery: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const SearchBar = ({
  className,
  onChangeQuery,
  value,
  ...props
}: SearchBarProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border border-techie-gray-300 p-2 transition-all focus-within:border-orange-600',
        className,
      )}
      {...props}
    >
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent font-text outline-none"
        onChange={onChangeQuery}
        value={value}
      />
      <Magnifier />
    </div>
  );
};
