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
  websiteSchema,
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

  // Surface the three Showcase launch videos as VideoObjects so Google /
  // Bing / AI answer engines can pick them up as rich results and Google
  // Video indexes them individually.
  const showcaseVideos = [
    videoObjectSchema({
      name:
        locale === "zh"
          ? "StartPoint × Poly.app 发布视频 — AI Agent 0→1 增长案例"
          : "StartPoint × Poly.app launch video — AI Agent 0→1 growth case",
      description:
        locale === "zh"
          ? "StartPoint 为 AI Agent 产品 Poly.app 操刀的发布视频，用纯视觉语言讲清核心价值主张，累计播放 300 万+，支持后续 $16M 融资叙事。"
          : "StartPoint's launch video for AI Agent product Poly.app — a visual-language narrative that drove 3M+ views and supported a $16M raise.",
      thumbnailUrl: `${SITE_URL}/videos/posters/poly.jpg`,
      contentUrl: `${SITE_URL}/videos/poly.mp4`,
      uploadDate: "2025-06-01",
      durationIso: "PT1M26S",
    }),
    videoObjectSchema({
      name:
        locale === "zh"
          ? "StartPoint × Blockit AI 发布视频 — 6 小时破百万播放"
          : "StartPoint × Blockit AI launch video — 1M+ views in 6 hours",
      description:
        locale === "zh"
          ? "StartPoint 为 AI 产品 Blockit AI 打造的发布视频，用创始人故事切入，发布 6 小时突破百万播放，带来 1,214 注册与 272 信用卡付费。"
          : "StartPoint's launch video for AI product Blockit AI — a founder-first narrative that crossed 1M views in 6 hours, delivered 1,214 signups and 272 paid credit-card conversions.",
      thumbnailUrl: `${SITE_URL}/videos/posters/miro.jpg`,
      contentUrl: `${SITE_URL}/videos/miro.mp4`,
      uploadDate: "2025-07-01",
      durationIso: "PT1M51S",
    }),
    videoObjectSchema({
      name:
        locale === "zh"
          ? "StartPoint × Crunched 发布视频 — 400 万+ 播放打开欧美市场"
          : "StartPoint × Crunched launch video — 4M+ views opening US/EU markets",
      description:
        locale === "zh"
          ? "StartPoint 为 Crunched 打造的发布视频，把复杂产品用一眼就懂的方式呈现，累计播放 400 万+，迅速在欧美市场建立认知。"
          : "StartPoint's launch video for Crunched — a complex product rendered legible at a glance, crossing 4M+ views and accelerating US/EU market entry.",
      thumbnailUrl: `${SITE_URL}/videos/posters/ava-artisan.jpg`,
      contentUrl: `${SITE_URL}/videos/ava-artisan.mp4`,
      uploadDate: "2025-08-01",
      durationIso: "PT1M58S",
    }),
  ];

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(locale),
          websiteSchema(locale),
          faqSchema(faqItems),
          ...showcaseVideos,
        ]}
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
