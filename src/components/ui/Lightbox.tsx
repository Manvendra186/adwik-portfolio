import { useEffect, useRef } from "react";
import type { MediaAsset } from "@/data/media";

interface LightboxProps {
  asset: MediaAsset;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const focusable =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

/** Accessible certificate viewer: focus trap, Esc to close, arrow navigation. */
export function Lightbox({ asset, index, total, onClose, onPrev, onNext }: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>(focusable)).filter(
          (el) => el.offsetParent !== null
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${asset.title ?? "Certificate"} ${index + 1} of ${total}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden="true" />
      <div
        ref={panelRef}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-paper/15 bg-ink-2 shadow-lift"
      >
        <div className="flex items-center justify-between gap-4 border-b border-paper/10 px-5 py-3">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-sm text-ember">{(index + 1).toString().padStart(2, "0")}</span>
            <span className="font-display text-base text-paper">{asset.title ?? "Certificate"}</span>
            <span className="text-xs text-paper/40">
              {index + 1} / {total}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-paper/20 px-3 py-1 text-sm text-paper/80 transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
          >
            Close <span className="text-paper/40">Esc</span>
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-ink p-4 sm:p-6">
          <img
            src={asset.src}
            alt={asset.alt}
            className="mx-auto max-h-[68vh] w-auto max-w-full object-contain"
          />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-paper/10 px-5 py-3">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full border border-paper/20 px-4 py-1.5 text-sm text-paper/80 transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
          >
            ← Prev
          </button>
          <span className="hidden text-xs text-paper/40 sm:inline">Use ← → to navigate</span>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full border border-paper/20 px-4 py-1.5 text-sm text-paper/80 transition-colors hover:border-ember hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
