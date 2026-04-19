import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  getSeoGeoFaq,
  serviceSchema,
} from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { LaunchVideoDetail } from "@/components/services/LaunchVideoDetail";
import { KolDetail } from "@/components/services/KolDetail";
import { PaidAdsDetail } from "@/components/services/PaidAdsDetail";
import { ProductHuntDetail } from "@/components/services/ProductHuntDetail";
import { SocialDetail } from "@/components/services/SocialDetail";
import { SeoGeoDetail } from "@/components/services/SeoGeoDetail";

const VALID_SLUGS = [
  "launch-video",
  "kol",
  "paid-ads",
  "product-hunt",
  "social",
  "seo-geo",
] as const;

type Slug = (typeof VALID_SLUGS)[number];

function isValidSlug(s: string): s is Slug {
  return (VALID_SLUGS as readonly string[]).includes(s);
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of VALID_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

// Per-slug title suffixes — ensure every service page clears the 30-char
// minimum for good SERP rendering, and differentiates each page from its
// siblings so we don't trip "duplicate title" checks across zh/en.
const TITLE_SUFFIX: Record<Slug, { zh: string; en: string }> = {
  "launch-video": {
    zh: "AI 产品发布视频制作 — 7 天交付",
    en: "Launch Video production — 60-90s AI product story",
  },
  kol: {
    zh: "海外 KOL / KOC 达人营销 — AI Agent 精准投放",
    en: "Global KOL & KOC creator marketing for AI Agents",
  },
  "paid-ads": {
    zh: "AI 产品广告投放增长 — Google / Meta / Reddit 全渠道",
    en: "AI paid acquisition — Google, Meta, LinkedIn, X, Reddit",
  },
  "product-hunt": {
    zh: "Product Hunt 发布陪跑 — 冲击日榜前 3",
    en: "Product Hunt launch — aim for Product of the Day top 3",
  },
  social: {
    zh: "Reddit 与海外社区运营 — 真实用户口碑沉淀",
    en: "Reddit & community — earn real AI early-adopter trust",
  },
  "seo-geo": {
    zh: "SEO + GEO 优化 — Google 与 ChatGPT 同时推荐",
    en: "SEO + GEO optimization — Rank on Google, cited by ChatGPT",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) return {};
  const t = await getTranslations({
    locale,
    namespace: `serviceDetails.${slug}`,
  });
  const suffix = TITLE_SUFFIX[slug][locale === "zh" ? "zh" : "en"];
  return buildMetadata({
    locale,
    title: `${suffix} — StartPoint`,
    description: t("intro"),
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidSlug(slug)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: `serviceDetails.${slug}`,
  });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const jsonLd: object[] = [
    breadcrumbSchema(locale, [
      { name: nav("services"), path: "/services" },
      { name: t("title"), path: `/services/${slug}` },
    ]),
    serviceSchema({
      locale,
      slug,
      name: t("title"),
      description: t("intro"),
    }),
  ];
  if (slug === "seo-geo") {
    jsonLd.push(faqSchema(getSeoGeoFaq(locale)));
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <Section bg="paper" spacing="flush" className="pt-24 pb-16">
        <Container size="full">
          <Pill variant="orange" size="md" className="mb-6">
            {t("kicker")}
          </Pill>
          <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05] max-w-4xl">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-ink/80 leading-relaxed">
            {t("intro")}
          </p>
        </Container>
      </Section>

      {/* Slug-specific body */}
      {slug === "launch-video" && <LaunchVideoDetail />}
      {slug === "kol" && <KolDetail />}
      {slug === "paid-ads" && <PaidAdsDetail />}
      {slug === "product-hunt" && <ProductHuntDetail />}
      {slug === "social" && <SocialDetail />}
      {slug === "seo-geo" && <SeoGeoDetail />}

      {/* Rich CTA card — outcome, timeline, pricing, two actions */}
      <ServiceDetailCTA slug={slug} locale={locale} cta={nav("cta")} />
    </>
  );
}

/**
 * Bottom-of-page CTA card — surfaces concrete outcomes, timeline and pricing
 * for each service detail page so visitors know what they're buying before
 * they click through to the contact form.
 *
 * Content is inline (per-slug, per-locale) rather than in messages/*.json to
 * keep the CTA opinionated and easy to tune without a translation round-trip.
 */
function ServiceDetailCTA({
  slug,
  locale,
  cta,
}: {
  slug: Slug;
  locale: string;
  cta: string;
}) {
  const copy = getCtaCopy(slug, locale);

  return (
    <Section bg="ink" spacing="cta" className="md:py-24">
      <Container size="full">
        <div className="rounded-3xl bg-gradient-to-br from-[#1f1208] via-ink to-[#1a1a1a] border border-orange-500/20 p-8 md:p-12 lg:p-14 relative overflow-hidden">
          {/* Decorative orange glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #F5551D 0%, transparent 70%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14">
            {/* Left — headline + outcomes */}
            <div>
              <div className="text-orange-400 text-xs font-bold tracking-[0.25em] uppercase mb-4">
                {locale === "zh" ? "下一步" : "Next step"}
              </div>
              <h3 className="sp-display text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1]">
                {copy.title}
              </h3>
              <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                {copy.subtitle}
              </p>

              {/* Outcomes */}
              <ul className="mt-8 space-y-3">
                {copy.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 text-white/85 text-sm md:text-base"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500"
                    />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — pricing + timeline + actions */}
            <div className="flex flex-col gap-6 lg:border-l lg:border-white/10 lg:pl-14">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-white/50 text-xs tracking-widest uppercase">
                    {locale === "zh" ? "最快启动" : "Fastest start"}
                  </div>
                  <div className="mt-2 text-white sp-display text-2xl md:text-3xl">
                    {copy.timeline}
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-white/50 text-xs tracking-widest uppercase">
                    {locale === "zh" ? "起投" : "From"}
                  </div>
                  <div className="mt-2 text-white sp-display text-2xl md:text-3xl">
                    {copy.price}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  {cta} →
                </Button>
                <Button
                  href="/pricing"
                  variant="outline"
                  size="lg"
                  className="w-full justify-center !border-white/30 !text-white hover:!border-white hover:!bg-white/5"
                >
                  {locale === "zh" ? "看完整合作模式" : "See pricing tiers"}
                </Button>
              </div>

              <p className="text-white/50 text-xs leading-relaxed text-center lg:text-left">
                {locale === "zh"
                  ? "30 分钟免费咨询 · 24 小时内回复"
                  : "Free 30-min call · 24h response"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

type CtaCopy = {
  title: string;
  subtitle: string;
  outcomes: string[];
  timeline: string;
  price: string;
};

function getCtaCopy(slug: Slug, locale: string): CtaCopy {
  const zh: Record<Slug, CtaCopy> = {
    "launch-video": {
      title: "把你的产品，做成一支能传播的发布视频",
      subtitle: "一支视频，覆盖 Product Hunt、官网首屏与社交媒体三条引爆渠道。",
      outcomes: [
        "60-90 秒精准传递核心价值主张，完播率行业前 20%",
        "已有案例平均累积播放 300 万+、首周获客 1,000+",
        "交付脚本 + 成片 + 社交平台 9:16/16:9 多版本",
      ],
      timeline: "7 天",
      price: "按项目报价",
    },
    kol: {
      title: "把你的产品，送进海外头部达人的镜头里",
      subtitle: "用真实用户视角，在目标垂类社区里形成可复用的口碑资产。",
      outcomes: [
        "锁定 3-10 位高相关度头部 / 腰部达人",
        "可溯源的 UTM 归因与 ROI 追踪",
        "覆盖 YouTube / X / LinkedIn / TikTok 多平台",
      ],
      timeline: "14 天",
      price: "¥30k-50k/月",
    },
    "paid-ads": {
      title: "让你的每一分广告预算，都能被追踪与优化",
      subtitle: "冷/温/热三层人群分层投放，从曝光到 LTV 全链路优化。",
      outcomes: [
        "覆盖 Google / Meta / X / LinkedIn / Reddit 五大生态",
        "素材工厂 + A/B 测试驱动周级迭代",
        "跨渠道归因建模，降低 CAC、提高增量转化",
      ],
      timeline: "7 天",
      price: "¥30k-50k/月",
    },
    "product-hunt": {
      title: "把你的产品，送上 Product Hunt 的日榜前三",
      subtitle: "从预热到冲刺的全程陪跑，精准锁定发布窗口。",
      outcomes: [
        "目标 Product of the Day 前三 + 500+ 真实 Upvotes",
        "带来 2,000+ 官网访问 + 早期注册用户",
        "覆盖 Hunter 网络激活、页面优化、流量承接",
      ],
      timeline: "4-6 周前启动",
      price: "按项目报价",
    },
    social: {
      title: "在 Reddit 等核心社区，长出你的品牌",
      subtitle: "用真实用户的语言赢得信任，把社区变成可持续的获客渠道。",
      outcomes: [
        "锁定 3-5 个核心 Subreddit，做长期内容经营",
        "顶贴内容的 Google SEO 长尾流量可持续数月",
        "积累真实用户洞察与早期采用者反馈",
      ],
      timeline: "14 天",
      price: "¥30k-50k/月",
    },
    "seo-geo": {
      title: "同时被 Google 和 ChatGPT 推荐的 AI 产品",
      subtitle: "传统 SEO + 面向 AI 答案引擎的 GEO，两条线一起做。",
      outcomes: [
        "关键词+意图建模，锁定高商业价值词库",
        "pSEO 页面矩阵 + 高权重外链建设",
        "llms.txt / JSON-LD 等结构化数据，面向 AI 爬虫开放",
      ],
      timeline: "14 天",
      price: "¥30k-50k/月",
    },
  };

  const en: Record<Slug, CtaCopy> = {
    "launch-video": {
      title: "Turn your product into a launch video that travels",
      subtitle: "One video, three channels: Product Hunt, homepage hero, social.",
      outcomes: [
        "60-90 sec core value prop, top-20% completion rate",
        "Existing work averages 3M+ views and 1k+ week-one signups",
        "Delivered: script + master cut + 9:16/16:9 social edits",
      ],
      timeline: "7 days",
      price: "Project-based",
    },
    kol: {
      title: "Get your product into the right creators' hands",
      subtitle: "Real-user perspective in the communities where your buyers hang out.",
      outcomes: [
        "3-10 high-fit top + mid-tier creators sourced",
        "UTM-level attribution and ROI tracking",
        "Coverage across YouTube / X / LinkedIn / TikTok",
      ],
      timeline: "14 days",
      price: "$4-7k/mo",
    },
    "paid-ads": {
      title: "Every ad dollar — tracked, attributed, optimized",
      subtitle: "Cold / warm / hot audience tiers, full-funnel from impression to LTV.",
      outcomes: [
        "Google / Meta / X / LinkedIn / Reddit end-to-end",
        "Creative factory + weekly A/B-driven iteration",
        "Cross-channel attribution to lower CAC and lift incrementality",
      ],
      timeline: "7 days",
      price: "$4-7k/mo",
    },
    "product-hunt": {
      title: "Land your launch in the Product Hunt top 3",
      subtitle: "Full-journey partnership from pre-launch warmup to the day itself.",
      outcomes: [
        "Target: Product of the Day top 3 + 500+ genuine upvotes",
        "2,000+ site visits + early signup cohort",
        "Hunter network activation, page polish, traffic capture",
      ],
      timeline: "4-6 weeks ahead",
      price: "Project-based",
    },
    social: {
      title: "Grow your brand inside Reddit's AI communities",
      subtitle: "Win trust with the voice real users recognize — build a durable channel.",
      outcomes: [
        "3-5 core Subreddits targeted for long-term presence",
        "Top posts earn Google SEO long-tail traffic for months",
        "Real user insights and early-adopter feedback flow",
      ],
      timeline: "14 days",
      price: "$4-7k/mo",
    },
    "seo-geo": {
      title: "Rank on Google. Get cited by ChatGPT.",
      subtitle: "Classical SEO and Generative Engine Optimization, run as one system.",
      outcomes: [
        "Keyword + intent modeling on commercial-high terms",
        "pSEO page matrix + high-authority link building",
        "llms.txt / JSON-LD open to AI crawlers",
      ],
      timeline: "14 days",
      price: "$4-7k/mo",
    },
  };

  return (locale === "zh" ? zh : en)[slug];
}
