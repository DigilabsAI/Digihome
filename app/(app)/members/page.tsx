import Team4 from "@/components/blocks/team-4";
import {
  departments,
  elegantTeamMembers,
  subtitle,
  title,
} from "@/public/constants";
import { InfoIcon } from "lucide-react";

export default function MembersPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 mt-20">
      <div className="w-full">
        <div className="bg-accent w-full text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          Site Under Development. Some features may not work as expected.
        </div>
        <div className="max-w-7xl mx-auto ">
          <Team4
            title={title}
            subtitle={subtitle}
            teamMembers={elegantTeamMembers}
            departments={departments}
          />
        </div>
      </div>
    </div>
  );
}
