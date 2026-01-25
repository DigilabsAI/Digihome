import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import TeamMemberCard, {
  TeamMember,
} from "@/components/blocks/team-member-card";

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
      {/* <Suspense fallback={<div>Loading projects...</div>}>
        {params.then(({ username }) => (
          <ProfileProjects username={username} />
        ))}
      </Suspense> */}
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
          acc.website = link.url; // or just use profile.email if you want
          break;
      }
      return acc;
    }, {}),
  };

  return (
    <div>
      <TeamMemberCard member={member} />
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
