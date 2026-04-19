import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ink" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  ink: "bg-ink text-white hover:bg-orange-500 focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  outline:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/60 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
};
const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all outline-none focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none aria-disabled:opacity-60 aria-disabled:cursor-not-allowed";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  href?: any;
  external?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  ...rest
}: CommonProps & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps>) {
  const cls = clsx(BASE_CLASSES, variants[variant], sizes[size], className);

  if (href) {
    // Hash-only links stay in-page — skip next-intl Link to avoid locale prefixing.
    const isHash = typeof href === "string" && href.startsWith("#");
    if (external || isHash) {
      return (
        <a
          href={href as string}
          className={cls}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
