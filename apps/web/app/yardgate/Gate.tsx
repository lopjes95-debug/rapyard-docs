"use client";

import clsx from "clsx";

export function Gate({ phase }: { phase: string }) {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">

      {/* BACKLIGHT */}
      <div
        className={clsx(
          "absolute inset-0 transition-all duration-[1500ms]",
          phase === "lobby" && "bg-black",
          phase === "cypher" && "bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_70%)]",
          phase === "battle" && "bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.45),transparent_70%)]",
          phase === "closed" && "bg-black"
        )}
      />

      {/* SMOKE LAYER */}
      <img
        src="/yardgate/vfx/smoke.png"
        className={clsx(
          "absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000",
          phase === "lobby" && "opacity-20",
          phase === "cypher" && "opacity-50",
          phase === "battle" && "opacity-70",
          phase === "closed" && "opacity-10"
        )}
      />

      {/* SPARKS VIDEO */}
      <video
        src="/yardgate/vfx/sparks.mp4"
        autoPlay
        loop
        muted
        className={clsx(
          "absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-0 transition-opacity duration-700",
          phase === "battle" && "opacity-60"
        )}
      />

      {/* STEEL DOORS */}
      <div
        className={clsx(
          "absolute left-0 top-0 h-full w-1/2 bg-[url('/yardgate/vfx/steel.jpg')] bg-cover bg-center transition-transform duration-[1200ms] ease-in-out",
          phase === "lobby" && "translate-x-0",
          phase === "cypher" && "-translate-x-full",
          phase === "battle" && "-translate-x-full",
          phase === "closed" && "translate-x-0"
        )}
      />

      <div
        className={clsx(
          "absolute right-0 top-0 h-full w-1/2 bg-[url('/yardgate/vfx/steel.jpg')] bg-cover bg-center transition-transform duration-[1200ms] ease-in-out",
          phase === "lobby" && "translate-x-0",
          phase === "cypher" && "translate-x-full",
          phase === "battle" && "translate-x-full",
          phase === "closed" && "translate-x-0"
        )}
      />

      {/* GLOWING “R” SIGIL */}
      <img
        src="/yardgate/vfx/glow.png"
        className={clsx(
          "absolute w-64 h-64 object-contain transition-all duration-700",
          phase === "lobby" && "opacity-0 scale-75",
          phase === "cypher" && "opacity-70 scale-100",
          phase === "battle" && "opacity-100 scale-125 drop-shadow-[0_0_25px_rgba(249,115,22,0.8)]",
          phase === "closed" && "opacity-0 scale-50"
        )}
      />

      {/* TEXT */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold tracking-[0.25em] text-yard-neon drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
          YARDGATE
        </h1>
        <p className="text-slate-300 mt-2 uppercase tracking-[0.2em] text-xs">
          {phase === "lobby" && "Gate Closed"}
          {phase === "cypher" && "Entering Cypher Arena"}
          {phase === "battle" && "Battle Arena Active"}
          {phase === "closed" && "Session Closed"}
        </p>
      </div>
    </div>
  );
}

