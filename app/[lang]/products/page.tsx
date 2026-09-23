import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { products } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { CheckList, JsonLd, Section, Tag } from "@/components/ui";

const copy = {
  title: { uk: "Власні продукти Hrushevski Systems", ru: "Собственные продукты Hrushevski Systems" },
  lead: {
    uk: "Рішення, які ми повторювали в проєктах, збираємо в продукти для конкретних галузей. Обидва зараз у пілоті: беремо кількох клієнтів на особливих умовах і доробляємо продукт разом з ними.",
    ru: "Решения, которые мы повторяли в проектах, собираем в продукты для конкретных отраслей. Оба сейчас в пилоте: берём нескольких клиентов на особых условиях и дорабатываем продукт вместе с ними.",
  },
  meta: {
    uk: "Hrushevski ERP — облік для HoReCa-дистриб'юторів на заміну 1С/BAS. MorivaCRM — CRM для салонів краси. Набираємо пілотних клієнтів.",
    ru: "Hrushevski ERP — учёт для HoReCa-дистрибьюторов на замену 1С/BAS. MorivaCRM — CRM для салонов красоты. Набираем пилотных клиентов.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/products">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/products", title: copy.title[lang], description: copy.meta[lang] });
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.nav.products[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/products") }])} />
      <PageHero crumbs={crumbs} title={copy.title[lang]} lead={copy.lead[lang]} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={href(lang, `/products/${p.slug}`)}
              className="group flex flex-col gap-5 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[26px] font-bold tracking-[-0.01em] group-hover:text-accent">{p.name}</h2>
                <Tag tone="signal">{p.status[lang]}</Tag>
              </div>
              <p className="text-[16px] font-medium">{p.title[lang]}</p>
              <p className="text-[14.5px] leading-[1.6] text-muted">{p.short[lang]}</p>
              <div className="border-t border-line pt-4">
                <CheckList items={p.features.slice(0, 4).map((f) => f.title[lang])} />
              </div>
              <span className="mt-auto text-[14px] font-semibold text-accent">{ui.cta.more[lang]} →</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
