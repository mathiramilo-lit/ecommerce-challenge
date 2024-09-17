import { useState } from "react";

import AltArrowDown from "../assets/alt-arrow-down.svg";
import { cn } from "../lib/utils";

export const SortBy = () => {
  const [open, setOpen] = useState(false);

  return (
    <button
      className={cn(
        "relative flex items-center gap-2 rounded-md border border-techie-gray-300 p-2 transition-all focus-within:border-orange-600",
        open && "border-orange-600",
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <span className="min-w-28 text-start text-techie-gray-300">Sort by</span>
      <AltArrowDown />

      <div
        className={cn(
          "absolute right-0 top-12 hidden w-[150%] flex-col gap-3 rounded-md border border-techie-gray-300 bg-white p-4 py-5 shadow-md",
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
    </button>
  );
};
