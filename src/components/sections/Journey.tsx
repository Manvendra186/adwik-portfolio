import { journey } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollProgress } from "@/lib/motion";

/** 05 · The Journey — a scroll-driven timeline. */
export function Journey() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  return (
    <section id="journey" ref={ref} className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="05" label="The Journey" title={<>So far, and onward.</>} />
        <div className="relative mt-16 max-w-2xl">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-paper/15" aria-hidden />
          <div
            className="absolute left-[7px] top-2 w-px origin-top bg-ember"
            style={{ height: "calc(100% - 1rem)", transform: `scaleY(${progress})` }}
            aria-hidden
          />
          <ol className="relative flex flex-col gap-10">
            {journey.map((stop, i) => (
              <li key={stop.label} className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-ink-2 bg-ember"
                  aria-hidden
                />
                <Reveal delay={i * 60}>
                  <h3 className="font-display text-xl text-paper">{stop.label}</h3>
                  <p className="mt-1 text-sm text-paper/60">{stop.note}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
