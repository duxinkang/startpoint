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
