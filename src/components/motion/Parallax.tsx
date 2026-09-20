import { type ReactNode } from "react";
import { useParallax } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wrapper that drifts vertically against scroll. */
export function Parallax({ children, className, strength = 0.12 }: ParallaxProps) {
  const { ref, offset } = useParallax<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}
