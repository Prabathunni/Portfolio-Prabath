"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const STATS = [
  { n: "01", label: "Projects shipped", value: "5+" },
  { n: "02", label: "Focus", value: "Full-Stack" },
  { n: "03", label: "Status", value: "Open to work" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="about" ref={ref} className="border-b border-line px-5 py-24 md:px-6">
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <ImagePlaceholder ratio="4/5" label="Portrait" />

        <div>
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">✦</span> About Me
          </p>
          <h2 className="font-display text-4xl uppercase leading-tight md:text-5xl">
            Building things for the <span className="text-accent">web</span>
          </h2>
          {/* PLACEHOLDER: replace with your real bio before shipping. */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Placeholder bio — swap this for a paragraph about who you are, your background, and
            what drives you as a developer.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.n}>
                <span className="font-display text-sm text-accent">{s.n}</span>
                <p className="mt-2 font-display text-2xl uppercase">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
