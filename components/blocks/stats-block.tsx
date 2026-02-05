"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";

const data = [
  {
    name: "Europe",
    stat: "$10,023",
    goalsAchieved: 3,
    status: "observe",
    href: "#",
  },
  {
    name: "North America",
    stat: "$14,092",
    goalsAchieved: 5,
    status: "within",
    href: "#",
  },
];

export default function StatsBlock() {
  return (
    <div className="flex items-center justify-center w-full ">
      <dl className="grid grid-cols-1 gap-4 w-full">
        {data.map((item) => (
          <Card
            key={item.name}
            className="p-6 relative rounded-none border border-secondary-foreground"
          >
            <CardContent className="p-0">
              <dt className="text-sm font-medium text-muted-foreground">
                {item.name}
              </dt>
              <dd className="text-3xl font-semibold text-foreground">
                {item.stat}
              </dd>
              <div className="group relative mt-6 flex items-center space-x-4 rounded-md bg-muted/80 p-2 hover:bg-muted">
                <div className="flex w-full items-center justify-between truncate">
                  <div className="flex items-center space-x-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded bg-black text-white",
                      )}
                    >
                      {item.status === "within" ? (
                        <Check className="size-4 shrink-0" aria-hidden={true} />
                      ) : item.status === "observe" ? (
                        <Eye className="size-4 shrink-0" aria-hidden={true} />
                      ) : (
                        <AlertTriangle
                          className="size-4 shrink-0"
                          aria-hidden={true}
                        />
                      )}
                    </span>
                    <dd>
                      <p className="text-sm text-muted-foreground">
                        <Link href={item.href} className="focus:outline-none">
                          {/* Extend link to entire card */}
                          <span
                            className="absolute inset-0"
                            aria-hidden={true}
                          />
                          {item.goalsAchieved}/5 goals
                        </Link>
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {item.status}
                      </p>
                    </dd>
                  </div>
                  <ChevronRight
                    className="size-5 shrink-0 text-muted-foreground/60 group-hover:text-muted-foreground"
                    aria-hidden={true}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
