"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

function useStrobe(enabled: boolean) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setOn((v) => !v), 400);
    return () => clearInterval(id);
  }, [enabled]);
  return on;
}

export function BattleArena() {
  const strobe = useStrobe(true);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black flex items-center justify-center">
      {/* Red crowd gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-black to-black" />

      {/* Crowd silhouettes */}
      <div className="absolute bottom-0 inset-x-0 h-1/3 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,1),_transparent_70%)]">
        <div className="absolute inset-x-0 bottom-0 h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22100%22><path d=%22M0 80 Q 50 40 100 80 T 200 80 V100 H0Z%22 fill=%22%23000000%22/></svg>')] bg-repeat-x opacity-80" />
      </div>

      {/* Strobe overlay */}
      <div
        className={clsx(
          "absolute inset-0 pointer-events-none transition-opacity duration-150",
          strobe ? "opacity-40 bg-white/40" : "opacity-0"
        )}
      />

      {/* Ember ring */}
      <div className="absolute w-72 h-72 rounded-full border border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.8)]" />

      {/* Title */}
      <div className="relative z-10 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-slate-400">
          Battle Arena
        </p>
        <h1 className="text-4xl font-semibold tracking-[0.25em] text-yard-ember drop-shadow-[0_0_22px_rgba(249,115,22,0.9)]">
          RAP BATTLE
        </h1>
      </div>
    </div>
  );
}
