import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="w-full min-h-screen px-4 py-8 mt-20">
      {/* Top section: Team + Stats */}
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-6 justify-center">
        {/* Team card skeleton */}
        <Skeleton className="lg:w-[300px] w-full shrink-0 flex flex-col items-center p-4"></Skeleton>

        {/* Stats skeleton */}
        <div className="flex flex-1 gap-6 flex-col">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-md" />
          ))}
        </div>
      </div>

      {/* Bottom section: Projects */}
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-black/5 rounded-md overflow-hidden"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4 flex flex-col gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2 mt-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-16 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
