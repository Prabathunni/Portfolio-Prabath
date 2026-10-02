"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
        .from(".hero-para", { scale: 0.85, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-photo", { y: 120, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[calc(100svh-65px)] flex-col items-center overflow-hidden border-b border-line px-5 text-center md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container relative mx-auto flex flex-col items-center pt-16 md:pt-20">
        <h1 className="hero-name font-display text-[clamp(2.75rem,11vw,8rem)] uppercase leading-[0.9] text-ink">
          Prabath P U
        </h1>

        <p className="hero-tag mt-6 text-sm uppercase tracking-[0.2em] text-ink md:text-base">
          Full-Stack Engineer (1+ YOE)
        </p>

        <p className="hero-para mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Combining solid full-stack fundamentals with AI tools to build high-performance
          software.
        </p>
      </div>

      <div className="hero-photo relative mt-10 min-h-[300px] w-full flex-1">
        {/* nudged down so the image's empty bottom strip is clipped and the shirt sits on the section border */}
        <div className="absolute inset-0 translate-y-[2%]">
          <Image
            src="/image/about-nobg.png"
            alt="Prabath Unni"
            fill
            priority
            sizes="(min-width: 1024px) 560px, 90vw"
            className="object-contain object-bottom grayscale"
          />
        </div>
      </div>
    </section>
  );
}
