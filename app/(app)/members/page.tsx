
import MemberContent from "../AppComponents/memberContent";
import { Suspense } from "react";

export default function MembersPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 mt-20">
      <div className="w-full">
        <div className="max-w-7xl mx-auto ">
          <Suspense
            fallback={
              <div className="text-center py-20">Loading members...</div>
            }
          >
            <MemberContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
