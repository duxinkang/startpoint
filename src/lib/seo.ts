import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.startpointagency.com";

export const SITE_NAME = "StartPoint Agency";

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
  const canonical = locale === "zh"
    ? `${SITE_URL}${path === "/" ? "" : path}`
    : `${SITE_URL}/${locale}${path === "/" ? "" : path}`;

  const openGraph: Metadata["openGraph"] = {
    type: "website",
    siteName: SITE_NAME,
    url: canonical,
    title,
    description,
    locale: locale === "zh" ? "zh_CN" : "en_US",
  };
  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title,
    description,
  };

  // Only set explicit image URLs when the caller passes one. Otherwise rely on
  // the Next.js file-convention OG image (`/opengraph-image`) so we never ship
  // a broken `/og/default.png` again.
  if (image) {
    openGraph.images = [{ url: image, width: 1200, height: 630, alt: title }];
    twitter.images = [image];
  }

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
    email: "contact@startpoint.ai",
    areaServed: ["CN", "US", "EU", "JP", "SG", "Global"],
    address: [
      { "@type": "PostalAddress", addressLocality: "Hangzhou", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
      { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    ],
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
    areaServed: "Global",
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

