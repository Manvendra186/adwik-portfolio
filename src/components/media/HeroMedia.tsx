import { useInView, useParallax, usePrefersReducedMotion } from "@/lib/motion";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";

/** Hero portrait: parallax drift + clip-path reveal on load. */
export function HeroMedia({ className }: { className?: string }) {
  const asset = media.hero;
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: pRef, offset } = useParallax<HTMLDivElement>(0.08);
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={pRef} className={cn("relative", className)} style={{ transform: `translateY(${offset}px)` }}>
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-paper/10"
        style={{
          aspectRatio: asset.aspect,
          clipPath: reduced || inView ? "inset(0 0 0 0 round 1rem)" : "inset(0 0 100% 0 round 1rem)",
          transition: reduced ? undefined : "clip-path 1.3s var(--ease-soft)",
        }}
      >
        <img
          src={asset.src}
          alt={asset.alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: asset.focal }}
          loading="eager"
          decoding="async"
        />
        {asset.placeholder && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-paper/70 backdrop-blur">
            Placeholder
          </span>
        )}
      </div>
    </div>
  );
}
