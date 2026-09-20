import { goals } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt3D } from "@/components/motion/Tilt3D";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** 07 · What's Next? */
export function WhatsNext() {
  return (
    <section id="next" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="07" label="What's Next?" title={<>Aiming higher.</>} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {goals.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 80}>
              <Tilt3D className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-paper/10 bg-ink-2 p-7">
                  <span className="font-display text-4xl text-outline">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-paper">{g.title}</h3>
                    {g.detail && <p className="mt-1 text-sm text-ember/90">{g.detail}</p>}
                    <p className="mt-3 text-sm text-paper/60">{g.note}</p>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
