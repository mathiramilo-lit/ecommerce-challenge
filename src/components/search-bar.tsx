import { ComponentPropsWithoutRef } from "react";

import Magnifier from "../assets/magnifier.svg";
import { cn } from "../lib/utils";

type SearchBarProps = ComponentPropsWithoutRef<"div">;

export const SearchBar = ({ className, ...props }: SearchBarProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-techie-gray-300 p-2 transition-all focus-within:border-orange-600",
        className,
      )}
      {...props}
    >
      <input
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <Magnifier />
    </div>
  );
};
