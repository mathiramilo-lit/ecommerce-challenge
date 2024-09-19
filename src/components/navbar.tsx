import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

import { HamburgerMenu } from "../assets";
import { cn } from "../lib/utils";
import { SearchBar } from "./search-bar";
import { SortBy } from "./sort-by";

type NavbarProps = ComponentPropsWithoutRef<"header"> & {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

export const Navbar = ({ className, setDrawerOpen, ...props }: NavbarProps) => {
  return (
    <header
      className={cn("flex flex-col gap-6 bg-white", className)}
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
          <h1 className="text-2xl font-medium text-techie-gray-900">
            Find what you need
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <SearchBar className="hidden md:flex" />
          <SortBy />
        </div>
      </div>
      <SearchBar className="md:hidden" />
    </header>
  );
};
