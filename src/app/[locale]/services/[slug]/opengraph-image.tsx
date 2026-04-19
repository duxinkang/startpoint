import { ImageResponse } from "next/og";

// Per-slug Open Graph image for /services/<slug>. Keeps the same brand
// language as the root OG (orange gradient, white mark) so LinkedIn / X /
// WeChat previews feel coherent, but swaps in the actual service title so
// the preview matches the link the user is about to click.
//
// Note: we stay on the Node runtime here. The parent route uses
// generateStaticParams to pre-render the six service slugs, and Next 16
// forbids edge runtime on any descendant of a generateStaticParams page.

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const SLUGS = [
  "launch-video",
  "kol",
  "paid-ads",
  "product-hunt",
  "social",
  "seo-geo",
] as const;

type Slug = (typeof SLUGS)[number];

const COPY: Record<Slug, {
  zh: { short: string; title: string };
  en: { short: string; title: string };
}> = {
  "launch-video": {
    zh: { short: "Launch Video", title: "把价值主张打进 15 秒" },
    en: { short: "Launch Video", title: "The value prop in 15 seconds" },
  },
  kol: {
    zh: { short: "海外 KOL / KOC", title: "把第一批种子用户打穿" },
    en: { short: "Global KOL / KOC", title: "Break through your first cohort" },
  },
  "paid-ads": {
    zh: { short: "Paid Ads", title: "让可规模化的流量跑起来" },
    en: { short: "Paid Ads", title: "Put scalable traffic on the wheel" },
  },
  "product-hunt": {
    zh: { short: "Product Hunt 冲刺", title: "让首发日成为融资弹药" },
    en: {
      short: "Product Hunt sprint",
      title: "Turn launch day into fundraising fuel",
    },
  },
  social: {
    zh: { short: "Reddit / 社区", title: "让真实用户留下信任资产" },
    en: { short: "Reddit / community", title: "Seed durable trust at scale" },
  },
  "seo-geo": {
    zh: { short: "SEO / GEO", title: "让 AI 与搜索都把你当答案" },
    en: { short: "SEO / GEO", title: "Become the answer for AI and search" },
  },
};

export const alt = "StartPoint AI Agent growth service";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const isZh = params.locale === "zh";
  const copy = COPY[params.slug as Slug];
  const short = copy ? (isZh ? copy.zh.short : copy.en.short) : "AI Agent Growth";
  const title = copy
    ? (isZh ? copy.zh.title : copy.en.title)
    : isZh
      ? "只做 AI Agent 的 0→1 增长"
      : "0→1 growth built for AI Agents";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #F5551D 0%, #FF7A3D 55%, #FFA366 100%)",
          padding: "72px 80px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
          color: "white",
        }}
      >
        {/* Top row: logo mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F5551D",
              fontSize: 44,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            StartPoint
          </div>
          <div style={{ fontSize: 28, opacity: 0.7, marginLeft: 6 }}>
            起始点
          </div>
        </div>

        {/* Middle: service eyebrow + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.35)",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            {short}
          </div>
          <div
            style={{
              fontSize: isZh ? 84 : 72,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: isZh ? -2 : -3,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: url + category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <div style={{ fontWeight: 700 }}>
            startpointagency.com / services
          </div>
          <div>{isZh ? "AI Agent 0→1 增长" : "AI Agent 0→1 growth"}</div>
        </div>
      </div>
    ),
    size,
  );
}
