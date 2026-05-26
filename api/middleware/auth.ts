import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { ENV } from '../lib/env';
import { supabase } from '../lib/db';

export const authMiddleware = async (c, next) => {
  const header = c.req.header('authorization');

  if (!header || !header.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const token = header.replace('Bearer ', '').trim();

  try {
    // 1) Verify JWT
    const payload = await verify(token, ENV.JWT_SECRET);

    if (!payload?.sub) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // 2) Load user from DB
    const { data: user, error } = await supabase
      .from('users')
      .select('id, handle, display_name, avatar_url')
      .eq('id', payload.sub)
      .single();

    if (error || !user) {
      return c.json({ error: 'User not found' }, 401);
    }

    // 3) Inject into context
    c.set('userId', user.id);
    c.set('user', user);

    await next();
  } catch (err) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
};
