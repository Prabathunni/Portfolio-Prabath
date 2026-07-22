"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, ":scope .project-grid-item");

  return (
    <section id="works" ref={ref} className="container mx-auto px-5 py-24">
      <h2 className="text-3xl font-bold mb-10">
        My <span className="text-red-600">works</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.title} className="project-grid-item">
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
