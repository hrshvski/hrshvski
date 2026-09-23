import type { Locale } from "@/lib/i18n";
import { services } from "./services";
import { industries } from "./industries";
import { products } from "./products";
import { cases } from "./cases";
import { posts } from "./posts";

export { services, industries, products, cases, posts };
export { packages, getPackage } from "./pricing";

const bySlug = <T extends { slug: string }>(list: T[], slug: string) =>
  list.find((x) => x.slug === slug);

export const getService = (slug: string) => bySlug(services, slug);
export const getIndustry = (slug: string) => bySlug(industries, slug);
export const getProduct = (slug: string) => bySlug(products, slug);
export const getCase = (slug: string) => bySlug(cases, slug);
export const getPost = (slug: string) => bySlug(posts, slug);

/** Resolve a list of slugs, silently skipping unknown ones. */
export function pick<T extends { slug: string }>(list: T[], slugs: string[]) {
  return slugs.map((s) => bySlug(list, s)).filter((x): x is T => Boolean(x));
}

export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));

/** Minimal nav data (serialisable) for client components. */
export function navData(lang: Locale) {
  const m = (x: { slug: string; title: Record<Locale, string> }) => ({ slug: x.slug, title: x.title[lang] });
  return {
    services: services.map(m),
    industries: industries.map(m),
    products: products.map((p) => ({ slug: p.slug, title: p.name })),
  };
}

/** Every localised path on the site (without locale prefix) — used by sitemap and llms.txt. */
export function allPaths() {
  return [
    "/",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/industries",
    ...industries.map((s) => `/industries/${s.slug}`),
    "/products",
    ...products.map((s) => `/products/${s.slug}`),
    "/cases",
    ...cases.map((s) => `/cases/${s.slug}`),
    "/pricing",
    "/tools/bot-cost-calculator",
    "/blog",
    ...posts.map((s) => `/blog/${s.slug}`),
    "/about",
    "/contact",
    "/privacy",
  ];
}
