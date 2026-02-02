"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User } from "@/lib/types/user";
import { cache } from "react";

export async function getCurrentUser() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login"); 
  }

 
  const { data, error: dbError } = await supabase
    .from("users")
    .select("role, is_setup_done")
    .eq("id", user.id)
    .single(); 

  if (dbError) {
    console.error("[RBAC ERROR]", dbError);
  }

  return {
    supabase,
    user,
    role: data?.role ?? "non-s",
    isSetupDone: data?.is_setup_done ?? true,
  };
}

export async function hasJoinRequest(): Promise<boolean> {
  const { supabase, user } = await getCurrentUser();

  const { data, error } = await supabase
    .from("organization_join_requests")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}


export const getUserFromJWT = cache(async (): Promise<User | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return (data?.claims?.profile_data as User) ?? null;
});