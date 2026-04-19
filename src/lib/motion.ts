/**
 * StartPoint motion tokens.
 *
 * Pick values from here rather than hard-coding `duration` / `ease` per
 * component. Keeps section reveals feeling like a single production rather
 * than 40 mismatched mini-animations.
 */

/** Brand easing curve — matches the Hero reveal. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Duration tiers for reveals and micro-interactions. */
export const DURATION = {
  fast: 0.3,
  base: 0.5,
  slow: 0.7,
  hero: 1.0,
} as const;

/** Default stagger between list items in a reveal. */
export const STAGGER = 0.08;

/**
 * Default spring for layout transitions. Use when you want a slight overshoot
 * (e.g. stats counters, pill highlights).
 */
export const SPRING_SOFT = {
  type: "spring" as const,
  stiffness: 140,
  damping: 20,
  mass: 1,
};

/** Default whileInView viewport config — triggers once, ~15% visible. */
export const VIEWPORT_ONCE = { once: true, amount: 0.15 } as const;

/** Preset transition objects for common reveal patterns. */
export const TRANSITIONS = {
  /** Standard fade-up on scroll into view. */
  reveal: { duration: DURATION.base, ease: EASE },
  /** Slower reveal for hero / headline blocks. */
  heroReveal: { duration: DURATION.slow, ease: EASE },
  /** Fast micro-interaction (hover, tap). */
  micro: { duration: DURATION.fast, ease: EASE },
} as const;
