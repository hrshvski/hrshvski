"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INNER = 40; // canvas size (48px container - 4px border * 2)
const SQ = 8;    // square size in pixels

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const COLORS = ["#000000", "#000000", "#000000"];

function makeBalls(): Ball[] {
  return [
    { x: 2,  y: 2,  vx:  0.15, vy:  0.12, color: COLORS[0] },
    { x: 20, y: 6,  vx: -0.12, vy:  0.17, color: COLORS[1] },
    { x: 10, y: 22, vx:  0.1,  vy: -0.14, color: COLORS[2] },
  ];
}

export default function LogoIcon() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const balls = useRef<Ball[]>(makeBalls());

  const tick = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, INNER, INNER);

    for (const b of balls.current) {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x <= 0)           { b.x = 0;          b.vx =  Math.abs(b.vx); }
      if (b.x >= INNER - SQ)  { b.x = INNER - SQ; b.vx = -Math.abs(b.vx); }
      if (b.y <= 0)           { b.y = 0;          b.vy =  Math.abs(b.vy); }
      if (b.y >= INNER - SQ)  { b.y = INNER - SQ; b.vy = -Math.abs(b.vy); }

      ctx.strokeStyle = b.color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(Math.round(b.x) + 0.5, Math.round(b.y) + 0.5, SQ - 1, SQ - 1);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (active) {
      balls.current = makeBalls();
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, tick]);

  return (
    <div
      onClick={() => setActive((a) => !a)}
      title={active ? "Остановить" : "Запустить"}
      className="flex h-12 w-12 cursor-pointer items-center justify-center border-4 border-black bg-lime-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none"
    >
      {active ? (
        <canvas
          ref={canvasRef}
          width={INNER}
          height={INNER}
          style={{ imageRendering: "pixelated", display: "block" }}
        />
      ) : (
        /* Static pixel blocks */
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
          aria-hidden
        >
          <rect x="3"  y="3"  width="8" height="8" />
          <rect x="13" y="3"  width="8" height="8" />
          <rect x="8"  y="13" width="8" height="8" />
        </svg>
      )}
    </div>
  );
}
