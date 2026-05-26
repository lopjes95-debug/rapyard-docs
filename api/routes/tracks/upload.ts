import type { Context } from 'hono';
import { UploadTrackSchema } from '../../lib/validation';
import { finalizeUpload } from '../../lib/upload';
import { supabase } from '../../lib/db';
import { enqueueJob } from '../../lib/queue';

export default async (c: Context) => {
  const body = await c.req.json();
  const input = UploadTrackSchema.parse(body);

  // TODO: derive userId from auth middleware
  const userId = c.get('userId') as string | undefined;
  if (!userId) return c.json({ error: 'unauthorized' }, 401);

  const file = await finalizeUpload({ key: input.fileKey });

  const { data, error } = await supabase
    .from('tracks')
    .insert({
      owner_id: userId,
      title: input.title,
      url: file.url,
      duration_sec: input.durationSec,
    })
    .select('*')
    .single();

  if (error) throw error;

  await enqueueJob({ type: 'ai.score', trackId: data.id });

  return c.json({ track: data });
};
