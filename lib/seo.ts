import type { Metadata } from "next";
import { SITE } from "./site";
import { defaultLocale, href, hreflang, locales, ogLocale, type Locale } from "./i18n";

type PageMeta = {
  lang: Locale;
  /** Path without the locale prefix, e.g. "/" or "/services/telegram-bots" */
  path: string;
  title: string;
  description: string;
  /** Locales this page exists in (defaults to all) */
  available?: readonly Locale[];
  type?: "website" | "article";
};

export function pageMetadata({
  lang,
  path,
  title,
  description,
  available = locales,
  type = "website",
}: PageMeta): Metadata {
  const languages: Record<string, string> = {};
  for (const l of available) languages[hreflang[l]] = href(l, path);
  if (available.includes(defaultLocale)) languages["x-default"] = href(defaultLocale, path);

  const url = href(lang, path);
  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: ogLocale[lang],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export const abs = (path: string) => `${SITE.url}${path}`;

export function organizationLd(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#org`,
    name: SITE.name,
    url: abs(href(lang)),
    logo: abs("/logo.svg"),
    image: abs("/og.png"),
    email: SITE.email,
    telephone: SITE.phone.replace(/\s/g, ""),
    description,
    address: { "@type": "PostalAddress", addressLocality: SITE.city[lang], addressCountry: "UA" },
    areaServed: [{ "@type": "Country", name: "Ukraine" }],
    knowsLanguage: ["uk", "ru", "en"],
    sameAs: [SITE.github, SITE.telegram],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  path: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { "@id": `${SITE.url}/#org` },
    areaServed: { "@type": "Country", name: "Ukraine" },
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: opts.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: opts.priceFrom,
        priceCurrency: "UAH",
      },
    },
  };
}
