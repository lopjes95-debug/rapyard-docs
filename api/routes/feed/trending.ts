import type { Context } from 'hono';
import { getTrendingFeed } from '../../lib/feed';

export default async (c: Context) => {
  const result = await getTrendingFeed(c.req.query());
  return c.json(result);
};
