"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useState } from "react";

const EMAIL = "office@hrshvski.com";
const PHONE = "+380 63 964 08 48";

export default function Contact({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { contact } = dict;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      lang,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("error");
      setSent(true);
    } catch {
      setError(contact.errorText ?? "Error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fieldCls =
    "w-full border border-white/14 bg-transparent px-4 py-3.5 text-[13px] text-[#e6e8ec] outline-none transition-colors placeholder:text-[#565b66] focus:border-[#4ade80]/60";

  return (
    <section
      id="contact"
      className="border-t border-dashed border-white/12 bg-black/30"
    >
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-[72px] sm:px-10 lg:grid-cols-2">
        {/* Left */}
        <div>
          <span className="text-[11px] tracking-[0.2em] text-[#4ade80]">
            04 / {contact.eyebrow}
          </span>
          <h2 className="mb-[18px] mt-3.5 text-[28px] font-extrabold tracking-[-0.01em] sm:text-[34px]">
            {contact.heading}
          </h2>
          <p className="mb-7 max-w-[380px] text-sm leading-[1.6] text-[#8a8f99]">
            {contact.text}
          </p>
          <div className="mb-2 text-sm text-[#e6e8ec]">
            →{" "}
            <a className="hover:text-[#4ade80]" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
          <div className="text-sm text-[#e6e8ec]">
            →{" "}
            <a
              className="hover:text-[#4ade80]"
              href={`tel:${PHONE.replace(/\s/g, "")}`}
            >
              {PHONE}
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 border border-[#4ade80]/40 bg-[#4ade80]/[0.04] p-10 text-center">
              <div className="text-[15px] font-bold text-[#4ade80]">
                {contact.successTitle}
              </div>
              <p className="text-[13px] text-[#8a8f99]">{contact.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={contact.namePlaceholder}
                className={fieldCls}
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={contact.emailPlaceholder}
                className={fieldCls}
              />
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder={contact.messagePlaceholder}
                className={`${fieldCls} resize-none`}
              />
              {error && (
                <p className="text-xs font-bold text-[#f87171]">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4ade80] py-[15px] text-center text-[13px] font-bold text-[#06120a] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? "..." : `${contact.submit} →`}
              </button>
              <div className="mt-1 flex items-center gap-2 text-[11px] leading-[1.5] text-[#8a8f99]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4ade80]" />
                {contact.note}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
