"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Outro() {
  const t = useTranslations("outro");
  const nav = useTranslations("nav");

  return (
    <section className="relative overflow-hidden bg-paper text-ink py-28 md:py-40 lg:py-48">
      {/* Single warm wash on the right — replaces the heavier wedge + dot
          matrix combo for a calmer closing frame. */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-1/2 md:w-[55%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 105% 50%, var(--sp-orange-400) 0%, var(--sp-apricot) 50%, transparent 75%)",
          opacity: 0.85,
        }}
      />

      <Container size="full" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12"
        >
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-orange-500" />
              <span className="sp-eyebrow text-orange-500">In closing</span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <h2 className="sp-display text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] text-ink leading-[1.04] max-w-[20ch]">
              {t("title")}
            </h2>

            <div className="sp-prose sp-measure-lg text-ink/75 text-lg md:text-xl">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
              <Button href="/contact" variant="primary" size="lg">
                {nav("cta")} →
              </Button>
              <a
                href="/services"
                className="text-sm font-semibold text-ink hover:text-orange-500 transition-colors underline-offset-4 hover:underline"
              >
                {nav("services")} →
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
