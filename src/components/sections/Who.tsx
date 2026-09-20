import { identity } from "@/data/content";
import { PortraitReveal } from "@/components/media/PortraitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** 02 · Who Is Adwik? */
export function Who() {
  return (
    <section id="who" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <PortraitReveal className="mx-auto w-full max-w-md" />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading index="02" label="Who is Adwik?" title={<>A mind in motion.</>} />
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75">{identity.bio}</p>
          </Reveal>
          <Reveal delay={200}>
            <blockquote className="mt-10 border-l-2 border-ember pl-5">
              <p className="font-display text-xl text-paper/90">“{identity.pullQuote}”</p>
            </blockquote>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="eyebrow text-paper/40">Grade</p>
                <p className="mt-1 font-display text-lg text-paper">{identity.grade}</p>
              </div>
              <div>
                <p className="eyebrow text-paper/40">School</p>
                <p className="mt-1 font-display text-lg text-paper">Sunbeam School</p>
              </div>
              <div>
                <p className="eyebrow text-paper/40">Based in</p>
                <p className="mt-1 font-display text-lg text-paper">Mau</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
