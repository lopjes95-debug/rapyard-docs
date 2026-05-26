import { ENV } from './env';

export type QueueJob =
  | { type: 'ai.score'; trackId: string }
  | { type: 'ai.transcribe'; trackId: string }
  | { type: 'feed.rebuild'; userId: string };

export const enqueueJob = async (job: QueueJob) => {
  await fetch(ENV.QUEUE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(job),
  });
};
