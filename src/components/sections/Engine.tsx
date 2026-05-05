"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { DoubleBall } from "@/components/brand/GradientBall";

/**
 * Four-step growth engine — quadrant layout around a gradient hub.
 * Refined: editorial header (eyebrow + headline + lede), looser grid,
 * thinner connectors, calmer numbered marks.
 */
export function Engine() {
  const t = useTranslations("engine");
  const steps = t.raw("steps") as {
    n: string;
    title: string;
    text: string;
  }[];

  return (
    <Section bg="paper">
      <Container size="full">
        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-orange-500" />
              <span className="sp-eyebrow text-orange-500">The engine</span>
            </div>
          </div>
          <div className="lg:col-span-9 space-y-7">
            <h2 className="sp-display text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] text-ink max-w-[18ch]">
              {t("title")}
            </h2>
            <p className="sp-lede text-ink/70 max-w-2xl">{t("description")}</p>
          </div>
        </div>

        {/* Quadrant grid around a gradient hub */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-x-32 md:gap-y-28 max-w-5xl mx-auto">
          {/* Center hub */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 items-center justify-center z-0 pointer-events-none"
          >
            <DoubleBall size={260} offset={36} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-ink text-center z-10">
              <div className="sp-eyebrow text-ink/55 mb-2">Core</div>
              <div className="sp-display text-2xl leading-tight">
                {t("subtitle")}
              </div>
            </div>
          </motion.div>

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative z-10 ${
                i === 0
                  ? "md:text-right md:pr-12"
                  : i === 1
                    ? "md:pl-12"
                    : i === 2
                      ? "md:text-right md:pr-12 md:mt-16"
                      : "md:pl-12 md:mt-16"
              }`}
            >
              <div className="space-y-4">
                <div
                  className={`flex items-center gap-3 ${
                    i === 0 || i === 2 ? "md:justify-end" : ""
                  }`}
                >
                  <span className="sp-eyebrow sp-tabular text-orange-500">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-orange-500/60"
                  />
                </div>
                <h3 className="sp-display text-2xl md:text-[1.75rem] text-ink leading-[1.15]">
                  {step.title}
                </h3>
                <p className="text-ink/65 text-base md:text-[1.0625rem] leading-[1.65] max-w-sm md:max-w-[24rem] md:inline-block">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Mobile center title */}
          <div className="md:hidden text-center py-4">
            <div className="sp-eyebrow text-ink/50 mb-2">Core</div>
            <div className="sp-display text-2xl text-ink">{t("subtitle")}</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
