import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { cases, getIndustry, getProduct, getService, industries, pick, services } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import Flow from "@/components/Flow";
import Faq from "@/components/Faq";
import { CaseCard, ServiceCard } from "@/components/Cards";
import { ButtonLink, Eyebrow, H2, JsonLd, Section, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => industries.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/industries/[slug]">) {
  const { lang, slug } = await params;
  const s = getIndustry(slug);
  if (!s) return {};
  const l = lang as Locale;
  return pageMetadata({ lang: l, path: `/industries/${slug}`, title: s.metaTitle[l], description: s.metaDescription[l] });
}

export default async function IndustryPage({ params }: PageProps<"/[lang]/industries/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const product = ind.product ? getProduct(ind.product) : undefined;
  const relServices = pick(services, ind.services);
  const relCases = pick(cases, ind.cases);

  const crumbs = [
    { name: ui.nav.home[lang], href: href(lang) },
    { name: ui.nav.industries[lang], href: href(lang, "/industries") },
    { name: ind.title[lang] },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: crumbs[0].name, path: href(lang) },
          { name: crumbs[1].name, path: href(lang, "/industries") },
          { name: crumbs[2].name, path: href(lang, `/industries/${slug}`) },
        ])}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={ind.title[lang]}
        title={ind.h1[lang]}
        lead={ind.lead[lang]}
        actions={
          <>
            <ButtonLink href="#contact">{ui.cta.discuss[lang]}</ButtonLink>
            <ButtonLink variant="secondary" href={href(lang, "/pricing")}>{ui.cta.pricing[lang]}</ButtonLink>
          </>
        }
        aside={<Flow nodes={ind.flow[lang]} caption={ui.labels.example[lang]} />}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <Eyebrow>{ui.labels.pains[lang]}</Eyebrow>
            <ul className="mt-5 grid gap-3">
              {ind.pains[lang].map((p) => (
                <li key={p} className="rounded-md border border-line bg-surface px-4 py-3 text-[15px] leading-[1.5]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>{ui.labels.solutions[lang]}</Eyebrow>
            <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {ind.solutions.map((sol) => {
                const svc = sol.service ? getService(sol.service) : undefined;
                return (
                  <div key={sol.title.uk} className="flex flex-col gap-2 bg-surface p-5">
                    <h3 className="text-[17px] font-semibold">{sol.title[lang]}</h3>
                    <p className="text-[14.5px] leading-[1.6] text-muted">{sol.text[lang]}</p>
                    {svc && (
                      <Link href={href(lang, `/services/${svc.slug}`)} className="mt-auto pt-2 text-[13.5px] font-semibold text-accent hover:underline">
                        {svc.title[lang]} →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            {ind.integrations.length > 0 && (
              <div className="mt-8">
                <Eyebrow>{ui.labels.integrations[lang]}</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ind.integrations.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {product && (
        <section className="border-y border-line bg-sunken">
          <div className="mx-auto grid max-w-[1180px] gap-6 px-4 py-12 sm:px-8 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-center">
            <div>
              <Eyebrow>{ui.labels.product[lang]}</Eyebrow>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-[26px] font-bold tracking-[-0.01em]">{product.name}</span>
                <Tag tone="signal">{product.status[lang]}</Tag>
              </div>
              <p className="mt-3 max-w-[60ch] text-[16px] text-muted">{product.short[lang]}</p>
            </div>
            <div className="lg:text-right">
              <ButtonLink variant="secondary" href={href(lang, `/products/${product.slug}`)}>
                {ui.cta.more[lang]} →
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {relServices.length > 0 && (
        <Section>
          <Eyebrow>{ui.labels.servicesFor[lang]}</Eyebrow>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relServices.map((s) => (
              <ServiceCard key={s.slug} s={s} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      {relCases.length > 0 && (
        <Section className="border-t border-line">
          <Eyebrow>{ui.labels.related[lang]}</Eyebrow>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {relCases.map((c) => (
              <CaseCard key={c.slug} c={c} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>{ui.labels.faq[lang]}</H2>
          </div>
          <Faq items={ind.faq} lang={lang} />
        </div>
      </Section>
    </>
  );
}
