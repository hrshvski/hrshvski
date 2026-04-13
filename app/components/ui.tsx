import Icon from "./Icon";

export function PixelBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 border-4 border-black bg-lime-300 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <Icon name="sparkles" className="h-4 w-4" />
      {children}
    </div>
  );
}

export function PixelButton({
  children,
  secondary = false,
  href,
  disabled = false,
}: {
  children: React.ReactNode;
  secondary?: boolean;
  href?: string;
  disabled?: boolean;
}) {
  const cls = `inline-block rounded-none border-4 border-black px-5 py-3 text-sm font-bold uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${
    secondary ? "bg-white text-black" : "bg-lime-300 text-black"
  }`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type="submit" className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${className}`}
    >
      {children}
    </div>
  );
}
