"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { DoubleBall } from "@/components/brand/GradientBall";
import { GridCircle, ArcLine, DotMatrix } from "@/components/brand/Decor";

/**
 * P1 — The opening frame of the deck.
 * Layout: eyebrow pill → 起始点 / StartPoint display → tagline.
 * Right side: double gradient ball + grid circle, layered OVER a muted
 * Poly.app launch-video loop that ties the Hero to our actual client proof.
 * The video is decorative — autoplay + muted + loop + playsInline ensures it
 * works on iOS Safari and never blocks scroll. Desktop-only to keep mobile
 * data usage in check.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <Section bg="paper" className="min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
      {/* Decorative Poly video loop — desktop only. Acts as a warm-tinted
          background behind the Hero; pointer-events-none so it never intercepts
          clicks. Fades out on the edges via a radial mask for focus on the copy. */}
      <video
        // eslint-disable-next-line jsx-a11y/media-has-caption
        src="/videos/poly.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />
      <Container size="full" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <Pill variant="ink" size="md" className="!px-5 !py-2 text-orange-300">
              <span className="tracking-[0.15em]">{t("eyebrow")}</span>
            </Pill>

            <div className="space-y-2">
              <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px]">
                {t("titleZh")}
              </h1>
              <h2 className="sp-display text-[10vw] sm:text-[7vw] lg:text-[5vw] xl:text-[80px] text-ink/95">
                {t("titleEn")}
              </h2>
            </div>

            <div className="flex items-start gap-3 text-ink/85 pt-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle
                  cx="14"
                  cy="14"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <text
                  x="14"
                  y="19"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="currentColor"
                >
                  1
                </text>
              </svg>
              <span className="text-xl md:text-2xl font-semibold tracking-tight">
                {t("subtitle")}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button href="/contact" variant="primary" size="lg">
                {t("cta")} →
              </Button>
              <Button href="#showcase" variant="outline" size="lg">
                ▶ {t("ctaSecondary")}
              </Button>
            </div>
          </motion.div>

          {/* Right: gradient ball + grid circle */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <DoubleBall size={420} offset={100} />
            </motion.div>

            {/* Grid circle top-right */}
            <motion.div
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-0 right-4 md:right-0 z-10"
            >
              <GridCircle size={120} />
            </motion.div>

            {/* Dot matrix bottom-left of ball */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-12 left-0 md:-left-8 text-ink z-10"
            >
              <DotMatrix cols={6} rows={5} />
            </motion.div>
          </div>
        </div>

        {/* Decorative arc bottom-left corner */}
        <div className="hidden md:block absolute -bottom-24 -left-20 text-ink/70 pointer-events-none">
          <ArcLine size={260} />
        </div>
      </Container>
    </Section>
  );
}
