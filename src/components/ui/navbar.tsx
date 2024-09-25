import {
  ComponentPropsWithoutRef,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

import { HamburgerMenu } from '@/assets';
import { cn } from '@/lib/utils';

type NavbarProps = ComponentPropsWithoutRef<'header'> & {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  rightElement?: ReactNode;
  extraRowElement?: ReactNode;
};

export const Navbar = ({
  className,
  setDrawerOpen,
  title,
  rightElement,
  extraRowElement,
  ...props
}: NavbarProps) => {
  return (
    <header
      className={cn('flex flex-col gap-6 bg-white', className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            className="flex items-center justify-center rounded-full md:border-2 md:border-orange-600 md:p-2"
            onClick={() => setDrawerOpen((prev) => !prev)}
          >
            <HamburgerMenu />
          </button>
          <h1 className="font-title text-2xl font-medium text-techie-gray-900">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-4">{rightElement}</div>
      </div>
      {extraRowElement}
    </header>
  );
};
