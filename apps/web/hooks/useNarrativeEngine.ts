import { useEffect } from "react";
import { getSupabaseClient } from "@/app/lib/supabase";

export function useNarrativeRealtime(setActiveIndex) {
  useEffect(() => {
    const supabase = getSupabaseClient();

    const channel = supabase
      .channel("yard-engine")
      .on("broadcast", { event: "narrative" }, (payload) => {
        if (payload?.payload?.index !== undefined) {
          setActiveIndex(payload.payload.index);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setActiveIndex]);
}
