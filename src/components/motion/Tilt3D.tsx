import { type ReactNode } from "react";
import { useTilt } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** Wrapper that tilts in 3D toward the pointer. */
export function Tilt3D({ children, className, max = 7 }: Tilt3DProps) {
  const { ref, style, onMove, onLeave } = useTilt<HTMLDivElement>(max);
  return (
    <div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
