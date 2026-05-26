export default async (c) => {
  const user = c.get('user');
  return c.json({ user });
};
