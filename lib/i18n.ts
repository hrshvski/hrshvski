export const locales = ["uk", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A value translated into every site locale. */
export type L<T = string> = Record<Locale, T>;

export const htmlLang: Record<Locale, string> = { uk: "uk", ru: "ru" };
export const hreflang: Record<Locale, string> = { uk: "uk", ru: "ru-UA" };
export const ogLocale: Record<Locale, string> = { uk: "uk_UA", ru: "ru_UA" };

/** Localised URL for a site path ("/" or "/services/x"). */
export function href(lang: Locale, path = "/") {
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

export function formatUAH(value: number, lang: Locale) {
  const n = new Intl.NumberFormat(lang === "uk" ? "uk-UA" : "ru-UA").format(value);
  return `${n} грн`;
}
