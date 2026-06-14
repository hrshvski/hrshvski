import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  const blocks = [
    { fill: "#1a1d23", border: "#4ade80" },
    { fill: "#14161a", border: "rgba(255,255,255,0.18)" },
    { fill: "#1a1d23", border: "rgba(255,255,255,0.18)" },
    { fill: "#14161a", border: "rgba(255,255,255,0.18)" },
    { fill: "#4ade80", border: "#4ade80", accent: true },
    { fill: "#14161a", border: "rgba(255,255,255,0.18)" },
    { fill: "#1a1d23", border: "rgba(255,255,255,0.18)" },
    { fill: "#14161a", border: "rgba(255,255,255,0.18)" },
    { fill: "#1a1d23", border: "#4ade80" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(74,222,128,0.35) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to bottom, #000, #000 16%, transparent 64%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000, #000 16%, transparent 64%)",
          animation: "dotdrift 7s linear infinite",
        }}
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-14 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-[72px]">
        {/* Left */}
        <div>
          <div className="mb-7 inline-flex items-center gap-2 border border-[#4ade80]/40 px-3 py-1.5 text-[11px] tracking-[0.18em] text-[#4ade80]">
            <span
              className="h-1.5 w-1.5 bg-[#4ade80]"
              style={{ animation: "blink 1.4s steps(1) infinite" }}
            />
            [ {hero.tag.toUpperCase()} ]
          </div>
          <h1 className="mb-[22px] text-[34px] font-extrabold leading-[1.02] tracking-[-0.02em] uppercase sm:text-[44px] lg:text-[52px]">
            {hero.title}
            <br />
            <span className="text-[#4ade80]">{hero.titleAccent}</span>
          </h1>
          <p className="mb-[30px] max-w-[470px] text-[15px] leading-[1.6] text-[#8a8f99]">
            {hero.text}
          </p>
          <div className="mb-[34px] flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#4ade80] px-[22px] py-[14px] text-[13px] font-bold text-[#06120a] transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.toUpperCase()} <span>→</span>
            </a>
            <a
              href="#cases"
              className="inline-flex items-center border border-white/18 px-[22px] py-[14px] text-[13px] font-medium text-[#e6e8ec] transition-colors hover:border-[#4ade80]/60"
            >
              {hero.secondaryCta.toUpperCase()}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {hero.bullets.map((item) => (
              <span
                key={item}
                className="border border-dashed border-white/14 px-2.5 py-1.5 text-[11px] text-[#565b66]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right — isometric block stack */}
        <div className="relative flex h-[420px] items-center justify-center">
          <div className="absolute right-2 top-2 text-[10px] tracking-[0.15em] text-[#565b66]">
            {hero.figLabel} ↘
          </div>
          <div style={{ perspective: "900px" }}>
            <div
              className="relative h-[240px] w-[240px]"
              style={{
                transformStyle: "preserve-3d",
                animation: "floaty 5s ease-in-out infinite",
              }}
            >
              {blocks.map((b, i) => (
                <div
                  key={i}
                  className="absolute h-[60px] w-[60px]"
                  style={{
                    left: `${(i % 3) * 60}px`,
                    top: `${Math.floor(i / 3) * 60}px`,
                    background: b.fill,
                    border: `1px solid ${b.border}`,
                    boxShadow: b.accent
                      ? undefined
                      : "0 0 0 1px rgba(74,222,128,0.04)",
                    opacity: b.accent ? 0.9 : 1,
                    animation: b.accent
                      ? "pulseb 2.4s ease-in-out infinite"
                      : undefined,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 text-[10px] text-[#565b66]">
            {hero.figCaption}
          </div>
        </div>
      </div>
    </section>
  );
}
