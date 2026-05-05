import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, caseStudiesSchema } from "@/lib/seo";
import { CasesGrid } from "@/components/sections/CasesGrid";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { InternationalProjects } from "@/components/sections/InternationalProjects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: locale === "zh"
      ? "AI Agent 与 SaaS 增长案例 — Product Hunt、SEO 与达人营销实战"
      : "AI Agent & SaaS growth case studies — Product Hunt, SEO, and creator campaigns",
    description:
      locale === "zh"
        ? "查看 StartPoint 为 AI Agent 与 AI SaaS 做过的真实增长案例，包括 Product Hunt 冲榜、SEO 有机增长、达人合作获客与融资叙事支持。"
        : "Real growth outcomes StartPoint has delivered for AI Agents and AI SaaS: Product Hunt wins, SEO growth, creator acquisition, and investor-facing traction stories.",
    path: "/cases",
  });
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cases" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const items = t.raw("items") as Array<{
    title: string;
    text: string;
    tag: string;
  }>;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: nav("cases"), path: "/cases" },
          ]),
          caseStudiesSchema(
            locale,
            items.map((item) => ({
              title: item.title,
              summary: item.text,
              category: item.tag,
            })),
          ),
        ]}
      />

      <Section bg="paper">
        <Container size="full">
          <Pill variant="orange" size="md" className="mb-6">
            {nav("cases")}
          </Pill>
          <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05] max-w-4xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink/75 leading-relaxed">
            {locale === "zh"
              ? "以下是 StartPoint 合作过的部分 AI 产品真实增长结果。更多在 NDA 下可以一对一分享。"
              : "Selected public case studies from StartPoint engagements. More available 1:1 under NDA."}
          </p>
        </Container>
      </Section>

      {/* Featured case: anchor 0→1 story from product to fundraising */}
      <FeaturedCaseStudy />

      {/* Shorter AI-product case cards (Product Hunt / SEO / creators) */}
      <CasesGrid />

      {/* Pre-StartPoint overseas 0→1 work across categories */}
      <InternationalProjects />

      <Section bg="ink" spacing="cta">
        <Container size="lg" className="text-center">
          <h2 className="sp-display text-3xl md:text-4xl text-white">
            {locale === "zh"
              ? "想看更多同行业的深度数据？"
              : "Want deeper data from your category?"}
          </h2>
          <p className="mt-4 text-white/75 max-w-xl mx-auto">
            {locale === "zh"
              ? "在 NDA 下可以一对一分享 20+ 同类 AI 产品的真实增长数据与方法论细节。"
              : "Under NDA we can share 20+ more case studies with full methodology detail — 1:1."}
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
