"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface CustomClaims {
  user_role?: string;
  is_setup_done?: boolean;
  [key: string]: any;
}

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  const { data } = await supabase.auth.getClaims();
  const claims = (data?.claims ?? {}) as CustomClaims;

  return {
    supabase,
    user,
    role: claims.user_role ?? "non-member",
    is_setup_done: claims.is_setup_done ?? true,
    claims,
  };
}
