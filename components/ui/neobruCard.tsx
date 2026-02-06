"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeoBrutalismCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const NeobruCard = React.forwardRef<
  HTMLDivElement,
  NeoBrutalismCardProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        " bg-background border-4 border-foreground shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#000] p-2 md:p-4 z-20",
        className
      )}
      {...props}
    />
  );
});

NeobruCard.displayName = "NeobruCard";

export const MotionNeobruCard = motion.create(NeobruCard);
export default NeobruCard;
