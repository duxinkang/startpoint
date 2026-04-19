"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DotMatrix } from "@/components/brand/Decor";

/**
 * P17 — 更理性、更敏捷、更确定的增长路径
 * Full-width statement block + right-side warm orange curve.
 */
export function Outro() {
  const t = useTranslations("outro");
  const nav = useTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-paper text-ink py-24 md:py-32">
      {/* Right decorative curved orange wedge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 110% 50%, #F5551D 0%, #FFB88A 60%, transparent 75%)",
        }}
      />
      <DotMatrix
        cols={5}
        rows={5}
        className="absolute top-24 right-24 text-ink/80"
      />

      <Container size="full" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-8"
        >
          <h2 className="sp-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-ink/80 leading-relaxed">
            {t("body1")}
          </p>
          <p className="text-lg md:text-xl text-ink/80 leading-relaxed">
            {t("body2")}
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <Button href="/contact" variant="primary" size="lg">
              {nav("cta")} →
            </Button>
            <Button href="/pricing" variant="outline" size="lg">
              {nav("pricing")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
