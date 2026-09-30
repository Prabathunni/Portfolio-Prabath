"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { INTRO_DURATION_MS } from "@/components/IntroOverlay";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          delay: INTRO_DURATION_MS / 1000,
        })
        .from(".hero-name", { scale: 1.15, opacity: 0, duration: 0.9 })
        .from(".hero-tag", { opacity: 0, y: 10, duration: 0.5 }, "-=0.4")
        .from(".hero-para", { scale: 0.85, opacity: 0, duration: 0.8 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center md:px-6 lg:px-10 xl:px-20"
    >
      <div className="grain-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[130px]" />

      <div className="container relative mx-auto flex flex-col items-center">
        <h1 className="hero-name font-display text-[clamp(2.75rem,11vw,8rem)] uppercase leading-[0.9] text-ink">
          Prabath P U
        </h1>

        <p className="hero-tag mt-6 text-sm uppercase tracking-[0.2em] text-ink md:text-base">
          Full-Stack Engineer (1+ YOE)
        </p>

        <p className="hero-para mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Combining solid full-stack fundamentals with AI tools to build high-performance
          software.
        </p>
      </div>
    </section>
  );
}
