"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/providers/userProvider";

// Now a pure async function — no hooks inside
export async function logout(setUser: (user: any) => void, router: ReturnType<typeof useRouter>) {
  const supabase = createClient();
  await supabase.auth.signOut();
  setUser(null);
  router.push("/auth/login");
}

export function LogoutButton() {
  const router = useRouter();
  const { setUser } = useUser(); // ✅ hook stays inside component

  const handleLogout = () => logout(setUser, router);

  return <Button onClick={handleLogout}>Logout</Button>;
}
