"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Team4Skeleton() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto max-w-6xl px-2">
        
        {/* Title + Subtitle */}
        <div className="mb-8 text-center space-y-4">
          <Skeleton className="mx-auto h-10 w-2/3" />
          <Skeleton className="mx-auto h-4 w-1/2" />
        </div>

        {/* Department buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-none" />
          ))}
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-8 flex justify-center">
          <div className="w-[318px] sm:w-[500px] space-y-6 border-2 border-muted p-8 text-center">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
            <Skeleton className="h-12 w-full mx-auto" />
          </div>
        </div>

      </div>
    </section>
  )
}
