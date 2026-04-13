import type { Dictionary } from "@/app/[lang]/dictionaries";
import { PixelButton } from "../ui";

export default function Footer({ dict }: { dict: Dictionary }) {
  const { footer } = dict;

  return (
    <footer className="bg-slate-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left */}
          <div className="border-4 border-white bg-white/10 p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)] backdrop-blur">
            <div className="text-xs font-black uppercase tracking-[0.3em] text-lime-300">
              {footer.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-black uppercase sm:text-4xl">
              {footer.heading}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
              {footer.text}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PixelButton href="#контакт">{footer.primaryCta}</PixelButton>
              <PixelButton secondary href="#услуги">
                {footer.secondaryCta}
              </PixelButton>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4 border-4 border-white bg-white/5 p-6">
            <div className="text-sm font-black uppercase tracking-wider">
              {footer.structureTitle}
            </div>
            {footer.structure.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border-2 border-white/30 px-3 py-3 text-sm"
              >
                <div className="h-3 w-3 border border-white bg-lime-300 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t-2 border-white/20 pt-6 text-center text-xs text-white/40 uppercase tracking-widest">
          © {new Date().getFullYear()} {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
