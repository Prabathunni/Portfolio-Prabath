"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

export default function Resume() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section
      id="resume"
      ref={ref}
      className="border-b border-line px-5 py-24 text-center md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <p className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">✦</span> Resume
        </p>
        <h2 className="font-display text-4xl uppercase leading-tight md:text-5xl">
          Want the full <span className="text-accent">story</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          Grab a copy of my resume for the full rundown on experience, tools, and projects.
        </p>
        {/* PLACEHOLDER: swap /resume-placeholder.pdf for your real resume file. */}
        <a
          href="/resume-placeholder.pdf"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block border border-accent bg-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-bg transition-colors hover:bg-transparent hover:text-accent"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}
