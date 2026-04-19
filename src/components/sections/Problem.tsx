"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { DotMatrix } from "@/components/brand/Decor";

/**
 * P2 — AI Agent 的问题，不在技术，在 GTM
 * Single-column focused layout: big headline + 3 numbered pain points.
 * Cream background keeps it warm but distinct from the Hero paper.
 */
export function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { n: string; text: string }[];

  return (
    <Section bg="cream" className="relative overflow-hidden">
      {/* Decorative dot matrix corner */}
      <DotMatrix
        cols={6}
        rows={6}
        className="absolute top-10 right-10 text-ink/40 hidden md:block"
      />
      <Container size="full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            {t("title")}
          </h2>
          <div className="mt-8 h-px bg-ink/30" />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {items.map((it) => (
            <li
              key={it.n}
              className="border-t-2 border-ink/80 pt-6 space-y-4"
            >
              <div className="sp-display text-orange-500 text-5xl md:text-6xl font-bold">
                {it.n}
              </div>
              <p className="text-lg md:text-xl text-ink/80 font-medium leading-relaxed">
                {it.text}
              </p>
            </li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
