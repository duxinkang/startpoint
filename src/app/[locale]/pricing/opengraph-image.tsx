import { ImageResponse } from "next/og";

// OG image for /pricing — puts the three engagement tiers front-and-center
// so anyone scanning a link preview already knows the shape of how we work
// before they click through.

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export const alt = "StartPoint engagement tiers and pricing";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const isZh = params.locale === "zh";

  const title = isZh ? "三档合作模式" : "Three engagement tiers";
  const subtitle = isZh
    ? "按产品阶段与风险偏好灵活组合"
    : "Scoped to your stage and risk appetite";

  const tiers = isZh
    ? [
        { n: "01", t: "战略问诊", s: "Strategy" },
        { n: "02", t: "轻量陪跑", s: "Lite · Most popular" },
        { n: "03", t: "完整陪跑", s: "Full · Revenue share" },
      ]
    : [
        { n: "01", t: "Strategy Diagnosis", s: "2–3 week sprint" },
        { n: "02", t: "Lite Partnership", s: "Most popular" },
        { n: "03", t: "Full Growth Partnership", s: "Base + rev share" },
      ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F0EFEB",
          padding: "72px 80px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
          color: "#0A0A0A",
        }}
      >
        {/* Top: logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: "#F5551D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
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
          <div style={{ fontSize: 28, opacity: 0.55, marginLeft: 6 }}>
            起始点
          </div>
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#F5551D",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            {isZh ? "合作模式 · 价格" : "PRICING"}
          </div>
          <div
            style={{
              fontSize: isZh ? 96 : 82,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: isZh ? -3 : -3,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              opacity: 0.72,
              maxWidth: 1040,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom row: 3 tier cards */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier, i) => {
            const isFeatured = i === 1;
            return (
              <div
                key={tier.n}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px 24px",
                  borderRadius: 20,
                  background: isFeatured ? "#0A0A0A" : "white",
                  color: isFeatured ? "white" : "#0A0A0A",
                  border: isFeatured
                    ? "2px solid #F5551D"
                    : "1px solid rgba(10,10,10,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: isFeatured ? "#FFA66B" : "#F5551D",
                    letterSpacing: 1,
                  }}
                >
                  {tier.n}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    marginTop: 6,
                    lineHeight: 1.1,
                  }}
                >
                  {tier.t}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    marginTop: 6,
                    opacity: 0.7,
                  }}
                >
                  {tier.s}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    size,
  );
}
