import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, lang } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const text =
      `📬 *Нова заявка з hrshvski.com*\n\n` +
      `👤 *Ім'я:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `💬 *Задача:* ${message}\n\n` +
      `🌐 *Мова:* ${lang ?? "—"}`;

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("Telegram error:", err);
      return NextResponse.json({ error: "Telegram error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
