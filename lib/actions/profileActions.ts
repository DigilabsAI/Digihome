"use server";

import { SocialLink } from "@/app/(app)/AppComponents/settings-profile";
import { getCurrentUser } from "./userAction";


const ROLE_DEPARTMENT_MAP: Record<string, string[]> = {
  frontend: ["development"],
  backend: ["development"],
  fullstack: ["development"],
  mobile: ["development"],
  devops: ["development"],
  "project-manager": ["management"],
  uiux: ["design"],
};


export async function saveProfile(data: {
  name: string;
  email: string;
  title: string;
  bio: string;
  socialLinks?: SocialLink[];
  roles?: string[];
  username: string;
}) {
  const { supabase, user } = await getCurrentUser();

  const roles = data.roles ?? [];
  const departments = resolveDepartments(roles);

  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        user_id: user.id,
        username: data.username,
        title: data.title,
        name: data.name,
        email: data.email,
        bio: data.bio,
        roles,
        department: departments.length ? departments.join(",") : null,
        social_links: data.socialLinks ?? [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (profileError) throw profileError;

  const { error: userError } = await supabase
    .from("users")
    .update({ is_setup_done: true })
    .eq("id", user.id);

  if (userError) throw userError;

  await supabase.auth.refreshSession();
}



export async function uploadAvatar(file: File) {
  const { supabase, user } = await getCurrentUser();

  const fileExt = file.name.split(".").pop();
  const timestamp = Date.now(); // unique for each upload
  const filePath = `${user.id}/avatar_${timestamp}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const avatarUrl = data.publicUrl;

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("user_id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return avatarUrl;
}


export async function removeAvatar() {
  const { supabase, user } = await getCurrentUser();
  await supabase.storage
    .from("avatars")
    .remove([`${user.id}/avatar.png`, `${user.id}/avatar.jpg`]);

  await supabase
    .from("profiles")
    .update({ avatar_url: null })
    .eq("user_id", user.id);
}


export async function getProfile() {
  const { supabase, user } = await getCurrentUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();



  return data;
}

export async function getMembers() {
  const { supabase, user } = await getCurrentUser();

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      name,
      email,
      bio,
      roles,
      department,
      avatar_url,
      social_links,
      title,
      username
    `)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }


  return (data || []).map((user: any) => ({
    name: user.name,
    bio: user.bio,
    title: user.title,
    role: user.roles?.map((r: string) => toTitleCase(r)) || [],
    department: resolveDepartments(user.roles),
    image: user.avatar_url || "",
    skills: user.skills || [],
    social: {
      twitter: user.social_links?.twitter,
      linkedin: user.social_links?.linkedin,
      github: user.social_links?.github,
      website: user.social_links?.website,
    },
  }));
}

function resolveDepartments(roles: string[] = []): string[] {
  const departments = new Set<string>();
  roles.forEach((role) => {
    ROLE_DEPARTMENT_MAP[role]?.forEach((dept) => departments.add(dept));
  });
  return Array.from(departments);
}

function toTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}