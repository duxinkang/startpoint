"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

/**
 * Editorial commitment block — 2-col layout, four steps as warm tile cards
 * around a center "3-6 months" target. Refined to match the rest of the page:
 * thinner numerals, looser leading, calmer color shifts.
 */
export function Commitment() {
  const t = useTranslations("commitment");
  const steps = t.raw("steps") as {
    n: string;
    title: string;
    text: string;
  }[];

  return (
    <Section bg="cream">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-y-16 gap-x-16 items-start">
          {/* Left — editorial header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10 lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-orange-500" />
              <span className="sp-eyebrow text-orange-500">Our promise</span>
            </div>
            <h2 className="sp-display text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.04] max-w-[14ch]">
              {t("title")}
            </h2>
            <p className="sp-lede text-ink/65 max-w-md">{t("subtitle")}</p>
          </motion.div>

          {/* Right — quadrant tiles around a center target */}
          <div className="relative grid grid-cols-2 gap-5 md:gap-6">
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-44 md:h-44 rounded-full z-10 flex items-center justify-center text-center text-white p-5 shadow-[0_30px_60px_-20px_rgba(234,69,16,0.55)]"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #FFD0A6 0%, var(--sp-orange-400) 70%, var(--sp-orange-600) 100%)",
              }}
            >
              <span className="text-[0.8125rem] md:text-sm font-semibold leading-[1.35] tracking-tight">
                {t("centerText")}
              </span>
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-3xl p-7 md:p-9 min-h-[220px] flex flex-col gap-5 relative overflow-hidden"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(140deg, var(--sp-cream-mid) 0%, var(--sp-peach-warm) 100%)"
                      : "linear-gradient(140deg, var(--sp-apricot) 0%, var(--sp-orange-400) 100%)",
                  color: i % 2 === 0 ? "var(--sp-ink)" : "#fff",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="sp-eyebrow sp-tabular"
                    style={{
                      color:
                        i % 2 === 0
                          ? "rgba(10,10,10,0.6)"
                          : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-6"
                    style={{
                      background:
                        i % 2 === 0
                          ? "rgba(10,10,10,0.25)"
                          : "rgba(255,255,255,0.5)",
                    }}
                  />
                </div>

                <h3 className="sp-display text-[1.375rem] md:text-2xl leading-[1.15]">
                  {step.title}
                </h3>

                <p
                  className="text-[0.9375rem] md:text-base leading-[1.6]"
                  style={{
                    color:
                      i % 2 === 0
                        ? "rgba(10,10,10,0.7)"
                        : "rgba(255,255,255,0.88)",
                  }}
                >
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
