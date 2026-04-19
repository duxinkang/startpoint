import { ImageResponse } from "next/og";

// OG image for /cases — leads with the strongest case-study proof points
// (Poly.app 3M, Blockit AI 1M+ in 6h, Crunched 4M+) so a link preview on
// LinkedIn / X already sells the category before anyone clicks.

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export const alt = "StartPoint AI Agent growth case studies";

export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const isZh = params.locale === "zh";

  const title = isZh
    ? "AI Agent 增长案例"
    : "AI Agent growth case studies";

  const proof = isZh
    ? [
        { k: "Poly.app", v: "300 万+ 播放" },
        { k: "Blockit AI", v: "6h 破百万 · 272 付费" },
        { k: "Crunched", v: "400 万+ 播放" },
      ]
    : [
        { k: "Poly.app", v: "3M+ views" },
        { k: "Blockit AI", v: "1M+ in 6h · 272 paid" },
        { k: "Crunched", v: "4M+ views" },
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
          background:
            "linear-gradient(140deg, #0A0A0A 0%, #1A1A1A 60%, #F5551D 135%)",
          padding: "72px 80px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
          color: "white",
        }}
      >
        {/* Top: logo mark + wordmark */}
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
          <div style={{ fontSize: 28, opacity: 0.7, marginLeft: 6 }}>
            起始点
          </div>
        </div>

        {/* Middle: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#F5551D",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            {isZh ? "客户案例" : "CASE STUDIES"}
          </div>
          <div
            style={{
              fontSize: isZh ? 88 : 76,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: isZh ? -2 : -3,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row: 3 proof chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {proof.map((p) => (
              <div
                key={p.k}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 22px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  minWidth: 180,
                }}
              >
                <div style={{ fontSize: 18, opacity: 0.7 }}>{p.k}</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
                  {p.v}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, opacity: 0.7, fontWeight: 700 }}>
            startpointagency.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
