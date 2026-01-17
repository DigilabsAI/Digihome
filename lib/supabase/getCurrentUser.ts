"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


interface CustomClaims {
  role?: string;
  [key: string]: any; // fallback for unexpected keys
}

export async function getCurrentUser(includeRole: boolean = false) {
  const supabase = await createClient();


  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.warn("⚠️ Unauthorized access or invalid session:", userError?.message);
    redirect("/auth/login");
  }


  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError) {
    console.error("Failed to get claims:", claimsError.message);
  }

  const claims = (claimsData?.claims ?? {}) as CustomClaims;

  const role = includeRole ? claims.user_role ?? null : null;

  return { supabase, user, claims, role };
}
