/** Wordmark: three nodes on a wire — the pipeline motif used across the site. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect x="1" y="1" width="30" height="30" rx="7" fill="var(--ink)" />
      <path d="M7 16h18" stroke="var(--bg)" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
      <circle cx="8" cy="16" r="2.6" fill="var(--bg)" />
      <circle cx="16" cy="16" r="2.6" fill="var(--bg)" />
      <circle cx="24" cy="16" r="3.2" fill="var(--accent)" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-8 w-8 flex-none" />
      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-[-0.01em]">Hrushevski</span>
        <span className="block font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">Systems</span>
      </span>
    </span>
  );
}
