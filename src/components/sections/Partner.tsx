"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";

/**
 * P3 — 您的增长合伙人
 * Warm yellow/orange gradient background.
 * Left: kicker + 您的增长合伙人 stacked title.
 * Right: 3 pillars (orange pills + black text).
 */
export function Partner() {
  const t = useTranslations("partner");
  const pillars = t.raw("pillars") as { label: string; text: string }[];

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 lg:py-32 text-ink"
      style={{
        background:
          "linear-gradient(100deg, #FFD29A 0%, #FFB266 50%, #FFE9CC 100%)",
      }}
    >
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-lg md:text-xl text-ink/75 font-medium mb-4">
              {t("kicker")}
            </div>
            <h2 className="sp-display text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              {t("headline").split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                {t("title")}
              </h3>
              <div className="mt-6 h-px bg-ink/40" />
            </div>

            <ul className="space-y-5">
              {pillars.map((p) => (
                <li key={p.label} className="flex items-center gap-5">
                  <Pill
                    variant="orange"
                    size="md"
                    className="min-w-[7rem] justify-center !py-2.5"
                  >
                    {p.label}
                  </Pill>
                  <span className="text-base md:text-lg font-medium text-ink/90">
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-ink/20">
              <p className="text-sm text-ink/70 text-center md:text-right">
                {t("footnote")}
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
