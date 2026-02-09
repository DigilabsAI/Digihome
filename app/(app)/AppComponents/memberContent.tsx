import Team4 from "@/components/blocks/team-4";
import { getMembers } from "@/lib/actions/profileActions";
import { departments, subtitle, title } from "@/public/constants";

export default async function MemberContent() {
  const members = await getMembers();

  return (
    <Team4
      title={title}
      subtitle={subtitle}
      teamMembers={members}
      departments={departments}
    />
  );
}
