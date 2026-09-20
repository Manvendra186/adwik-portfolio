import { type CSSProperties, type ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** delay in ms */
  delay?: number;
  /** vertical offset in px */
  y?: number;
  /** blur amount in px */
  blur?: number;
}

/** Fade + rise + de-blur when scrolled into view. Reduced-motion safe. */
export function Reveal({ children, className, delay = 0, y = 26, blur = 8 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const style: CSSProperties = reduced
    ? {}
    : {
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        filter: inView ? "none" : `blur(${blur}px)`,
        transition: `opacity 0.9s var(--ease-soft) ${delay}ms, transform 0.9s var(--ease-soft) ${delay}ms, filter 0.9s var(--ease-soft) ${delay}ms`,
        willChange: "opacity, transform, filter",
      };
  return (
    <div ref={ref} data-reveal className={cn(className)} style={style}>
      {children}
    </div>
  );
}
