import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { FounderStory } from "@/components/sections/FounderStory";
import { Vs } from "@/components/sections/Vs";
import { Advantages } from "@/components/sections/Advantages";
import { Team } from "@/components/sections/Team";
import { Stats } from "@/components/sections/Stats";

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
        ? "关于 StartPoint — 只做 AI Agent 0→1 增长的营销合伙人"
        : "About StartPoint — A growth partner built exclusively for AI Agents",
    description:
      locale === "zh"
        ? "了解 StartPoint 的团队背景、方法论和市场立场：一支同时懂技术、增长与资本叙事的 AI Agent 0→1 增长合伙人团队，覆盖杭州、上海与巴黎。"
        : "Meet StartPoint: a team fluent in engineering, growth, and investor narrative, built to help AI Agents reach 0→1 across Hangzhou, Shanghai, and Paris.",
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: nav("about"), path: "/about" },
          ]),
          organizationSchema(locale),
        ]}
      />

      {/* Hero */}
      <Section bg="paper">
        <Container size="full">
          <Pill variant="orange" size="md" className="mb-6">
            {nav("about")}
          </Pill>
          <h1 className="sp-display text-[15vw] sm:text-[11vw] lg:text-[7.5vw] xl:text-[120px] leading-[1.05] max-w-4xl text-ink">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-3xl text-xl md:text-2xl text-ink/80 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <p className="mt-4 max-w-3xl text-lg text-ink/70 leading-relaxed">
            {t("hero.body")}
          </p>
        </Container>
      </Section>

      {/* Founder story — why we only do AI Agent 0→1 */}
      <FounderStory />

      {/* P12 — VS comparison */}
      <Vs />

      {/* Stats bar — reuse homepage Stats */}
      <Stats />

      {/* P14 — Advantages */}
      <Advantages />

      {/* P15 — Team */}
      <Team />

      {/* Bottom CTA */}
      <Section bg="ink" spacing="cta">
        <Container size="lg" className="text-center">
          <h2 className="sp-display text-3xl md:text-4xl text-white">
            {locale === "zh"
              ? "想聊聊你的 AI 产品？"
              : "Want to talk about your AI product?"}
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            {locale === "zh"
              ? "30 分钟免费咨询，帮你判断增长策略是否成立。"
              : "A free 30-minute consultation to pressure-test your growth plan."}
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
