import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const LIMITS = { name: 120, contact: 200, message: 4000, meta: 200 } as const;

// Telegram HTML mode only needs these three escaped; user input can then
// contain `_`, `*`, backticks etc. without breaking the message.
function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Contact form: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field.
  if (field(body.company_site, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body.name, LIMITS.name);
  // `contact` is phone / Telegram / email; `email` is accepted for older clients.
  const contact = field(body.contact ?? body.email, LIMITS.contact);
  const message = field(body.message, LIMITS.message);
  const lang = field(body.lang, 8) || "—";
  const page = field(body.page, LIMITS.meta);
  const topic = field(body.topic, LIMITS.meta);

  if (!name || !contact || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const lines = [
    "📬 <b>Нова заявка з hrshvski.com</b>",
    "",
    `👤 <b>Ім'я:</b> ${esc(name)}`,
    `📞 <b>Контакт:</b> ${esc(contact)}`,
    topic ? `🧩 <b>Послуга:</b> ${esc(topic)}` : null,
    `💬 <b>Задача:</b>\n${esc(message)}`,
    "",
    `🌐 <b>Мова:</b> ${esc(lang)}`,
    page ? `📄 <b>Сторінка:</b> ${esc(page)}` : null,
  ];

  const text = lines.filter((l) => l !== null).join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram error:", res.status, err);
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact form:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
