import SettingsProfile from "./settings-profile";
import { getProfile } from "@/lib/actions/profileActions";

export default async function UpdateProfileContent() {
  let profile;

  try {
    profile = await getProfile();
  } catch (error) {
    console.error("Failed to load profile:", error);
    profile = null;
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
      {profile ? <SettingsProfile profile={profile} /> : <SettingsProfile />}
    </div>
  );
}
