import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Problem } from "@/components/sections/Problem";
import { Showcase } from "@/components/sections/Showcase";
import { Partner } from "@/components/sections/Partner";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { Engine } from "@/components/sections/Engine";
import { Stats } from "@/components/sections/Stats";
import { Commitment } from "@/components/sections/Commitment";
import { Outro } from "@/components/sections/Outro";
import { JsonLd } from "@/components/JsonLd";
import {
  organizationSchema,
  faqSchema,
  videoObjectSchema,
  buildMetadata,
  SITE_URL,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });
  return buildMetadata({
    locale,
    title: `${t("name")} — ${t("tagline")}`,
    description: t("description"),
    path: "/",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqT = await getTranslations({ locale, namespace: "faq" });
  const faqItems = faqT.raw("items") as { q: string; a: string }[];

  // Surface the decorative Hero video as a proper VideoObject so Google /
  // Bing / AI answer engines can pick it up as a rich result.
  const heroVideo = videoObjectSchema({
    name:
      locale === "zh"
        ? "StartPoint × Poly.app 发布视频 — AI Agent 0→1 增长案例"
        : "StartPoint × Poly.app launch video — AI Agent 0→1 growth case",
    description:
      locale === "zh"
        ? "StartPoint 为 AI Agent 产品 Poly.app 操刀的发布视频,60 秒讲清核心价值主张,在 Product Hunt 冲榜与首页首屏双通道同时驱动转化。"
        : "StartPoint's launch video for AI Agent product Poly.app — a 60-second narrative that landed on Product Hunt's top slot and drove homepage conversion.",
    thumbnailUrl: `${SITE_URL}/videos/posters/poly.jpg`,
    contentUrl: `${SITE_URL}/videos/poly.mp4`,
    uploadDate: "2025-06-01",
    durationIso: "PT45S",
  });

  return (
    <>
      <JsonLd
        data={[organizationSchema(locale), faqSchema(faqItems), heroVideo]}
      />
      <Hero />
      <ClientLogos />
      <Problem />
      <Showcase />
      <Partner />
      <ServicesOverview />
      <Engine />
      <Stats />
      <Commitment />
      <Outro />
    </>
  );
}
