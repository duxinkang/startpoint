"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Homepage showcase — surfaces the three real launch videos directly on the
 * landing page so visitors see proof before they have to click into a service
 * detail page.
 *
 * Sits between Problem and Partner: problem → proof → positioning.
 *
 * Video copy is sourced from `serviceDetails.launch-video.cases` (single
 * source of truth). Video src + theme gradient live in code, keyed by the
 * public brand name.
 */
type Case = { brand: string; headline: string; metric: string };

const VIDEO_BY_BRAND: Record<
  string,
  { src: string; poster: string; gradient: string; accent: string }
> = {
  "Poly.app": {
    src: "/videos/poly.mp4",
    poster: "/videos/posters/poly.jpg",
    gradient: "linear-gradient(135deg, var(--sp-cream-mid) 0%, var(--sp-orange-400) 60%, var(--sp-orange-600) 100%)",
    accent: "300万+ 播放",
  },
  "Blockit AI": {
    src: "/videos/miro.mp4",
    poster: "/videos/posters/miro.jpg",
    gradient: "linear-gradient(135deg, #2A1F4A 0%, var(--sp-indigo-500) 60%, var(--sp-orange-400) 100%)",
    accent: "6小时破 100万",
  },
  Crunched: {
    src: "/videos/ava-artisan.mp4",
    poster: "/videos/posters/ava-artisan.jpg",
    gradient: "linear-gradient(135deg, var(--sp-apricot) 0%, var(--sp-orange-400) 50%, var(--sp-ink-soft) 100%)",
    accent: "400万+ 播放",
  },
};

export function Showcase() {
  const t = useTranslations("showcase");
  const casesT = useTranslations("serviceDetails.launch-video");
  const cases = casesT.raw("cases") as Case[];

  return (
    <Section
      bg="ink"
      id="showcase"
      spacing="hero"
      className="scroll-mt-20"
    >
      {/* Subtle grid overlay for texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <Container size="full" className="relative">
        {/* Header — editorial 12-col layout. Eyebrow column on the left,
            big headline + lede on the right. Lots of negative space. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28"
        >
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-orange-500" />
              <span className="sp-eyebrow text-orange-400">
                {t("eyebrow")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-8">
            <h2 className="sp-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] text-white max-w-[18ch]">
              {t.rich("title", {
                em: (chunks) => (
                  <span className="text-orange-400 italic font-medium">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="sp-lede text-white/65 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {cases.map((c, i) => (
            <ShowcaseCard key={c.brand} c={c} index={i} />
          ))}
        </div>

        {/* Bottom CTA — calmer, single-row, with a thin rule above */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-20 md:mt-28 pt-10 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-12 justify-between"
        >
          <div className="space-y-3 max-w-xl">
            <div className="sp-eyebrow text-white/45">
              {t("ctaEyebrow")}
            </div>
            <p className="sp-display text-2xl md:text-[1.875rem] text-white leading-[1.2]">
              {t("ctaTitle")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/contact" variant="primary" size="lg">
              {t("ctaPrimary")} →
            </Button>
            <a
              href="/services/launch-video"
              className="text-sm font-semibold text-white/75 hover:text-orange-400 transition-colors underline-offset-4 hover:underline"
            >
              {t("ctaSecondary")} →
            </a>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function ShowcaseCard({ c, index }: { c: Case; index: number }) {
  const video = VIDEO_BY_BRAND[c.brand];
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Video / thumbnail area — 9:16 aspect feels cinematic for launch videos */}
      <div className="relative aspect-[4/5] md:aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black">
        {video && !playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            // aria-label mirrors the visible card text (brand + headline) so
            // assistive tech announces the same thing sighted users see. The
            // previous English-only "Play X launch video" mismatched the
            // Chinese headlines shown on zh pages and tripped the audit.
            aria-label={`${c.brand} — ${c.headline}`}
            className="absolute inset-0 flex items-end justify-start text-left transition-transform duration-500 group-hover:scale-[1.02]"
            style={video ? { background: video.gradient } : undefined}
          >
            {/* Poster image — first frame of the launch video. Sits on top
                of the brand gradient (which stays as a fallback while the
                image loads and to absorb any letterboxing). */}
            <Image
              src={video.poster}
              alt={`${c.brand} — ${c.headline}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              priority={index === 0}
            />

            {/* Readability wash — darkens the bottom of the poster so the
                brand + headline overlay stays legible across any frame. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10"
            />

            {/* Decorative ball bottom-right (kept for the signature feel) */}
            <span
              aria-hidden="true"
              className="absolute -right-12 -top-12 w-56 h-56 rounded-full blur-2xl opacity-30 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(circle, white 0%, transparent 70%)",
              }}
            />

            {/* Accent badge top-left */}
            <span className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-xs font-bold text-ink shadow-md z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              {video.accent}
            </span>

            {/* Play button center */}
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="translate-x-0.5"
                >
                  <path d="M16 12l22 12-22 12V12z" fill="var(--sp-orange-400)" />
                </svg>
              </span>
            </span>

            {/* Brand + headline overlay bottom */}
            <span className="relative z-10 w-full p-6 md:p-7 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <span className="block text-white/75 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                {c.brand}
              </span>
              <span className="block sp-display text-xl md:text-2xl text-white leading-tight">
                {c.headline}
              </span>
            </span>
          </button>
        )}

        {video && playing && (
          <video
            // eslint-disable-next-line jsx-a11y/media-has-caption
            src={video.src}
            poster={video.poster}
            autoPlay
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-cover bg-black"
          />
        )}

        {!video && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #2A2A2A 0%, var(--sp-ink-soft) 100%)",
            }}
          >
            <span className="text-white/40 text-sm">Coming soon</span>
          </div>
        )}
      </div>

      {/* Metric below the video card */}
      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-orange-500 font-bold text-lg tabular-nums">
          0{index + 1}
        </span>
        <p className="text-white/75 text-sm md:text-sm leading-relaxed">
          {c.metric}
        </p>
      </div>
    </motion.div>
  );
}
