import { type ReactNode } from "react";
import { useMagnetic } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Wrapper that gently pulls its content toward the pointer. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const { ref, style, onMove, onLeave } = useMagnetic<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  );
}
