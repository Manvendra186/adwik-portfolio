import { strengths } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** 04 · Strengths */
export function Strengths() {
  return (
    <section id="strengths" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="04" label="Strengths" title={<>What I bring.</>} />
        <div className="mt-14 flex flex-col">
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="group flex flex-col gap-2 border-t border-paper/10 py-6 transition-colors hover:bg-paper/[0.03] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-4">
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-sm tabular-nums text-paper/40">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-paper transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-4xl">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-paper/50 sm:max-w-xs sm:text-right">{s.note}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-paper/10" />
        </div>
      </div>
    </section>
  );
}
