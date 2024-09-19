import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

import { cn } from "../lib/utils";

type LayoutProps = ComponentPropsWithoutRef<"div"> & PropsWithChildren;

export const Layout = ({ children, className, ...props }: LayoutProps) => {
  return (
    <div
      className={cn("mx-auto flex max-w-4xl flex-col gap-12 p-10", className)}
      {...props}
    >
      {children}
    </div>
  );
};
