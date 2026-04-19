"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { cardClasses } from "@/components/ui/Card";

/**
 * Internal cross-link mapping — given the current service slug, which
 * 2-3 sibling services compound best with it. Editorial, not alphabetical:
 * we pair services that actually win together (Launch Video feeds PH,
 * Reddit feeds SEO, etc.) so visitors who bought into one page get nudged
 * toward the natural next engagement — and so search engines see a dense
 * internal-link graph between related growth topics.
 */
const RELATED: Record<string, readonly string[]> = {
  "launch-video": ["product-hunt", "kol", "paid-ads"],
  kol: ["launch-video", "social", "product-hunt"],
  "paid-ads": ["seo-geo", "launch-video", "kol"],
  "product-hunt": ["launch-video", "kol", "social"],
  social: ["seo-geo", "product-hunt", "kol"],
  "seo-geo": ["social", "paid-ads", "kol"],
};

export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === "zh";
  const relatedSlugs = RELATED[currentSlug] ?? [];

  if (relatedSlugs.length === 0) return null;

  const items = t.raw("services.items") as {
    slug: string;
    title: string;
    short: string;
  }[];
  const relatedItems = relatedSlugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is { slug: string; title: string; short: string } =>
      Boolean(item),
    );

  return (
    <Section bg="cream" spacing="tight">
      <Container size="full">
        <div className="max-w-3xl mb-10">
          <Pill variant="orange" size="md" className="mb-5">
            {t("servicesIndex.relatedKicker")}
          </Pill>
          <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] text-ink">
            {t("servicesIndex.relatedTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {relatedItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className={cardClasses(
                "feature",
                "group flex flex-col h-full hover:border-orange-500/40 transition-all",
              )}
            >
              <div className="text-orange-500 font-bold text-xs mb-3 tracking-[0.2em]">
                0{i + 1}
              </div>
              <h3 className="sp-display text-xl md:text-2xl text-ink leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-ink/75 leading-relaxed text-sm flex-1">
                {item.short}
              </p>
              <div className="mt-6 flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                <span>{isZh ? "了解更多" : "Learn more"}</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
