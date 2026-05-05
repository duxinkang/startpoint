"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { DoubleBall } from "@/components/brand/GradientBall";
import { GridCircle, ArcLine, DotMatrix } from "@/components/brand/Decor";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isZh = locale === "zh";
  const primaryTitle = isZh ? t("titleZh") : t("titleEn");
  // English version doesn't carry the 起始点 sub-mark — keeps the hero
  // visually quieter and avoids out-of-context CJK glyphs for EN visitors.
  const secondaryTitle = isZh ? t("titleEn") : null;

  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      const reducedData = window.matchMedia("(prefers-reduced-data: reduce)")
        .matches;
      setShowVideo(wide.matches && !reducedData);
    };
    update();
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, []);

  return (
    <Section
      bg="paper"
      spacing="flush"
      className="min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32"
    >
      {showVideo && (
        <video
          // eslint-disable-next-line jsx-a11y/media-has-caption
          src="/videos/poly.mp4"
          poster="/videos/posters/poly.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none"
          style={{
            maskImage:
              "radial-gradient(ellipse at 70% 50%, black 30%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 70% 50%, black 30%, transparent 78%)",
          }}
        />
      )}
      <Container size="full" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10 md:space-y-12"
          >
            {/* Editorial eyebrow — wide-tracked, not pill-shaped */}
            <div className="flex items-center gap-4 text-ink/55">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-orange-500"
              />
              <span className="sp-eyebrow text-orange-500">
                {t("eyebrow")}
              </span>
            </div>

            {/* Title block — primary + (zh-only) secondary mark */}
            <div className="space-y-5">
              <h1
                lang={isZh ? "zh-CN" : "en"}
                className="sp-display-xl text-[18vw] sm:text-[13vw] lg:text-[8.5vw] xl:text-[140px]"
              >
                {primaryTitle}
              </h1>
              {secondaryTitle && (
                <h2
                  lang="en"
                  className="sp-display text-[8vw] sm:text-[5.5vw] lg:text-[3vw] xl:text-[44px] text-ink/40 font-medium"
                >
                  {secondaryTitle}
                </h2>
              )}
            </div>

            {/* Subtitle — clean, no SVG bullet, just type */}
            <p className="sp-lede max-w-xl text-ink/75">
              {t("subtitle")}
            </p>

            {/* CTAs — bigger spacing between primary and ghost link */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              <Button href="/contact" variant="primary" size="lg">
                {t("cta")} →
              </Button>
              <a
                href="#showcase"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-ink hover:text-orange-500 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-ink/20 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 4-8 4V2z" fill="currentColor" />
                  </svg>
                </span>
                {t("ctaSecondary")}
              </a>
            </div>
          </motion.div>

          {/* Right: gradient ball + grid circle */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[620px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <DoubleBall size={440} offset={110} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-0 right-4 md:right-0 z-10"
            >
              <GridCircle size={112} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-12 left-0 md:-left-8 text-ink z-10"
            >
              <DotMatrix cols={5} rows={5} />
            </motion.div>
          </div>
        </div>

        <div className="hidden md:block absolute -bottom-24 -left-20 text-ink/60 pointer-events-none">
          <ArcLine size={260} />
        </div>
      </Container>
    </Section>
  );
}
