import Link from "next/link";
import { Container } from "@/components/ui";

// Rendered inside [lang]/layout, but not-found has no params — show both languages.
export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="font-mono text-[13px] text-muted">404</div>
      <h1 className="mt-2 text-[34px] font-bold">Сторінку не знайдено</h1>
      <p className="mt-3 max-w-[50ch] text-muted">
        Можливо, її перенесли. Почніть з головної або перегляньте послуги. · Страница не найдена.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/uk" className="rounded-md bg-accent px-5 py-3 font-semibold text-accent-ink">
          На головну
        </Link>
        <Link href="/uk/services" className="rounded-md border border-line-strong px-5 py-3 font-semibold">
          Послуги
        </Link>
      </div>
    </Container>
  );
}
