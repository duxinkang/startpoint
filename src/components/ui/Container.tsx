import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  size = "xl",
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl" | "full";
}) {
  const sizes = {
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-[1440px]",
  };
  return (
    <div className={clsx("mx-auto px-6 md:px-10 lg:px-16", sizes[size], className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  bg = "paper",
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bg?: "paper" | "cream" | "orange" | "ink" | "white" | "bone";
  /**
   * Vertical padding profile.
   * - `default` — full rhythm (main content sections)
   * - `tight`   — half top padding, for sections visually continuing the one above
   * - `flush`   — no padding, caller controls spacing entirely
   * - `hero`    — extra breathing room for orange / hero bands
   * - `cta`     — compact band used for bottom CTAs
   */
  spacing?: "default" | "tight" | "flush" | "hero" | "cta";
}) {
  const backgrounds = {
    paper: "bg-paper text-ink",
    cream: "bg-cream text-ink",
    bone: "bg-bone text-ink",
    orange: "bg-orange-500 text-white",
    ink: "bg-ink text-white",
    white: "bg-white text-ink",
  };
  const spacings = {
    default: "py-20 md:py-28 lg:py-32",
    tight: "pt-8 pb-20 md:pb-28 lg:pb-32",
    flush: "",
    hero: "py-24 md:py-32",
    cta: "py-20",
  };
  return (
    <section
      id={id}
      className={clsx(
        "relative overflow-hidden",
        spacings[spacing],
        backgrounds[bg],
        className,
      )}
    >
      {children}
    </section>
  );
}
