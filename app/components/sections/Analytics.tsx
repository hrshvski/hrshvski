import type { Dictionary } from "@/app/[lang]/dictionaries";

const SALES = [70, 92, 84, 120, 104, 140, 128, 164];
const PROCUREMENT = [48, 60, 56, 80, 68, 96, 84, 104];

const SUPPLIERS = [
  { name: "Alfa Supply", sum: "₴1.2M", delta: "+6%", up: true },
  { name: "Beta Trade", sum: "₴840K", delta: "−3%", up: false },
  { name: "Gamma B2B", sum: "₴610K", delta: "+11%", up: true },
];

export default function Analytics({ dict }: { dict: Dictionary }) {
  const { analytics } = dict;

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-[72px] sm:px-10">
      <div className="mb-3.5 flex flex-wrap items-baseline gap-4">
        <span className="text-[11px] tracking-[0.2em] text-[#4ade80]">
          02 / {analytics.eyebrow}
        </span>
        <h2 className="text-[26px] font-extrabold tracking-[-0.01em] sm:text-[30px]">
          {analytics.heading}
        </h2>
      </div>
      <p className="mb-4 max-w-[560px] text-sm leading-[1.6] text-[#8a8f99]">
        {analytics.text}
      </p>
      <div className="mb-7 flex flex-wrap gap-2">
        {analytics.bullets.map((b) => (
          <span
            key={b}
            className="border border-[#4ade80]/30 bg-[#4ade80]/[0.06] px-[11px] py-1.5 text-[11px] text-[#cfe9d8]"
          >
            → {b}
          </span>
        ))}
      </div>

      <div className="grid border border-white/12 lg:grid-cols-[1.6fr_1fr]">
        {/* Chart */}
        <div className="border-b border-white/12 p-[26px] lg:border-b-0 lg:border-r">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-bold">{analytics.chartTitle}</span>
            <span className="flex gap-4 text-[10px] text-[#8a8f99]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-[#4ade80]" />
                {analytics.legendSales}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-[#2f3a33]" />
                {analytics.legendProcurement}
              </span>
            </span>
          </div>
          <div className="flex h-[180px] items-end gap-3.5 border-b border-white/12">
            {SALES.map((s, i) => (
              <div
                key={i}
                className="flex flex-1 items-end justify-center gap-[3px]"
              >
                <div
                  className="w-[11px] bg-[#4ade80]"
                  style={{ height: `${s}px` }}
                />
                <div
                  className="w-[11px] bg-[#2f3a33]"
                  style={{ height: `${PROCUREMENT[i]}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3.5 text-[9px] tracking-[0.05em] text-[#565b66]">
            {analytics.months.map((m) => (
              <span key={m} className="flex-1 text-center">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics + suppliers */}
        <div className="p-[26px]">
          <div className="mb-5 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {analytics.stats.map((stat) => (
              <div key={stat.label} className="bg-[#0a0b0e] p-4">
                <div className="mb-1.5 text-[10px] text-[#565b66]">
                  {stat.label}
                </div>
                <div
                  className={
                    "text-xl font-extrabold " +
                    (stat.value.startsWith("+") || stat.value.startsWith("−")
                      ? "text-[#4ade80]"
                      : "")
                  }
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mb-3 text-[10px] tracking-[0.15em] text-[#565b66]">
            {analytics.suppliersTitle}
          </div>
          {SUPPLIERS.map((s, i) => (
            <div
              key={s.name}
              className={
                "flex justify-between py-[7px] text-[11px] " +
                (i < SUPPLIERS.length - 1
                  ? "border-b border-dashed border-white/10"
                  : "")
              }
            >
              <span>{s.name}</span>
              <span className="text-[#8a8f99]">{s.sum}</span>
              <span className={s.up ? "text-[#4ade80]" : "text-[#f87171]"}>
                {s.delta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
