import type { L } from "./i18n";

export type Faq = { q: L; a: L };
export type Step = { title: L; text: L };

/** Ids of packages defined in content/pricing.ts */
export type PackageId =
  | "diagnostic"
  | "audit"
  | "integration"
  | "bot"
  | "automation"
  | "ai-assistant"
  | "ai-teams"
  | "leadgen"
  | "crm"
  | "mvp"
  | "support";

export type Package = {
  id: PackageId;
  title: L;
  /** Starting price in UAH; 0 = free */
  priceFrom: number;
  /** e.g. "/ процес", "/ міс" — empty for one-off */
  unit: L;
  duration: L;
  summary: L;
  includes: L<string[]>;
  service?: string; // service slug it belongs to
};

export type Service = {
  slug: string;
  /** Short name for nav and cards */
  title: L;
  /** One line for cards (≤ 110 chars) */
  short: L;
  /** H1 containing the main search query */
  h1: L;
  /** 2–3 sentence direct answer: what, how much, how long */
  lead: L;
  packageId: PackageId;
  /** The system we build, as a left-to-right pipeline of 3–5 nodes */
  flow: L<string[]>;
  pains: L<string[]>;
  scenarios: { title: L; text: L }[];
  process: Step[];
  /** What the client gets at the end */
  deliverables: L<string[]>;
  stack: string[];
  faq: Faq[];
  industries: string[];
  cases: string[];
  metaTitle: L;
  metaDescription: L;
};

export type Industry = {
  slug: string;
  title: L;
  short: L;
  h1: L;
  lead: L;
  flow: L<string[]>;
  pains: L<string[]>;
  solutions: { title: L; text: L; service?: string }[];
  /** Systems/tools we integrate with in this industry */
  integrations: string[];
  product?: string;
  faq: Faq[];
  services: string[];
  cases: string[];
  metaTitle: L;
  metaDescription: L;
};

export type Product = {
  slug: string;
  name: string;
  title: L;
  short: L;
  h1: L;
  lead: L;
  status: L; // e.g. "Набираємо пілотних клієнтів"
  audience: L<string[]>;
  features: { title: L; text: L }[];
  /** Honest comparison rows: [criterion, us, alternative] */
  comparison?: { against: string; rows: L<[string, string, string][]> };
  pilot: L<string[]>; // what pilot clients get
  faq: Faq[];
  industry: string;
  metaTitle: L;
  metaDescription: L;
};

export type Case = {
  slug: string;
  title: L;
  client: L; // who, anonymised or own project
  kind: "client" | "own"; // own = internal product/tool
  industry: string;
  services: string[];
  summary: L;
  task: L<string[]>;
  solution: L<string[]>;
  /** Only facts we can stand behind */
  results: { value: string; label: L }[];
  stack: string[];
  metaTitle: L;
  metaDescription: L;
};

/** Blog body is a list of simple blocks so it stays typed and static. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export type Post = {
  slug: string;
  date: string; // ISO
  updated?: string;
  title: L;
  /** Shorter <title> when the headline is too long for search results */
  metaTitle?: L;
  description: L;
  /** 2–3 sentence answer shown first (for readers and AI search) */
  tldr: L;
  body: L<Block[]>;
  faq?: Faq[];
  related: { services: string[]; posts?: string[] };
  readingMinutes: number;
};
