import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProfileSkeletonProps {
  className?: string;
}
export default function ProfileSkeleton({ className }: ProfileSkeletonProps) {
  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8 mt-20">
      <Card className={cn("w-full shadow-xs", className)}>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex shrink-0 gap-2">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />

            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <Separator />

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}