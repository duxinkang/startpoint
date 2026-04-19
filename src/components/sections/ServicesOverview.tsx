"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";

/**
 * P4 — 业务覆盖 (Services Overview)
 * Full orange background, huge "业务覆盖" title, center "市场策略" hub,
 * 6 black capsule nodes arranged 3-left / 3-right with arrows.
 */
export function ServicesOverview() {
  const t = useTranslations("services");
  const items = t.raw("items") as { slug: string; title: string }[];

  const left = items.slice(0, 3);
  const right = items.slice(3);

  return (
    <Section bg="orange" spacing="hero">
      <Container size="full">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-90">
          <Logo variant="dark" size="sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sp-display text-[14vw] sm:text-[10vw] lg:text-[7vw] xl:text-[120px] leading-[0.9] text-ink"
          >
            {t("title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:pt-8"
          >
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed max-w-md">
              {t("description")}
            </p>
          </motion.div>
        </div>

        {/* Hub and spokes */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center">
          {/* Left column */}
          <div className="space-y-5 md:space-y-8">
            {left.map((item) => (
              <ServiceNode
                key={item.slug}
                item={item}
                align="right"
              />
            ))}
          </div>

          {/* Center hub */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-ink rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl w-40 h-40 md:w-56 md:h-56 mx-auto my-8 md:my-0 shadow-xl"
          >
            {t("center")}
          </motion.div>

          {/* Right column */}
          <div className="space-y-5 md:space-y-8">
            {right.map((item) => (
              <ServiceNode key={item.slug} item={item} align="left" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ServiceNode({
  item,
  align,
}: {
  item: { slug: string; title: string };
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "right" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-4 ${align === "left" ? "flex-row" : "flex-row-reverse"}`}
    >
      <Link
        href={`/services/${item.slug}` as const}
        className="group flex-1"
      >
        <div
          className={`bg-ink text-white rounded-full px-8 py-5 font-bold text-base md:text-lg tracking-wide transition-all group-hover:bg-white group-hover:text-orange-500 shadow-lg ${align === "left" ? "text-left" : "text-right"}`}
        >
          {item.title}
        </div>
      </Link>
      <svg
        width="32"
        height="20"
        viewBox="0 0 32 20"
        fill="none"
        className="text-ink shrink-0"
        style={{ transform: align === "right" ? "rotate(180deg)" : undefined }}
        aria-hidden="true"
      >
        <path
          d="M2 10H28M28 10L20 2M28 10L20 18"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
