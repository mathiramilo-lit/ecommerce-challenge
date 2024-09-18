import { ComponentPropsWithoutRef } from "react";

import HamburgerMenu from "../assets/hamburger-menu.svg";
import { cn } from "../lib/utils";
import { SearchBar } from "./search-bar";
import { SortBy } from "./sort-by";

interface NavbarProps extends ComponentPropsWithoutRef<"header"> {
  setDrawerOpen: () => void;
}

export const Navbar = ({ className, setDrawerOpen, ...props }: NavbarProps) => {
  return (
    <header
      className={cn("flex items-center justify-between bg-white", className)}
      {...props}
    >
      <div className="flex items-center gap-8">
        <button
          className="flex items-center justify-center rounded-full border-2 border-orange-600 p-2"
          onClick={setDrawerOpen}
        >
          <HamburgerMenu />
        </button>
        <h1 className="text-2xl font-medium text-techie-gray-900">
          Find what you need
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />
        <SortBy />
      </div>
    </header>
  );
};
