"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
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
    gradient: "linear-gradient(135deg, #FFD9B8 0%, #F5551D 60%, #C2380B 100%)",
    accent: "300万+ 播放",
  },
  "Blockit AI": {
    src: "/videos/miro.mp4",
    poster: "/videos/posters/miro.jpg",
    gradient: "linear-gradient(135deg, #2A1F4A 0%, #5C4BD1 60%, #F5551D 100%)",
    accent: "6小时破 100万",
  },
  Crunched: {
    src: "/videos/ava-artisan.mp4",
    poster: "/videos/posters/ava-artisan.jpg",
    gradient: "linear-gradient(135deg, #FFB88A 0%, #F5551D 50%, #1A1A1A 100%)",
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
      className="!py-24 md:!py-32 scroll-mt-20"
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
        {/* Header */}
        <div className="max-w-4xl mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <Pill variant="orange" size="md" className="mb-6">
              {t("eyebrow")}
            </Pill>
            <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              {t.rich("title", {
                em: (chunks) => (
                  <span className="text-orange-500">{chunks}</span>
                ),
              })}
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-7">
          {cases.map((c, i) => (
            <ShowcaseCard key={c.brand} c={c} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
        >
          <div className="space-y-1">
            <div className="text-white/50 text-sm tracking-[0.2em] uppercase">
              {t("ctaEyebrow")}
            </div>
            <div className="sp-display text-2xl md:text-3xl text-white">
              {t("ctaTitle")}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" size="lg">
              {t("ctaPrimary")} →
            </Button>
            <Button
              href="/services/launch-video"
              variant="outline"
              size="lg"
              className="!text-white !border-white/30 hover:!bg-white/10"
            >
              {t("ctaSecondary")}
            </Button>
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
              alt=""
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
                  <path d="M16 12l22 12-22 12V12z" fill="#F5551D" />
                </svg>
              </span>
            </span>

            {/* Brand + headline overlay bottom */}
            <span className="relative z-10 w-full p-6 md:p-7 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <span className="block text-white/80 text-xs font-bold tracking-[0.2em] uppercase mb-2">
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
            className="w-full h-full object-cover bg-black"
          />
        )}

        {!video && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)",
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
        <p className="text-white/80 text-sm md:text-[15px] leading-relaxed">
          {c.metric}
        </p>
      </div>
    </motion.div>
  );
}
