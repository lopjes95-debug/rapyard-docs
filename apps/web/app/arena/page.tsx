"use client";

import { useEffect, useState } from "react";
import { CypherArena } from "../cypher/CypherArena";

export default function ArenaScrollPage() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOffset(Math.min(y / 400, 1)); // 0–1
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-[200vh] bg-black">
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{
          transform: `translateY(${offset * -40}px) scale(${1 + offset * 0.05})`,
          transition: "transform 80ms linear"
        }}
      >
        <CypherArena />
      </div>
      <div className="h-[100vh]" />
    </div>
  );
}
