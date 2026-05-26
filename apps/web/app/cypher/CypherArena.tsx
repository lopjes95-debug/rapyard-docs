"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

function useBeatPulse(speed = 600) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), speed);
    return () => clearInterval(id);
  }, [speed]);
  return tick;
}

export function CypherArena() {
  const tick = useBeatPulse(500);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black flex items-center justify-center">
      {/* Neon grid floor */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.4),_transparent_60%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.9)_1px,transparent_1px),linear-gradient(to_top,rgba(15,23,42,0.9)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Vertical equalizer bars */}
      <div className="relative z-10 flex gap-2">
        {Array.from({ length: 18 }).map((_, i) => {
          const phase = (tick + i) % 6;
          const height = 20 + phase * 10;
          return (
            <div
              key={i}
              className="w-2 rounded-full bg-gradient-to-t from-cyan-500 to-emerald-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300"
              style={{ height: `${height}px` }}
            />
          );
        })}
      </div>

      {/* Ambient haze */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.6),_transparent_70%)]" />

      {/* Title */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-slate-400">
          Cypher Arena
        </p>
        <h1 className="text-4xl font-semibold tracking-[0.25em] text-yard-neon drop-shadow-[0_0_18px_rgba(34,211,238,0.8)]">
          LIVE CIPHER
        </h1>
      </div>
    </div>
  );
}
