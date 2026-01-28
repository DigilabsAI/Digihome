"use server";

import { SocialLink } from "@/app/(app)/AppComponents/settings-profile";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./userAction";

export async function saveProfile(data: {
    name: string;
    email: string;
    bio: string;
    socialLinks?: SocialLink[];
    roles?: string[];
    department?: string;
    username: string;
}) {
    const { supabase, user } = await getCurrentUser();

    // 1. Upsert profile
    const { error: profileError } = await supabase
        .from("profiles")
        .upsert(
            {
                user_id: user.id,
                username: data.username,
                name: data.name,
                email: data.email,
                bio: data.bio,
                roles: data.roles ?? [],
                department: data.department ?? null,
                social_links: data.socialLinks ?? [],
                updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
        );


    // 2. Mark setup as done
    const { error: userError } = await supabase
        .from("users")
        .update({ is_setup_done: true })
        .eq("id", user.id);


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