// apps/web/lib/yard/battleScoring.ts
import type { UserId } from "./types";

export type BattleCriterion = "delivery" | "wordplay" | "crowd" | "originality";

export interface BattleScore {
  mcId: UserId;
  criterion: BattleCriterion;
  value: number; // 0–10
}

export interface BattleRound {
  id: string;
  scores: BattleScore[];
}

export interface BattleState {
  sessionId: string;
  mcs: UserId[];
  rounds: BattleRound[];
}

export function createBattleState(sessionId: string, mcs: UserId[]): BattleState {
  return {
    sessionId,
    mcs,
    rounds: []
  };
}

export function addRound(state: BattleState): BattleState {
  const round: BattleRound = {
    id: `round_${state.rounds.length + 1}`,
    scores: []
  };
  return { ...state, rounds: [...state.rounds, round] };
}

export function addScore(
  state: BattleState,
  roundId: string,
  score: BattleScore
): BattleState {
  return {
    ...state,
    rounds: state.rounds.map((r) =>
      r.id === roundId ? { ...r, scores: [...r.scores, score] } : r
    )
  };
}

export function totalForMc(state: BattleState, mcId: UserId): number {
  return state.rounds
    .flatMap((r) => r.scores)
    .filter((s) => s.mcId === mcId)
    .reduce((sum, s) => sum + s.value, 0);
}

export function winner(state: BattleState): UserId | null {
  if (!state.mcs.length) return null;
  const totals = state.mcs.map((mc) => ({ mc, total: totalForMc(state, mc) }));
  totals.sort((a, b) => b.total - a.total);
  if (!totals.length || totals[0].total === totals[1]?.total) return null;
  return totals[0].mc;
}
