import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

const font = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
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

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: dict.footer.eyebrow,
      description: dict.hero.text,
      siteName: "hrshvski.com",
    },
    alternates: {
      languages: {
        ru: "/ru",
        uk: "/uk",
        en: "/en",
      },
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
      <body className="min-h-screen font-[var(--font-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
