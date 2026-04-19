"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";

/**
 * P14 — 核心优势 (Advantages)
 * Six differentiators in a 3-column grid on cream background.
 */
export function Advantages() {
  const t = useTranslations("advantages");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section bg="cream">
      <Container size="full">
        <div className="max-w-3xl mb-14">
          <Pill variant="orange" size="md" className="mb-5">
            {t("kicker")}
          </Pill>
          <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-ink/75 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card variant="subtle" className="group h-full hover:border-orange-500/40">
                <div className="text-orange-500 font-bold text-sm mb-3 tracking-wider">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-ink text-lg md:text-xl leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-ink/75 leading-relaxed text-sm">
                  {item.text}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
