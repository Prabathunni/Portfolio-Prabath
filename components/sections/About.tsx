"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section id="about" ref={ref} className="container mx-auto px-5 py-24">
      <h2 className="text-3xl font-bold mb-6">
        About <span className="text-red-600">me</span>
      </h2>
      {/* PLACEHOLDER: replace with your real bio before shipping. */}
      <p className="text-gray-400 text-lg max-w-2xl">
        Placeholder bio — swap this for a paragraph about who you are, your background, and what
        drives you as a developer.
      </p>
    </section>
  );
}
