"use client";

import { useMemo, useState } from "react";
import { formatUAH, type L, type Locale } from "@/lib/i18n";
import { PREFILL_EVENT, track } from "@/lib/track";

type Opt = { id: string; label: L; price: number };

// Prices are add-ons on top of the "bot" package base (content/pricing.ts: 25 000 грн).
const BASE = 25000;

const channels: Opt[] = [
  { id: "telegram", label: { uk: "Telegram", ru: "Telegram" }, price: 0 },
  { id: "viber", label: { uk: "Viber", ru: "Viber" }, price: 6000 },
  { id: "web", label: { uk: "Віджет на сайті / Instagram", ru: "Виджет на сайте / Instagram" }, price: 10000 },
];

const sizes: Opt[] = [
  { id: "s", label: { uk: "1–3 сценарії (заявка, FAQ, контакти)", ru: "1–3 сценария (заявка, FAQ, контакты)" }, price: 0 },
  { id: "m", label: { uk: "4–8 сценаріїв (запис, замовлення, статуси)", ru: "4–8 сценариев (запись, заказы, статусы)" }, price: 12000 },
  { id: "l", label: { uk: "9+ сценаріїв, ролі, кабінет клієнта", ru: "9+ сценариев, роли, кабинет клиента" }, price: 30000 },
];

const integrations: Opt[] = [
  { id: "sheets", label: { uk: "Google Sheets", ru: "Google Sheets" }, price: 3000 },
  { id: "crm", label: { uk: "CRM (KeyCRM, Bitrix24, власна)", ru: "CRM (KeyCRM, Bitrix24, своя)" }, price: 8000 },
  { id: "pay", label: { uk: "Оплата (monobank, LiqPay, WayForPay)", ru: "Оплата (monobank, LiqPay, WayForPay)" }, price: 8000 },
  { id: "np", label: { uk: "Нова Пошта (ТТН, статуси)", ru: "Новая Почта (ТТН, статусы)" }, price: 8000 },
  { id: "checkbox", label: { uk: "Checkbox (фіскальні чеки)", ru: "Checkbox (фискальные чеки)" }, price: 8000 },
  { id: "erp", label: { uk: "Облікова система / 1С / BAS", ru: "Учётная система / 1С / BAS" }, price: 15000 },
];

const ai: Opt[] = [
  { id: "none", label: { uk: "Без AI — кнопки й сценарії", ru: "Без AI — кнопки и сценарии" }, price: 0 },
  { id: "faq", label: { uk: "AI відповідає на питання з бази знань", ru: "AI отвечает на вопросы из базы знаний" }, price: 20000 },
  { id: "agent", label: { uk: "AI-асистент: розуміє замовлення, веде діалог", ru: "AI-ассистент: понимает заказы, ведёт диалог" }, price: 40000 },
];

const extras: Opt[] = [
  { id: "admin", label: { uk: "Адмінка: змінювати тексти, ціни, розклад", ru: "Админка: менять тексты, цены, расписание" }, price: 10000 },
  { id: "lang", label: { uk: "Друга мова інтерфейсу", ru: "Второй язык интерфейса" }, price: 4000 },
  { id: "broadcast", label: { uk: "Розсилки й нагадування", ru: "Рассылки и напоминания" }, price: 6000 },
];

const t = {
  channels: { uk: "Канали", ru: "Каналы" },
  size: { uk: "Обсяг", ru: "Объём" },
  integrations: { uk: "Інтеграції", ru: "Интеграции" },
  ai: { uk: "Штучний інтелект", ru: "Искусственный интеллект" },
  extras: { uk: "Додатково", ru: "Дополнительно" },
  result: { uk: "Орієнтовна вартість", ru: "Ориентировочная стоимость" },
  timing: { uk: "Термін", ru: "Срок" },
  support: { uk: "Супровід після запуску — від 8 000 грн/міс, за бажанням.", ru: "Сопровождение после запуска — от 8 000 грн/мес, по желанию." },
  disclaimer: {
    uk: "Це орієнтир для типового обсягу. Точну ціну фіксуємо в договорі після 30-хвилинної діагностики.",
    ru: "Это ориентир для типового объёма. Точную цену фиксируем в договоре после 30-минутной диагностики.",
  },
  send: { uk: "Надіслати розрахунок", ru: "Отправить расчёт" },
  weeks: {
    s: { uk: "1–2 тижні", ru: "1–2 недели" },
    m: { uk: "2–4 тижні", ru: "2–4 недели" },
    l: { uk: "4–6 тижнів", ru: "4–6 недель" },
  },
  messagePrefix: { uk: "Розрахунок з калькулятора бота", ru: "Расчёт из калькулятора бота" },
};

const round = (n: number) => Math.round(n / 1000) * 1000;

const box = "rounded-md border px-4 py-3 text-[14.5px] leading-snug transition-colors cursor-pointer";
const on = "border-accent bg-accent-soft text-ink";
const off = "border-line-strong bg-surface text-ink hover:border-ink";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-2.5">
      <legend className="mb-2.5 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">{title}</legend>
      {children}
    </fieldset>
  );
}

function Check({
  o,
  lang,
  checked,
  onChange,
  type = "checkbox",
  name,
}: {
  o: Opt;
  lang: Locale;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
  name: string;
}) {
  return (
    <label className={`${box} ${checked ? on : off} flex items-center justify-between gap-4`}>
      <span className="flex items-center gap-3">
        <input type={type} name={name} id={`calc-${name}-${o.id}`} checked={checked} onChange={onChange} className="accent-[var(--accent)]" />
        {o.label[lang]}
      </span>
      <span className="flex-none font-mono text-[12.5px] text-muted">{o.price ? `+${formatUAH(o.price, lang)}` : ""}</span>
    </label>
  );
}

export default function BotCalculator({ lang }: { lang: Locale }) {
  const [ch, setCh] = useState<string[]>(["telegram"]);
  const [size, setSize] = useState("m");
  const [ints, setInts] = useState<string[]>(["crm"]);
  const [aiLevel, setAi] = useState("none");
  const [ex, setEx] = useState<string[]>(["admin"]);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const { low, high, weeks, lines } = useMemo(() => {
    const picked = [
      ...channels.filter((o) => ch.includes(o.id)),
      ...sizes.filter((o) => o.id === size),
      ...integrations.filter((o) => ints.includes(o.id)),
      ...ai.filter((o) => o.id === aiLevel),
      ...extras.filter((o) => ex.includes(o.id)),
    ];
    const sum = BASE + picked.reduce((a, o) => a + o.price, 0);
    const w = sum < 45000 ? t.weeks.s : sum < 85000 ? t.weeks.m : t.weeks.l;
    return {
      low: round(sum),
      high: round(sum * 1.35),
      weeks: w[lang],
      lines: picked.map((o) => o.label[lang]),
    };
  }, [ch, size, ints, aiLevel, ex, lang]);

  function send() {
    const message = `${t.messagePrefix[lang]}: ${formatUAH(low, lang)} – ${formatUAH(high, lang)}, ${weeks}.\n— ${lines.join("\n— ")}`;
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { message, topic: "bot-calculator" } }));
    track("calculator_submit", { low, high });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
      <div className="grid gap-8">
        <Group title={t.channels[lang]}>
          {channels.map((o) => (
            <Check key={o.id} o={o} lang={lang} name="channel" checked={ch.includes(o.id)} onChange={() => toggle(ch, setCh, o.id)} />
          ))}
        </Group>
        <Group title={t.size[lang]}>
          {sizes.map((o) => (
            <Check key={o.id} o={o} lang={lang} name="size" type="radio" checked={size === o.id} onChange={() => setSize(o.id)} />
          ))}
        </Group>
        <Group title={t.integrations[lang]}>
          {integrations.map((o) => (
            <Check key={o.id} o={o} lang={lang} name="integration" checked={ints.includes(o.id)} onChange={() => toggle(ints, setInts, o.id)} />
          ))}
        </Group>
        <Group title={t.ai[lang]}>
          {ai.map((o) => (
            <Check key={o.id} o={o} lang={lang} name="ai" type="radio" checked={aiLevel === o.id} onChange={() => setAi(o.id)} />
          ))}
        </Group>
        <Group title={t.extras[lang]}>
          {extras.map((o) => (
            <Check key={o.id} o={o} lang={lang} name="extra" checked={ex.includes(o.id)} onChange={() => toggle(ex, setEx, o.id)} />
          ))}
        </Group>
      </div>

      <aside className="rounded-lg border border-line bg-surface p-6 lg:sticky lg:top-24" aria-live="polite">
        <div className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">{t.result[lang]}</div>
        <div className="mt-2 font-mono text-[28px] font-medium leading-tight tabular-nums sm:text-[32px]">
          {formatUAH(low, lang)}
          <span className="text-muted"> – </span>
          <br className="sm:hidden" />
          {formatUAH(high, lang)}
        </div>
        <div className="mt-4 flex justify-between border-t border-line pt-4 text-[14.5px]">
          <span className="text-muted">{t.timing[lang]}</span>
          <span className="font-mono">{weeks}</span>
        </div>
        <ul className="mt-4 grid gap-1.5 border-t border-line pt-4 text-[13.5px] text-muted">
          {lines.map((l) => (
            <li key={l}>— {l}</li>
          ))}
        </ul>
        <p className="mt-4 text-[13.5px] leading-[1.5] text-muted">{t.support[lang]}</p>
        <button
          type="button"
          onClick={send}
          className="mt-5 w-full rounded-md bg-accent px-5 py-3 text-[15px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
        >
          {t.send[lang]}
        </button>
        <p className="mt-3 text-[12.5px] leading-[1.5] text-muted">{t.disclaimer[lang]}</p>
      </aside>
    </div>
  );
}
