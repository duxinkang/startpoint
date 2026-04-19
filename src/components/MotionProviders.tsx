"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/lib/motion";

/**
 * Wraps the tree in a MotionConfig so every framer-motion child inherits
 * the brand easing curve + base duration without having to spell them out.
 * Individual motion components can still override via the `transition` prop.
 */
export function MotionProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      transition={{ ease: EASE, duration: DURATION.base }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}
