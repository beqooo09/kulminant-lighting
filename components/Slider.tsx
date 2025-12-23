"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

export default function Slider({
  slides,
  intervalMs = 4000,
}: {
  slides: Slide[];
  intervalMs?: number;
}) {
  // index = which slide is currently active (0, 1, 2, ...)
  const [index, setIndex] = useState(0);

  // paused = stop autoplay when user hovers (UX improvement)
  const [paused, setPaused] = useState(false);

  // Safety: if slides length changes, keep index in valid range
  const safeIndex = useMemo(() => {
    if (slides.length === 0) return 0;
    return index % slides.length;
  }, [index, slides.length]);

  // We store the latest "paused" value in a ref so the interval reads the current value
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (slides.length <= 1) return; // no need to autoplay

    const id = setInterval(() => {
      // only advance if not paused
      if (!pausedRef.current) {
        setIndex((prev) => (prev + 1) % slides.length);
      }
    }, intervalMs);

    // cleanup when component unmounts
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  function goPrev() {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setIndex((prev) => (prev + 1) % slides.length);
  }

  if (slides.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/70">
        No slides yet. Add images to <code className="text-white">public/images/slider</code>.
      </div>
    );
  }

  const current = slides[safeIndex];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, 520px"
        />

        {/* Soft overlay for “premium” look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white hover:border-white/40"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white hover:border-white/40"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 w-2.5 rounded-full border",
                i === safeIndex
                  ? "border-white bg-white"
                  : "border-white/30 bg-transparent hover:border-white/60",
              ].join(" ")}
            />
          ))}
        </div>
      )}

      {/* Small label (optional) */}
      <div className="px-4 py-3 text-xs text-white/60">
        {paused ? "Paused" : "Auto sliding"} • Slide {safeIndex + 1} of {slides.length}
      </div>
    </div>
  );
}
