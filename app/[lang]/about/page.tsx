import { href, type L, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { ButtonLink, Eyebrow, ExternalButton, H2, JsonLd, Section, Tag } from "@/components/ui";

const copy = {
  title: { uk: "Про Hrushevski Systems", ru: "О Hrushevski Systems" },
  lead: {
    uk: "Команда, що будує системи автоматизації для українського бізнесу. Ми прийшли не з маркетингу, а з операційки: імпорт з Азії, дистрибуція продуктів для HoReCa, закупівлі, склад.",
    ru: "Команда, которая строит системы автоматизации для бизнеса в Украине. Мы пришли не из маркетинга, а из операционки: импорт из Азии, дистрибуция продуктов для HoReCa, закупки, склад.",
  },
  meta: {
    uk: "Hrushevski Systems — команда з Києва: AI-автоматизація, боти, інтеграції, CRM і облік для HoReCa, дистрибуції та сервісного бізнесу. Принципи роботи і стек.",
    ru: "Hrushevski Systems — команда из Киева: AI-автоматизация, боты, интеграции, CRM и учёт для HoReCa, дистрибуции и сервисного бизнеса. Принципы работы и стек.",
  },
  story: {
    uk: [
      "Ми довго працювали по інший бік: везли товар з Азії, будували дистрибуцію для HoReCa, вели закупівлі й склад. І бачили, як бізнес тоне в ручній роботі — замовлення у Viber, залишки в Excel, звіти, які хтось зводить у неділю ввечері.",
      "Тому Hrushevski Systems починає не з технології, а з процесу. Спершу рахуємо, скільки годин і гривень забирає рутина, і лише потім вирішуємо, що потрібно: бот, інтеграція, AI-асистент чи окрема облікова система.",
      "Те, що ми повторювали в проєктах, збираємо у власні продукти: Hrushevski ERP для HoReCa-дистриб’юторів і MorivaCRM для салонів краси.",
    ],
    ru: [
      "Мы долго работали по другую сторону: возили товар из Азии, строили дистрибуцию для HoReCa, вели закупки и склад. И видели, как бизнес тонет в ручной работе — заказы в Viber, остатки в Excel, отчёты, которые кто-то сводит в воскресенье вечером.",
      "Поэтому Hrushevski Systems начинает не с технологии, а с процесса. Сначала считаем, сколько часов и гривен отнимает рутина, и только потом решаем, что нужно: бот, интеграция, AI-ассистент или отдельная учётная система.",
      "То, что мы повторяли в проектах, собираем в собственные продукты: Hrushevski ERP для HoReCa-дистрибьюторов и MorivaCRM для салонов красоты.",
    ],
  } as L<string[]>,
  principlesHeading: { uk: "Як ми працюємо", ru: "Как мы работаем" },
  principles: [
    { t: { uk: "Ціни на сайті", ru: "Цены на сайте" }, d: { uk: "Пакети з ціною «від». Точну суму фіксуємо в договорі до початку робіт.", ru: "Пакеты с ценой «от». Точную сумму фиксируем в договоре до начала работ." } },
    { t: { uk: "Результат щотижня", ru: "Результат каждую неделю" }, d: { uk: "Показуємо робочу версію на ваших даних, а не звіт про «прогрес».", ru: "Показываем рабочую версию на ваших данных, а не отчёт о «прогрессе»." } },
    { t: { uk: "Код і дані — ваші", ru: "Код и данные — ваши" }, d: { uk: "Репозиторій, доступи й документацію передаємо після оплати.", ru: "Репозиторий, доступы и документацию передаём после оплаты." } },
    { t: { uk: "Чесні цифри", ru: "Честные цифры" }, d: { uk: "Не обіцяємо «+300% продажів». Рахуємо години й гривні, які система реально забирає з рутини.", ru: "Не обещаем «+300% продаж». Считаем часы и гривны, которые система реально забирает у рутины." } },
    { t: { uk: "Українською за замовчуванням", ru: "Украинский по умолчанию" }, d: { uk: "Інтерфейси для клієнтів — українською, як того вимагає закон.", ru: "Интерфейсы для клиентов — на украинском, как того требует закон." } },
    { t: { uk: "Підтримка після запуску", ru: "Поддержка после запуска" }, d: { uk: "30 днів гарантії, далі — супровід з щомісячним звітом.", ru: "30 дней гарантии, дальше — сопровождение с ежемесячным отчётом." } },
  ],
  stackHeading: { uk: "Стек", ru: "Стек" },
  stack: ["Python", "FastAPI", "NestJS", "Next.js", "PostgreSQL", "Redis", "Docker", "n8n", "Telegram Bot API", "Viber API", "OpenAI / Claude", "Cloudflare"],
  facts: [
    { k: { uk: "Місто", ru: "Город" }, v: { uk: "Київ, працюємо по всій Україні", ru: "Киев, работаем по всей Украине" } },
    { k: { uk: "Мови", ru: "Языки" }, v: { uk: "українська, російська, англійська", ru: "украинский, русский, английский" } },
    { k: { uk: "Договір", ru: "Договор" }, v: { uk: "поетапна оплата в гривнях", ru: "поэтапная оплата в гривнах" } },
  ],
};

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/about", title: copy.title[lang], description: copy.meta[lang] });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.nav.about[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/about") }])} />
      <PageHero
        crumbs={crumbs}
        title={copy.title[lang]}
        lead={copy.lead[lang]}
        actions={
          <>
            <ButtonLink href="#contact">{ui.cta.discuss[lang]}</ButtonLink>
            <ExternalButton href={SITE.telegram} onClickEvent="contact_telegram">{ui.cta.telegram[lang]}</ExternalButton>
          </>
        }
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="prose-site">
            {copy.story[lang].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="grid content-start gap-px overflow-hidden rounded-lg border border-line bg-line">
            {copy.facts.map((f) => (
              <div key={f.k.uk} className="bg-surface p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{f.k[lang]}</dt>
                <dd className="mt-1 text-[15.5px]">{f.v[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      <Section className="border-t border-line bg-sunken">
        <Eyebrow>{ui.nav.about[lang]}</Eyebrow>
        <H2>{copy.principlesHeading[lang]}</H2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {copy.principles.map((p) => (
            <div key={p.t.uk} className="bg-surface p-6">
              <h3 className="text-[17px] font-semibold">{p.t[lang]}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted">{p.d[lang]}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="border-t border-line">
        <Eyebrow>{copy.stackHeading[lang]}</Eyebrow>
        <div className="mt-5 flex flex-wrap gap-2">
          {copy.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
