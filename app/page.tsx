// This page is never rendered — proxy.ts redirects / to /[lang].
// It exists only to satisfy Next.js route requirements.
export default function RootPage() {
  return null;
}
