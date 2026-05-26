import { ENV } from './env';

export interface ScoreResult {
  overall: number;
  flow: number;
  delivery: number;
  originality: number;
}

export const scoreTrack = async (trackUrl: string): Promise<ScoreResult> => {
  const res = await fetch('https://ai.rapyard.internal/score', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${ENV.AI_API_KEY}`,
    },
    body: JSON.stringify({ url: trackUrl }),
  });

  if (!res.ok) throw new Error('AI scoring failed');
  return res.json();
};
