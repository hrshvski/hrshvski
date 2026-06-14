import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Cases({ dict }: { dict: Dictionary }) {
  const { cases } = dict;

  return (
    <section
      id="cases"
      className="mx-auto max-w-[1240px] px-5 pb-[72px] sm:px-10"
    >
      <div className="mb-9 flex flex-wrap items-baseline gap-4">
        <span className="text-[11px] tracking-[0.2em] text-[#4ade80]">
          03 / {cases.eyebrow}
        </span>
        <h2 className="text-[26px] font-extrabold tracking-[-0.01em] sm:text-[30px]">
          {cases.heading}
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {cases.items.map((item) => (
          <div
            key={item.title}
            className="border border-white/12 bg-white/[0.015] p-[26px]"
          >
            <div className="mb-3.5 text-[10px] tracking-[0.12em] text-[#565b66]">
              {item.industry}
            </div>
            <div className="text-[36px] font-extrabold tracking-[-0.03em] text-[#4ade80]">
              {item.result}
            </div>
            <div className="mb-5 mt-1 text-[11px] text-[#565b66]">
              {item.resultLabel}
            </div>
            <div className="mb-2 text-[15px] font-bold">{item.title}</div>
            <div className="text-xs leading-[1.6] text-[#8a8f99]">
              {item.text}
            </div>
            <div className="mt-3.5 border-t border-dashed border-white/12 pt-3.5 text-[11px] text-[#aeb3bd]">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
