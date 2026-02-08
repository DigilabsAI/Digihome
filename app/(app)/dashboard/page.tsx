
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { ComingSoon4 } from "@/components/ui/comingsoon4";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default async function ProtectedPage() {
  return (
    <div className="flex flex-col justify-center gap-2 items-center mt-20">
       <Announcement >
        <Link href="/dashboard" className="flex flex-row gap-1">
          <AnnouncementTag>Latest update</AnnouncementTag>
          <AnnouncementTitle>
            New feature added
            <ArrowUpRightIcon
              className="shrink-0 text-muted-foreground"
              size={16}
            />
          </AnnouncementTitle>
        </Link>
      </Announcement>
      <div className="flex-1 w-full flex flex-col gap-12 ">
        <div className="w-full">
          <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
            <InfoIcon size="16" strokeWidth={2} />
            Site Under Development. Some features may not work as expected.
          </div>
          <ComingSoon4 />
        </div>
      </div>
    </div>
  );
}
