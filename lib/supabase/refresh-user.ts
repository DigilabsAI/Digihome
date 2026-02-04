
import { createClient } from "@/lib/supabase/client";

export async function refreshUserClaims() {
  const supabase = createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims?.profile_data ?? null;
}
