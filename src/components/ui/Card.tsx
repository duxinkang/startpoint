import { clsx } from "clsx";
import type { ReactNode } from "react";

export type CardVariant = "feature" | "subtle";

// bg-white is part of the variant so consumers can override via className
// (e.g. `bg-cream` for the pricing profit-share aside).
const variants: Record<CardVariant, string> = {
  feature:
    "bg-white rounded-3xl border border-ink/10 p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow",
  subtle: "bg-white rounded-2xl border border-ink/8 p-7 md:p-8",
};

/**
 * Returns the class string for a card variant so non-div elements
 * (`<Link>`, `<article>`, etc.) can adopt the same geometry without
 * extra wrapper nesting. Prefer `<Card>` for plain containers; reach
 * for this helper when the card *is* the interactive element.
 */
export function cardClasses(
  variant: CardVariant = "feature",
  className?: string,
) {
  return clsx(variants[variant], className);
}

export function Card({
  children,
  variant = "feature",
  className,
}: {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}) {
  return <div className={cardClasses(variant, className)}>{children}</div>;
}
