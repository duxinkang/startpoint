"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";

/**
 * P12 — 自建市场团队 vs StartPoint (VS comparison)
 * Two-column comparison card: left (red/warn "自建团队"), right (orange/positive "StartPoint").
 */
export function Vs() {
  const t = useTranslations("vs");
  const left = t.raw("left") as { title: string; text: string }[];
  const right = t.raw("right") as { title: string; text: string }[];

  return (
    <Section bg="paper">
      <Container size="full">
        <div className="text-center mb-14">
          <Pill variant="orange" size="md" className="mb-5">
            VS
          </Pill>
          <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl text-ink leading-tight">
            {t("headline")}
          </h2>
          <p className="mt-5 text-lg text-ink/70 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left: self-build */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="feature">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <h3 className="font-bold text-xl text-ink">
                  {/* "自建市场团队" / "Building an in-house team" */}
                  {t("headline").split("vs")[0].trim()}
                </h3>
              </div>
              <ul className="space-y-5">
                {left.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-lg font-bold">
                      ✕
                    </div>
                    <div>
                      <div className="font-bold text-ink">{item.title}</div>
                      <div className="mt-1 text-sm text-ink/65 leading-relaxed">
                        {item.text}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Right: StartPoint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-ink text-white p-8 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="sp-ball absolute -right-12 -top-12 w-40 h-40 opacity-40" />
            <div className="flex items-center gap-3 mb-8 relative">
              <span className="w-3 h-3 rounded-full bg-orange-400" />
              <h3 className="font-bold text-xl">StartPoint</h3>
            </div>
            <ul className="space-y-5 relative">
              {right.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-white/75 leading-relaxed">
                      {item.text}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
