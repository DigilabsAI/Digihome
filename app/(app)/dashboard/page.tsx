import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { Suspense } from "react";
import { ComingSoon4, comingsoonDemo } from "@/components/beste/comingsoon4";

async function UserDetails() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  return JSON.stringify(data?.claims, null, 2);
}

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 mt-20">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          Site Under Development. Some features may not work as expected.
        </div>
        <ComingSoon4 />
      </div>
    </div>
  );
}
