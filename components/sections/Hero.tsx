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
      className="relative flex min-h-[calc(100svh-65px)] flex-col items-center overflow-hidden px-5 text-center md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container relative mx-auto flex flex-col items-center pt-16 md:pt-14">
        <p className="hero-tag flex flex-wrap items-center justify-center text-[15px] uppercase tracking-[0.2em] text-ink md:text-xl">
          {/* the trailing letter-spacing is pulled out of the right padding so the label text looks centred */}
          <span className="bg-ink py-1 pl-2 pr-[calc(0.5rem-0.2em)] text-bg md:py-2 md:pl-4 md:pr-[calc(1rem-0.2em)]">
            Full-Stack
          </span>
          <span className="py-1 pl-2 pr-2 md:py-2 md:pl-4 md:pr-4">Engineer (1+ YOE)</span>
        </p>

        <p className="hero-para mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-2xl">
          Combining solid full-stack fundamentals with AI tools to build high-performance
          software.
        </p>
      </div>

      <div className="container relative mx-auto mt-auto flex flex-col items-center pt-10">
        {/* the photo sits above the name (z-10 vs z-0) and the negative margin pulls it up so the top of the hair covers a little of the lettering */}
        <h1 className="hero-name relative z-0 -mb-[0.4em] font-display text-[clamp(2.25rem,13.5vw,10.5rem)] font-semibold md:text-[clamp(3rem,12.5vw,10.5rem)] uppercase leading-[0.9] tracking-[0.01em] text-ink">
          Prabath P U
        </h1>

        <div className="hero-photo relative z-10 aspect-[1003/1179] w-[max(240px,min(100%,calc(52svh*0.851),561px))]">
          {/* nudged down so the image's empty bottom strip is clipped by the section edge */}
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
      </div>
    </section>
  );
}
