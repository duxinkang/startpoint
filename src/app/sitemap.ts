import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const SERVICE_SLUGS = [
  "launch-video",
  "kol",
  "paid-ads",
  "product-hunt",
  "social",
  "seo-geo",
];

const STATIC_PATHS = [
  "/",
  "/services",
  "/cases",
  "/about",
  "/pricing",
  "/contact",
  "/privacy",
];

const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-04-19",
  "/services": "2026-04-19",
  "/cases": "2026-04-19",
  "/about": "2026-04-19",
  "/pricing": "2026-04-19",
  "/contact": "2026-04-19",
  "/privacy": "2026-04-18",
  "/services/launch-video": "2026-04-19",
  "/services/kol": "2026-04-19",
  "/services/paid-ads": "2026-04-19",
  "/services/product-hunt": "2026-04-19",
  "/services/social": "2026-04-19",
  "/services/seo-geo": "2026-04-19",
};

/**
 * Generates sitemap covering every public URL in both locales with hreflang alternates.
 * Chinese is at the root (zh is default with localePrefix: "as-needed"),
 * English lives under /en/*.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  ];

  return paths.map((path) => {
    const zhUrl = `${SITE_URL}${path === "/" ? "" : path}`;
    const enUrl = `${SITE_URL}/en${path === "/" ? "" : path}`;
    return {
      url: zhUrl,
      lastModified: LAST_MODIFIED[path] || "2026-04-19",
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
      alternates: {
        languages: {
          "zh-CN": zhUrl,
          en: enUrl,
          // `x-default` keeps Google's hreflang machinery happy when none of
          // the user's language preferences match. Points at zh root since
          // that's our canonical primary-locale surface.
          "x-default": zhUrl,
        },
      },
    };
  });
}
