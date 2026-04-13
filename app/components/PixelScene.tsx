"use client";

import { useMemo } from "react";

const GRID = ["▣", "▦", "▩", "▣", "▤", "▥", "▣", "▨"];
const ACCENT = "from-emerald-400/20 via-lime-300/10 to-slate-500/10";

export default function PixelScene() {
  const cells = useMemo(
    () => Array.from({ length: 64 }, (_, i) => GRID[i % GRID.length]),
    []
  );

  return (
    <div className="relative overflow-hidden border-4 border-black bg-slate-900 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${ACCENT}`} />
      <div className="relative grid grid-cols-8 gap-1 font-mono text-center text-lg text-white/80 sm:text-2xl">
        {cells.map((cell, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center border border-white/10 bg-black/20 transition-transform duration-150 hover:scale-105"
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="relative mt-4 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-widest text-white/80 sm:text-xs">
        <div className="border-2 border-white/30 bg-black/30 p-2">AI Core</div>
        <div className="border-2 border-white/30 bg-black/30 p-2">CRM Link</div>
        <div className="border-2 border-white/30 bg-black/30 p-2">Bot Flow</div>
      </div>
    </div>
  );
}
