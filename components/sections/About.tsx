"use client";

import { useRef } from "react";
import { useMarkerHighlight } from "@/lib/useMarkerHighlight";
import { useSectionReveal } from "@/lib/useSectionReveal";

const BYLINE = ["8+ projects shipped", "Full-stack", "Open to work"];

function Mark({ children }: { children: string }) {
  return <mark className="marker">{children}</mark>;
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, ":scope .about-item");
  useMarkerHighlight(ref);

  return (
    <section
      id="about"
      ref={ref}
      className="px-5 py-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <div className="about-item flex flex-wrap items-baseline gap-x-6 gap-y-2 md:justify-between border-line pt-3 text-xs uppercase tracking-widest">
          <span>(About)</span>
          {BYLINE.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <h2 className="about-item mt-8 text-balance font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.95]">
          Building things for the web
        </h2>

        <div className="about-item mt-8 h-1 border-y border-line" />

        <div className="about-item mt-12 text-left text-base leading-[1.8] md:columns-2 md:gap-x-14 lg:columns-3 lg:gap-x-16 lg:text-[1.1875rem] [column-rule:1px_solid_theme(colors.line)] [&>p+p]:indent-8 lg:[&>p]:break-inside-avoid lg:[&>p+p]:indent-0">
          <p className="first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.5rem] first-letter:font-medium first-letter:leading-[0.75] first-letter:mt-1">
            What I&apos;m best at isn&apos;t tied to one framework. It&apos;s getting handed
            something unfamiliar and <Mark>figuring out how to make it work</Mark>. Most days that means
            building across the stack: React, Next.js, and TypeScript on the frontend, and
            Express, Python, or Go on the backend, usually with PostgreSQL behind it.
          </p>
          <p>
            I&apos;ve set up CI/CD with Azure Pipelines, <Mark>deployed</Mark> on Cloudflare, and
            containerized services with Docker. I use AI tools to move faster too, but I
            don&apos;t ship whatever they output. Everything still gets <Mark>reviewed</Mark> against the
            same fundamentals I&apos;d hold any code to.
          </p>
          <p>
            I thrive on <Mark>exploring things</Mark> I haven&apos;t touched before, <Mark>taking ownership</Mark> until
            they&apos;re solved, and chasing down the bugs nobody wants to deal with. It&apos;s
            not enough for something to just work. I want it to be right.
          </p>
        </div>
      </div>
    </section>
  );
}
