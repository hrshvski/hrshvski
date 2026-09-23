import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { organizationLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { cases, industries, packages, products, services } from "@/content";
import { home } from "@/content/home";
import { ui } from "@/content/ui";
import Flow from "@/components/Flow";
import Faq from "@/components/Faq";
import { CaseCard, ServiceCard } from "@/components/Cards";
import { ButtonLink, Container, Eyebrow, ExternalButton, H2, JsonLd, Price, Section, Tag } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/", title: home.metaTitle[lang], description: home.metaDescription[lang] });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const teaser = packages.filter((p) => ["integration", "bot", "ai-assistant"].includes(p.id));

  return (
    <>
      <JsonLd data={organizationLd(lang, home.metaDescription[lang])} />

      {/* Hero */}
      <section className="border-b border-line">
        <Container className="grid gap-10 pb-16 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:pb-20">
          <div>
            <Eyebrow>{home.eyebrow[lang]}</Eyebrow>
            <h1 className="mt-4 text-[36px] font-bold leading-[1.06] tracking-[-0.025em] sm:text-[52px]">
              {home.h1[lang]}
            </h1>
            <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-muted sm:text-[18px]">{home.lead[lang]}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href(lang, "/tools/bot-cost-calculator")}>{ui.cta.calculate[lang]}</ButtonLink>
              <ExternalButton href={SITE.telegram} onClickEvent="contact_telegram">
                {ui.cta.telegram[lang]}
              </ExternalButton>
            </div>
          </div>
          <div className="lg:pl-4">
            <Flow nodes={home.heroFlow[lang]} caption={home.heroFlowCaption[lang]} size="lg" />
          </div>
        </Container>
        <Container className="grid grid-cols-2 gap-px border-t border-line bg-line lg:grid-cols-4">
          {home.promises.map((p) => (
            <div key={p.title.uk} className="bg-bg px-1 py-6 sm:px-4">
              <div className="text-[15px] font-semibold">{p.title[lang]}</div>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-muted">{p.text[lang]}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Services */}
      <Section>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>{ui.nav.services[lang]}</Eyebrow>
            <H2>{home.servicesHeading[lang]}</H2>
            <p className="mt-3 max-w-[60ch] text-[16px] text-muted">{home.servicesText[lang]}</p>
          </div>
          <ButtonLink variant="ghost" href={href(lang, "/services")} className="px-0">
            {ui.cta.allServices[lang]} →
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} lang={lang} />
          ))}
          <Link
            href={href(lang, "/pricing")}
            className="flex flex-col justify-between gap-6 rounded-lg border border-dashed border-line-strong p-5 hover:border-accent"
          >
            <div>
              <h3 className="text-[18px] font-semibold">{lang === "uk" ? "Не знаєте, що обрати?" : "Не знаете, что выбрать?"}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">
                {lang === "uk"
                  ? "Почніть з безкоштовної діагностики або аудиту за 8 000 грн — його вартість зарахуємо в проєкт."
                  : "Начните с бесплатной диагностики или аудита за 8 000 грн — его стоимость засчитаем в проект."}
              </p>
            </div>
            <span className="text-[14px] font-semibold text-accent">{ui.cta.pricing[lang]} →</span>
          </Link>
        </div>
      </Section>

      {/* Industries */}
      <Section className="border-t border-line bg-sunken">
        <Eyebrow>{ui.nav.industries[lang]}</Eyebrow>
        <H2>{home.industriesHeading[lang]}</H2>
        <p className="mt-3 max-w-[60ch] text-[16px] text-muted">{home.industriesText[lang]}</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={href(lang, `/industries/${ind.slug}`)}
              className="group flex flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="text-[21px] font-semibold group-hover:text-accent">{ind.title[lang]}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{ind.short[lang]}</p>
              <ul className="mt-5 grid gap-2 border-t border-line pt-4 text-[14px]">
                {ind.pains[lang].slice(0, 3).map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span aria-hidden className="text-muted">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-6 text-[14px] font-semibold text-accent">{ui.cta.more[lang]} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why + process */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Eyebrow>{ui.nav.about[lang]}</Eyebrow>
            <H2>{home.whyHeading[lang]}</H2>
            <p className="mt-4 text-[16px] leading-[1.65] text-muted">{home.whyText[lang]}</p>
            <ButtonLink variant="ghost" href={href(lang, "/about")} className="mt-4 px-0">
              {ui.cta.more[lang]} →
            </ButtonLink>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
            {home.process.map((s, i) => (
              <li key={i} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 bg-surface p-5">
                <span className="font-mono text-[13px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-[16.5px] font-semibold">{s.title[lang]}</div>
                  <p className="mt-1 text-[14.5px] leading-[1.55] text-muted">{s.text[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 1C/BAS */}
      <section className="bg-ink text-bg">
        <Container className="grid gap-8 py-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.1em] opacity-70">{home.bas.eyebrow[lang]}</div>
            <h2 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.015em] sm:text-[34px]">
              {home.bas.heading[lang]}
            </h2>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] opacity-80">{home.bas.text[lang]}</p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Link
              href={href(lang, "/services/custom-crm")}
              className="inline-flex justify-center rounded-md bg-bg px-5 py-3 text-[15px] font-semibold text-ink hover:opacity-90"
            >
              {lang === "uk" ? "Аудит переходу — 8 000 грн" : "Аудит перехода — 8 000 грн"}
            </Link>
            <Link href={href(lang, "/blog/replace-1c-bas-2026")} className="text-[14.5px] underline underline-offset-4 opacity-80 hover:opacity-100">
              {home.bas.cta[lang]} →
            </Link>
          </div>
        </Container>
      </section>

      {/* Products */}
      <Section>
        <Eyebrow>{ui.nav.products[lang]}</Eyebrow>
        <H2>{home.productsHeading[lang]}</H2>
        <p className="mt-3 max-w-[60ch] text-[16px] text-muted">{home.productsText[lang]}</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={href(lang, `/products/${p.slug}`)}
              className="group flex flex-col gap-4 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[22px] font-bold tracking-[-0.01em]">{p.name}</span>
                <Tag tone="signal">{p.status[lang]}</Tag>
              </div>
              <p className="text-[15.5px] font-medium">{p.title[lang]}</p>
              <p className="text-[14.5px] leading-[1.55] text-muted">{p.short[lang]}</p>
              <span className="mt-auto text-[14px] font-semibold text-accent">{ui.cta.more[lang]} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Cases */}
      <Section className="border-t border-line">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>{ui.nav.cases[lang]}</Eyebrow>
            <H2>{home.casesHeading[lang]}</H2>
            <p className="mt-3 max-w-[60ch] text-[16px] text-muted">{home.casesText[lang]}</p>
          </div>
          <ButtonLink variant="ghost" href={href(lang, "/cases")} className="px-0">
            {ui.cta.allCases[lang]} →
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} lang={lang} />
          ))}
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section className="border-t border-line bg-sunken">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <Eyebrow>{ui.nav.pricing[lang]}</Eyebrow>
            <H2>{home.pricingHeading[lang]}</H2>
            <p className="mt-3 text-[16px] text-muted">{home.pricingText[lang]}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <ButtonLink href={href(lang, "/tools/bot-cost-calculator")}>{ui.cta.calculate[lang]}</ButtonLink>
              <ButtonLink variant="ghost" href={href(lang, "/pricing")} className="px-0">
                {ui.cta.pricing[lang]} →
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {teaser.map((p) => (
              <div key={p.id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
                <div className="text-[16px] font-semibold">{p.title[lang]}</div>
                <Price value={p.priceFrom} unit={p.unit[lang]} lang={lang} className="text-[18px]" />
                <div className="font-mono text-[12px] text-muted">{p.duration[lang]}</div>
                <p className="text-[14px] leading-[1.5] text-muted">{p.summary[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>{home.faqHeading[lang]}</H2>
          </div>
          <Faq items={home.faq} lang={lang} />
        </div>
      </Section>
    </>
  );
}
