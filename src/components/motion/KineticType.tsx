import { useInView, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface KineticTypeProps {
  text: string;
  className?: string;
  wordClassName?: string;
  /** stagger per word in ms */
  stagger?: number;
  /** base delay in ms */
  delay?: number;
  /** outline the words (uses .text-outline) */
  outline?: boolean;
}

/** Big display type that reveals word-by-word on scroll. Text stays in the DOM. */
export function KineticType({
  text,
  className,
  wordClassName,
  stagger = 90,
  delay = 0,
  outline = false,
}: KineticTypeProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn("inline-block will-change-transform", wordClassName, outline && "text-outline")}
          style={
            reduced
              ? undefined
              : {
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(0.6em) rotate(2deg)",
                  transition: `opacity 0.7s var(--ease-soft) ${delay + i * stagger}ms, transform 0.7s var(--ease-soft) ${delay + i * stagger}ms`,
                }
          }
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
