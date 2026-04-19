"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";

/**
 * Cases grid — bilingual, reads cases.items from translations.
 * Animated cards with brand-styled gradient headers + metric emphasis.
 * Used on /cases page (P11 in source PDF).
 */
export function CasesGrid() {
  const t = useTranslations("cases");
  const items = t.raw("items") as {
    tag: string;
    title: string;
    text: string;
  }[];

  // Gradient themes per card — alternates through the three brand moods
  const themes = [
    {
      // orange / warm
      gradient: "from-orange-500 via-orange-400 to-amber-300",
      accent: "text-orange-600",
      chipBg: "bg-orange-500",
    },
    {
      // ink / deep
      gradient: "from-ink via-ink/90 to-orange-500/80",
      accent: "text-ink",
      chipBg: "bg-ink",
    },
    {
      // cream / editorial
      gradient: "from-amber-200 via-orange-200 to-orange-400",
      accent: "text-orange-700",
      chipBg: "bg-orange-600",
    },
  ];

  return (
    <Section bg="cream" className="!pt-8">
      <Container size="full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => {
            const theme = themes[i % themes.length];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative"
              >
                <Card variant="feature" className="overflow-hidden h-full flex flex-col hover:shadow-xl">
                  {/* Gradient header with case number */}
                  <div
                    className={`relative aspect-[16/9] bg-gradient-to-br ${theme.gradient} overflow-hidden`}
                  >
                    {/* Decorative dot matrix */}
                    <div className="sp-dot-matrix absolute inset-0 opacity-20" />

                    {/* Case number */}
                    <div className="absolute top-5 left-6 text-white/90 text-xs font-bold tracking-[0.2em]">
                      CASE 0{i + 1}
                    </div>

                    {/* Big sp-ball accent */}
                    <div className="sp-ball absolute -right-8 -bottom-8 w-40 h-40 opacity-70 mix-blend-overlay" />

                    {/* Category tag */}
                    <div className="absolute bottom-5 left-6">
                      <span
                        className={`${theme.chipBg} text-white text-xs font-bold px-3 py-1.5 rounded-full`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-7 md:p-8 flex-1">
                  <h3
                    className={`sp-display text-2xl md:text-[26px] leading-tight ${theme.accent}`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-4 text-ink/75 leading-relaxed text-[15px]">
                    {item.text}
                  </p>

                    {/* Bottom bar with "read more" arrow */}
                    <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
                      <Pill variant="outline" size="sm">
                        {item.tag}
                      </Pill>
                      <svg
                        width="28"
                        height="18"
                        viewBox="0 0 32 20"
                        fill="none"
                        aria-hidden="true"
                        className="text-ink/60 group-hover:text-orange-500 transition-colors"
                      >
                        <path
                          d="M2 10H28M28 10L20 2M28 10L20 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Card>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
