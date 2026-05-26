"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/app/lib/supabase";

export function useGatePhase(sessionId: string) {
  const [phase, setPhase] = useState("closed");

  useEffect(() => {
    const supabase = getSupabaseClient();

    const channel = supabase
      .channel(`yard-engine:${sessionId}`)
      .on("broadcast", { event: "phase" }, (payload) => {
        if (payload?.payload?.phase) {
          setPhase(payload.payload.phase);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  return phase;
}

