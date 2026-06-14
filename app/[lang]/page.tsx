import { notFound } from "next/navigation";
import Header from "@/app/components/sections/Header";
import Hero from "@/app/components/sections/Hero";
import Process from "@/app/components/sections/Process";
import Services from "@/app/components/sections/Services";
import Analytics from "@/app/components/sections/Analytics";
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
    <div
      className="min-h-screen bg-[#0a0b0e] text-[#e6e8ec]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      <Header dict={dict} lang={lang as Locale} />
      <Hero dict={dict} />
      <Process dict={dict} />
      <Services dict={dict} />
      <Analytics dict={dict} />
      <Cases dict={dict} />
      <Contact dict={dict} lang={lang} />
      <Footer dict={dict} />
    </div>
  );
}
