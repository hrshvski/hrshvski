import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "../Icon";
import { Panel } from "../ui";

export default function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;

  return (
    <section id="услуги" className="border-y-4 border-black bg-[#e8e1cf] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-700">
            {services.eyebrow}
          </div>
          <h2 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
            {services.heading}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.items.map((service) => (
            <Panel key={service.title} className="p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center border-4 border-black bg-lime-300">
                <Icon name={service.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black uppercase">{service.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {service.text}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}
