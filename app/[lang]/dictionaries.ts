import "server-only";

const dictionaries = {
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
  uk: () => import("@/dictionaries/uk.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ["en", "uk", "ru"];
export const defaultLocale: Locale = "ru";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
