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

/**
 * Generates sitemap covering every public URL in both locales with hreflang alternates.
 * Chinese is at the root (zh is default with localePrefix: "as-needed"),
 * English lives under /en/*.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths = [
    ...STATIC_PATHS,
    ...SERVICE_SLUGS.map((slug) => `/services/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
    alternates: {
      languages: {
        "zh-CN": `${SITE_URL}${path === "/" ? "" : path}`,
        en: `${SITE_URL}/en${path === "/" ? "" : path}`,
      },
    },
  }));
}
