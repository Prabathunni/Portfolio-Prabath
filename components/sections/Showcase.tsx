"use client";

import { useEffect, useRef, useState } from "react";
import { useSectionReveal } from "@/lib/useSectionReveal";
import { projects } from "@/data/projects";

const STEP_MS = 3200;

// "Venmer Tech" -> ["Venmer", "Tech"]. From `md` up the words stack, so every title is two short lines.
function splitTitle(title: string): [string, string] {
  const space = title.indexOf(" ");
  return space === -1 ? [title, ""] : [title.slice(0, space), title.slice(space + 1)];
}

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  useSectionReveal(ref, ":scope .work-item");

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  // One lap through the projects once the strip is on screen, then it stays put.
  // Hovering, focusing or tapping a project ends the lap early.
  const [autoplay, setAutoplay] = useState(true);
  const stepsTaken = useRef(0);
  const lastPointer = useRef("mouse");

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      stepsTaken.current += 1;
      setActive((current) => (current + 1) % projects.length);
      if (stepsTaken.current >= projects.length) setAutoplay(false);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [autoplay, inView]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive(index);
  };

  return (
    <section
      id="works"
      ref={ref}
      aria-labelledby="works-heading"
      className="border-b border-line px-5 pb-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto">
        <p className="work-item flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
          <span className="text-accent">✦</span> Projects
        </p>

        <h2
          id="works-heading"
          className="work-item mt-8 text-balance font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.95]"
        >
          Selected work
        </h2>

        {/* A fixed-size strip: the open project grows and the rest give way, so the section never changes height.
            A column on phones, a row from `md` up. */}
        <ul
          ref={stripRef}
          role="list"
          className="work-item mt-10 flex h-[22rem] flex-col gap-1 md:mt-12 md:h-52 md:flex-row xl:h-56"
        >
          {projects.map((project, index) => {
            const isActive = index === active;
            const [first, rest] = splitTitle(project.title);

            return (
              <li
                key={project.title}
                className={`flex min-h-0 min-w-0 transition-[flex] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
                  isActive ? "flex-[3] md:flex-[2.3]" : "flex-1"
                }`}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  onPointerDown={(event) => {
                    lastPointer.current = event.pointerType;
                  }}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") select(index);
                  }}
                  onFocus={(event) => {
                    if (event.currentTarget.matches(":focus-visible")) select(index);
                  }}
                  onClick={(event) => {
                    // Touch has no hover: the first tap opens a project, the second follows the link.
                    if (lastPointer.current === "touch" && !isActive) {
                      event.preventDefault();
                      select(index);
                    }
                  }}
                  className={`relative flex w-full flex-row items-baseline gap-3 overflow-hidden p-4 transition-colors duration-300 motion-reduce:transition-none md:flex-col md:items-stretch md:gap-1.5 md:p-3 lg:p-4 ${
                    isActive ? "bg-ink text-bg" : "text-ink"
                  }`}
                >
                  <span aria-hidden className="text-[11px] tracking-[0.14em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-display text-2xl uppercase leading-[1.08] md:text-xl lg:text-2xl xl:text-3xl">
                    <span className="md:block">{first}</span>
                    {rest && (
                      <>
                        {" "}
                        <span className="md:block">{rest}</span>
                      </>
                    )}
                  </span>

                  <span
                    className={`absolute inset-x-4 bottom-4 text-sm leading-snug transition-opacity duration-300 motion-reduce:transition-none md:inset-x-auto md:bottom-3 md:left-3 md:w-64 lg:bottom-4 lg:left-4 lg:w-80 xl:w-96 ${
                      isActive ? "opacity-100 delay-200" : "opacity-0"
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-[0.2em] text-bg/70">
                      {project.kind}
                    </span>
                    <span className="mt-1 block">{project.description}</span>
                    <span aria-hidden className="mt-3 block font-medium">
                      Visit ↗
                    </span>
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
