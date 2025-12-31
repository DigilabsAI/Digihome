import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type NeoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "black" | "white";
};

export function NeoButton({
  children,
  variant = "black",
  className,
  ...props
}: NeoButtonProps) {
  const isWhite = variant === "white";

  return (
    <button
      {...props}
      className={cn(
        "group relative rounded-none overflow-hidden",
        "border-[3px] transition-all duration-200",
        "text-base font-semibold uppercase",
        "shadow-[5px_5px_0_#000]",
        "hover:-translate-x-[2px] hover:-translate-y-[2px]",
        "hover:shadow-[7px_7px_0_#000]",
        "active:translate-x-[5px] active:translate-y-[5px] active:shadow-none",
        isWhite
          ? "border-black bg-white text-black hover:bg-white/90"
          : "border-black bg-black text-white hover:bg-black/90",
        className
      )}
    >
      <span
        className={cn(
          "absolute inset-0 -left-full bg-gradient-to-r transition-all duration-500 group-hover:left-full",
          isWhite
            ? "from-transparent via-black/20 to-transparent"
            : "from-transparent via-white/30 to-transparent"
        )}
      />

      <span className="relative flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}
