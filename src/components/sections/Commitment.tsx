"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";

/**
 * P16 — 核心承诺 (Core Commitment)
 * Left: kicker + title.
 * Right: 2x2 grid of soft-orange cards with central "3-6 months" target.
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div className="space-y-8">
            <Logo size="md" variant="dark" />
            <div>
              <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
                {t("title")}
              </h2>
              <p className="mt-6 text-lg text-ink/70 max-w-md leading-relaxed">
                {t("subtitle")}
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-5">
            {/* Center puck */}
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full z-10 flex items-center justify-center text-center text-white p-4"
              style={{
                background:
                  "radial-gradient(circle, #FFB483 0%, #F5551D 80%)",
              }}
            >
              <span className="text-sm md:text-base font-bold leading-tight">
                {t("centerText")}
              </span>
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl p-6 md:p-8 min-h-[200px] flex flex-col"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(140deg, #FFD9B8 0%, #FFAE78 100%)"
                      : "linear-gradient(140deg, #FFB88A 0%, #F5551D 100%)",
                  color: i % 2 === 0 ? "#0A0A0A" : "#fff",
                }}
              >
                <div className="font-bold text-2xl mb-2 flex items-baseline gap-2">
                  <span className="sp-display">{step.n}</span>
                  <span className="text-xl">｜</span>
                  <span>{step.title}</span>
                </div>
                <p className="text-sm md:text-base leading-relaxed opacity-90">
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
