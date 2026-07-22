"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { skills } from "@/data/skills";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="skills" ref={ref} className="container mx-auto px-5 py-24">
      <h2 className="text-3xl font-bold mb-10">
        My <span className="text-red-600">skills</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {skills.map((s) => (
          <div
            key={s.name}
            className="flex flex-col items-center gap-2 bg-card rounded-xl p-4 hover:shadow-[0_0_15px_rgba(249,21,21,0.5)] transition-shadow"
          >
            <i className={`${s.icon} text-3xl`} />
            <span className="text-sm text-gray-300">{s.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
