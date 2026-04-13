import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { locales } from "@/app/[lang]/dictionaries";
import LogoIcon from "../LogoIcon";

export default function Header({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const navAnchors: { key: keyof Dictionary["nav"]; anchor: string }[] = [
    { key: "services", anchor: "#услуги" },
    { key: "cases", anchor: "#кейсы" },
    { key: "contact", anchor: "#контакт" },
  ];

  return (
    <header className="border-b-4 border-black bg-[#d9d2c0]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <a href={`/${lang}`}>
              <div className="text-lg font-black tracking-widest">
                Hrushevski AI Lab
              </div>
              <div className="text-xs tracking-[0.25em] text-slate-700">
                hrshvski.com
              </div>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden gap-6 sm:flex">
              {navAnchors.map(({ key, anchor }) => (
                <a
                  key={key}
                  href={anchor}
                  className="border-b-2 border-transparent text-sm font-bold uppercase tracking-wider hover:border-black transition-colors"
                >
                  {dict.nav[key]}
                </a>
              ))}
            </nav>

            {/* Language switcher */}
            <div className="flex gap-1">
              {locales.map((locale) => (
                <a
                  key={locale}
                  href={`/${locale}`}
                  className={`border-2 border-black px-2 py-1 text-xs font-black uppercase tracking-wider transition-colors ${
                    locale === lang
                      ? "bg-lime-300"
                      : "bg-white hover:bg-slate-100"
                  }`}
                >
                  {dict.langSwitcher[locale]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
