"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { contact } from "@/data/contact";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/prabath77/", icon: "fa-brands fa-linkedin" },
  { href: contact.github, icon: "fa-brands fa-github" },
  { href: "https://www.instagram.com/sethuramxn/", icon: "fa-brands fa-instagram" },
  { href: `mailto:${contact.email}`, icon: "fa-solid fa-envelope" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container relative z-10 mx-auto text-center">
        <p className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">✦</span> Contact
        </p>
        <h2 className="font-display text-4xl uppercase leading-tight md:text-6xl">
          Let&apos;s build something <span className="text-accent">great</span>
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="mt-6 inline-block text-lg underline-offset-4 hover:underline md:text-2xl"
        >
          {contact.email}
        </a>

        <div className="mt-10 flex justify-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-4 pt-8">
          <small className="text-xs uppercase tracking-widest text-muted">
            &copy; 2026 prabu Stay inspired. Stay creative.
          </small>
        </div>
      </div>
    </footer>
  );
}
