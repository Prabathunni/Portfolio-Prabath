"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

export default function Resume() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="resume" ref={ref} className="container mx-auto px-5 py-24 text-center">
      <h2 className="text-3xl font-bold mb-6">
        My <span className="text-red-600">resume</span>
      </h2>
      {/* PLACEHOLDER: swap /resume-placeholder.pdf for your real resume file. */}
      <a
        href="/resume-placeholder.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-gradient-to-r from-accentFrom to-accentTo text-white font-bold py-3 px-8 rounded-full shadow hover:opacity-90 transition-opacity"
      >
        Download Resume
      </a>
    </section>
  );
}
