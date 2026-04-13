import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ru", "uk", "en"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "ru";

function getLocale(request: NextRequest): Locale {
  const acceptLang = request.headers.get("accept-language") ?? "";
  // Parse Accept-Language header and find best match
  const preferred = acceptLang
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2));

  for (const lang of preferred) {
    if (locales.includes(lang as Locale)) {
      return lang as Locale;
    }
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip if pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
