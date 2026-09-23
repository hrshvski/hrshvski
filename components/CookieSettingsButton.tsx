"use client";

export const CONSENT_RESET_EVENT = "hs:consent-reset";

export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="hover:text-ink"
      onClick={() => window.dispatchEvent(new Event(CONSENT_RESET_EVENT))}
    >
      {label}
    </button>
  );
}
