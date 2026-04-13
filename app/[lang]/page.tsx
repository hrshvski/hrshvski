import { notFound } from "next/navigation";
import Header from "@/app/components/sections/Header";
import Hero from "@/app/components/sections/Hero";
import Services from "@/app/components/sections/Services";
import Cases from "@/app/components/sections/Cases";
import Contact from "@/app/components/sections/Contact";
import Footer from "@/app/components/sections/Footer";
import { getDictionary, hasLocale, locales, type Locale } from "./dictionaries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangPage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-slate-900">
      <Header dict={dict} lang={lang as Locale} />
      <Hero dict={dict} />
      <Services dict={dict} />
      <Cases dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </div>
  );
}
