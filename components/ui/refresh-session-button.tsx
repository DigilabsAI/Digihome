"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function RefreshButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleRefresh = async () => {
    await supabase.auth.refreshSession();
    router.refresh();
  };

  return (
    <Button onClick={handleRefresh}>
      Refresh 
    </Button>
  );
}
