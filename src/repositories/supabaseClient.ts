import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

 export async function getAuthUser() {
  const { data: user } = await supabase.auth.getUser();
  return user;
}