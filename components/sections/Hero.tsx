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
        .from(".hero-hello", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.7, stagger: 0.15 }, "-=0.3")
        .from(".hero-para", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".hero-social", { opacity: 0, y: 10, duration: 0.4, stagger: 0.08 }, "-=0.2");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={rootRef} className="min-h-screen flex flex-col justify-center p-5">
      <div className="container mx-auto mt-5">
        <p className="hero-hello text-2xl text-gray-400 mb-3">Hello, I&apos;m Prabath</p>
        <p className="hero-title text-6xl md:text-7xl font-extrabold leading-none mb-0">
          Full-Stack
        </p>
        <p className="hero-title text-6xl md:text-7xl font-extrabold leading-none mb-0">
          <span className="text-red-600">Web</span> Developer
        </p>
        <p className="hero-para text-lg md:text-xl text-gray-400 mt-4 max-w-xl">
          I love coding and bringing ideas to life with modern web development. Clean, efficient,
          and user-friendly applications are what I aim for!
        </p>
      </div>

      <div className="container mx-auto flex justify-center gap-4 mt-12">
        {SOCIALS.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="hero-social text-white text-2xl hover:text-orange-400 transition-colors"
          >
            <i className={s.icon} />
          </a>
        ))}
      </div>
    </section>
  );
}
