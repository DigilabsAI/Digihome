import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="w-full min-h-screen px-4 py-8">
      {/* Top section: Team + Stats */}
      <div className="mx-auto max-w-4xl flex gap-6 justify-center">
        {/* Team card skeleton */}
        <div className="lg:w-[300px] w-full shrink-0">
          <Skeleton className="h-44 w-full rounded-md mb-4" />
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
        </div>

        {/* Stats skeleton */}
        <div className="flex flex-1 gap-6 flex-col">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-none" />
          ))}
        </div>
      </div>

      {/* Bottom section: Projects */}
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
