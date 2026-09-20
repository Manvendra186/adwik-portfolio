import { sections } from "@/data/content";
import { useScrollSpy } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Fixed chapter rail (desktop) + compact pill (mobile) tracking the active section. */
export function ChapterIndicator() {
  const ids = sections.map((s) => s.id);
  const active = useScrollSpy(ids);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "group flex items-center justify-end gap-2 transition-colors",
                isActive ? "text-ember" : "text-paper/40 hover:text-paper/80"
              )}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={cn(
                  "text-[0.6rem] tabular-nums tracking-widest transition-opacity",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              >
                {s.index}
              </span>
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  isActive ? "w-8 bg-ember" : "w-4 bg-paper/30 group-hover:w-6"
                )}
              />
            </a>
          );
        })}
      </nav>

      <div
        className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-paper/15 bg-ink/70 px-3 py-1.5 backdrop-blur lg:hidden"
        aria-hidden="true"
      >
        <span className="font-display text-xs tabular-nums text-ember">{current.index}</span>
        <span className="max-w-32 truncate text-[0.6rem] uppercase tracking-widest text-paper/50">
          {current.label}
        </span>
      </div>
    </>
  );
}
