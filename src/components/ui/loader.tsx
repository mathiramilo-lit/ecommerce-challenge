import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type LoaderProps = ComponentPropsWithoutRef<'div'>;

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={cn(
        'h-4 w-4 animate-spin rounded-full border-t-2 border-t-white',
        className,
      )}
    />
  );
};
