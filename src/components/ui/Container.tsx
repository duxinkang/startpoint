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
    full: "max-w-[1480px]",
  };
  return (
    <div
      className={clsx(
        "mx-auto px-6 md:px-12 lg:px-20 xl:px-24",
        sizes[size],
        className,
      )}
    >
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
    default: "py-24 md:py-36 lg:py-44",
    tight: "pt-10 pb-24 md:pb-36 lg:pb-44",
    flush: "",
    hero: "py-28 md:py-40 lg:py-48",
    cta: "py-24 md:py-32",
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
