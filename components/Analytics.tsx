"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { CONSENT_RESET_EVENT } from "./CookieSettingsButton";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "ga-consent";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** GA4 behind a consent banner, plus click tracking for elements with data-track. */
export default function Analytics({
  text,
  accept,
  decline,
}: {
  text: string;
  accept: string;
  decline: string;
}) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);

    const reset = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      // Revoking after GA loaded: stop further collection for this page view.
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("consent", "update", { analytics_storage: "denied" });
      setConsent(null);
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track, { page: location.pathname });
    };
    window.addEventListener(CONSENT_RESET_EVENT, reset);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(CONSENT_RESET_EVENT, reset);
      document.removeEventListener("click", onClick);
    };
  }, []);

  function choose(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setConsent(value);
  }

  if (!GA_ID) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'default', { analytics_storage: 'granted' });
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed inset-x-3 z-50 mx-auto flex max-w-[640px] flex-col gap-3 rounded-lg border border-line bg-surface p-4 text-[13.5px] text-muted shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center"
          style={{ bottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
        >
          <span className="flex-1 leading-[1.5]">{text}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-md border border-line-strong px-3 py-2 text-[13px] font-semibold text-ink hover:border-ink"
            >
              {decline}
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-md bg-accent px-3 py-2 text-[13px] font-semibold text-accent-ink hover:bg-accent-hover"
            >
              {accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
