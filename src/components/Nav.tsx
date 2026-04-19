"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { Logo } from "./brand/Logo";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/services", label: t("services") },
    { href: "/cases", label: t("cases") },
    { href: "/about", label: t("about") },
    { href: "/pricing", label: t("pricing") },
  ] as const;

  const toggleLocale = () => {
    const next = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-ink/10"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
            aria-label={t("home") /* fallback handled in i18n */}
          >
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-ink/75 hover:text-orange-500 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="hidden md:inline-flex items-center rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink/75 hover:text-ink hover:border-ink/40 transition"
              aria-label={locale === "zh" ? "EN - switch language to English" : "中 - 切换到中文"}
            >
              {locale === "zh" ? "EN" : "中"}
            </button>
            <Button href="/contact" variant="primary" size="sm">
              {t("cta")}
            </Button>
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d={open ? "M6 6l12 12M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2 border-t border-ink/10 pt-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-medium text-ink/75 hover:text-orange-500"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLocale();
                setOpen(false);
              }}
              className="block py-2 text-sm text-ink/55"
            >
              {locale === "zh" ? "English" : "中文"}
            </button>
          </div>
        )}
      </Container>
    </header>
  );
}
