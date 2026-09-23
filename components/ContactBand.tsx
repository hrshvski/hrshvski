import type { Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { ui } from "@/content/ui";
import ContactForm from "./ContactForm";
import { Container, Eyebrow, H2 } from "./ui";

export default function ContactBand({
  lang,
  topic,
  heading,
  text,
}: {
  lang: Locale;
  topic?: string;
  heading?: string;
  text?: string;
}) {
  const t = ui.form;
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line bg-sunken py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Eyebrow>{ui.nav.contact[lang]}</Eyebrow>
          <H2>{heading ?? t.heading[lang]}</H2>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-muted">{text ?? t.text[lang]}</p>
          <div className="mt-8 grid gap-3 text-[15px]">
            <div className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{t.orDirect[lang]}</div>
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" data-track="contact_telegram" className="font-semibold text-accent hover:underline">
              Telegram →
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
            <a href={SITE.phoneHref} className="font-mono tabular-nums hover:text-accent">{SITE.phone}</a>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface p-5 sm:p-8">
          <ContactForm lang={lang} topic={topic} />
        </div>
      </Container>
    </section>
  );
}
