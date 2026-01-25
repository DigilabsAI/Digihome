import { Skeleton } from "@/components/ui/skeleton";

export default function JoinSectionSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-8 gap-4">
      {/* Logo placeholder */}
      <Skeleton className="h-72 w-72 " />

      {/* Text placeholder */}
      <div className="flex flex-col gap-4 max-w-lg w-full">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/6" />
      </div>
    </div>
  );
}
