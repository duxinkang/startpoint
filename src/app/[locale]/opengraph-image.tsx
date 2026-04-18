import { ImageResponse } from "next/og";

// Next.js file convention: generates `/opengraph-image` for every route under
// `/[locale]/*`. Replaces the old broken `/og/default.png` reference.

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export const alt = "StartPoint — 只做 AI Agent 的 0→1 增长";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isZh = locale === "zh";

  const tagline = isZh
    ? "只做 AI Agent 的 0→1 增长"
    : "0→1 Growth for AI Agents";

  const subtitle = isZh
    ? "GTM · Product Hunt · Launch Video · KOL · SEO/GEO · Paid · Brand"
    : "GTM · Product Hunt · Launch Video · KOL · SEO/GEO · Paid · Brand";

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
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            StartPoint
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.7,
              marginLeft: 6,
            }}
          >
            起始点
          </div>
        </div>

        {/* Middle: tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: isZh ? 88 : 76,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: isZh ? -2 : -3,
              maxWidth: 1040,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              fontSize: 26,
              opacity: 0.88,
              maxWidth: 1040,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom: url + locations */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <div style={{ fontWeight: 700 }}>startpointagency.com</div>
          <div>Hangzhou · Shanghai · Paris</div>
        </div>
      </div>
    ),
    size,
  );
}
