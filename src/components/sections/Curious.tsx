import { curiosity } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** 03 · The Curious Mind */
export function Curious() {
  return (
    <section id="curious" className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="03" label="The Curious Mind" title={<>What pulls me forward.</>} />
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-lg text-paper/70">
            Curiosity is my compass — the reason I keep asking <span className="text-ember">why</span> and{" "}
            <span className="text-ember">how</span>.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-3">
          {curiosity.map((item, i) => (
            <Reveal key={item.index} delay={i * 90} className="bg-ink-2">
              <div className="flex h-full flex-col gap-6 p-8">
                <span className="font-display text-5xl text-outline">{item.index}</span>
                <div>
                  <h3 className="font-display text-2xl text-paper">{item.title}</h3>
                  <p className="mt-3 text-sm text-paper/60">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
