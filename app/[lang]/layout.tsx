import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

const font = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-mono",
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "ru";
  const dict = await getDictionary(locale);

  const titles: Record<Locale, string> = {
    ru: "Hrushevski AI Lab — AI-автоматизация для бизнеса",
    uk: "Hrushevski AI Lab — AI-автоматизація для бізнесу",
    en: "Hrushevski AI Lab — AI automation for business",
  };

  const descriptions: Record<Locale, string> = {
    ru: "Разрабатываем AI-агентов, чат-боты, CRM-интеграции и workflow-автоматизацию для бизнеса. hrshvski.com",
    uk: "Розробляємо AI-агентів, чат-ботів, CRM-інтеграції та workflow-автоматизацію для бізнесу. hrshvski.com",
    en: "We build AI agents, chatbots, CRM integrations, and workflow automation for businesses. hrshvski.com",
  };

  const ogLocale: Record<Locale, string> = {
    uk: "uk_UA",
    ru: "ru_RU",
    en: "en_US",
  };

  return {
    metadataBase: new URL("https://hrshvski.com"),
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uk: "/uk",
        ru: "/ru",
        en: "/en",
        "x-default": "/uk",
      },
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      title: titles[locale],
      description: descriptions[locale],
      siteName: "hrshvski.com",
      locale: ogLocale[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : "ru";

  const htmlLang = locale === "uk" ? "uk" : locale === "en" ? "en" : "ru";

  return (
    <html lang={htmlLang} className={font.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
