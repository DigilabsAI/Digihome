import React from "react";
import { cn } from "@/lib/utils";

interface VercelCardProps {
  children?: React.ReactNode;
  showIcons?: boolean;
  className?: string;
  iconClassName?: string;
  animateOnHover?: boolean;
  glowEffect?: boolean;
  bordered?: boolean;
}
function VercelCard({
  children,
  className,
  showIcons = true,
  iconClassName,
  bordered = true,
}: VercelCardProps) {
  return (
    <div
      className={cn(
        "group/canvas-card relative flex flex-col items-center justify-center w-full h-full min-h-[200px]",
        bordered && "border border-black/[0.3] dark:border-white/[0.2] ",
        className
      )}
    >
      {showIcons && (
        <>
          <Icon className={cn("absolute -left-4 -top-4 h-8 w-8 text-black dark:text-white", iconClassName)} />
          <Icon className={cn("absolute -bottom-4 -left-4 h-8 w-8 text-black dark:text-white", iconClassName)} />
          <Icon className={cn("absolute -right-4 -top-4 h-8 w-8 text-black dark:text-white", iconClassName)} />
          <Icon className={cn("absolute -bottom-4 -right-4 h-8 w-8 text-black dark:text-white", iconClassName)} />
        </>
      )}

    

      <div className="relative h-full w-full p-4">
        {children}
      </div>
    </div>
  );
}

function Icon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

export { VercelCard };

