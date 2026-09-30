"use client";

import { useRef } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const STATS = [
  { n: "01", label: "Projects shipped", value: "8+" },
  { n: "02", label: "Focus", value: "Full-Stack" },
  { n: "03", label: "Status", value: "Open to work" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section
      id="about"
      ref={ref}
      className="border-b border-line px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
        <div className="mx-auto w-full max-w-[420px] lg:mx-0">
          <ImagePlaceholder
            ratio="4/5"
            src="/image/about-nobg.png"
            alt="Prabath Unni"
            bordered={false}
          />
        </div>

        <div>
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">✦</span> About Me
          </p>
          <h2 className="font-display text-4xl uppercase leading-tight md:text-5xl">
            Building things for the <span className="text-accent">web</span>
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>
              What I&apos;m best at isn&apos;t tied to one framework. It&apos;s getting handed
              something unfamiliar and figuring out how to make it work. Most days that means
              building across the stack: React, Next.js, and TypeScript on the frontend, and
              Express, Python, or Go on the backend, usually with PostgreSQL behind it.
            </p>
            <p>
              I&apos;ve set up CI/CD with Azure Pipelines, deployed on Cloudflare, and
              containerized services with Docker. I use AI tools to move faster too, but I
              don&apos;t ship whatever they output. Everything still gets reviewed against the
              same fundamentals I&apos;d hold any code to.
            </p>
            <p>
              I thrive on exploring things I haven&apos;t touched before, taking ownership until
              they&apos;re solved, and chasing down the bugs nobody wants to deal with. It&apos;s
              not enough for something to just work. I want it to be right.
            </p>
          </div>

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
