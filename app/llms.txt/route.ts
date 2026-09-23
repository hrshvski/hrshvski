import { cases, getPackage, industries, packages, posts, products, services } from "@/content";
import { formatUAH, href } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

// https://llmstxt.org — a plain summary of the site for AI assistants and search.
export function GET() {
  const u = (path: string) => `${SITE.url}${href("uk", path)}`;
  const price = (n: number) => (n === 0 ? "безкоштовно" : `від ${formatUAH(n, "uk")}`);

  const lines = [
    `# ${SITE.name}`,
    "",
    "> Київська команда: AI-автоматизація, Telegram- і Viber-боти, AI-асистенти, інтеграції (Нова Пошта, monobank, Checkbox, Prom, Rozetka, Poster), CRM та облік на заміну 1С/BAS для малого й середнього бізнесу України. Фокус: HoReCa, дистрибуція продуктів, салони краси. Ціни відкриті.",
    "",
    `Контакти: ${SITE.email}, ${SITE.phone}, Telegram ${SITE.telegram}. Мови сайту: українська (/uk), російська (/ru).`,
    "",
    "## Послуги",
    ...services.map((s) => {
      const p = getPackage(s.packageId);
      return `- [${s.title.uk}](${u(`/services/${s.slug}`)}): ${s.short.uk} Ціна ${price(p.priceFrom)}${p.unit.uk ? " " + p.unit.uk : ""}, термін ${p.duration.uk}.`;
    }),
    "",
    "## Галузі",
    ...industries.map((i) => `- [${i.title.uk}](${u(`/industries/${i.slug}`)}): ${i.short.uk}`),
    "",
    "## Продукти",
    ...products.map((p) => `- [${p.name}](${u(`/products/${p.slug}`)}): ${p.short.uk} Статус: ${p.status.uk}.`),
    "",
    "## Ціни",
    ...packages.map((p) => `- ${p.title.uk}: ${price(p.priceFrom)}${p.unit.uk ? " " + p.unit.uk : ""}, ${p.duration.uk}`),
    `- Повний прайс: ${u("/pricing")}`,
    `- Калькулятор вартості бота: ${u("/tools/bot-cost-calculator")}`,
    "",
    "## Кейси",
    ...cases.map((c) => `- [${c.title.uk}](${u(`/cases/${c.slug}`)}): ${c.summary.uk}`),
    "",
    "## Статті",
    ...posts.map((p) => `- [${p.title.uk}](${u(`/blog/${p.slug}`)}): ${p.description.uk}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
