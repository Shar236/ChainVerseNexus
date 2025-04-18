
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardGlowProps {
  children: ReactNode;
  className?: string;
  glowClassName?: string;
}

export function CardGlow({
  children,
  className,
  glowClassName,
}: CardGlowProps) {
  return (
    <div className={cn("relative group", className)}>
      <div
        className={cn(
          "absolute inset-0 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500",
          glowClassName
        )}
        style={{
          background: "radial-gradient(circle at 50% 50%, #9b87f5 0%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
