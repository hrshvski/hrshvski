import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import type { Faq as FaqItem } from "@/lib/types";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import BotCalculator from "@/components/BotCalculator";
import Faq from "@/components/Faq";
import { Eyebrow, H2, JsonLd, Section } from "@/components/ui";

const copy = {
  title: { uk: "Калькулятор вартості телеграм бота", ru: "Калькулятор стоимости телеграм бота" },
  lead: {
    uk: "Оберіть канали, обсяг, інтеграції й AI — і побачите орієнтовну ціну та термін розробки бота для бізнесу. Розрахунок можна одразу надіслати нам.",
    ru: "Выберите каналы, объём, интеграции и AI — и увидите ориентировочную цену и срок разработки бота для бизнеса. Расчёт можно сразу отправить нам.",
  },
  meta: {
    uk: "Скільки коштує телеграм бот для бізнесу: порахуйте ціну й термін онлайн. Telegram, Viber, CRM, оплата, Нова Пошта, Checkbox, AI. Від 25 000 грн.",
    ru: "Сколько стоит телеграм бот для бизнеса: посчитайте цену и срок онлайн. Telegram, Viber, CRM, оплата, Новая Почта, Checkbox, AI. От 25 000 грн.",
  },
};

const faq: FaqItem[] = [
  {
    q: { uk: "Наскільки точний калькулятор?", ru: "Насколько точен калькулятор?" },
    a: {
      uk: "Він показує діапазон для типового обсягу кожної опції. Точну ціну називаємо після 30-хвилинної діагностики і фіксуємо в договорі до початку робіт.",
      ru: "Он показывает диапазон для типового объёма каждой опции. Точную цену называем после 30-минутной диагностики и фиксируем в договоре до начала работ.",
    },
  },
  {
    q: { uk: "Чому бот у студії дорожчий, ніж у фрилансера?", ru: "Почему бот в студии дороже, чем у фрилансера?" },
    a: {
      uk: "У ціну входять сценарій і тексти, інтеграції з вашими системами, адмінка, обробка помилок, документація і 30 днів гарантії. Простий бот на кнопках без інтеграцій справді можна зробити дешевше — і ми чесно скажемо, якщо вам достатньо такого.",
      ru: "В цену входят сценарий и тексты, интеграции с вашими системами, админка, обработка ошибок, документация и 30 дней гарантии. Простой бот на кнопках без интеграций действительно можно сделать дешевле — и мы честно скажем, если вам достаточно такого.",
    },
  },
  {
    q: { uk: "Які щомісячні витрати після запуску?", ru: "Какие ежемесячные расходы после запуска?" },
    a: {
      uk: "Хостинг (зазвичай кілька сотень гривень на місяць), платні API, якщо вони є (AI-моделі, Viber), і за бажанням наш супровід від 8 000 грн на місяць.",
      ru: "Хостинг (обычно несколько сотен гривен в месяц), платные API, если они есть (AI-модели, Viber), и по желанию наше сопровождение от 8 000 грн в месяц.",
    },
  },
];

export async function generateMetadata({ params }: PageProps<"/[lang]/tools/bot-cost-calculator">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/tools/bot-cost-calculator", title: `${copy.title[lang]} | Hrushevski Systems`, description: copy.meta[lang] });
}

export default async function CalculatorPage({ params }: PageProps<"/[lang]/tools/bot-cost-calculator">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: copy.title[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/tools/bot-cost-calculator") }])} />
      <PageHero crumbs={crumbs} title={copy.title[lang]} lead={copy.lead[lang]} />
      <Section>
        <BotCalculator lang={lang} />
      </Section>
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
