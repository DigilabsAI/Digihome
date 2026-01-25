import { Suspense } from "react";
import JoinRequestsTable from "../AppComponents/adminTable";
import AdminTableSkeleton from "@/components/skeletons/adminTableSkeleton";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <Suspense fallback={<AdminTableSkeleton />}>
        <JoinRequestsTable />
      </Suspense>
    </div>
  );
}
