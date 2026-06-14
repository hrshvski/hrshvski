import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Services({ dict }: { dict: Dictionary }) {
  const { services } = dict;

  return (
    <section id="services" className="mx-auto max-w-[1240px] px-5 py-[72px] sm:px-10">
      <div className="mb-9 flex flex-wrap items-baseline gap-4">
        <span className="text-[11px] tracking-[0.2em] text-[#4ade80]">
          01 / {services.eyebrow}
        </span>
        <h2 className="text-[26px] font-extrabold tracking-[-0.01em] sm:text-[30px]">
          {services.heading}
        </h2>
      </div>
      <div className="grid border border-white/12 md:grid-cols-2 lg:grid-cols-4">
        {services.items.map((service, i) => (
          <div
            key={service.title}
            className={
              "p-[26px] " +
              (i < services.items.length - 1
                ? "border-b border-white/12 lg:border-b-0 lg:border-r"
                : "")
            }
          >
            <div className="mb-[18px] text-[22px] text-[#4ade80]">
              {service.glyph}
            </div>
            <div className="mb-2.5 text-[15px] font-bold">{service.title}</div>
            <div className="text-xs leading-[1.6] text-[#8a8f99]">
              {service.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
