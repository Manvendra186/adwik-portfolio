import { useState } from "react";
import { media } from "@/data/media";
import { CertificateCard } from "@/components/media/CertificateCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

/** 06 · Achievement Vault — certificates + accessible lightbox. */
export function Vault() {
  const [open, setOpen] = useState<number | null>(null);
  const total = media.certificates.length;
  const close = () => setOpen(null);
  const prev = () => setOpen((i) => (i === null ? null : (i - 1 + total) % total));
  const next = () => setOpen((i) => (i === null ? null : (i + 1) % total));

  return (
    <section id="vault" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index="06" label="Achievement Vault" title={<>Proof of the work.</>} />
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg text-paper/70">
            Twelve certificates and awards. Tap any one to view it full-size.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.certificates.map((asset, i) => (
            <Reveal key={asset.src} delay={(i % 3) * 80}>
              <CertificateCard
                asset={asset}
                index={i}
                total={total}
                onOpen={setOpen}
                title={`Certificate ${i + 1}`}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox
          asset={media.certificates[open]}
          index={open}
          total={total}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
