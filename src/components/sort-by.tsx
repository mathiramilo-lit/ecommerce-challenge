import { useState } from "react";

import AltArrowDown from "../assets/alt-arrow-down.svg";
import SortVertical from "../assets/sort-vertical.svg";
import { cn } from "../lib/utils";

export const SortBy = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={cn(
          "relative flex items-center gap-2 rounded-md transition-all focus-within:border-orange-600 md:border md:border-techie-gray-300 md:p-2",
          open && "border-orange-600",
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="hidden min-w-28 text-start text-techie-gray-300 md:block">
          Sort by
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
          "absolute right-0 top-12 hidden w-[60vw] flex-col gap-3 rounded-md border border-techie-gray-300 bg-white p-4 py-5 shadow-md md:w-[150%]",
          open && "flex",
        )}
      >
        <button className="text-start" onClick={() => {}}>
          My favorites
        </button>
        <button className="text-start" onClick={() => {}}>
          Price - from high to low
        </button>
        <button className="text-start" onClick={() => {}}>
          Price - from low to high
        </button>
        <button className="text-start" onClick={() => {}}>
          Alphabetical order
        </button>
      </div>
    </div>
  );
};
