import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "../Icon";
import { Panel } from "../ui";

export default function Cases({ dict }: { dict: Dictionary }) {
  const { cases } = dict;

  return (
    <section id="кейсы" className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-700">
              {cases.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
              {cases.heading}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-700">
            {cases.description}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {cases.items.map((item) => (
            <Panel key={item.title} className="p-5">
              <div className="inline-block border-2 border-black bg-lime-300 px-2 py-1 text-xs font-black uppercase tracking-wider">
                {item.result}
              </div>
              <h3 className="mt-4 text-xl font-black uppercase">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide"
              >
                {cases.more} <Icon name="chevron-right" className="h-4 w-4" />
              </button>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
