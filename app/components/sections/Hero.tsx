import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "../Icon";
import PixelScene from "../PixelScene";
import { Panel, PixelBadge, PixelButton } from "../ui";

export default function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;

  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        {/* Left */}
        <div className="space-y-6">
          <PixelBadge>{hero.tag}</PixelBadge>

          <div>
            <h1 className="max-w-2xl text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <div className="mt-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {hero.badge}
            </div>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              {hero.text}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <PixelButton href="#контакт">{hero.primaryCta}</PixelButton>
            <PixelButton secondary href="#кейсы">
              {hero.secondaryCta}
            </PixelButton>
          </div>

          <div className="grid max-w-xl grid-cols-2 gap-3 pt-2">
            {hero.bullets.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 border-4 border-black bg-white px-3 py-3 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <Icon name="zap" className="h-4 w-4" />
                {item}
              </div>
            ))}
          </div>

          <Panel className="p-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider">
              <Icon name="github" className="h-4 w-4" />
              {hero.panelTitle}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {hero.panelText}
            </p>
          </Panel>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <PixelScene />
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { icon: "briefcase", label: "B2B" },
                { icon: "code", label: "API" },
                { icon: "rocket", label: "Scale" },
              ] as const
            ).map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-2 border-4 border-black bg-white px-3 py-4 text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
