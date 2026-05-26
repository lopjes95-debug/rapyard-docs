"use client";

import { usePhase } from "./usePhase";
import { Gate } from "./gate/Gate";
import { CypherArena } from "./cypher/CypherArena";
import { BattleArena } from "./battle/BattleArena";

export function YardEngine({ sessionId }: { sessionId: string }) {
  const phase = usePhase(sessionId);

  return (
    <div className="relative transition-all duration-700">
      {phase === "lobby" && <Gate phase="lobby" />}
      {phase === "cypher" && <CypherArena />}
      {phase === "battle" && <BattleArena />}
      {phase === "closed" && <Gate phase="closed" />}
    </div>
  );
}
