import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { cases, getCase, pick, services } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { ServiceCard } from "@/components/Cards";
import { CheckList, Eyebrow, JsonLd, Section, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => cases.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/cases/[slug]">) {
  const { lang, slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const l = lang as Locale;
  return pageMetadata({ lang: l, path: `/cases/${slug}`, title: c.metaTitle[l], description: c.metaDescription[l], type: "article" });
}

export default async function CasePage({ params }: PageProps<"/[lang]/cases/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const c = getCase(slug);
  if (!c) notFound();
  const relServices = pick(services, c.services);

  const crumbs = [
    { name: ui.nav.home[lang], href: href(lang) },
    { name: ui.nav.cases[lang], href: href(lang, "/cases") },
    { name: c.title[lang] },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: crumbs[0].name, path: href(lang) },
          { name: crumbs[1].name, path: href(lang, "/cases") },
          { name: crumbs[2].name, path: href(lang, `/cases/${slug}`) },
        ])}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            <Tag tone={c.kind === "own" ? "signal" : "accent"}>
              {c.kind === "own" ? ui.labels.ownProject[lang] : ui.labels.clientProject[lang]}
            </Tag>
            {c.client[lang]}
          </span>
        }
        title={c.title[lang]}
        lead={c.summary[lang]}
        aside={
          c.results.length > 0 ? (
            <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
              {c.results.map((r) => (
                <div key={r.value} className="bg-surface p-5">
                  <dt className="font-mono text-[28px] font-medium tabular-nums">{r.value}</dt>
                  <dd className="mt-1 text-[14px] text-muted">{r.label[lang]}</dd>
                </div>
              ))}
            </dl>
          ) : undefined
        }
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{ui.labels.task[lang]}</Eyebrow>
            <div className="mt-5">
              <CheckList items={c.task[lang]} />
            </div>
          </div>
          <div>
            <Eyebrow>{ui.labels.solution[lang]}</Eyebrow>
            <div className="mt-5">
              <CheckList items={c.solution[lang]} />
            </div>
            <div className="mt-10">
              <Eyebrow>{ui.labels.stack[lang]}</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {relServices.length > 0 && (
        <Section className="border-t border-line">
          <Eyebrow>{ui.nav.services[lang]}</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relServices.map((s) => (
              <ServiceCard key={s.slug} s={s} lang={lang} />
            ))}
          </div>
          <Link href={href(lang, "/cases")} className="mt-8 inline-block text-[14px] text-accent hover:underline">
            ← {ui.cta.allCases[lang]}
          </Link>
        </Section>
      )}
    </>
  );
}
