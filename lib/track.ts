"use client";

/** Fired by tools (e.g. the bot calculator) to prefill the contact form. */
export const PREFILL_EVENT = "hs:prefill";
export type PrefillDetail = { message: string; topic: string };

type Gtag = (...args: unknown[]) => void;

/** Sends a GA4 event if the visitor consented and gtag is loaded; no-op otherwise. */
export function track(event: string, params: Record<string, string | number> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}
