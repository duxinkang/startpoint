"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Compact wordmark strip under the Hero — gives visitors instant proof that
 * real AI products have shipped with StartPoint before they scroll into the
 * problem frame.
 *
 * Using typographic wordmarks (rather than fake logos) keeps this honest with
 * the current client list and matches the site's editorial/brutalist style.
 * When real SVG logos are available, drop them into /public/logos/ and replace
 * the span with an <Image/> — the layout is already a flex strip.
 */
const CLIENTS = [
  { name: "Poly.app", meta: "3M+ views · $16M raised" },
  { name: "Blockit AI", meta: "1M views in 6h" },
  { name: "Crunched", meta: "4M+ views" },
];

export function ClientLogos() {
  const t = useTranslations("clientLogos");

  return (
    <section className="bg-paper border-t border-b border-ink/10 py-14 md:py-16">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-center">
          <div className="lg:col-span-3 flex items-center gap-3 text-ink/55">
            <span aria-hidden="true" className="h-px w-8 bg-ink/30" />
            <span className="sp-eyebrow">{t("label")}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-9 flex flex-wrap items-baseline gap-x-12 md:gap-x-16 gap-y-4"
          >
            {CLIENTS.map((c) => (
              <div
                key={c.name}
                className="flex items-baseline gap-3 group cursor-default"
              >
                <span className="sp-display text-2xl md:text-[1.75rem] text-ink transition-colors group-hover:text-orange-500">
                  {c.name}
                </span>
                <span className="hidden md:inline text-xs text-ink/40 sp-tabular">
                  {c.meta}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
