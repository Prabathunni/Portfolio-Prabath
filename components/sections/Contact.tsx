"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/prabath77/", icon: "fa-brands fa-linkedin" },
  { href: "https://github.com/Prabathunni", icon: "fa-brands fa-github" },
  { href: "https://www.instagram.com/sethuramxn/", icon: "fa-brands fa-instagram" },
  { href: "mailto:prabathunni826@gmail.com", icon: "fa-solid fa-envelope" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-[url('/image/contact-bg.jpeg')] bg-cover bg-center bg-no-repeat px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="absolute inset-0 bg-bg/90" />
      <div className="container relative z-10 mx-auto text-center">
        <p className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">✦</span> Contact
        </p>
        <h2 className="font-display text-4xl uppercase leading-tight md:text-6xl">
          Let&apos;s build something <span className="text-accent">great</span>
        </h2>
        <a
          href="mailto:prabathunni826@gmail.com"
          className="mt-6 inline-block text-lg text-muted transition-colors hover:text-accent md:text-2xl"
        >
          prabathunni826@gmail.com
        </a>

        <div className="mt-10 flex justify-center gap-4">
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

        <div className="mt-16 flex items-center justify-center gap-4 border-t border-line pt-8">
          <span className="cross-mark text-accent" />
          <small className="text-xs uppercase tracking-widest text-muted">
            &copy; 2026 Prabath — Stay inspired. Stay creative.
          </small>
        </div>
      </div>
    </footer>
  );
}
