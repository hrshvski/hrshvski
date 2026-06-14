import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <section className="border-y border-dashed border-white/12 bg-black/25">
      <div className="mx-auto max-w-[1240px] px-5 pt-5 text-[11px] tracking-[0.2em] text-[#4ade80] sm:px-10">
        // {process.eyebrow}
      </div>
      <div className="mx-auto grid max-w-[1240px] gap-y-8 px-5 pb-8 pt-2 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
        {process.items.map((item, i) => (
          <div
            key={item.n}
            className={
              i < process.items.length - 1
                ? "px-0 lg:border-r lg:border-dashed lg:border-white/12 lg:px-6"
                : "px-0 lg:px-6"
            }
          >
            <div className="mb-2.5 text-[11px] text-[#4ade80]">[ {item.n} ]</div>
            <div className="mb-1.5 text-sm font-bold">{item.title}</div>
            <div className="text-[11px] leading-[1.5] text-[#8a8f99]">
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
