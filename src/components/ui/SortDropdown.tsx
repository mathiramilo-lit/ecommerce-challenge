import { useState } from "react";
import { motion } from "framer-motion";

import type { SortState } from "@/App";
import { AltArrowDown, SortVertical } from "@/assets";
import { cn } from "@/lib/utils";
import type { Order, SortBy as SortByType, SortOption } from "@/types";

interface SortDropdownProps {
  options: SortOption[];
  actualSort: SortState;
  setSort: ({ sortBy, order }: { sortBy?: SortByType; order?: Order }) => void;
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
}

export const SortDropdown = ({
  options,
  actualSort,
  setSort,
  showFavorites,
  setShowFavorites,
}: SortDropdownProps) => {
  const [open, setOpen] = useState(false);

  const label = showFavorites
    ? "My favorites"
    : actualSort.sortBy && actualSort.order
      ? (options.find(
          (opt) =>
            opt.sortBy === actualSort.sortBy && opt.order === actualSort.order,
        )?.label ?? "Sort By")
      : "Sort By";

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -5 },
  };

  return (
    <div className="relative">
      <button
        className={cn(
          "relative flex items-center gap-2 rounded-md transition-all focus-within:border-orange-600 md:border md:border-techie-gray-300 md:p-2",
          open && "border-orange-600",
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

      <motion.div
        animate={open ? "open" : "closed"}
        variants={variants}
        className={cn(
          "absolute right-0 z-10 top-12 hidden w-[60vw] flex-col gap-3 rounded-md border border-techie-gray-300 bg-white p-4 py-5 shadow-md md:w-[150%]",
          open && "flex",
        )}
      >
        <button
          className="text-start font-text"
          onClick={() => {
            setShowFavorites(true);
            setSort({});
            setOpen(false);
          }}
        >
          My favorites
        </button>
        {options.map((option) => (
          <button
            key={option.label}
            className="text-start font-text"
            onClick={() => {
              setSort({ sortBy: option.sortBy, order: option.order });
              setShowFavorites(false);
              setOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </motion.div>
    </div>
  );
};
