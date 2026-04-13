type IconName =
  | "blocks"
  | "sparkles"
  | "zap"
  | "github"
  | "briefcase"
  | "code"
  | "rocket"
  | "bot"
  | "flow"
  | "cpu"
  | "shield"
  | "chevron-right"
  | "mail"
  | "phone"
  | "shop";

const common = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: "2" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
};

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName | string;
  className?: string;
}) {
  const props = { ...common, className };

  switch (name) {
    case "blocks":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="8" height="8" />
          <rect x="13" y="3" width="8" height="8" />
          <rect x="8" y="13" width="8" height="8" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...props}>
          <path d="M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3z" />
          <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" />
        </svg>
      );
    case "zap":
      return (
        <svg {...props}>
          <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      );
    case "github":
      return (
        <svg {...props}>
          <path d="M9 19c-4 1.2-4-2-6-2" />
          <path d="M15 22v-3.1a3.2 3.2 0 0 0-.9-2.5c3-.3 6.1-1.5 6.1-6.8A5.3 5.3 0 0 0 18.8 6 4.9 4.9 0 0 0 18.7 2S17.5 1.7 15 3.4a13 13 0 0 0-6 0C6.5 1.7 5.3 2 5.3 2A4.9 4.9 0 0 0 5.2 6a5.3 5.3 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.8a3.2 3.2 0 0 0-.9 2.5V22" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5h8v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="M8 8l-4 4 4 4" />
          <path d="M16 8l4 4-4 4" />
          <path d="M14 4l-4 16" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M4 20l4-1 9-9a6 6 0 0 0-8-8L0 11l-1 4 5-5" />
          <path d="M14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" />
          <path d="M4 20l3-3" />
        </svg>
      );
    case "bot":
      return (
        <svg {...props}>
          <rect x="5" y="8" width="14" height="10" rx="2" />
          <path d="M12 4v4" />
          <circle cx="9" cy="13" r="1" />
          <circle cx="15" cy="13" r="1" />
          <path d="M9 17h6" />
        </svg>
      );
    case "flow":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="6" height="6" rx="1" />
          <rect x="15" y="4" width="6" height="6" rx="1" />
          <rect x="9" y="14" width="6" height="6" rx="1" />
          <path d="M9 7h6" />
          <path d="M12 10v4" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...props}>
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
          <path d="M9.5 12.5l1.7 1.7 3.3-3.7" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...props}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 8l10 6 10-6" />
        </svg>
      );
    case "shop":
      return (
        <svg {...props}>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
