import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import TeamMemberCard, {
  TeamMember,
} from "@/components/blocks/team-member-card";
import { ProjectsBlock } from "@/components/blocks/projects-block-shadcnui";
import { projects } from "@/public/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading profile...</div>}>
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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full gap-6 max-w-7xl ">
        {/* Left: Team card */}
        <div className=" w-full lg:w-[320px]">
          <TeamMemberCard member={member} />
        </div>

        {/* Right: Scrollable Projects */}
        <ScrollArea className="flex-1 max-h-screen w-full pr-4">
          <div className="flex flex-col gap-6 items-center">
            {projects.map((project, index) => (
              <div key={project.title + index} className="w-full">
                <ProjectsBlock project={project} />
              </div>
            ))}
          </div>
        </ScrollArea>
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
