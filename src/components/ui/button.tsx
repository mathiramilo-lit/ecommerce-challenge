import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";
import { Loader } from "./Loader";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
};

export const Button = ({
  children,
  loading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-4 rounded-full bg-orange-600 px-6 py-2 font-text font-semibold text-white transition-all hover:bg-orange-500",
        className,
      )}
      disabled={loading}
      {...props}
    >
      {children}
      {loading && <Loader />}
    </button>
  );
};
