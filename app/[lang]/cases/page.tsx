import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { cases } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { CaseCard } from "@/components/Cards";
import { JsonLd, Section } from "@/components/ui";

const copy = {
  title: { uk: "Кейси: системи, які вже працюють", ru: "Кейсы: системы, которые уже работают" },
  lead: {
    uk: "Показуємо тільки те, за що можемо відповісти. Частина кейсів — наші власні інструменти, якими ми користуємося щодня; клієнтські кейси публікуємо з дозволу клієнтів.",
    ru: "Показываем только то, за что можем ответить. Часть кейсов — наши собственные инструменты, которыми мы пользуемся каждый день; клиентские кейсы публикуем с разрешения клиентов.",
  },
  meta: {
    uk: "Кейси Hrushevski Systems: лідогенерація з OLX і DOM.RIA, власна CRM на своєму сервері, парсинг меню закладів HoReCa.",
    ru: "Кейсы Hrushevski Systems: лидогенерация с OLX и DOM.RIA, собственная CRM на своём сервере, парсинг меню заведений HoReCa.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/cases">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/cases", title: `${copy.title[lang]} | Hrushevski Systems`, description: copy.meta[lang] });
}

export default async function CasesPage({ params }: PageProps<"/[lang]/cases">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.nav.cases[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/cases") }])} />
      <PageHero crumbs={crumbs} title={copy.title[lang]} lead={copy.lead[lang]} />
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.slug} c={c} lang={lang} />
          ))}
        </div>
      </Section>
    </>
  );
}
