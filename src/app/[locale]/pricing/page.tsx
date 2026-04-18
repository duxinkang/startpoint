import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return buildMetadata({
    locale,
    title: `${t("title")} — StartPoint`,
    description:
      locale === "zh"
        ? "StartPoint 三档合作模式：战略问诊 ¥15,000、轻量陪跑 ¥30k-50k/月、完整陪跑 ¥80k-120k/月 + 增长利润分成。按产品阶段灵活组合。"
        : "Three StartPoint engagement tiers — Strategy diagnosis, Lite growth sprint, and Full growth partnership with revenue-share. Scoped to your product stage.",
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
        data={breadcrumbSchema(locale, [
          { name: nav("pricing"), path: "/pricing" },
        ])}
      />

      {/* Hero */}
      <Section bg="paper">
        <Container size="full">
          <Pill variant="orange" size="md" className="mb-6">
            {nav("pricing")}
          </Pill>
          <h1 className="sp-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl text-ink">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink/75 leading-relaxed">
            {locale === "zh"
              ? "按阶段、按深度灵活组合。从一次性战略问诊到深度绑定的增长陪跑，三档方案覆盖 AI 产品 0→1 的全路径。"
              : "Flexible by stage and depth. From a single strategy workshop to deep revenue-share growth partnership — three tiers scoped to your 0→1 journey."}
          </p>
        </Container>
      </Section>

      {/* Plans grid */}
      <Section bg="cream" className="!pt-8">
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

                  <h3
                    className={`sp-display text-3xl leading-tight ${isFeatured ? "text-white" : "text-ink"}`}
                  >
                    {plan.title}
                  </h3>

                  <p
                    className={`mt-4 leading-relaxed text-[15px] ${isFeatured ? "text-white/80" : "text-ink/70"}`}
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

      {/* Bottom CTA */}
      <Section bg="ink" className="!py-20">
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
