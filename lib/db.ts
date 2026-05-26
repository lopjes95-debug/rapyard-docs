import { createClient } from '@supabase/supabase-js';
import { ENV } from './env';

export const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_SERVICE_KEY,
  {
    auth: { persistSession: false },
  }
);

// Example helpers
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};
