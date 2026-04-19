"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

type Step = { title: string; text: string };
type Case = { brand: string; headline: string; metric: string };

/**
 * Maps case brand names to a video asset in /public/videos/.
 * Brands without a video render the gradient placeholder card.
 * Add new videos by dropping under /public/videos/<name>.mp4 and updating this map.
 *
 * Note: source files were named after the internal client (Poly Final.mp4,
 * Ava - Artisan V3.4.mp4, Miro V3.2.mp4). The PPT uses the public brand
 * names Poly.app / Crunched / Blockit AI — same clients, different
 * surfaced names. Keep the map keyed by the public brand name.
 */
const VIDEO_BY_BRAND: Record<string, { src: string; poster?: string }> = {
  "Poly.app": { src: "/videos/poly.mp4", poster: "/videos/posters/poly.jpg" },
  Crunched: {
    src: "/videos/ava-artisan.mp4",
    poster: "/videos/posters/ava-artisan.jpg",
  },
  "Blockit AI": {
    src: "/videos/miro.mp4",
    poster: "/videos/posters/miro.jpg",
  },
};

export function LaunchVideoDetail() {
  const t = useTranslations("serviceDetails.launch-video");
  const steps = t.raw("steps") as Step[];
  const cases = t.raw("cases") as Case[];

  return (
    <>
      <Section bg="paper" className="!pt-4">
        <Container size="full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-orange-500 font-bold text-xl">
                  0{i + 1}
                </div>
                <h2 className="sp-display text-2xl text-ink">{step.title}</h2>
                <p className="text-ink/80 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="cream">
        <Container size="full">
          <h2 className="sp-display text-3xl md:text-4xl mb-10">
            <span className="text-orange-500">Client cases</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <CaseCard key={c.brand} c={c} index={i} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function CaseCard({ c, index }: { c: Case; index: number }) {
  const video = VIDEO_BY_BRAND[c.brand];
  const [playing, setPlaying] = useState(false);

  const gradient =
    index === 0
      ? "linear-gradient(135deg, #FFD9B8, #F5551D)"
      : index === 1
        ? "linear-gradient(135deg, #1A1A1A, #5C4BD1)"
        : "linear-gradient(135deg, #FFB88A, #C2380B)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden bg-white border border-ink/10 flex flex-col shadow-sm"
    >
      {/* Video / thumbnail area */}
      <div
        className="aspect-video w-full relative flex items-center justify-center overflow-hidden"
        style={video ? undefined : { background: gradient }}
      >
        {video ? (
          <>
            {!playing && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`${c.brand} — ${c.headline}`}
                className="absolute inset-0 flex items-center justify-center group"
                style={{ background: gradient }}
              >
                {/* Poster preview — real first frame replaces the flat
                    gradient so visitors see what they're about to play. */}
                {video.poster && (
                  <Image
                    src={video.poster}
                    alt={`${c.brand} — ${c.headline}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10"
                />
                <span className="sp-ball absolute -right-6 -bottom-6 w-28 h-28 opacity-60 z-[1]" />
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="drop-shadow-xl transition-transform group-hover:scale-110 relative z-[2]"
                >
                  <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.95" />
                  <path d="M20 16l14 8-14 8V16z" fill="#F5551D" />
                </svg>
              </button>
            )}
            {playing && (
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
          </>
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="drop-shadow-lg"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.9" />
            <path d="M20 16l14 8-14 8V16z" fill="#F5551D" />
          </svg>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <Pill variant="soft" size="sm" className="self-start mb-3">
          {c.brand}
        </Pill>
        <h3 className="font-bold text-ink text-base leading-snug">
          {c.headline}
        </h3>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed">{c.metric}</p>
      </div>
    </motion.div>
  );
}
