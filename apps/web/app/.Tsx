"use client";

import { useEffect, useState } from "react";

export function ScrollCamera({ children }: { children: React.ReactNode }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOffset(Math.min(y / 400, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="transition-transform duration-75"
      style={{
        transform: `translateY(${offset * -40}px) scale(${1 + offset * 0.05})`
      }}
    >
      {children}
    </div>
  );
}
