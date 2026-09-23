import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { sortedPosts } from "@/content";
import { ui } from "@/content/ui";
import PageHero from "@/components/PageHero";
import { PostCard } from "@/components/Cards";
import { JsonLd, Section } from "@/components/ui";

const copy = {
  title: { uk: "Блог про автоматизацію бізнесу", ru: "Блог об автоматизации бизнеса" },
  lead: {
    uk: "Скільки коштують боти й CRM, чим замінити 1С/BAS, як впровадити AI без хаосу. Пишемо з цифрами і без води.",
    ru: "Сколько стоят боты и CRM, чем заменить 1С/BAS, как внедрить AI без хаоса. Пишем с цифрами и без воды.",
  },
  meta: {
    uk: "Статті Hrushevski Systems: ціни на телеграм ботів, заміна 1С і BAS, впровадження AI, інтеграції та автоматизація для малого й середнього бізнесу.",
    ru: "Статьи Hrushevski Systems: цены на телеграм ботов, замена 1С и BAS, внедрение AI, интеграции и автоматизация для малого и среднего бизнеса.",
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">) {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/blog", title: `${copy.title[lang]} | Hrushevski Systems`, description: copy.meta[lang] });
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const lang = (await params).lang as Locale;
  const crumbs = [{ name: ui.nav.home[lang], href: href(lang) }, { name: ui.nav.blog[lang] }];
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: crumbs[0].name, path: href(lang) }, { name: crumbs[1].name, path: href(lang, "/blog") }])} />
      <PageHero crumbs={crumbs} title={copy.title[lang]} lead={copy.lead[lang]} />
      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {sortedPosts().map((p) => (
            <PostCard key={p.slug} p={p} lang={lang} />
          ))}
        </div>
      </Section>
    </>
  );
}
