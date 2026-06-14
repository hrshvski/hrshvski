import type { MetadataRoute } from "next";
import { locales } from "./[lang]/dictionaries";

const BASE = "https://hrshvski.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${BASE}/${l}`])
  );

  return locales.map((l) => ({
    url: `${BASE}/${l}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: l === "uk" ? 1 : 0.8,
    alternates: { languages },
  }));
}
