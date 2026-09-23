import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { services } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { ServiceCard } from "@/components/Cards";
import { ButtonLink, JsonLd, Section } from "@/components/ui";

const copy = {
  title: { uk: "Послуги з автоматизації бізнесу", ru: "Услуги по автоматизации бизнеса" },
  lead: {
    uk: "Сім пакетів з фіксованим обсягом, терміном і ціною «від». Почати можна з одного бота чи інтеграції, а потім зібрати з цих блоків повну систему.",
    ru: "Семь пакетов с фиксированным объёмом, сроком и ценой «от». Начать можно с одного бота или интеграции, а потом собрать из этих блоков полную систему.",
  },
  metaDescription: {
    uk: "Telegram-боти, AI-асистенти, автоматизація процесів, інтеграції, CRM і заміна 1С/BAS, AI для команд, B2B-лідогенерація. Ціни від 10 000 грн.",
    ru: "Telegram-боты, AI-ассистенты, автоматизация процессов, интеграции, CRM и замена 1С/BAS, AI для команд, B2B-лидогенерация. Цены от 10 000 грн.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({
    lang,
    path: "/services",
    title: `${copy.title[lang]} | Hrushevski Systems`,
    description: copy.metaDescription[lang],
  });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Locale;
  const crumbs = [
    { name: ui.nav.home[lang], href: href(lang) },
    { name: ui.nav.services[lang] },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/services") }])} />
      <PageHero
        crumbs={crumbs}
        title={copy.title[lang]}
        lead={copy.lead[lang]}
        actions={
          <>
            <ButtonLink href={href(lang, "/tools/bot-cost-calculator")}>{ui.cta.calculate[lang]}</ButtonLink>
            <ButtonLink variant="secondary" href={href(lang, "/pricing")}>{ui.cta.pricing[lang]}</ButtonLink>
          </>
        }
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} lang={lang} />
          ))}
        </div>
      </Section>
    </>
  );
}
