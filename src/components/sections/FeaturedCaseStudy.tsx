"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Link } from "@/i18n/navigation";

// Which service lines actually shipped inside this featured engagement —
// editorial mapping curated to the workstreams above. Adding them as
// footer chip links densifies the internal-link graph between /cases and
// /services so both readers and search crawlers see the product-service
// connection rather than treating the case study as a dead-end page.
const SERVICES_ENGAGED = ["kol", "social", "paid-ads"] as const;

/**
 * FeaturedCaseStudy — anchor case on /cases.
 *
 * Structure: eyebrow + category + title/subtitle → three parallel workstream
 * cards (market launch, product strategy, fundraising narrative) → month-1
 * results grid (4 big numbers) → founder quote.
 *
 * Client identity is intentionally anonymised — copy speaks about the product
 * shape ("B2B AI Agent · user interview platform") rather than brand.
 */
type Workstream = { n: string; title: string; items: string[] };
type Result = { n: string; label: string };

export function FeaturedCaseStudy() {
  const t = useTranslations("featuredCase");
  const servicesT = useTranslations("services");
  const locale = useLocale();
  const isZh = locale === "zh";
  const workstreams = t.raw("workstreams") as Workstream[];
  const results = t.raw("results") as Result[];
  const serviceItems = servicesT.raw("items") as {
    slug: string;
    title: string;
  }[];
  const engagedServices = SERVICES_ENGAGED.map((slug) =>
    serviceItems.find((s) => s.slug === slug),
  ).filter((s): s is { slug: string; title: string } => Boolean(s));

  return (
    <Section bg="ink" spacing="hero" className="relative overflow-hidden">
      {/* Decorative corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--sp-orange-400) 0%, transparent 70%)",
        }}
      />

      <Container size="full" className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <Pill variant="orange" size="md" className="mb-6">
            {t("eyebrow")}
          </Pill>
          <div className="text-orange-400 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4">
            {t("category")}
          </div>
          <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-white">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Workstreams */}
        <div className="mt-16 md:mt-20">
          <div className="text-white/50 text-xs font-bold tracking-[0.25em] uppercase mb-6">
            {t("workstreamsTitle")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {workstreams.map((ws, i) => (
              <motion.div
                key={ws.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-7 md:p-8 hover:border-orange-500/40 transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="sp-display text-orange-500 text-4xl md:text-5xl tabular-nums leading-none">
                    {ws.n}
                  </span>
                  <h3 className="sp-display text-white text-lg md:text-xl leading-tight">
                    {ws.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {ws.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/75 text-sm leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 shrink-0 w-1 h-1 rounded-full bg-orange-500"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5 border border-orange-500/30 p-8 md:p-10"
        >
          <div className="text-orange-400 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-6">
            {t("resultsEyebrow")}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              >
                <div className="sp-display text-orange-500 text-5xl md:text-6xl leading-none tabular-nums">
                  {r.n}
                </div>
                <div className="mt-3 text-white/75 text-sm md:text-base leading-snug">
                  {r.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services engaged — internal link back to /services pages */}
        {engagedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mt-14 md:mt-16"
          >
            <div className="text-white/55 text-xs font-bold tracking-[0.25em] uppercase mb-5">
              {isZh ? "本次合作用到的服务" : "Services engaged in this work"}
            </div>
            <div className="flex flex-wrap gap-3">
              {engagedServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:text-white hover:border-orange-500/60 hover:bg-orange-500/10 transition-colors"
                >
                  <span>{svc.title}</span>
                  <span aria-hidden="true" className="text-orange-400">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quote */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 md:mt-20 max-w-4xl"
        >
          <blockquote className="sp-display text-xl md:text-2xl lg:text-3xl text-white leading-snug relative">
            <span
              aria-hidden="true"
              className="absolute -top-6 -left-2 md:-left-8 text-orange-500/40 text-6xl md:text-7xl select-none leading-none"
            >
              &ldquo;
            </span>
            {t("quote")}
          </blockquote>
          <figcaption className="mt-6 text-white/55 text-sm tracking-wide">
            {t("quoteBy")}
          </figcaption>
        </motion.figure>
      </Container>
    </Section>
  );
}
