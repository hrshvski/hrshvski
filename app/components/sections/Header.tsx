import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { locales } from "@/app/[lang]/dictionaries";

export default function Header({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const navAnchors: { key: keyof Dictionary["nav"]; anchor: string }[] = [
    { key: "services", anchor: "#services" },
    { key: "cases", anchor: "#cases" },
    { key: "contact", anchor: "#contact" },
  ];

  return (
    <header className="border-b border-dashed border-white/12">
      <div className="mx-auto flex max-w-[1240px] items-center gap-6 px-5 py-5 sm:px-10">
        <a href={`/${lang}`} className="flex items-center gap-2.5">
          <span className="grid grid-cols-2 grid-rows-2 gap-[2px]">
            <span className="h-[7px] w-[7px] bg-[#4ade80]" />
            <span className="h-[7px] w-[7px] bg-[#2b3a2f]" />
            <span className="h-[7px] w-[7px] bg-[#2b3a2f]" />
            <span className="h-[7px] w-[7px] bg-[#4ade80]" />
          </span>
          <span className="text-sm font-extrabold tracking-[0.04em]">
            HRUSHEVSKI SYSTEMS
          </span>
          <span className="hidden text-[11px] text-[#565b66] sm:inline">
            / hrshvski.com
          </span>
        </a>

        <nav className="ml-auto hidden gap-[22px] text-xs text-[#8a8f99] sm:flex">
          {navAnchors.map(({ key, anchor }) => (
            <a
              key={key}
              href={anchor}
              className="transition-colors hover:text-[#4ade80]"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex gap-1.5 text-[11px] sm:ml-0">
          {locales.map((locale) => (
            <a
              key={locale}
              href={`/${locale}`}
              className={
                locale === lang
                  ? "border border-[#4ade80]/40 px-[7px] py-[3px] text-[#4ade80]"
                  : "border border-white/8 px-[7px] py-[3px] text-[#565b66] transition-colors hover:text-[#e6e8ec]"
              }
            >
              {dict.langSwitcher[locale]}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
