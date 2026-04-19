"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { DoubleBall } from "@/components/brand/GradientBall";
import { Chevrons } from "@/components/brand/Decor";

/**
 * P5 — 我们的四步增长引擎
 * 4 quadrant steps around a central double-ball hub.
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
        <div className="flex items-start gap-4 mb-16">
          <Chevrons className="text-ink mt-2" count={5} />
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-ink mt-1.5 shrink-0" />
            <p className="text-sm md:text-base text-ink/75 max-w-3xl leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-20 max-w-5xl mx-auto">
          {/* Center ball - absolute on desktop */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 items-center justify-center z-0 pointer-events-none"
          >
            <DoubleBall size={280} offset={40} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-ink/75 text-center z-10">
              <div className="sp-display text-3xl leading-tight">
                {t("title").split(" ").slice(0, 2).join(" ")}
              </div>
              <div className="text-sm mt-2 max-w-[180px] text-ink/75">
                {t("subtitle")}
              </div>
            </div>
          </motion.div>

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative z-10 ${
                i === 0
                  ? "md:text-right md:pr-8"
                  : i === 1
                    ? "md:pl-8"
                    : i === 2
                      ? "md:text-right md:pr-8 md:mt-24"
                      : "md:pl-8 md:mt-24"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-baseline gap-3 text-orange-500 font-bold text-xl">
                  <span className="sp-display text-2xl">{step.n}</span>
                  <span className="h-px w-6 bg-orange-500" />
                  <span>{step.title}</span>
                </div>
                <p className="text-ink/75 text-base leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Mobile center title */}
          <div className="md:hidden text-center py-6">
            <div className="sp-display text-2xl text-ink">{t("title")}</div>
            <div className="text-sm mt-2 text-ink/75">{t("subtitle")}</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
