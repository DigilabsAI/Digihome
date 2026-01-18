"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface UserWithRole {
  user: any;
  role: string;
  isSetupDone: boolean;
}

export async function getUserWithRole(): Promise<UserWithRole> {
  const supabase = await createClient();

  // Get the authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login"); // Not logged in
  }

  // Fetch role & is_setup_done safely using RLS
  const { data, error: dbError } = await supabase
    .from("users")
    .select("role, is_setup_done")
    .eq("id", user.id)
    .single(); // Should return only their row due to RLS

  if (dbError) {
    console.error("[RBAC ERROR]", dbError);
  }

  return {
    user,
    role: data?.role ?? "non-s",
    isSetupDone: data?.is_setup_done ?? true,
  };
}
