"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function usePhase(sessionId: string) {
  const [phase, setPhase] = useState("lobby");

  useEffect(() => {
    supabase
      .from("sessions")
      .select("phase")
      .eq("id", sessionId)
      .single()
      .then(({ data }) => data?.phase && setPhase(data.phase));

    const channel = supabase
      .channel(`session:${sessionId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "sessions", filter: `id=eq.${sessionId}` },
        (payload) => setPhase(payload.new.phase)
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [sessionId]);

  return phase as "lobby" | "cypher" | "battle" | "closed";
}
