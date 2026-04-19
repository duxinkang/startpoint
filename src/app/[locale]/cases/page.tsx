import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { CasesGrid } from "@/components/sections/CasesGrid";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { InternationalProjects } from "@/components/sections/InternationalProjects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return buildMetadata({
    locale,
    title: `${t("title")} — StartPoint`,
    description:
      locale === "zh"
        ? "StartPoint 合作过的 AI 产品真实增长数据：Product Hunt 冲榜、SEO 有机增长、达人营销案例。"
        : "Real AI product growth outcomes StartPoint has delivered — Product Hunt launches, SEO growth, and creator marketing campaigns.",
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

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: nav("cases"), path: "/cases" },
        ])}
      />

      <Section bg="paper">
        <Container size="full">
          <Pill variant="orange" size="md" className="mb-6">
            {nav("cases")}
          </Pill>
          <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05] max-w-4xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-ink/80 leading-relaxed">
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
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
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
