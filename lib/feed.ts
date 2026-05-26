import { supabase } from './db';
import { FeedQuerySchema } from './validation';

export const getTrendingFeed = async (query: unknown) => {
  const { cursor, limit } = FeedQuerySchema.parse(query);

  let q = supabase
    .from('tracks_feed_trending')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  if (cursor) q = q.lt('score', cursor);

  const { data, error } = await q;
  if (error) throw error;

  const nextCursor = data?.length ? data[data.length - 1].score : null;

  return { items: data ?? [], nextCursor };
};
