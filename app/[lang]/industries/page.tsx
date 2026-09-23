import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { industries } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import Flow from "@/components/Flow";
import { JsonLd, Section } from "@/components/ui";

const copy = {
  title: { uk: "Автоматизація для HoReCa, дистрибуції та б’юті", ru: "Автоматизация для HoReCa, дистрибуции и бьюти" },
  lead: {
    uk: "Галузі, де ми знаємо процеси зсередини: від замовлення у Viber до фіскального чека і звіту власнику. Боти, інтеграції та автоматизацію робимо і для інших ніш — пишіть.",
    ru: "Отрасли, где мы знаем процессы изнутри: от заказа в Viber до фискального чека и отчёта владельцу. Боты, интеграции и автоматизацию делаем и для других ниш — пишите.",
  },
  meta: {
    uk: "Автоматизація ресторанів і кафе, HoReCa-дистриб'юторів та салонів краси: боти, інтеграції з Poster і Checkbox, облік на заміну 1С/BAS, CRM.",
    ru: "Автоматизация ресторанов и кафе, HoReCa-дистрибьюторов и салонов красоты: боты, интеграции с Poster и Checkbox, учёт на замену 1С/BAS, CRM.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/industries">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/industries", title: `${copy.title[lang]} | Hrushevski Systems`, description: copy.meta[lang] });
}

export default async function IndustriesPage({ params }: PageProps<"/[lang]/industries">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.nav.industries[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/industries") }])} />
      <PageHero crumbs={crumbs} title={copy.title[lang]} lead={copy.lead[lang]} />
      <Section>
        <div className="grid gap-6">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={href(lang, `/industries/${ind.slug}`)}
              className="group grid gap-6 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center"
            >
              <div>
                <h2 className="text-[24px] font-bold group-hover:text-accent">{ind.title[lang]}</h2>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{ind.short[lang]}</p>
                <span className="mt-4 inline-block text-[14px] font-semibold text-accent">{ui.cta.more[lang]} →</span>
              </div>
              <Flow nodes={ind.flow[lang]} />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
