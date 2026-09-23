import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, type Locale } from "@/lib/i18n";
import { abs, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { getPost, pick, posts, services } from "@/content";
import { ui } from "@/content/ui";
import PostBody from "@/components/PostBody";
import Faq from "@/components/Faq";
import { PostCard, ServiceCard } from "@/components/Cards";
import { Breadcrumbs, Container, Eyebrow, H2, JsonLd, Section } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => posts.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const l = lang as Locale;
  return pageMetadata({ lang: l, path: `/blog/${slug}`, title: (p.metaTitle ?? p.title)[l], description: p.description[l], type: "article" });
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const p = getPost(slug);
  if (!p) notFound();
  const relServices = pick(services, p.related.services);
  const relPosts = pick(posts, p.related.posts ?? []);
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === "uk" ? "uk-UA" : "ru-UA", { day: "numeric", month: "long", year: "numeric" });

  const crumbs = [
    { name: ui.nav.home[lang], href: href(lang) },
    { name: ui.nav.blog[lang], href: href(lang, "/blog") },
    { name: p.title[lang] },
  ];
  const url = href(lang, `/blog/${slug}`);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title[lang],
            description: p.description[lang],
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            inLanguage: lang,
            mainEntityOfPage: abs(url),
            image: abs("/og.png"),
            author: { "@type": "Organization", name: SITE.name, url: SITE.url },
            publisher: { "@id": `${SITE.url}/#org` },
          },
          breadcrumbLd([
            { name: crumbs[0].name, path: href(lang) },
            { name: crumbs[1].name, path: href(lang, "/blog") },
            { name: crumbs[2].name, path: url },
          ]),
        ]}
      />
      <article>
        <header className="border-b border-line">
          <Container className="pb-12 pt-8">
            <Breadcrumbs items={crumbs} />
            <div className="mt-8 font-mono text-[12.5px] text-muted">
              <time dateTime={p.date}>{fmt(p.date)}</time>
              {p.updated && (
                <>
                  {" · "}
                  {ui.labels.updated[lang]} <time dateTime={p.updated}>{fmt(p.updated)}</time>
                </>
              )}
              {" · "}
              {p.readingMinutes} {ui.labels.minRead[lang]}
            </div>
            <h1 className="mt-3 max-w-[24ch] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px]">
              {p.title[lang]}
            </h1>
            <div className="mt-8 max-w-[68ch] rounded-lg border border-line bg-surface p-5 sm:p-6">
              <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-accent">{ui.labels.short[lang]}</div>
              <p className="mt-2 text-[16.5px] leading-[1.65]">{p.tldr[lang]}</p>
            </div>
          </Container>
        </header>
        <Container className="py-12">
          <PostBody blocks={p.body[lang]} />
        </Container>
      </article>

      {p.faq && p.faq.length > 0 && (
        <Section className="border-t border-line">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <H2>{ui.labels.faq[lang]}</H2>
            </div>
            <Faq items={p.faq} lang={lang} />
          </div>
        </Section>
      )}

      {relServices.length > 0 && (
        <Section className="border-t border-line bg-sunken">
          <Eyebrow>{ui.nav.services[lang]}</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relServices.map((s) => (
              <ServiceCard key={s.slug} s={s} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {relPosts.length > 0 && (
        <Section className="border-t border-line">
          <Eyebrow>{ui.nav.blog[lang]}</Eyebrow>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {relPosts.map((rp) => (
              <PostCard key={rp.slug} p={rp} lang={lang} />
            ))}
          </div>
          <Link href={href(lang, "/blog")} className="mt-8 inline-block text-[14px] text-accent hover:underline">
            ← {ui.nav.blog[lang]}
          </Link>
        </Section>
      )}
    </>
  );
}
