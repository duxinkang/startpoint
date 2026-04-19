import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, offerCatalogSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title:
      locale === "zh"
        ? "合作模式与价格 — StartPoint 三档 AI Agent 增长方案"
        : "Engagement tiers & pricing — StartPoint 0→1 growth for AI",
    description:
      locale === "zh"
        ? "StartPoint 三档 AI Agent 增长合作模式：战略问诊、轻量陪跑与完整版增长合伙。查看服务边界、启动周期、月费区间与利润分成方式。"
        : "StartPoint's three AI Agent growth engagement tiers: strategy diagnosis, lite partnership, and full-stack growth partnership with pricing, timelines, and profit-share structure.",
    path: "/pricing",
  });
}

type Plan = {
  key: string;
  icon: string;
  title: string;
  text: string;
  badges: string[];
  footer: string;
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricing" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const plans = t.raw("plans") as Plan[];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: nav("pricing"), path: "/pricing" },
          ]),
          offerCatalogSchema(
            locale,
            plans.map((plan) => ({
              name: plan.title,
              description: `${plan.text} ${plan.footer}`,
              price: plan.badges.find((badge) => badge.includes("¥")) || undefined,
            })),
          ),
        ]}
      />

      {/* Hero */}
      <Section bg="paper">
        <Container size="full">
          <Pill variant="orange" size="md" className="mb-6">
            {nav("pricing")}
          </Pill>
          <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05] max-w-4xl text-ink">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink/70 leading-relaxed">
            {locale === "zh"
              ? "按阶段、按深度灵活组合。从一次性战略问诊到深度绑定的增长陪跑，三档方案覆盖 AI 产品 0→1 的全路径。"
              : "Flexible by stage and depth. From a single strategy workshop to deep revenue-share growth partnership — three tiers scoped to your 0→1 journey."}
          </p>
        </Container>
      </Section>

      {/* Plans grid */}
      <Section bg="cream" spacing="tight">
        <Container size="full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {plans.map((plan, i) => {
              const isFeatured = plan.key === "lite";
              return (
                <article
                  key={plan.key}
                  className={
                    isFeatured
                      ? "relative rounded-3xl bg-ink text-white p-8 md:p-10 shadow-2xl md:scale-[1.03] border-2 border-orange-500"
                      : "relative rounded-3xl bg-white text-ink p-8 md:p-10 border border-ink/10 shadow-sm"
                  }
                >
                  {isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                        {locale === "zh" ? "最受欢迎" : "MOST POPULAR"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={
                        isFeatured
                          ? "w-12 h-12 rounded-xl bg-orange-500 text-2xl flex items-center justify-center"
                          : "w-12 h-12 rounded-xl bg-orange-50 text-2xl flex items-center justify-center"
                      }
                    >
                      {plan.icon}
                    </div>
                    <div
                      className={
                        isFeatured
                          ? "text-xs font-bold tracking-wider text-orange-300"
                          : "text-xs font-bold tracking-wider text-orange-600"
                      }
                    >
                      {`0${i + 1}`}
                    </div>
                  </div>

                  <h2
                    className={`sp-display text-3xl leading-tight ${isFeatured ? "text-white" : "text-ink"}`}
                  >
                    {plan.title}
                  </h2>

                  <p
                    className={`mt-4 leading-relaxed text-sm ${isFeatured ? "text-white/80" : "text-ink/70"}`}
                  >
                    {plan.text}
                  </p>

                  {/* Badges */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {plan.badges.map((b) => (
                      <span
                        key={b}
                        className={
                          isFeatured
                            ? "text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 border border-white/20"
                            : "text-xs font-semibold px-3 py-1.5 rounded-full bg-ink/5 border border-ink/10"
                        }
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div
                    className={
                      isFeatured
                        ? "my-6 border-t border-white/15"
                        : "my-6 border-t border-ink/10"
                    }
                  />

                  {/* Footer line */}
                  <p
                    className={`text-sm leading-relaxed ${isFeatured ? "text-orange-300 font-semibold" : "text-ink/60"}`}
                  >
                    {plan.footer}
                  </p>

                  {/* CTA */}
                  <div className="mt-8">
                    <Button
                      href="/contact"
                      variant={isFeatured ? "primary" : "ink"}
                      size="md"
                      className="w-full"
                    >
                      {locale === "zh" ? "预约咨询" : "Book consultation"} →
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Footnote */}
          <div className="mt-14 max-w-3xl text-center mx-auto text-ink/60 text-sm leading-relaxed">
            {locale === "zh"
              ? "三档方案可灵活升级 / 组合。战略问诊费用可抵扣后续陪跑首月。完整陪跑的利润分成区间为 10-20%（按 MRR 增量或净利润增量计算），具体比例按产品阶段与增长目标一对一商定。"
              : "Tiers can be combined or upgraded. Strategy diagnosis fee is credited toward the first month of any ongoing engagement. Full-tier profit share ranges from 10-20% of incremental MRR or net profit — the exact figure is negotiated per stage and target KPIs."}
          </div>
        </Container>
      </Section>

      {/* Decision aid — how to pick a tier, plus what the profit-share
          mechanic actually means. Adds ~200 words of substantive content so
          /pricing clears the thin-content threshold and answers the real
          questions a founder has before booking a call. */}
      <Section bg="paper">
        <Container size="full">
          <div className="max-w-3xl">
            <Pill variant="orange" size="md" className="mb-5">
              {locale === "zh" ? "怎么选档位" : "How to pick a tier"}
            </Pill>
            <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] text-ink">
              {locale === "zh"
                ? "按风险偏好与增长目标，而不是按预算"
                : "Pick by risk appetite and growth target, not by budget"}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(locale === "zh"
              ? [
                  {
                    t: "先验证方向",
                    b: "战略问诊最合适。2-3 周内输出 AI Agent 增长诊断报告、目标市场选择、以及前 90 天的执行路线图。适合预算有限但想先搞清楚&quot;该往哪走&quot;的早期团队。",
                  },
                  {
                    t: "要快速出第一个增长动作",
                    b: "轻量陪跑最合适。我们接管一条核心渠道(Launch Video、Product Hunt 或 KOL),3-4 周内跑出可衡量的第一批增长数据,团队继续保留对其他环节的掌控。",
                  },
                  {
                    t: "希望我们共担风险",
                    b: "完整陪跑最合适。基础服务费 + 10-20% 增长利润分成,我们把团队编制深度嵌进你的 Slack 与周会。分成比例按 MRR 增量或净利润增量计算,与你的增长结果强绑定。",
                  },
                ]
              : [
                  {
                    t: "Validate the direction first",
                    b: "Strategy Diagnosis is the right starting point. In 2-3 weeks you get an AI Agent growth diagnosis, a target-market call, and a 90-day execution roadmap — ideal for early teams who want the direction question answered before they commit budget.",
                  },
                  {
                    t: "Need a first growth move, fast",
                    b: "Lite Partnership fits. We own one core channel (Launch Video, Product Hunt or KOL) and ship measurable first-wave results in 3-4 weeks while your team keeps hands on the rest.",
                  },
                  {
                    t: "Want us sharing the risk",
                    b: "Full Growth Partnership fits. Base retainer + 10-20% share of the growth upside. We embed in your Slack and weekly review — the profit share is calculated against incremental MRR or net profit, so our outcomes are bolted to yours.",
                  },
                ]
            ).map((item) => (
              <article
                key={item.t}
                className="rounded-3xl bg-white border border-ink/10 p-7 shadow-sm"
              >
                <h3 className="sp-display text-xl md:text-2xl text-ink leading-snug">
                  {item.t}
                </h3>
                <p className="mt-3 text-ink/70 leading-relaxed text-sm">
                  {item.b}
                </p>
              </article>
            ))}
          </div>

          <Card variant="subtle" className="mt-12 max-w-3xl bg-cream">
            <h3 className="sp-display text-xl md:text-2xl text-ink mb-3">
              {locale === "zh"
                ? "利润分成到底怎么算？"
                : "How does the profit share actually work?"}
            </h3>
            <p className="text-ink/70 leading-relaxed">
              {locale === "zh"
                ? "分成标的在 kickoff 阶段就用书面形式锁定，通常是 MRR 增量（月度订阅收入相对基线的净增长）或产品净利润增量。比例 10-20% 根据产品阶段、预期波动度与 CAC 回收周期一对一协商。战略问诊的一次性费用可在后续升级到轻量 / 完整陪跑时抵扣首月服务费。"
                : "The share base is locked in writing at kickoff — typically incremental MRR (month-over-month net growth over a baseline) or incremental net profit. The 10-20% figure is negotiated per product stage, expected volatility, and CAC-payback window. The Strategy Diagnosis fee is credited against month one if you upgrade to Lite or Full later."}
            </p>
          </Card>
        </Container>
      </Section>

      {/* Bottom CTA */}
      <Section bg="ink" spacing="cta">
        <Container size="lg" className="text-center">
          <h2 className="sp-display text-3xl md:text-4xl text-white">
            {locale === "zh"
              ? "不确定该选哪档？"
              : "Not sure which tier fits?"}
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            {locale === "zh"
              ? "30 分钟免费咨询，帮你判断产品阶段与最合适的合作方式。"
              : "Book a free 30-minute call — we'll help you pick based on your stage."}
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              {nav("cta")} →
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
