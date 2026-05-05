"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";

export function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { n: string; text: string }[];

  return (
    <Section bg="cream" className="relative overflow-hidden">
      {/* Soft warm wash bottom-right — gives the cream depth without
          competing with the dot-matrix textures elsewhere on the page. */}
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--sp-orange-200) 0%, transparent 70%)",
        }}
      />

      <Container size="full" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 items-baseline"
        >
          {/* Left column — section label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-ink/40" />
              <span className="sp-eyebrow text-ink/55">02 — The gap</span>
            </div>
          </div>

          {/* Right column — the headline itself.
              Big editorial type, capped to a measure so the line
              breaks where they're meant to. */}
          <h2 className="lg:col-span-9 sp-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem] text-ink/95 max-w-[20ch]">
            {t("title")}
          </h2>
        </motion.div>

        <div className="mt-20 md:mt-28 sp-rule" />

        <motion.ul
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-14"
        >
          {items.map((it, i) => (
            <li
              key={it.n}
              className="group relative"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Number — refined, not garish. Smaller weight, looser tracking. */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="sp-display sp-tabular text-orange-500 text-5xl md:text-6xl font-semibold tracking-tight">
                  {it.n}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-ink/15 mb-2"
                />
              </div>

              {/* Body — bigger size than before but with calmer leading.
                  No more "font-medium" everywhere; we let the size carry it. */}
              <p className="text-lg md:text-xl text-ink/75 leading-[1.55] sp-measure">
                {it.text}
              </p>
            </li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
