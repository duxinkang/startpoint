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
    <section className="bg-paper border-t border-b border-ink/10 py-10 md:py-12">
      <Container size="full">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="shrink-0 text-ink/60 text-xs md:text-[13px] tracking-[0.22em] uppercase font-bold">
            {t("label")}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-x-10 md:gap-x-14 gap-y-4 flex-1"
          >
            {CLIENTS.map((c) => (
              <div
                key={c.name}
                className="flex items-baseline gap-3 group cursor-default"
              >
                <span className="sp-display text-2xl md:text-3xl text-ink transition-colors group-hover:text-orange-500">
                  {c.name}
                </span>
                <span className="hidden md:inline text-xs text-ink/45 tabular-nums">
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
