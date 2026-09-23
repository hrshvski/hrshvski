import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ui } from "@/content/ui";
import Logo from "./Logo";
import { Container } from "./ui";
import CookieSettingsButton from "./CookieSettingsButton";

type NavLink = { slug: string; title: string };

export default function SiteFooter({
  lang,
  services,
  industries,
  products,
}: {
  lang: Locale;
  services: NavLink[];
  industries: NavLink[];
  products: NavLink[];
}) {
  const n = ui.nav;
  const col = "grid content-start gap-2.5 text-[14px]";
  const head = "mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted";
  const link = "text-ink/80 hover:text-accent";

  return (
    <footer className="border-t border-line bg-bg py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="grid content-start gap-4">
            <Logo />
            <p className="max-w-[34ch] text-[14px] leading-[1.55] text-muted">{ui.footer.tagline[lang]}</p>
            <div className="grid gap-1.5 text-[14px]">
              <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" data-track="contact_telegram" className="text-accent hover:underline">
                Telegram
              </a>
              <a href={`mailto:${SITE.email}`} className={link}>{SITE.email}</a>
              <a href={SITE.phoneHref} className={`font-mono tabular-nums ${link}`}>{SITE.phone}</a>
              <span className="text-muted">{SITE.city[lang]}</span>
            </div>
          </div>
          <div className={col}>
            <div className={head}>{n.services[lang]}</div>
            {services.map((s) => (
              <Link key={s.slug} href={href(lang, `/services/${s.slug}`)} className={link}>
                {s.title}
              </Link>
            ))}
          </div>
          <div className={col}>
            <div className={head}>{n.industries[lang]}</div>
            {industries.map((s) => (
              <Link key={s.slug} href={href(lang, `/industries/${s.slug}`)} className={link}>
                {s.title}
              </Link>
            ))}
            <div className={`${head} mt-4`}>{n.products[lang]}</div>
            {products.map((s) => (
              <Link key={s.slug} href={href(lang, `/products/${s.slug}`)} className={link}>
                {s.title}
              </Link>
            ))}
          </div>
          <div className={col}>
            <div className={head}>Hrushevski Systems</div>
            <Link href={href(lang, "/about")} className={link}>{n.about[lang]}</Link>
            <Link href={href(lang, "/cases")} className={link}>{n.cases[lang]}</Link>
            <Link href={href(lang, "/pricing")} className={link}>{n.pricing[lang]}</Link>
            <Link href={href(lang, "/tools/bot-cost-calculator")} className={link}>{n.tools[lang]}</Link>
            <Link href={href(lang, "/blog")} className={link}>{n.blog[lang]}</Link>
            <Link href={href(lang, "/contact")} className={link}>{n.contact[lang]}</Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Hrushevski Systems · {ui.footer.rights[lang]}</span>
          <div className="flex flex-wrap gap-4">
            <Link href={href(lang, "/privacy")} className="hover:text-ink">{ui.footer.privacy[lang]}</Link>
            <CookieSettingsButton label={ui.cookie.settings[lang]} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
