import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-noto-sc",
});

export const viewport: Viewport = {
  themeColor: "#F5551D",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${notoSansSC.variable} scroll-smooth`}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Nav />
          <main className="pt-16 md:pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
