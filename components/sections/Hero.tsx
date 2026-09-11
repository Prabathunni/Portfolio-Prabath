"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/prabath77/", icon: "fa-brands fa-linkedin" },
  { href: "https://github.com/Prabathunni", icon: "fa-brands fa-github" },
  { href: "https://www.instagram.com/sethuramxn/", icon: "fa-brands fa-instagram" },
  { href: "mailto:prabathunni826@gmail.com", icon: "fa-solid fa-envelope" },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
        .from(".hero-name", { opacity: 0, y: 16, duration: 0.5 }, "-=0.2")
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.7, stagger: 0.12 }, "-=0.2")
        .from(".hero-para", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="border-b border-line px-5 pb-16 pt-10 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <p className="hero-eyebrow mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">✦</span> Personal Portfolio
        </p>

        <p className="hero-name mb-3 text-lg text-muted">Hello, I&apos;m</p>
        <h1 className="hero-title font-display text-6xl uppercase leading-[0.95] md:text-7xl">
          Prabath
        </h1>
        <h1 className="hero-title font-display text-6xl uppercase leading-[0.95] text-accent md:text-7xl">
          Unni
        </h1>
        <p className="hero-title mt-4 font-display text-2xl uppercase tracking-wide text-muted md:text-3xl">
          Full-Stack Web Developer
        </p>

        <div className="hero-para mt-12 flex items-start gap-4 border-t border-line pt-6">
          <span className="cross-mark mt-1 text-accent" />
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
            I love coding and bringing ideas to life with modern web development. Clean,
            efficient, and user-friendly applications are what I aim for.
          </p>
        </div>

        <div className="hero-para mt-10 flex gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
