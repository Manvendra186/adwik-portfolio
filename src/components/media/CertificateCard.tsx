import type { MediaAsset } from "@/data/media";

interface CertificateCardProps {
  asset: MediaAsset;
  index: number;
  total: number;
  onOpen: (index: number) => void;
  title: string;
  tag?: string;
}

/** A certificate thumbnail (with its achievement) that opens the lightbox. */
export function CertificateCard({ asset, index, total, onOpen, title, tag }: CertificateCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative block w-full overflow-hidden rounded-xl border border-paper/10 bg-ink-2 text-left transition-colors duration-300 hover:border-ember/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
      aria-label={`Open certificate ${index + 1} of ${total}: ${title}`}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: asset.aspect }}>
        <img
          src={asset.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-3">
        <p className="font-display text-base text-paper">{title}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          {tag ? (
            <span className="rounded-full border border-paper/15 px-3 py-1 text-[0.6rem] uppercase tracking-widest text-ember/90">
              {tag}
            </span>
          ) : (
            <span aria-hidden />
          )}
          <span className="text-xs text-paper/40 transition-colors group-hover:text-ember">View →</span>
        </div>
      </div>
    </button>
  );
}

