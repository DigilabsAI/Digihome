import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // your cn utility

interface NeoBrutalismCardProps {
  className?: string;
  children?: ReactNode;
}

const NeobruCard: React.FC<NeoBrutalismCardProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "max-w-md bg-background border-4 border-foreground shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] p-2 md:p-4 z-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default NeobruCard;
