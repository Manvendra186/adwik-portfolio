export type Orientation = "portrait" | "landscape" | "square";
export type Category = "hero" | "portrait" | "certificate";

export interface MediaAsset {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  orientation: Orientation;
  category: Category;
  /** CSS object-position, e.g. "center 30%". */
  focal?: string;
  /** width / height, e.g. 4 / 5. */
  aspect?: number;
  placeholder?: boolean;
}

/** Resolve a public/ asset path against the deploy base (e.g. /adwik-portfolio/ on GitHub Pages). */
const asset = (path: string): string => `${import.meta.env.BASE_URL}${path}`;

const cert = (n: number): MediaAsset => ({
  src: asset(`images/certificates/cert-${n.toString().padStart(2, "0")}.jpeg`),
  alt: `Certificate ${n}`,
  title: `Certificate ${n}`,
  orientation: "portrait",
  category: "certificate",
  aspect: 3 / 4,
  placeholder: false,
});

export const media: {
  hero: MediaAsset;
  portrait: MediaAsset;
  certificates: MediaAsset[];
} = {
  hero: {
    src: asset("images/photos/AdwikPhoto.jpeg"),
    alt: "Adwik Singh",
    orientation: "portrait",
    category: "hero",
    focal: "center 30%",
    aspect: 4 / 5,
    placeholder: false,
  },
  portrait: {
    src: asset("images/photos/AdwikPhoto.jpeg"),
    alt: "Adwik Singh",
    orientation: "portrait",
    category: "portrait",
    focal: "center 30%",
    aspect: 4 / 5,
    placeholder: false,
  },
  certificates: Array.from({ length: 12 }, (_, i) => cert(i + 1)),
};
