import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { formatUAH, type Locale } from "@/lib/i18n";
import { ui } from "@/content/ui";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
      {children}
    </div>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.015em] sm:text-[36px] ${className}`}>
      {children}
    </h2>
  );
}

type ButtonProps = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" | "ghost" };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-accent text-accent-ink hover:bg-accent-hover",
    secondary: "border border-line-strong bg-surface text-ink hover:border-ink",
    ghost: "text-accent hover:underline underline-offset-4",
  }[variant];
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-colors ${styles} ${className}`}
    />
  );
}

export function ExternalButton({
  href,
  children,
  variant = "secondary",
  className = "",
  onClickEvent,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClickEvent?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:bg-accent-hover"
      : "border border-line-strong bg-surface text-ink hover:border-ink";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-track={onClickEvent}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function Price({
  value,
  unit,
  lang,
  className = "",
}: {
  value: number;
  unit?: string;
  lang: Locale;
  className?: string;
}) {
  if (value === 0) return <span className={`font-mono ${className}`}>{ui.labels.free[lang]}</span>;
  return (
    <span className={`font-mono tabular-nums ${className}`}>
      <span className="text-muted">{ui.labels.from[lang]} </span>
      {formatUAH(value, lang)}
      {unit ? <span className="text-muted"> {unit}</span> : null}
    </span>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12.5px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
                {it.name}
              </Link>
            ) : (
              <span className="text-ink">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" | "signal" | "ok" }) {
  const tones = {
    neutral: "border border-line text-muted",
    accent: "bg-accent-soft text-accent",
    signal: "bg-signal-soft text-signal",
    ok: "bg-ok-soft text-ok",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded px-2 py-1 font-mono text-[11.5px] font-medium ${tones}`}>
      {children}
    </span>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[15.5px] leading-[1.5]">
          <span aria-hidden className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
