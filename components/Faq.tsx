import type { Faq as FaqItem } from "@/lib/types";
import type { Locale } from "@/lib/i18n";
import { faqLd } from "@/lib/seo";
import { JsonLd } from "./ui";

export default function Faq({ items, lang }: { items: FaqItem[]; lang: Locale }) {
  if (!items.length) return null;
  const flat = items.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
  return (
    <div className="divide-y divide-line border-y border-line">
      <JsonLd data={faqLd(flat)} />
      {flat.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
            <h3>{f.q}</h3>
            <span aria-hidden className="mt-0.5 font-mono text-[18px] text-muted transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[70ch] pb-5 text-[15.5px] leading-[1.65] text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
