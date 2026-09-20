import { identity } from "@/data/content";
import { HeroMedia } from "@/components/media/HeroMedia";
import { KineticType } from "@/components/motion/KineticType";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

/** 01 · Intro — the cinematic opening. */
export function Intro() {
  return (
    <section id="intro" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-ember/20 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-aqua/10 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="eyebrow text-ember">01 · Intro</p>
          </Reveal>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,15vw,11rem)] leading-[0.85] text-paper">
            <KineticType text="Adwik" />
            <br />
            <KineticType text="Singh" delay={120} outline />
          </h1>
          <Reveal delay={200}>
            <p className="mt-8 max-w-md text-lg text-paper/70">
              {identity.tagline} — {identity.grade}, {identity.school}.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#who"
                  className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-display text-sm text-ink transition-transform hover:scale-[1.03]"
                >
                  Meet Adwik <span aria-hidden>↓</span>
                </a>
              </Magnetic>
              <a
                href="#vault"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-6 py-3 font-display text-sm text-paper/80 transition-colors hover:border-paper/60"
              >
                Achievement Vault
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mx-auto w-full max-w-sm lg:max-w-none">
          <HeroMedia />
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-paper/40">Scroll</span>
          <span className="h-10 w-px overflow-hidden bg-paper/20">
            <span className="anim-cue block h-full w-full bg-ember" />
          </span>
        </div>
      </div>
    </section>
  );
}
