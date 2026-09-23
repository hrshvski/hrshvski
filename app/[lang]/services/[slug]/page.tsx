import Link from "next/link";
import { notFound } from "next/navigation";
import { href, locales, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata, serviceLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { cases, getPackage, getService, industries, pick, services } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import Flow from "@/components/Flow";
import Faq from "@/components/Faq";
import { CaseCard, ServiceCard } from "@/components/Cards";
import { ButtonLink, CheckList, Eyebrow, ExternalButton, H2, JsonLd, Price, Section, Tag } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const l = lang as Locale;
  return pageMetadata({ lang: l, path: `/services/${slug}`, title: s.metaTitle[l], description: s.metaDescription[l] });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const s = getService(slug);
  if (!s) notFound();
  const pkg = getPackage(s.packageId);
  const relatedCases = pick(cases, s.cases);
  const relatedIndustries = pick(industries, s.industries);
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  const crumbs = [
    { name: ui.nav.home[lang], href: href(lang) },
    { name: ui.nav.services[lang], href: href(lang, "/services") },
    { name: s.title[lang] },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceLd({ name: s.h1[lang], description: s.metaDescription[lang], path: href(lang, `/services/${slug}`), priceFrom: pkg.priceFrom }),
          breadcrumbLd([
            { name: crumbs[0].name, path: href(lang) },
            { name: crumbs[1].name, path: href(lang, "/services") },
            { name: crumbs[2].name, path: href(lang, `/services/${slug}`) },
          ]),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={s.title[lang]}
        title={s.h1[lang]}
        lead={s.lead[lang]}
        actions={
          <>
            <ButtonLink href="#contact">{ui.cta.discuss[lang]}</ButtonLink>
            <ExternalButton href={SITE.telegram} onClickEvent="contact_telegram">{ui.cta.telegram[lang]}</ExternalButton>
          </>
        }
        aside={
          <div className="rounded-lg border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{ui.labels.price[lang]}</div>
                <Price value={pkg.priceFrom} unit={pkg.unit[lang]} lang={lang} className="mt-1 block text-[24px]" />
              </div>
              <div className="text-right">
                <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{ui.labels.duration[lang]}</div>
                <div className="mt-1 font-mono text-[15px]">{pkg.duration[lang]}</div>
              </div>
            </div>
            <div className="pt-4">
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{ui.labels.includes[lang]}</div>
              <CheckList items={pkg.includes[lang]} />
            </div>
          </div>
        }
      />

      <Section>
        <Flow nodes={s.flow[lang]} caption={ui.labels.example[lang]} />
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Eyebrow>{ui.labels.pains[lang]}</Eyebrow>
            <ul className="mt-5 grid gap-3">
              {s.pains[lang].map((p) => (
                <li key={p} className="rounded-md border border-line bg-surface px-4 py-3 text-[15px] leading-[1.5]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>{ui.labels.scenarios[lang]}</Eyebrow>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {s.scenarios.map((sc) => (
                <div key={sc.title.uk}>
                  <h3 className="text-[17px] font-semibold">{sc.title[lang]}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted">{sc.text[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line bg-sunken">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{ui.labels.process[lang]}</Eyebrow>
            <ol className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
              {s.process.map((st, i) => (
                <li key={i} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 bg-surface p-5">
                  <span className="font-mono text-[13px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="text-[16px] font-semibold">{st.title[lang]}</div>
                    <p className="mt-1 text-[14.5px] leading-[1.55] text-muted">{st.text[lang]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <Eyebrow>{ui.labels.deliverables[lang]}</Eyebrow>
            <div className="mt-5">
              <CheckList items={s.deliverables[lang]} />
            </div>
            <div className="mt-10">
              <Eyebrow>{ui.labels.stack[lang]}</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
            {relatedIndustries.length > 0 && (
              <div className="mt-10">
                <Eyebrow>{ui.labels.industries[lang]}</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedIndustries.map((i) => (
                    <Link
                      key={i.slug}
                      href={href(lang, `/industries/${i.slug}`)}
                      className="rounded-md border border-line-strong bg-surface px-3 py-2 text-[14px] hover:border-accent hover:text-accent"
                    >
                      {i.title[lang]}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {relatedCases.length > 0 && (
        <Section>
          <Eyebrow>{ui.labels.related[lang]}</Eyebrow>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {relatedCases.map((c) => (
              <CaseCard key={c.slug} c={c} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      <Section className={relatedCases.length > 0 ? "border-t border-line" : ""}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>{ui.labels.faq[lang]}</H2>
          </div>
          <Faq items={s.faq} lang={lang} />
        </div>
      </Section>

      <Section className="border-t border-line">
        <Eyebrow>{ui.nav.services[lang]}</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <ServiceCard key={o.slug} s={o} lang={lang} />
          ))}
        </div>
      </Section>
    </>
  );
}
