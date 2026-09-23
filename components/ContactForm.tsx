"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";
import { PREFILL_EVENT, track, type PrefillDetail } from "@/lib/track";

export default function ContactForm({ lang, topic }: { lang: Locale; topic?: string }) {
  const t = ui.form;
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [prefillTopic, setPrefillTopic] = useState<string | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { message, topic } = (e as CustomEvent<PrefillDetail>).detail;
      setState("idle");
      setPrefillTopic(topic);
      // Wait a frame in case the form is re-mounting after a previous "sent" state.
      requestAnimationFrame(() => {
        if (messageRef.current) messageRef.current.value = message;
      });
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      contact: String(fd.get("contact") ?? ""),
      message: String(fd.get("message") ?? ""),
      company_site: String(fd.get("company_site") ?? ""),
      topic: prefillTopic ?? topic ?? "",
      page: pathname,
      lang,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { page: pathname, topic: prefillTopic ?? topic ?? "general" });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-lg border border-ok bg-ok-soft p-8">
        <div className="text-[18px] font-semibold text-ok">{t.successTitle[lang]}</div>
        <p className="mt-2 text-[15px] text-ink">{t.successText[lang]}</p>
      </div>
    );
  }

  const field =
    "w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[13.5px] font-medium">
          {t.name[lang]}
          <input id="cf-name" name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="grid gap-1.5 text-[13.5px] font-medium">
          {t.contact[lang]}
          <input id="cf-contact" name="contact" required maxLength={200} autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-[13.5px] font-medium">
        {t.message[lang]}
        <textarea
          id="cf-message"
          ref={messageRef}
          name="message"
          required
          rows={4}
          maxLength={4000}
          placeholder={t.messageHint[lang]}
          className={`${field} resize-y`}
        />
      </label>
      <input
        name="company_site"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      {state === "error" && (
        <p role="alert" className="text-[14px] font-medium text-danger">
          {t.error[lang]}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-[15px] font-semibold text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {state === "sending" ? t.sending[lang] : t.submit[lang]}
        </button>
        <span className="text-[13px] text-muted">{t.note[lang]}</span>
      </div>
    </form>
  );
}
