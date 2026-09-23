import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const sans = Onest({ subsets: ["latin", "cyrillic"], weight: ["400", "700"], variable: "--font-onest" });

export const metadata: Metadata = {
  title: "404 — Hrushevski Systems",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="uk" className={sans.variable}>
      <body className="grid min-h-screen place-items-center px-4">
        <div className="max-w-md">
          <div className="font-mono text-[13px] text-muted">404</div>
          <h1 className="mt-2 text-[32px] font-bold">Сторінку не знайдено</h1>
          <p className="mt-3 text-muted">Можливо, її перенесли. Почніть з головної.</p>
          <a href="/uk" className="mt-6 inline-flex rounded-md bg-accent px-5 py-3 font-semibold text-accent-ink">
            На головну
          </a>
        </div>
      </body>
    </html>
  );
}
