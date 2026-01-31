import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import TeamMemberCard, {
  TeamMember,
} from "@/components/blocks/team-member-card";
import { ProjectsBlock } from "@/components/blocks/projects-block";
import { projects } from "@/public/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatsBlock from "@/components/blocks/stats-block";
import ProfilePageSkeleton from "@/components/skeletons/profilePageSkeleton";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <Suspense fallback={<ProfilePageSkeleton />}>
        {params.then(({ username }) => (
          <ProfileContent username={username} />
        ))}
      </Suspense>
    </div>
  );
}

async function ProfileContent({ username }: { username: string }) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error || !profile) {
    return <div>Profile not found</div>;
  }

  const member: TeamMember = {
    name: profile.name,
    bio: profile.bio || "",
    role: profile.title || "Team Member",
    department: profile.department || undefined,
    image:
      profile.avatar_url ||
      "https://phxxpovjltygyxmctbfy.supabase.co/storage/v1/object/public/avatars/Default/DefaultAvatar.png",
    skills: profile.roles || [],
    social: (profile.social_links || []).reduce((acc: any, link: any) => {
      switch (link.platform) {
        case "twitter":
          acc.twitter = link.url;
          break;
        case "linkedin":
          acc.linkedin = link.url;
          break;
        case "github":
          acc.github = link.url;
          break;
        case "website":
          acc.website = link.url;
          break;
      }
      return acc;
    }, {}),
  };

  return (
    <div className="w-full min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 flex flex-col gap-6">
        {/* Top section: Team + Stats */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Team card */}
          <div className="lg:w-[300px] w-full shrink-0">
            <TeamMemberCard member={member} />
          </div>

          {/* Stats cards */}
          <div className="flex flex-1 gap-6">
            <StatsBlock />
          </div>
        </div>

        {/* Bottom section: Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectsBlock key={project.title + index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

// async function ProfileProjects({ username }: { username: string }) {
//   const supabase = await createClient();

//   const { data: profile, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("username", username)
//     .maybeSingle();

//   if (error || !profile) {
//     return <div>Profile not found</div>;
//   }

//   return (
//     <div>
//       <h1>{profile.name}</h1>
//       <p>{profile.bio}</p>
//       <img
//         src={profile.avatar_url ?? "/default-avatar.png"}
//         alt={profile.name}
//       />
//     </div>
//   );
// }
