"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

/**
 * P13 (condensed) — 50+ / 30+ / 7 days / 100% / 15+ / 100% strip
 */
export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { n: string; label: string; text: string }[];

  return (
    <Section bg="ink" className="!py-20">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 items-center">
          <div>
            <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white">
              {t("title")}
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/70 leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((it, i) => (
              <motion.div
                key={it.label + i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="sp-display text-4xl md:text-5xl text-orange-500">
                  {it.n}
                </div>
                <div className="font-bold text-ink mt-1">{it.label}</div>
                {it.text && (
                  <div className="text-xs text-ink/60 mt-1 leading-relaxed">
                    {it.text}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
