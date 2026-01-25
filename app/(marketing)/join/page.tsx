import JoinSection from "@/components/blocks/joinSection";
import JoinSectionSkeleton from "@/components/skeletons/joinSectionSkeleton";
import { Suspense } from "react";

export default function JoinPage() {
  return (
    <div>
      <Suspense fallback={<JoinSectionSkeleton />}>
        <JoinSection />
      </Suspense>
    </div>
  );
}
