"use client";

import { useEffect, useState } from "react";

export function useAudioLevel() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    let ctx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let rafId: number;

    async function setup() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const data = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        if (!analyser) return;
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setLevel(avg / 255);
        rafId = requestAnimationFrame(loop);
      };
      loop();
    }

    setup().catch(() => {});

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ctx) ctx.close();
    };
  }, []);

  return level; // 0–1
}
