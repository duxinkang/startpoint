"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

/**
 * Editorial stats strip on dark ground.
 * Two-column layout: headline left, six tabular numerals right.
 * Each stat is a vertical mini-rule cluster — number / label / context.
 */
export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { n: string; label: string; text: string }[];

  return (
    <Section bg="ink" spacing="default">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — context */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3 mb-8">
              <span aria-hidden="true" className="h-px w-8 bg-orange-400" />
              <span className="sp-eyebrow text-orange-400">By the numbers</span>
            </div>
            <h2 className="sp-display text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] text-white max-w-[14ch]">
              {t("title")}
            </h2>
            <p className="sp-lede mt-7 text-white/55 max-w-md">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Right — six stats in a clean 3×2 grid */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 lg:gap-x-14 lg:gap-y-16"
          >
            {items.map((it, i) => (
              <div
                key={it.label + i}
                className="group relative pt-6 border-t border-white/15"
              >
                <dt className="sp-eyebrow text-white/40 mb-5">
                  {String(i + 1).padStart(2, "0")}
                </dt>
                <dd className="space-y-3">
                  <div className="sp-display sp-tabular text-orange-400 text-[3rem] md:text-[3.5rem] lg:text-[4rem] leading-none font-semibold">
                    {it.n}
                  </div>
                  <div className="text-white font-semibold text-base md:text-lg">
                    {it.label}
                  </div>
                  {it.text && (
                    <p className="text-sm text-white/55 leading-[1.55] max-w-[26ch]">
                      {it.text}
                    </p>
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </Section>
  );
}
