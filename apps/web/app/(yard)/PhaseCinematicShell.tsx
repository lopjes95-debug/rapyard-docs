"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export function PhaseCinematicShell({
  phase,
  children
}: {
  phase: string;
  children: React.ReactNode;
}) {
  const [prevPhase, setPrevPhase] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!prevPhase) {
      setPrevPhase(phase);
      return;
    }
    if (phase !== prevPhase) {
      setAnimating(true);
      const id = setTimeout(() => {
        setPrevPhase(phase);
        setAnimating(false);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [phase, prevPhase]);

  return (
    <div
      className={clsx(
        "relative transition-[filter,opacity,transform] duration-500",
        animating && "opacity-60 blur-sm scale-[0.99]"
      )}
    >
      {children}
    </div>
  );
}
