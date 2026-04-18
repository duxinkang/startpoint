"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

export function ProductHuntDetail() {
  const t = useTranslations("serviceDetails.product-hunt");
  const targets = t.raw("targets") as string[];
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <Section bg="cream" className="!pt-4">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Left: Targets card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-ink text-white p-8 md:p-10"
          >
            <h2 className="font-bold text-xl mb-6">
              {/* keep key hardcoded to avoid a new i18n round-trip */}
              {t.raw("intro") ? "KEY OUTCOMES" : ""}
            </h2>
            <ul className="space-y-4">
              {targets.map((tg) => (
                <li
                  key={tg}
                  className="flex gap-3 text-white/90 leading-relaxed"
                >
                  <span className="text-orange-300 mt-1.5">•</span>
                  <span>{tg}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-5 items-start"
              >
                <div className="shrink-0 w-14 h-14 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xl">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-ink text-lg">{step.title}</h3>
                  <p className="mt-2 text-ink/75 leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
