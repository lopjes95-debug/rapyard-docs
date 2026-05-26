// apps/web/lib/yard/types.ts
export type YardPhase = "lobby" | "cypher" | "battle" | "closed";

export type YardSessionId = string;
export type UserId = string;

export interface YardParticipant {
  id: UserId;
  handle: string;
  joinedAt: number;
}

export interface YardSession {
  id: YardSessionId;
  name: string;
  phase: YardPhase;
  createdAt: number;
  hostId: UserId;
  participants: YardParticipant[];
}
