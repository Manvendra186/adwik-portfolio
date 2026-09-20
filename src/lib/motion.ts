import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

/** Live `prefers-reduced-motion` flag. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/** Observe when an element enters the viewport. */
export function useInView<T extends Element>(options?: InViewOptions) {
  const { threshold = 0.2, rootMargin = "0px 0px -12% 0px", once = true } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Synchronous first check: if the element is already in the viewport,
    // reveal it immediately so it can never get stuck hidden if the
    // observer callback is slow or never fires.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    if (rect.width > 0 && rect.height > 0 && rect.top < vh && rect.bottom > 0) {
      setInView(true);
      if (once) return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);
  return { ref, inView };
}

/** 0..1 progress of an element travelling through the viewport (rAF-throttled). */
export function useScrollProgress<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 1;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      setProgress(Math.min(1, Math.max(0, passed / total)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, progress };
}

/** Parallax translateY (px) driven by viewport position. */
export function useParallax<T extends Element>(strength = 0.12) {
  const ref = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) {
      setOffset(0);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      setOffset(-center * strength * 120);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, strength]);
  return { ref, offset };
}

/** Pointer-driven 3D tilt. */
export function useTilt<T extends Element>(max = 7) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<CSSProperties>({});
  const onMove = useCallback(
    (e: ReactPointerEvent<Element>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`,
        transition: "transform 0.16s ease-out",
      });
    },
    [max, reduced]
  );
  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
    });
  }, []);
  return { ref, style, onMove, onLeave };
}

/** Magnetic pull toward the pointer within the element's bounds. */
export function useMagnetic<T extends Element>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<CSSProperties>({});
  const onMove = useCallback(
    (e: ReactPointerEvent<Element>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setStyle({
        transform: `translate(${(x * strength).toFixed(1)}px, ${(y * strength).toFixed(1)}px)`,
        transition: "transform 0.2s ease-out",
      });
    },
    [strength, reduced]
  );
  const onLeave = useCallback(() => {
    setStyle({ transform: "translate(0,0)", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" });
  }, []);
  return { ref, style, onMove, onLeave };
}

/** Track which section id is currently in the centre band of the viewport. */
export function useScrollSpy(ids: string[]): string {
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const list = key.split("|").filter(Boolean);
    const els = list
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);
  return active;
}

