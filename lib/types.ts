export type UserId = string & { readonly brand: unique symbol };
export type TrackId = string & { readonly brand: unique symbol };
export type BattleId = string & { readonly brand: unique symbol };

export interface User {
  id: UserId;
  handle: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Track {
  id: TrackId;
  ownerId: UserId;
  title: string;
  url: string;
  durationSec: number;
  createdAt: string;
}

export interface Battle {
  id: BattleId;
  hostId: UserId;
  trackAId: TrackId;
  trackBId: TrackId;
  status: 'pending' | 'live' | 'closed';
  createdAt: string;
}
