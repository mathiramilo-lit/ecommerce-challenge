import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { HeartFill, HeartOutline } from "@/assets";
import { cn } from "@/lib/utils";

const Root = forwardRef<
  ElementRef<"article">,
  ComponentPropsWithoutRef<"article">
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-between gap-6",
      className,
    )}
    {...props}
  />
));
Root.displayName = "Card.Root";

const Content = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className,
      )}
      {...props}
    />
  ),
);
Content.displayName = "Card.Content";

const Title = forwardRef<ElementRef<"h2">, ComponentPropsWithoutRef<"h2">>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-center font-title text-xl font-normal text-techie-gray-900",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
);
Title.displayName = "Card.Title";

const Description = forwardRef<ElementRef<"p">, ComponentPropsWithoutRef<"p">>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "line-clamp-3 text-center font-text text-sm font-light text-techie-gray-600",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  ),
);
Description.displayName = "Card.Description";

const Footer = forwardRef<
  ElementRef<"footer">,
  ComponentPropsWithoutRef<"footer">
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn("flex w-full items-center justify-between px-3", className)}
    {...props}
  />
));
Footer.displayName = "Card.Footer";

const Price = forwardRef<ElementRef<"span">, ComponentPropsWithoutRef<"span">>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn("font-text text-sm", className)} {...props}>
      {children}
    </span>
  ),
);
Price.displayName = "Card.Price";

const AddToFavoritesButton = forwardRef<
  ElementRef<"button">,
  ComponentPropsWithoutRef<"button"> & { isFavorite: boolean }
>(({ className, isFavorite, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center justify-center hover:cursor-pointer",
      className,
    )}
    {...props}
  >
    <span className="sr-only">
      {isFavorite ? "Remove" : "Add"} to Favorites
    </span>
    {isFavorite ? <HeartFill /> : <HeartOutline />}
  </button>
));
AddToFavoritesButton.displayName = "Card.AddToFavoritesButton";

export const Card = {
  Root,
  Content,
  Title,
  Description,
  Footer,
  Price,
  AddToFavoritesButton,
};
