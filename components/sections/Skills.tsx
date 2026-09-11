"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { skills } from "@/data/skills";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section
      id="skills"
      ref={ref}
      className="border-b border-line px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">✦</span> What I Work With
        </p>
        <h2 className="mb-10 font-display text-4xl uppercase leading-tight md:text-5xl">
          My <span className="text-accent">skills</span>
        </h2>
        <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 md:grid-cols-6">
          {skills.map((s) => (
            <div
              key={s.name}
              className="group flex flex-col items-center justify-center gap-3 border-b border-r border-line px-4 py-10 transition-colors hover:bg-ink hover:text-bg"
            >
              <i className={`${s.icon} text-3xl text-ink group-hover:text-bg`} />
              <span className="text-xs uppercase tracking-widest text-muted group-hover:text-bg">
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
