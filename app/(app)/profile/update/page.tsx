import { Suspense } from "react";
import UpdateProfileContent from "../../AppComponents/updateProfileContent";
import ProfileSkeleton from "@/components/skeletons/profileSkeleton";

export default function ProfileUpdatePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UpdateProfileContent />
    </Suspense>
  );
}
