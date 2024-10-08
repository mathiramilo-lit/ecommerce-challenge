import type { ComponentPropsWithoutRef } from "react";
import React from "react";

import { AltArrowRight } from "@/assets";

interface DrawerButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
}

export const DrawerButton = ({ label, ...props }: DrawerButtonProps) => {
  return (
    <button
      className="flex w-full items-center justify-between transition-opacity hover:opacity-60"
      {...props}
    >
      <span className="font-text font-semibold text-orange-600">{label}</span>
      <AltArrowRight />
    </button>
  );
};
