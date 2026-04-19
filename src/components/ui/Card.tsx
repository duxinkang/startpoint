import { clsx } from "clsx";
import type { ReactNode } from "react";

type CardVariant = "feature" | "subtle";

const variants: Record<CardVariant, string> = {
  feature: "rounded-3xl border border-ink/10 p-8 md:p-10 shadow-sm hover:shadow-lg transition-shadow",
  subtle: "rounded-2xl border border-ink/8 p-7 md:p-8",
};

export function Card({
  children,
  variant = "feature",
  className,
}: {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
}) {
  return (
    <div className={clsx("bg-white", variants[variant], className)}>
      {children}
    </div>
  );
}
