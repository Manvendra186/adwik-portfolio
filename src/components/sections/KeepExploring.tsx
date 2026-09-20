import { identity } from "@/data/content";
import { KineticType } from "@/components/motion/KineticType";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

/** 08 · Keep Exploring — the close + START AGAIN. */
export function KeepExploring() {
  const startAgain = () => {
    const el = document.getElementById("intro");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="explore" className="relative overflow-hidden py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[140px]" />
      </div>
      <div className="container-x flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow text-ember">08 · Keep Exploring</p>
        </Reveal>
        <h2 className="mt-8 font-display text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] text-paper">
          <KineticType text="The journey" />
          <br />
          <KineticType text="continues." delay={120} outline />
        </h2>
        <Reveal delay={160}>
          <p className="mt-8 max-w-lg text-lg text-paper/70">
            This is a living portfolio. As I learn, build, and explore, it grows with me.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Magnetic>
              <button
                type="button"
                onClick={startAgain}
                className="inline-flex items-center gap-3 rounded-full bg-ember px-8 py-4 font-display text-base text-ink transition-transform hover:scale-[1.03]"
              >
                <span aria-hidden>↺</span> Start again
              </button>
            </Magnetic>
            <a
              href={`mailto:${identity.email}`}
              className="text-sm text-paper/50 underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {identity.email}
            </a>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-16 text-xs text-paper/30">
            Built with curiosity · {identity.name} · {identity.school}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
