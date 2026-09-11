"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, ":scope .project-grid-item");

  return (
    <section
      id="works"
      ref={ref}
      className="border-b border-line px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">✦</span> Selected Work
        </p>
        <h2 className="mb-10 font-display text-4xl uppercase leading-tight md:text-5xl">
          My <span className="text-accent">works</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.title} className="project-grid-item">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
