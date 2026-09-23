import { href, type L, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";

// TODO(legal): add the legal entity name and registration details (ФОП / ТОВ / LLC) once decided.
const sections: { h: L; p: L }[] = [
  {
    h: { uk: "Які дані ми збираємо", ru: "Какие данные мы собираем" },
    p: {
      uk: "Коли ви надсилаєте форму на сайті, ми отримуємо ім’я, контакт (телефон, Telegram або email), текст повідомлення, сторінку, з якої воно надіслане, і мову сайту. Інших персональних даних форма не збирає.",
      ru: "Когда вы отправляете форму на сайте, мы получаем имя, контакт (телефон, Telegram или email), текст сообщения, страницу, с которой оно отправлено, и язык сайта. Других персональных данных форма не собирает.",
    },
  },
  {
    h: { uk: "Навіщо", ru: "Зачем" },
    p: {
      uk: "Тільки щоб відповісти на ваш запит і підготувати пропозицію. Ми не продаємо і не передаємо ці дані третім особам для реклами.",
      ru: "Только чтобы ответить на ваш запрос и подготовить предложение. Мы не продаём и не передаём эти данные третьим лицам для рекламы.",
    },
  },
  {
    h: { uk: "Де зберігаються", ru: "Где хранятся" },
    p: {
      uk: "Заявка надходить у робочий чат компанії в Telegram. Зберігаємо листування, доки воно потрібне для співпраці, і видаляємо на ваш запит.",
      ru: "Заявка поступает в рабочий чат компании в Telegram. Храним переписку, пока она нужна для сотрудничества, и удаляем по вашему запросу.",
    },
  },
  {
    h: { uk: "Аналітика і cookie", ru: "Аналитика и cookie" },
    p: {
      uk: "Google Analytics вмикається лише після вашої згоди в банері. Змінити рішення можна будь-коли за посиланням «Налаштування cookie» внизу сторінки. IP-адреси анонімізуються.",
      ru: "Google Analytics включается только после вашего согласия в баннере. Изменить решение можно в любой момент по ссылке «Настройки cookie» внизу страницы. IP-адреса анонимизируются.",
    },
  },
  {
    h: { uk: "Ваші права", ru: "Ваши права" },
    p: {
      uk: `Ви можете дізнатися, які дані про вас ми маємо, виправити або видалити їх. Напишіть на ${SITE.email} — відповімо протягом 30 днів.`,
      ru: `Вы можете узнать, какие данные о вас у нас есть, исправить или удалить их. Напишите на ${SITE.email} — ответим в течение 30 дней.`,
    },
  },
];

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/privacy", title: `${ui.footer.privacy[lang]} | Hrushevski Systems`, description: sections[0].p[lang].slice(0, 150) });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.footer.privacy[lang] }];
  return (
    <>
      <PageHero crumbs={crumbs} title={ui.footer.privacy[lang]} />
      <Container className="py-12">
        <div className="prose-site">
          {sections.map((s) => (
            <section key={s.h.uk}>
              <h2>{s.h[lang]}</h2>
              <p>{s.p[lang]}</p>
            </section>
          ))}
          <p className="text-[14px] text-muted">{lang === "uk" ? "Редакція від 24 вересня 2026 року." : "Редакция от 24 сентября 2026 года."}</p>
        </div>
      </Container>
    </>
  );
}
