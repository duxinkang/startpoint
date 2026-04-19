"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

/**
 * About-page founder story — three chapters that explain why StartPoint
 * exists (background, market gap, founding thesis), closing on a signed
 * pull-quote. Lives between the About hero and the Vs comparison so the
 * reader moves from "who we are" → "why we exist" → "why hire us".
 */
type Chapter = { year: string; title: string; text: string };

export function FounderStory() {
  const t = useTranslations("about.story");
  const chapters = t.raw("chapters") as Chapter[];

  return (
    <Section bg="cream" spacing="hero">
      <Container size="full">
        <div className="max-w-4xl mb-14 md:mb-20">
          <Pill variant="orange" size="md" className="mb-6">
            {t("eyebrow")}
          </Pill>
          <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ink">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {chapters.map((c, i) => (
            <motion.div
              key={c.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="sp-display text-orange-500 text-5xl md:text-6xl leading-none tabular-nums">
                  {c.year}
                </span>
                <span className="text-ink/40 text-xs font-bold tracking-[0.25em] uppercase">
                  {`0${i + 1}`}
                </span>
              </div>
              <div className="h-px bg-ink/20 mb-5" />
              <h3 className="sp-display text-xl md:text-2xl text-ink leading-snug mb-3">
                {c.title}
              </h3>
              <p className="text-ink/75 text-base leading-relaxed">
                {c.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 md:mt-28 max-w-4xl mx-auto text-center"
        >
          <blockquote className="sp-display text-2xl md:text-3xl lg:text-4xl text-ink leading-snug relative">
            <span
              aria-hidden="true"
              className="absolute -top-8 -left-4 md:-left-10 text-orange-500/30 text-7xl md:text-8xl select-none leading-none"
            >
              &ldquo;
            </span>
            {t("quote")}
          </blockquote>
          <figcaption className="mt-6 text-ink/55 text-sm tracking-wide">
            {t("signature")}
          </figcaption>
        </motion.figure>
      </Container>
    </Section>
  );
}
