import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import type { Case, Post, Service } from "@/lib/types";
import { getPackage } from "@/content/pricing";
import { ui } from "@/content/ui";
import { Price, Tag } from "./ui";

export function ServiceCard({ s, lang }: { s: Service; lang: Locale }) {
  const p = getPackage(s.packageId);
  return (
    <Link
      href={href(lang, `/services/${s.slug}`)}
      className="group flex flex-col justify-between gap-6 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
    >
      <div>
        <h3 className="text-[18px] font-semibold leading-snug group-hover:text-accent">{s.title[lang]}</h3>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">{s.short[lang]}</p>
      </div>
      <div className="flex items-end justify-between gap-3 border-t border-line pt-4 text-[13.5px]">
        <Price value={p.priceFrom} unit={p.unit[lang]} lang={lang} />
        <span className="font-mono text-[12px] text-muted">{p.duration[lang]}</span>
      </div>
    </Link>
  );
}

export function CaseCard({ c, lang }: { c: Case; lang: Locale }) {
  return (
    <Link
      href={href(lang, `/cases/${c.slug}`)}
      className="group flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex flex-wrap gap-2">
        <Tag tone={c.kind === "own" ? "signal" : "accent"}>
          {c.kind === "own" ? ui.labels.ownProject[lang] : ui.labels.clientProject[lang]}
        </Tag>
      </div>
      <h3 className="text-[18px] font-semibold leading-snug group-hover:text-accent">{c.title[lang]}</h3>
      <p className="text-[14.5px] leading-[1.55] text-muted">{c.summary[lang]}</p>
      {c.results.length > 0 && (
        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-4">
          {c.results.slice(0, 2).map((r) => (
            <div key={r.value}>
              <dt className="font-mono text-[20px] font-medium tabular-nums">{r.value}</dt>
              <dd className="text-[12.5px] leading-snug text-muted">{r.label[lang]}</dd>
            </div>
          ))}
        </dl>
      )}
    </Link>
  );
}

export function PostCard({ p, lang }: { p: Post; lang: Locale }) {
  const date = new Date(p.date).toLocaleDateString(lang === "uk" ? "uk-UA" : "ru-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Link
      href={href(lang, `/blog/${p.slug}`)}
      className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="font-mono text-[12px] text-muted">
        {date} · {p.readingMinutes} {ui.labels.minRead[lang]}
      </div>
      <h3 className="text-[19px] font-semibold leading-snug group-hover:text-accent">{p.title[lang]}</h3>
      <p className="text-[14.5px] leading-[1.55] text-muted">{p.description[lang]}</p>
    </Link>
  );
}
