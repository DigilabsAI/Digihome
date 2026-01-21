import JoinSection from "@/components/blocks/joinSection";
import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function JoinPage() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <JoinSection />
      </Suspense>
    </div>
  );
}
