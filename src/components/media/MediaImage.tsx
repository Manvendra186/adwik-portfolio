import { type CSSProperties } from "react";
import type { MediaAsset } from "@/data/media";
import { cn } from "@/lib/utils";

interface MediaImageProps {
  asset: MediaAsset;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/** Base responsive image: aspect-ratio box, focal point, lazy loading. */
export function MediaImage({ asset, className, imgClassName, eager = false }: MediaImageProps) {
  const boxStyle: CSSProperties = {};
  if (asset.aspect) boxStyle.aspectRatio = `${asset.aspect}`;
  return (
    <div className={cn("relative overflow-hidden bg-ink-2", className)} style={boxStyle}>
      <img
        src={asset.src}
        alt={asset.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
        style={asset.focal ? { objectPosition: asset.focal } : undefined}
      />
    </div>
  );
}
