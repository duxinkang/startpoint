import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** The orange rounded pill used throughout the deck for labels */
export function Pill({
  children,
  variant = "orange",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: "orange" | "ink" | "soft" | "outline";
  size?: "sm" | "md" | "lg";
} & ComponentPropsWithoutRef<"span">) {
  const variants = {
    orange: "bg-orange-500 text-white",
    ink: "bg-ink text-white",
    soft: "bg-orange-50 text-orange-700",
    outline: "bg-transparent text-ink border border-ink/20",
  };
  const sizes = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3.5 py-1.5",
    lg: "text-base px-5 py-2",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
