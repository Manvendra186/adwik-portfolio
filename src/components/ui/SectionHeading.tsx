import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

/** Editorial section heading: index + label + big display title. */
export function SectionHeading({ index, label, title, className, tone = "dark" }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-center gap-3">
        <span className="font-display text-sm tabular-nums text-ember">{index}</span>
        <span className={cn("h-px w-10", tone === "dark" ? "bg-paper/25" : "bg-ink/25")} />
        <span className={cn("eyebrow", tone === "dark" ? "text-paper/60" : "text-ink/60")}>{label}</span>
      </div>
      <h2
        className={cn(
          "font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.95]",
          tone === "dark" ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
