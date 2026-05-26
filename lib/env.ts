const required = (key: string): string => {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
};

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DATABASE_URL: required('DATABASE_URL'),
  SUPABASE_URL: required('SUPABASE_URL'),
  SUPABASE_SERVICE_KEY: required('SUPABASE_SERVICE_KEY'),
  R2_ENDPOINT: required('R2_ENDPOINT'),
  R2_BUCKET: required('R2_BUCKET'),
  R2_ACCESS_KEY_ID: required('R2_ACCESS_KEY_ID'),
  R2_SECRET_ACCESS_KEY: required('R2_SECRET_ACCESS_KEY'),
  AI_API_KEY: required('AI_API_KEY'),
  QUEUE_URL: required('QUEUE_URL'),
};
