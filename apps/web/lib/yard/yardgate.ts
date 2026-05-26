// apps/web/lib/yard/yardgate.ts
import type { YardSession, YardSessionId, UserId, YardParticipant } from "./types";

export function createSession(params: {
  name: string;
  hostId: UserId;
  hostHandle: string;
}): YardSession {
  const now = Date.now();
  const host: YardParticipant = {
    id: params.hostId,
    handle: params.hostHandle,
    joinedAt: now
  };

  return {
    id: `session_${now}_${Math.random().toString(36).slice(2, 8)}`,
    name: params.name,
    phase: "lobby",
    createdAt: now,
    hostId: params.hostId,
    participants: [host]
  };
}

export function joinSession(session: YardSession, user: YardParticipant): YardSession {
  if (session.participants.some((p) => p.id === user.id)) return session;
  return { ...session, participants: [...session.participants, user] };
}

export function leaveSession(session: YardSession, userId: UserId): YardSession {
  return {
    ...session,
    participants: session.participants.filter((p) => p.id !== userId)
  };
}

export function canStartCypher(session: YardSession): boolean {
  return session.phase === "lobby" && session.participants.length >= 2;
}

export function startCypher(session: YardSession): YardSession {
  if (!canStartCypher(session)) return session;
  return { ...session, phase: "cypher" };
}
