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
  buildMetadata,
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

  return (
    <>
      <JsonLd data={[organizationSchema(locale), faqSchema(faqItems)]} />
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
