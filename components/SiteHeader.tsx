"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { href, locales, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import Logo from "./Logo";

type NavLink = { slug: string; title: string };

export default function SiteHeader({
  lang,
  services,
  industries,
}: {
  lang: Locale;
  services: NavLink[];
  industries: NavLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const n = ui.nav;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Same page in the other language: swap the first path segment.
  const switchTo = (l: Locale) => pathname.replace(/^\/(uk|ru)(?=\/|$)/, `/${l}`);
  const isActive = (path: string) => pathname === href(lang, path) || pathname.startsWith(href(lang, path) + "/");

  const main = [
    { path: "/industries", label: n.industries[lang] },
    { path: "/products", label: n.products[lang] },
    { path: "/cases", label: n.cases[lang] },
    { path: "/pricing", label: n.pricing[lang] },
    { path: "/blog", label: n.blog[lang] },
    { path: "/about", label: n.about[lang] },
  ];

  const linkCls = (active: boolean) =>
    `rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors ${
      active ? "text-ink" : "text-muted hover:text-ink"
    }`;

  return (
    <>
    <header
      className="sticky z-40 border-b border-line bg-bg/90 backdrop-blur"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link href={href(lang)} aria-label="Hrushevski Systems" className="flex-none">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          <div className="group relative">
            <Link href={href(lang, "/services")} className={linkCls(isActive("/services"))}>
              {n.services[lang]} <span aria-hidden className="text-[11px]">▾</span>
            </Link>
            <div className="invisible absolute left-0 top-full w-[520px] pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-lg border border-line bg-surface p-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={href(lang, `/services/${s.slug}`)}
                    className="rounded-md px-3 py-2.5 text-[14px] hover:bg-sunken"
                  >
                    {s.title}
                  </Link>
                ))}
                <div className="col-span-2 mt-1 border-t border-line px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {n.industries[lang]}
                </div>
                {industries.map((s) => (
                  <Link
                    key={s.slug}
                    href={href(lang, `/industries/${s.slug}`)}
                    className="rounded-md px-3 py-2 text-[14px] text-muted hover:bg-sunken hover:text-ink"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {main.map((m) => (
            <Link key={m.path} href={href(lang, m.path)} className={linkCls(isActive(m.path))}>
              {m.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden font-mono text-[12.5px] sm:flex" aria-label="Language">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchTo(l)}
                hrefLang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`rounded px-2 py-1 uppercase ${l === lang ? "bg-sunken text-ink" : "text-muted hover:text-ink"}`}
              >
                {l === "uk" ? "UA" : "RU"}
              </Link>
            ))}
          </div>
          <Link
            href={`${pathname}#contact`}
            className="hidden rounded-md bg-accent px-4 py-2.5 text-[14px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            {ui.cta.discuss[lang]}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-md border border-line-strong px-3 py-2 text-[14px] font-medium lg:hidden"
          >
            {open ? n.close[lang] : n.menu[lang]}
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would become the containing block for `fixed`. */}
      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 z-40 top-[calc(4rem+env(safe-area-inset-top,0px))] overflow-y-auto border-t border-line bg-bg px-4 pb-10 pt-4 lg:hidden">
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{n.services[lang]}</div>
          <div className="mt-2 grid">
            {services.map((s) => (
              <Link key={s.slug} href={href(lang, `/services/${s.slug}`)} className="border-b border-line py-3 text-[16px]">
                {s.title}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid">
            {main.map((m) => (
              <Link key={m.path} href={href(lang, m.path)} className="border-b border-line py-3 text-[16px] font-medium">
                {m.label}
              </Link>
            ))}
            <Link href={href(lang, "/contact")} className="border-b border-line py-3 text-[16px] font-medium">
              {n.contact[lang]}
            </Link>
          </div>
          <div className="mt-6 flex gap-2 font-mono text-[13px]">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchTo(l)}
                hrefLang={l}
                className={`rounded border px-3 py-1.5 uppercase ${l === lang ? "border-ink" : "border-line text-muted"}`}
              >
                {l === "uk" ? "UA" : "RU"}
              </Link>
            ))}
          </div>
          <Link
            href={`${pathname}#contact`}
            onClick={() => setOpen(false)}
            className="mt-6 flex justify-center rounded-md bg-accent px-4 py-3 text-[15px] font-semibold text-accent-ink"
          >
            {ui.cta.discuss[lang]}
          </Link>
        </div>
      )}
    </>
  );
}
