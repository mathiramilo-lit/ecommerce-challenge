import { useState } from "react";

import { AltArrowDown, SortVertical } from "../assets";
import { cn } from "../lib/utils";

const SORT_OPTIONS = [
  {
    label: "Price - from high to low",
    sortBy: "price",
    order: "asc",
  },
  {
    label: "Price - from low to high",
    sortBy: "price",
    order: "desc",
  },
  {
    label: "Alphabetical",
    sortBy: "title",
    order: "asc",
  },
];

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
        <span className="font-text hidden min-w-28 text-start text-techie-gray-300 md:block">
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
        <button className="font-text text-start" onClick={() => {}}>
          My favorites
        </button>
        {SORT_OPTIONS.map((option, index) => (
          <button key={index} className="font-text text-start" onClick={() => {}}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};
