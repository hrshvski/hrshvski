"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "ga-consent";

type Consent = "granted" | "denied";

export default function GoogleAnalytics({
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
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setReady(true);
  }, []);

  function choose(value: Consent) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!GA_ID) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[640px] flex-col gap-3 border border-white/20 bg-[#0b0e12]/95 p-4 text-[12px] text-[#8a8f99] backdrop-blur sm:flex-row sm:items-center">
          <span className="flex-1 leading-[1.5]">{text}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="border border-white/18 px-3 py-2 text-[11px] font-bold text-[#e6e8ec] transition-colors hover:border-white/40"
            >
              {decline}
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="bg-[#4ade80] px-3 py-2 text-[11px] font-bold text-[#06120a] transition-transform hover:-translate-y-0.5"
            >
              {accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
