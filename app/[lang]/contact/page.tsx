import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { JsonLd, Section } from "@/components/ui";

const copy = {
  title: { uk: "Контакти", ru: "Контакты" },
  lead: {
    uk: "Найшвидше — у Telegram. Опишіть процес, який забирає час, і протягом робочого дня ми відповімо, що з ним можна зробити і скільки це коштуватиме.",
    ru: "Быстрее всего — в Telegram. Опишите процесс, который отнимает время, и в течение рабочего дня мы ответим, что с ним можно сделать и сколько это будет стоить.",
  },
  meta: {
    uk: "Зв'язатися з Hrushevski Systems: Telegram, email office@hrshvski.com, телефон +380 63 964 08 48. Безкоштовна AI-діагностика процесу.",
    ru: "Связаться с Hrushevski Systems: Telegram, email office@hrshvski.com, телефон +380 63 964 08 48. Бесплатная AI-диагностика процесса.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/contact", title: `${copy.title[lang]} | Hrushevski Systems`, description: copy.meta[lang] });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: copy.title[lang] }];
  const rows = [
    { k: "Telegram", v: <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" data-track="contact_telegram" className="text-accent hover:underline">{ui.cta.telegram[lang]} →</a> },
    { k: "Email", v: <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a> },
    { k: "Телефон", v: <a href={SITE.phoneHref} className="font-mono tabular-nums hover:text-accent">{SITE.phone}</a> },
    { k: lang === "uk" ? "Місто" : "Город", v: SITE.city[lang] },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/contact") }])} />
      <PageHero crumbs={crumbs} title={copy.title[lang]} lead={copy.lead[lang]} />
      <Section>
        <dl className="grid max-w-[720px] gap-px overflow-hidden rounded-lg border border-line bg-line">
          {rows.map((r) => (
            <div key={r.k} className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 bg-surface p-5 text-[16px]">
              <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
