import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Card, cardClasses } from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { buildMetadata, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ServicesOverview } from "@/components/sections/ServicesOverview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: locale === "zh"
      ? "AI Agent 与 SaaS 增长服务矩阵 — SEO、GEO、Launch Video、KOL、投放"
      : "AI Agent & SaaS growth services — SEO, GEO, Launch Video, KOL, Paid Ads",
    description: locale === "zh"
      ? "六条围绕 AI Agent 与 AI SaaS 0→1 的增长服务线：Launch Video、Product Hunt、海外 KOL/KOC、SEO/GEO、Paid Ads 与 Reddit 社区运营，按产品阶段自由组合。"
      : "Six service lines for AI Agent and SaaS 0→1 growth: Launch Video, Product Hunt, global creators, SEO / GEO, paid acquisition, and Reddit / community growth.",
    path: "/services",
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const idx = await getTranslations({ locale, namespace: "servicesIndex" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const items = t.raw("items") as {
    slug: string;
    title: string;
    short: string;
  }[];

  const jsonLd = [
    breadcrumbSchema(locale, [
      { name: nav("services"), path: "/services" },
    ]),
    ...items.map((it) =>
      serviceSchema({
        locale,
        slug: it.slug,
        name: it.title,
        description: it.short,
      }),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Intro */}
      <Section bg="paper">
        <Container size="full">
          <div className="max-w-3xl">
            <Pill variant="orange" size="md" className="mb-6">
              {nav("services")}
            </Pill>
            <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05]">
              {idx("title")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ink/75 leading-relaxed">
              {idx("subtitle")}
            </p>
          </div>
        </Container>
      </Section>

      {/* Reuse homepage P4 hub */}
      <ServicesOverview />

      {/* Individual service cards */}
      <Section bg="paper">
        <Container size="full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}` as const}
                className={cardClasses(
                  "feature",
                  "group block hover:border-orange-500 hover:-translate-y-1 transition-all",
                )}
              >
                <div className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-4">
                  {item.slug.replace("-", " / ")}
                </div>
                <h3 className="sp-display text-2xl leading-tight text-ink group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-ink/75 leading-relaxed">
                  {item.short}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500">
                  {idx("cta")} →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/contact" variant="primary" size="lg">
              {nav("cta")} →
            </Button>
          </div>
        </Container>
      </Section>

      {/* Positioning block — adds meaningful depth to /services so Google and
          AI answer engines have something substantial to index. */}
      <Section bg="cream">
        <Container size="full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <Pill variant="orange" size="md" className="mb-5">
                {locale === "zh" ? "服务逻辑" : "How services compose"}
              </Pill>
              <h2 className="sp-display text-3xl md:text-4xl lg:text-5xl leading-[1.08] text-ink">
                {locale === "zh"
                  ? "六条产品线，同一套增长飞轮"
                  : "Six service lines, one growth flywheel"}
              </h2>
              <div className="mt-6 space-y-5 text-ink/75 leading-relaxed text-base">
                <p>
                  {locale === "zh"
                    ? "StartPoint 不做碎片化的营销外包。六条服务线是同一套 0→1 增长飞轮上的不同支点:Launch Video 负责在 15 秒内把价值主张讲清楚，Product Hunt 和 KOL 负责把首批种子用户拉进来，Reddit 与 GEO 负责让真实用户留下可被搜索到的长尾信任资产，SEO 和 Paid Ads 负责把流量飞轮踩起来。"
                    : "StartPoint doesn't do piecemeal marketing. The six service lines are different pivots on the same 0→1 flywheel: Launch Video packs the value prop into 15 seconds, Product Hunt and KOL bring the first seed cohort, Reddit and GEO seed durable long-tail trust, and SEO + paid put the wheel in motion."}
                </p>
                <p>
                  {locale === "zh"
                    ? "多数合作始于一条线——最常见的是 Launch Video 或 Product Hunt 冲刺——之后再视阶段增补其他模块。早期产品不必六条全开:先让一条打通，再叠加下一条,是我们在 100+ AI Agent 项目上验证过的节奏。"
                    : "Most engagements start with one line — Launch Video or a Product Hunt sprint is the usual entry — and add the next pivot as the product matures. You don't need all six at once; get one compounding before you stack the next. That's the cadence we've validated across 100+ AI Agent and SaaS launches."}
                </p>
              </div>
            </div>

            <Card variant="feature">
              <h3 className="sp-display text-2xl md:text-3xl text-ink leading-tight">
                {locale === "zh"
                  ? "适合哪些产品阶段？"
                  : "Which product stages we fit"}
              </h3>
              <ul className="mt-6 space-y-4">
                {(locale === "zh"
                  ? [
                      "Pre-MVP：战略问诊 + Launch Video 打磨产品叙事",
                      "Demo ready：Product Hunt 冲刺 + 种子 KOL 激活",
                      "0-1k 用户：KOL / Reddit 扩量 + GEO 结构化数据铺底",
                      "1k+ 用户：Paid Ads 放量 + SEO 长期复利",
                    ]
                  : [
                      "Pre-MVP — strategy diagnosis + Launch Video narrative prep",
                      "Demo ready — Product Hunt sprint + seed KOL activation",
                      "0-1k users — KOL / Reddit expansion + GEO structured data",
                      "1k+ users — paid ads at scale + compounding SEO",
                    ]
                ).map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-ink/75 leading-relaxed"
                  >
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink/55 leading-relaxed">
                {locale === "zh"
                  ? "不确定该先启动哪一条？30 分钟免费咨询帮你判断。"
                  : "Not sure which line to start with? A free 30-min call will tell you."}
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
