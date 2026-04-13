// Root layout — minimal shell required by Next.js App Router.
// Actual layout with <html>/<body> lives in app/[lang]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
