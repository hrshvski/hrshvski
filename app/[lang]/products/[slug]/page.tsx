import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, type Locale } from "@/lib/i18n";
import { abs, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { getIndustry, getProduct, products } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import { ButtonLink, CheckList, Eyebrow, H2, JsonLd, Section, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const l = lang as Locale;
  return pageMetadata({ lang: l, path: `/products/${slug}`, title: p.metaTitle[l], description: p.metaDescription[l] });
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const p = getProduct(slug);
  if (!p) notFound();
  const industry = getIndustry(p.industry);

  const crumbs = [
    { name: ui.nav.home[lang], href: href(lang) },
    { name: ui.nav.products[lang], href: href(lang, "/products") },
    { name: p.name },
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.name,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: p.metaDescription[lang],
            url: abs(href(lang, `/products/${slug}`)),
            publisher: { "@id": "https://hrshvski.com/#org" },
          },
          breadcrumbLd([
            { name: crumbs[0].name, path: href(lang) },
            { name: crumbs[1].name, path: href(lang, "/products") },
            { name: crumbs[2].name, path: href(lang, `/products/${slug}`) },
          ]),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={
          <span className="flex flex-wrap items-center gap-3">
            {p.name} <Tag tone="signal">{p.status[lang]}</Tag>
          </span>
        }
        title={p.h1[lang]}
        lead={p.lead[lang]}
        actions={
          <>
            <ButtonLink href="#contact">{ui.cta.pilot[lang]}</ButtonLink>
            {industry && (
              <ButtonLink variant="secondary" href={href(lang, `/industries/${industry.slug}`)}>
                {industry.title[lang]}
              </ButtonLink>
            )}
          </>
        }
        aside={
          <div className="rounded-lg border border-line bg-surface p-5 sm:p-6">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{ui.labels.audience[lang]}</div>
            <CheckList items={p.audience[lang]} />
          </div>
        }
      />

      <Section>
        <Eyebrow>{ui.labels.features[lang]}</Eyebrow>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f) => (
            <div key={f.title.uk} className="bg-surface p-5">
              <h3 className="text-[17px] font-semibold">{f.title[lang]}</h3>
              <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted">{f.text[lang]}</p>
            </div>
          ))}
        </div>
      </Section>

      {p.comparison && (
        <Section className="border-t border-line">
          <Eyebrow>{ui.labels.comparison[lang]}</Eyebrow>
          <H2>
            {p.name} vs {p.comparison.against}
          </H2>
          <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
              <thead>
                <tr className="bg-sunken font-mono text-[11.5px] uppercase tracking-[0.06em] text-muted">
                  <th className="px-4 py-3 font-medium">{ui.labels.criterion[lang]}</th>
                  <th className="px-4 py-3 font-medium text-accent">{p.name}</th>
                  <th className="px-4 py-3 font-medium">{p.comparison.against}</th>
                </tr>
              </thead>
              <tbody>
                {p.comparison.rows[lang].map(([c, us, them]) => (
                  <tr key={c} className="border-t border-line align-top">
                    <td className="px-4 py-3 font-semibold">{c}</td>
                    <td className="px-4 py-3">{us}</td>
                    <td className="px-4 py-3 text-muted">{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <Section className="border-t border-line bg-sunken">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
          <div>
            <Eyebrow>{ui.labels.pilot[lang]}</Eyebrow>
            <H2>{p.status[lang]}</H2>
            <ButtonLink href="#contact" className="mt-6">{ui.cta.pilot[lang]}</ButtonLink>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <CheckList items={p.pilot[lang]} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>{ui.labels.faq[lang]}</H2>
            <Link href={href(lang, "/products")} className="mt-4 inline-block text-[14px] text-accent hover:underline">
              ← {ui.nav.products[lang]}
            </Link>
          </div>
          <Faq items={p.faq} lang={lang} />
        </div>
      </Section>
    </>
  );
}
