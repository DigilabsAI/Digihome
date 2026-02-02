import SettingsProfile from "./settings-profile";
import { getProfile } from "@/lib/actions/profileActions";

export default async function UpdateProfileContent() {
  let profile;

  try {
    profile = await getProfile();
  } catch (error) {
    profile = null;
  }

  return (
    <div className="mt-20">
      {profile ? <SettingsProfile profile={profile} /> : <SettingsProfile />}
    </div>
  );
}
