import type { ReactNode } from "react";
import { Breadcrumbs, Container, Eyebrow } from "./ui";

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  aside,
}: {
  crumbs: { name: string; href?: string }[];
  eyebrow?: ReactNode;
  title: string;
  lead?: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <Container className={`grid gap-10 pb-14 pt-8 ${aside ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14" : ""}`}>
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && <div className="mt-8"><Eyebrow>{eyebrow}</Eyebrow></div>}
          <h1 className={`${eyebrow ? "mt-3" : "mt-8"} max-w-[22ch] text-[34px] font-bold leading-[1.08] tracking-[-0.022em] sm:text-[46px]`}>
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-muted">{lead}</p>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside}
      </Container>
    </section>
  );
}
