import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Onest, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { navData } from "@/content";
import { ui } from "@/content/ui";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactBand from "@/components/ContactBand";
import Analytics from "@/components/Analytics";

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1318" },
  ],
};

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const nav = navData(lang);

  return (
    <html lang={htmlLang[lang]} className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
        >
          {lang === "uk" ? "До змісту" : "К содержанию"}
        </a>
        <SiteHeader lang={lang} services={nav.services} industries={nav.industries} />
        <main id="main">{children}</main>
        <ContactBand lang={lang} />
        <SiteFooter lang={lang} services={nav.services} industries={nav.industries} products={nav.products} />
        <Analytics text={ui.cookie.text[lang]} accept={ui.cookie.accept[lang]} decline={ui.cookie.decline[lang]} />
      </body>
    </html>
  );
}
