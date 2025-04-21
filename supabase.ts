import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Response = {
  id: string;
  name: string;
  age: number;
  created_at: string;
};

export async function submitResponse(name: string, age: number): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from('responses')
    .insert([{ name, age }]);
  
  return { error };
}

export async function getResponses(): Promise<{ data: Response[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export function subscribeToResponses(callback: () => void) {
  return supabase
    .channel('public:responses')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'responses' }, callback)
    .subscribe();
}