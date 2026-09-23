import Link from "next/link";
import { href, type L, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Faq as FaqItem, PackageId } from "@/lib/types";
import { getPackage } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import { ButtonLink, CheckList, Eyebrow, H2, JsonLd, Price, Section } from "@/components/ui";

const copy = {
  title: { uk: "Ціни на автоматизацію, боти та CRM", ru: "Цены на автоматизацию, боты и CRM" },
  lead: {
    uk: "Усі пакети з ціною «від» для типового обсягу. Точну суму фіксуємо в договорі після діагностики — до початку робіт, без доплат «по ходу».",
    ru: "Все пакеты с ценой «от» для типового объёма. Точную сумму фиксируем в договоре после диагностики — до начала работ, без доплат «по ходу».",
  },
  meta: {
    uk: "Ціни Hrushevski Systems: інтеграції від 10 000 грн, Telegram-бот від 25 000 грн, AI-асистент від 60 000 грн, CRM від 200 000 грн, супровід від 8 000 грн/міс.",
    ru: "Цены Hrushevski Systems: интеграции от 10 000 грн, Telegram-бот от 25 000 грн, AI-ассистент от 60 000 грн, CRM от 200 000 грн, сопровождение от 8 000 грн/мес.",
  },
};

const groups: { title: L; ids: PackageId[] }[] = [
  { title: { uk: "Почати", ru: "Начать" }, ids: ["diagnostic", "audit"] },
  { title: { uk: "Швидкі проєкти", ru: "Быстрые проекты" }, ids: ["integration", "bot", "automation"] },
  { title: { uk: "AI", ru: "AI" }, ids: ["ai-assistant", "ai-teams"] },
  { title: { uk: "Системи", ru: "Системы" }, ids: ["crm", "mvp"] },
  { title: { uk: "Щомісяця", ru: "Ежемесячно" }, ids: ["support", "leadgen"] },
];

const faq: FaqItem[] = [
  {
    q: { uk: "Чому ціна «від»?", ru: "Почему цена «от»?" },
    a: {
      uk: "Ціна «від» — для типового обсягу, описаного в пакеті. Якщо потрібні додаткові інтеграції чи сценарії, називаємо точну суму після діагностики і фіксуємо її в договорі до початку робіт.",
      ru: "Цена «от» — для типового объёма, описанного в пакете. Если нужны дополнительные интеграции или сценарии, называем точную сумму после диагностики и фиксируем её в договоре до начала работ.",
    },
  },
  {
    q: { uk: "Як відбувається оплата?", ru: "Как происходит оплата?" },
    a: {
      uk: "Поетапно: передоплата за перший етап, далі — після приймання кожного етапу. Для проєктів до 30 000 грн можливі 50% передоплати і 50% після запуску.",
      ru: "Поэтапно: предоплата за первый этап, дальше — после приёмки каждого этапа. Для проектов до 30 000 грн возможны 50% предоплаты и 50% после запуска.",
    },
  },
  {
    q: { uk: "Що не входить у ціну?", ru: "Что не входит в цену?" },
    a: {
      uk: "Сторонні платні сервіси: хостинг, платні API (наприклад, AI-моделі чи Viber), ліцензії. Ми заздалегідь називаємо їхню приблизну вартість на місяць, а рахунки оформлюються на вас.",
      ru: "Сторонние платные сервисы: хостинг, платные API (например, AI-модели или Viber), лицензии. Мы заранее называем их примерную стоимость в месяц, а счета оформляются на вас.",
    },
  },
  {
    q: { uk: "Чи можна оплатити проєкт з гранту?", ru: "Можно ли оплатить проект из гранта?" },
    a: {
      uk: "Так, якщо програма дозволяє витрати на цифровізацію чи програмне забезпечення. Підготуємо кошторис і документи в потрібному форматі.",
      ru: "Да, если программа разрешает расходы на цифровизацию или программное обеспечение. Подготовим смету и документы в нужном формате.",
    },
  },
];

export async function generateMetadata({ params }: PageProps<"/[lang]/pricing">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/pricing", title: `${copy.title[lang]} | Hrushevski Systems`, description: copy.meta[lang] });
}

export default async function PricingPage({ params }: PageProps<"/[lang]/pricing">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.nav.pricing[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/pricing") }])} />
      <PageHero
        crumbs={crumbs}
        title={copy.title[lang]}
        lead={copy.lead[lang]}
        actions={<ButtonLink href={href(lang, "/tools/bot-cost-calculator")}>{ui.cta.calculate[lang]}</ButtonLink>}
      />
      {groups.map((g, gi) => (
        <Section key={g.title.uk} className={gi % 2 ? "border-t border-line bg-sunken" : gi ? "border-t border-line" : ""}>
          <Eyebrow>{g.title[lang]}</Eyebrow>
          <div className={`mt-6 grid gap-4 ${g.ids.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
            {g.ids.map((id) => {
              const p = getPackage(id);
              return (
                <div key={id} id={id} className="flex scroll-mt-24 flex-col gap-4 rounded-lg border border-line bg-surface p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-[19px] font-semibold">{p.title[lang]}</h2>
                    <span className="font-mono text-[12px] text-muted">{p.duration[lang]}</span>
                  </div>
                  <Price value={p.priceFrom} unit={p.unit[lang]} lang={lang} className="text-[24px]" />
                  <p className="text-[14.5px] leading-[1.55] text-muted">{p.summary[lang]}</p>
                  <div className="border-t border-line pt-4">
                    <CheckList items={p.includes[lang]} />
                  </div>
                  {p.service && (
                    <Link href={href(lang, `/services/${p.service}`)} className="mt-auto pt-2 text-[14px] font-semibold text-accent hover:underline">
                      {ui.cta.more[lang]} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      ))}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>{ui.labels.faq[lang]}</H2>
          </div>
          <Faq items={faq} lang={lang} />
        </div>
      </Section>
    </>
  );
}
