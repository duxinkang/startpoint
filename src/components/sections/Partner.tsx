"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

export function Partner() {
  const t = useTranslations("partner");
  const pillars = t.raw("pillars") as { label: string; text: string }[];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-36 lg:py-44 text-ink"
      style={{
        background:
          "linear-gradient(115deg, #FFD9B3 0%, #FFB880 45%, #FFE9CF 100%)",
      }}
    >
      {/* Subtle paper grain — gives the warm gradient depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(var(--sp-ink) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      <Container size="full" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12">
          {/* Left — eyebrow + headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-8">
              <span aria-hidden="true" className="h-px w-8 bg-ink/50" />
              <span className="sp-eyebrow text-ink/65">{t("kicker")}</span>
            </div>
            <h2 className="sp-display text-[2.75rem] md:text-[3.75rem] lg:text-[5rem] text-ink leading-[1.02] max-w-[12ch]">
              {t("headline")}
            </h2>
          </motion.div>

          {/* Right — title, pillars, footnote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-7 space-y-12"
          >
            <h3 className="sp-display text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] text-ink/95 leading-[1.15] max-w-[22ch]">
              {t("title")}
            </h3>

            {/* Pillars — clean two-column rows with hairline dividers */}
            <ul className="divide-y divide-ink/15">
              {pillars.map((p, i) => (
                <li
                  key={p.label}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-8 gap-y-2 py-5 md:py-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="sp-eyebrow sp-tabular text-orange-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="sp-display text-base md:text-lg font-semibold text-ink whitespace-nowrap">
                      {p.label}
                    </span>
                  </div>
                  <p className="text-base md:text-[1.0625rem] text-ink/70 leading-[1.6]">
                    {p.text}
                  </p>
                </li>
              ))}
            </ul>

            <p className="sp-eyebrow text-ink/50 pt-2">{t("footnote")}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
