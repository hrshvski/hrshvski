import type { MetadataRoute } from "next";
import { allPaths, posts } from "@/content";
import { href, hreflang, locales } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const postDate = new Map(posts.map((p) => [`/blog/${p.slug}`, p.updated ?? p.date]));
  return allPaths().flatMap((path) => {
    const languages = Object.fromEntries(locales.map((l) => [hreflang[l], `${SITE.url}${href(l, path)}`]));
    return locales.map((l) => ({
      url: `${SITE.url}${href(l, path)}`,
      lastModified: postDate.get(path) ?? undefined,
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
      alternates: { languages },
    }));
  });
}
