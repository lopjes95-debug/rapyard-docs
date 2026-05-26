// apps/web/lib/yard/cypherEngine.ts
import type { UserId } from "./types";

export interface CypherLine {
  id: string;
  authorId: UserId;
  text: string;
  createdAt: number;
  beatTick: number;
}

export interface CypherState {
  sessionId: string;
  active: boolean;
  bpm: number;
  currentTick: number;
  lines: CypherLine[];
  turnOrder: UserId[];
  currentTurnIndex: number;
}

export function createCypherState(sessionId: string, bpm = 90): CypherState {
  return {
    sessionId,
    active: true,
    bpm,
    currentTick: 0,
    lines: [],
    turnOrder: [],
    currentTurnIndex: 0
  };
}

export function setTurnOrder(state: CypherState, order: UserId[]): CypherState {
  return { ...state, turnOrder: order, currentTurnIndex: 0 };
}

export function advanceTick(state: CypherState): CypherState {
  return { ...state, currentTick: state.currentTick + 1 };
}

export function currentMc(state: CypherState): UserId | null {
  if (!state.turnOrder.length) return null;
  return state.turnOrder[state.currentTurnIndex % state.turnOrder.length];
}

export function submitLine(
  state: CypherState,
  authorId: UserId,
  text: string
): CypherState {
  const line: CypherLine = {
    id: `line_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    authorId,
    text,
    createdAt: Date.now(),
    beatTick: state.currentTick
  };

  return {
    ...state,
    lines: [...state.lines, line],
    currentTurnIndex: state.currentTurnIndex + 1
  };
}
