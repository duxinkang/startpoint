"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
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
        {/* Editorial header — eyebrow in left column, headline + lede right. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12"
        >
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-orange-400" />
              <span className="sp-eyebrow text-orange-400">
                {t("eyebrow")}
              </span>
            </div>
            <div className="sp-eyebrow text-white/45">
              {t("category")}
            </div>
          </div>

          <div className="lg:col-span-9 space-y-7">
            <h2 className="sp-display text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] text-white leading-[1.05] max-w-[22ch]">
              {t("title")}
            </h2>
            <p className="sp-lede text-white/65 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Workstreams */}
        <div className="mt-24 md:mt-32">
          <div className="flex items-center gap-3 mb-10">
            <span aria-hidden="true" className="h-px w-8 bg-white/30" />
            <span className="sp-eyebrow text-white/55">
              {t("workstreamsTitle")}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {workstreams.map((ws, i) => (
              <motion.div
                key={ws.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-3xl bg-white/[0.04] border border-white/10 p-8 md:p-10 hover:border-orange-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-7">
                  <span className="sp-eyebrow sp-tabular text-orange-400">
                    {ws.n}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-orange-400/60" />
                </div>
                <h3 className="sp-display text-white text-[1.375rem] md:text-2xl leading-[1.2] mb-6">
                  {ws.title}
                </h3>
                <ul className="space-y-4">
                  {ws.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/70 text-[0.9375rem] leading-[1.6]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-orange-500"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-24 rounded-3xl bg-gradient-to-br from-orange-500/[0.08] via-transparent to-orange-500/[0.03] border border-orange-500/25 p-10 md:p-14"
        >
          <div className="flex items-center gap-3 mb-10">
            <span aria-hidden="true" className="h-px w-8 bg-orange-400" />
            <span className="sp-eyebrow text-orange-400">
              {t("resultsEyebrow")}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-10">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                className="space-y-4"
              >
                <div className="sp-display sp-tabular text-orange-400 text-[3.25rem] md:text-[4rem] leading-[0.95] font-semibold">
                  {r.n}
                </div>
                <div className="text-white/70 text-[0.9375rem] md:text-base leading-[1.5] max-w-[20ch]">
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

        {/* Quote — editorial pull-quote with generous leading and air.
            Uses body type (not sp-display) at large size so each line
            has room to breathe; a single oversized opening glyph
            sits in its own column on the left. */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 md:mt-32 pt-12 md:pt-16 border-t border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12">
            <div className="lg:col-span-2">
              <span
                aria-hidden="true"
                className="block sp-display text-orange-400/70 text-[5rem] md:text-[6.5rem] leading-[0.7] select-none"
              >
                &ldquo;
              </span>
            </div>

            <blockquote className="lg:col-span-10 max-w-[52ch]">
              <p className="text-[1.375rem] md:text-[1.625rem] lg:text-[1.875rem] text-white font-light leading-[1.55] tracking-[-0.005em]">
                {t("quote")}
              </p>
              <figcaption className="mt-10 flex items-center gap-3 text-white/55">
                <span aria-hidden="true" className="h-px w-8 bg-white/30" />
                <span className="sp-eyebrow text-white/55">
                  {t("quoteBy").replace(/^—\s*/, "")}
                </span>
              </figcaption>
            </blockquote>
          </div>
        </motion.figure>
      </Container>
    </Section>
  );
}
