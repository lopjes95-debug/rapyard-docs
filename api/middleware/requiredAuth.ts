export const requireAuth = (handler) => {
  return async (c) => {
    const userId = c.get('userId');
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);
    return handler(c);
  };
};
