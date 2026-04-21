import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.startpointagency.com";

export const SITE_NAME = "StartPoint Agency";

function withLocalePath(locale: string, path: string) {
  return locale === "zh"
    ? `${SITE_URL}${path}`
    : `${SITE_URL}/${locale}${path}`;
}

function defaultOgImage(locale: string) {
  return locale === "zh"
    ? `${SITE_URL}/zh/opengraph-image`
    : `${SITE_URL}/${locale}/opengraph-image`;
}

type BuildMetaArgs = {
  locale: string;
  title: string;
  description: string;
  path: string; // e.g. "/" or "/services"
  image?: string; // Optional: when omitted, Next.js auto-populates from the
  //                 `opengraph-image.tsx` file convention at `src/app/[locale]/`.
};

export function buildMetadata({
  locale,
  title,
  description,
  path,
  image,
}: BuildMetaArgs): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const canonical = locale === "zh"
    ? `${SITE_URL}${normalizedPath}`
    : `${SITE_URL}/${locale}${normalizedPath}`;
  const socialImage = image || defaultOgImage(locale);

  const openGraph: Metadata["openGraph"] = {
    type: "website",
    siteName: SITE_NAME,
    url: canonical,
    title,
    description,
    locale: locale === "zh" ? "zh_CN" : "en_US",
    images: [{
      url: socialImage,
      width: 1200,
      height: 630,
      alt: title,
    }],
  };
  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "zh-CN": `${SITE_URL}${path === "/" ? "" : path}`,
        en: `${SITE_URL}/en${path === "/" ? "" : path}`,
        "x-default": `${SITE_URL}${path === "/" ? "" : path}`,
      },
    },
    openGraph,
    twitter,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

// -----------------------------------------------------------------
// JSON-LD builders
// -----------------------------------------------------------------

// Public social / presence URLs used for `sameAs` entity consolidation in
// Google Knowledge Graph. Keep this list truthful — only add handles StartPoint
// actually operates. Empty array is fine; empty strings would mislead Google.
// TODO: once LinkedIn / X / YouTube / 小红书 / 即刻 handles are live, push them
// here so the brand entity can be merged across crawlers.
export const ORG_SAME_AS: string[] = [];

export function organizationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: "StartPoint 起始点",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description:
      locale === "zh"
        ? "StartPoint 是专注 AI Agent 与 SaaS 产品 0→1 增长的营销合作伙伴，覆盖 GTM 策略、Product Hunt、Launch Video、海外 KOL、SEO/GEO、广告投放与品牌沉淀。"
        : "StartPoint is a growth partner focused on 0→1 traction for AI Agents and AI SaaS — GTM strategy, Product Hunt, Launch Video, KOL/KOC outreach, SEO/GEO, paid ads, and brand IP.",
    email: "d541449473@gmail.com",
    areaServed: ["CN", "US", "EU", "JP", "SG", "Global"],
    address: [
      { "@type": "PostalAddress", addressLocality: "Hangzhou", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    ],
    // Structured contactPoint — Google's recommended shape. The top-level
    // `email` above stays for backwards compat; this adds the nested object
    // Knowledge Graph actually consumes.
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "d541449473@gmail.com",
        availableLanguage: ["zh-CN", "en"],
        areaServed: ["CN", "US", "EU", "JP", "SG", "Global"],
      },
    ],
    // Only emit `sameAs` when we actually have real handles to point at —
    // shipping an empty array or placeholder URLs is worse than omitting it.
    ...(ORG_SAME_AS.length > 0 ? { sameAs: ORG_SAME_AS } : {}),
    knowsAbout: [
      "AI Agent marketing",
      "AI SaaS growth",
      "Product Hunt launch",
      "Launch Video production",
      "SEO",
      "Generative Engine Optimization",
      "KOL marketing",
      "Paid advertising",
      "Product-led growth",
    ],
  };
}

// -----------------------------------------------------------------
// WebSite — homepage-level schema, lets Google consolidate the domain
// as a single entity and (when a search endpoint exists) surface a
// sitelinks search box. We ship it without SearchAction for now since
// there's no /search endpoint; adding one later is a one-line change.
// -----------------------------------------------------------------

export function websiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

// -----------------------------------------------------------------
// Person — used for /about team cards so each founder becomes its own
// entity that Google can link back to the Organization via `worksFor`.
// -----------------------------------------------------------------

export function personSchema(args: {
  locale: string;
  slug: string; // lowercase firstname, used for @id + image path
  name: string;
  jobTitle: string;
  description?: string;
  sameAs?: string[]; // e.g. LinkedIn URL — only pass if real
}) {
  const path = args.locale === "zh" ? "/about" : `/${args.locale}/about`;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}${path}#person-${args.slug}`,
    name: args.name,
    jobTitle: args.jobTitle,
    image: `${SITE_URL}/team/${args.slug}.jpg`,
    worksFor: { "@id": `${SITE_URL}#organization` },
    ...(args.description ? { description: args.description } : {}),
    ...(args.sameAs && args.sameAs.length > 0 ? { sameAs: args.sameAs } : {}),
  };
}

export function serviceSchema(args: {
  locale: string;
  slug: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: args.name,
    name: args.name,
    description: args.description,
    provider: { "@id": `${SITE_URL}#organization` },
    // Keep in sync with `organizationSchema.areaServed` — an AI Agent
    // growth partner claiming "Global" on the Service but "CN/US/EU/JP/SG"
    // on the Org reads as inconsistent to entity-extraction pipelines.
    areaServed: ["CN", "US", "EU", "JP", "SG", "Global"],
    url: args.locale === "zh"
      ? `${SITE_URL}/services/${args.slug}`
      : `${SITE_URL}/${args.locale}/services/${args.slug}`,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function videoObjectSchema(args: {
  name: string;
  description: string;
  thumbnailUrl: string; // Absolute URL preferred
  contentUrl: string; // Absolute URL preferred
  uploadDate: string; // ISO 8601, e.g. "2025-06-01"
  durationIso?: string; // ISO 8601 duration, e.g. "PT45S"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: args.name,
    description: args.description,
    thumbnailUrl: args.thumbnailUrl,
    contentUrl: args.contentUrl,
    uploadDate: args.uploadDate,
    ...(args.durationIso ? { duration: args.durationIso } : {}),
    publisher: { "@id": `${SITE_URL}#organization` },
  };
}

export function breadcrumbSchema(
  locale: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item:
        locale === "zh"
          ? `${SITE_URL}${item.path}`
          : `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}

// -----------------------------------------------------------------
// AboutPage — wraps /about semantically so Google and LLMs recognize
// the page type directly (rather than inferring from the URL). The
// Organization is the main entity of the page; Persons ship alongside
// as their own top-level entities so Knowledge Graph can merge them
// with the org via worksFor.
// -----------------------------------------------------------------

export function aboutPageSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "zh" ? "关于 StartPoint" : "About StartPoint",
    url: withLocalePath(locale, "/about"),
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    mainEntity: { "@id": `${SITE_URL}#organization` },
    isPartOf: { "@id": `${SITE_URL}#website` },
  };
}

export function contactPointSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: locale === "zh" ? "联系 StartPoint" : "Contact StartPoint",
    url: withLocalePath(locale, "/contact"),
    about: { "@id": `${SITE_URL}#organization` },
    mainEntity: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "d541449473@gmail.com",
      availableLanguage: ["zh-CN", "en"],
      areaServed: ["CN", "US", "EU", "JP", "SG", "Global"],
    },
  };
}

export function offerCatalogSchema(
  locale: string,
  offers: Array<{
    name: string;
    description: string;
    price?: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: locale === "zh"
      ? "StartPoint 合作模式"
      : "StartPoint engagement tiers",
    url: withLocalePath(locale, "/pricing"),
    itemListElement: offers.map((offer, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: offer.name,
      description: offer.description,
      ...(offer.price ? { priceSpecification: { "@type": "PriceSpecification", price: offer.price } } : {}),
      seller: { "@id": `${SITE_URL}#organization` },
    })),
  };
}

export function caseStudiesSchema(
  locale: string,
  items: Array<{
    title: string;
    summary: string;
    category?: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "zh" ? "StartPoint 用户案例" : "StartPoint case studies",
    url: withLocalePath(locale, "/cases"),
    about: { "@id": `${SITE_URL}#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.title,
          description: item.summary,
          ...(item.category ? { genre: item.category } : {}),
        },
      })),
    },
  };
}

export function getProductHuntFaq(locale: string) {
  if (locale === "zh") {
    return [
      {
        q: "提前 4-6 周启动是不是太早？",
        a: "不早。真正拉开差距的是预热期——Hunter 网络激活、社区口碑铺垫、素材打磨都需要时间。临时起步的团队往往只能靠朋友圈凑前 50 票，后续曲线乏力。稳定冲进日榜前三的团队，差不多都是在发布前 4-6 周开始准备的。",
      },
      {
        q: "Product Hunt 日榜前三对我们有什么实际价值？",
        a: "1,500-4,000 个定向早期采用者访问、一批愿意付费的种子用户、媒体和投资人在发布后几周内的持续关注，以及 PH 页面本身在 Google 上数月的长尾 SEO 流量。",
      },
      {
        q: "发布失败会怎么办？",
        a: "所谓失败通常是节奏偏移——例如撞上 OpenAI 或 Google 的大发布。我们会在发布前一周评估竞争状况，必要时建议推迟。如果坚持发布，我们会把重心转向注册转化，而不是死磕名次。",
      },
      {
        q: "可以只做发布日的冲刺吗？",
        a: "不建议。没有预热的纯冲刺项目，结果大多落在日榜 5-10 名。如果预算有限，更稳的做法是先做 Reddit 或 Launch Video 把信任基础打好，下一次发布再启动 PH 陪跑，确定性会高很多。",
      },
    ];
  }

  return [
    {
      q: "Is 4-6 weeks of runway really necessary?",
      a: "Yes. The gap between teams that land top-3 and teams that stall around #8 is the runway — Hunter network activation, community seeding, and asset polish all take weeks. Teams that start late usually scrape together 50 friend-upvotes and fade by hour 6.",
    },
    {
      q: "What does landing top-3 actually get me?",
      a: "1,500-4,000 targeted early-adopter visits, a cohort of seed users who convert to paid, press and investor interest for the weeks following, and the PH page itself ranking in Google for months.",
    },
    {
      q: "What happens if the launch underperforms?",
      a: "Underperformance usually means bad timing (colliding with an OpenAI or Google launch). We assess the launch-day competitive set the week prior and recommend delaying if it's bad. If you still ship, we pivot focus to signup capture instead of chasing a rank.",
    },
    {
      q: "Can we just hire you for launch day itself?",
      a: "We don't recommend it. Cold-launch engagements without runway mostly land #5-10. If budget is tight, run Reddit or Launch Video first to build the trust base, then engage for the next launch — the outcome is far more predictable.",
    },
  ];
}

export function getSocialFaq(locale: string) {
  if (locale === "zh") {
    return [
      {
        q: "为什么最短合作周期是 3 个月？",
        a: "Reddit 账号权重需要时间沉淀，强行在一个月内冲热帖会触发算法检测。我们见过太多账号在第三周被限流——最稳的节奏是 3-5 个月只做贡献式内容，之后才自然引入产品讨论。",
      },
      {
        q: "除了 Reddit，你们还覆盖哪些社区？",
        a: "核心聚焦 Reddit，因为它是 AI 早期用户密度最高的开放社区。如果你的产品垂直度高，我们也会延伸到 Hacker News、Indie Hackers、以及对应的 Discord / Slack 社区，但主战场仍然是 Reddit。",
      },
      {
        q: "这些社区内容会被 Google 收录吗？",
        a: "会。Reddit 帖子在 Google 搜索结果里的排名极高，一条被顶到高位的技术帖通常能带来数月甚至一整年的免费搜索流量。这也是为什么 Reddit 投入的长期 ROI 比大多数付费渠道都高。",
      },
      {
        q: "账号是我们的还是你们的？",
        a: "都是你们的。我们只用你的团队成员或你招募的社区经理的账号发内容，所有账号所有权始终归你。这一点和我们做广告投放的原则一致——不运营黑盒账号。",
      },
    ];
  }

  return [
    {
      q: "Why is the minimum engagement three months?",
      a: "Reddit karma builds slowly. Pushing hard in the first month triggers algorithmic damping — we've watched accounts get shadow-throttled in week three. The reliable cadence is 3-5 months of contribution-first posting before you introduce product discussions.",
    },
    {
      q: "Beyond Reddit, which communities do you cover?",
      a: "Reddit is the core because it has the highest density of open-web AI early adopters. For vertical products we also extend into Hacker News, Indie Hackers, and the relevant Discord / Slack communities — but Reddit stays the main theater.",
    },
    {
      q: "Do these posts get indexed by Google?",
      a: "Yes. Reddit threads rank very well in Google. An upvoted technical post typically earns months — often a year — of free search traffic. That's why the long-run ROI on a Reddit investment beats most paid channels.",
    },
    {
      q: "Who owns the accounts we use?",
      a: "You do. We only post under your team members or community managers you hire — all account ownership stays with you. Same principle as our paid-ads work: we don't run black-box accounts on your behalf.",
    },
  ];
}

export function getSeoGeoFaq(locale: string) {
  if (locale === "zh") {
    return [
      {
        q: "GEO 和传统 SEO 有什么区别？",
        a: "传统 SEO 解决的是“在 Google 结果页里排到前面”；GEO 解决的是“在 ChatGPT、Perplexity、Gemini、Claude 的答案里被当作可信来源引用”。前者更依赖关键词、内链和外链，后者更依赖结构化表达、事实密度、FAQ 组织、案例数据与品牌实体清晰度。",
      },
      {
        q: "什么样的 AI 产品最适合同时做 SEO 和 GEO？",
        a: "最适合的是已经有清晰场景、能讲清楚用户问题、并且希望在海外市场获得持续自然流量的 AI Agent 与 AI SaaS。尤其是处于 Demo ready、0-1k 用户、或者刚完成 Product Hunt 发布后的产品，通常最适合把 SEO 和 GEO 一起搭起来。",
      },
      {
        q: "StartPoint 做 SEO/GEO 时具体交付什么？",
        a: "通常会包括关键词与意图建模、内容矩阵规划、核心落地页优化、FAQ 和结构化数据、llms.txt、案例页面改写、外链建设策略，以及对 Google 排名和 AI 引用率的持续监测。",
      },
      {
        q: "怎么衡量 GEO 是否真的有效？",
        a: "除了看品牌词和核心词在 Google 的排名，我们还会跟踪品牌是否在 ChatGPT、Perplexity、Gemini、Claude 的回答中被提及，哪些页面最容易被引用，以及这些引用是否带来高质量访问、注册和商机。",
      },
    ];
  }

  return [
    {
      q: "How is GEO different from traditional SEO?",
      a: "Traditional SEO is about ranking well in Google results. GEO is about becoming a source that ChatGPT, Perplexity, Gemini, and Claude can cite with confidence. SEO leans harder on keywords, internal links, and backlinks; GEO leans harder on factual density, answer-first structure, schema, FAQs, and clear brand/entity definitions.",
    },
    {
      q: "Which AI products should run SEO and GEO together?",
      a: "The strongest fit is AI Agents and AI SaaS with a clear use case, a well-defined ICP, and a need for compounding overseas demand capture. Demo-ready products, 0-1k-user products, and post-launch teams are usually the best stage to start both in parallel.",
    },
    {
      q: "What does StartPoint actually ship in an SEO/GEO engagement?",
      a: "Typical outputs include keyword and intent modeling, page and content-matrix planning, core landing-page rewrites, FAQ and structured data, llms.txt, case-study enrichment, off-page authority strategy, and ongoing tracking of both rankings and AI-answer citations.",
    },
    {
      q: "How do you measure whether GEO is working?",
      a: "We track more than Google rankings. We also monitor whether the brand is cited in ChatGPT, Perplexity, Gemini, and Claude answers, which pages get cited most often, and whether those citations drive qualified visits, signups, and pipeline.",
    },
  ];
}
