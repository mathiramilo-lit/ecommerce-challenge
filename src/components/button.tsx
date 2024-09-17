import { ComponentPropsWithoutRef } from "react";

import { cn } from "../lib/utils";
import { Loader } from "./loader";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
}

export const Button = ({
  children,
  loading,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-4 rounded-full bg-orange-600 px-6 py-2 font-medium text-white transition-all hover:bg-orange-500",
        className,
      )}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {children}
      {loading && <Loader />}
    </button>
  );
};
