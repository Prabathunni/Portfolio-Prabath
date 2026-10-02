"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSectionReveal } from "@/lib/useSectionReveal";

const STATS = [
  { n: "01", label: "Projects shipped", value: "8+" },
  { n: "02", label: "Focus", value: "Full-Stack" },
  { n: "03", label: "Status", value: "Open to work" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, ":scope .about-item");

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden border-b border-line px-5 pt-24 md:px-6 lg:px-10 xl:px-20"
    >
      <div className="container mx-auto grid grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
        <div className="about-item lg:self-center lg:pb-24">
          <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="text-accent">✦</span> About Me
          </p>
          <h2 className="text-balance font-display text-4xl uppercase leading-tight md:text-5xl lg:text-6xl">
            Building things for the <span className="text-accent">web</span>
          </h2>
          <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
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

          <dl className="mt-10 max-w-xl border-t border-line">
            {STATS.map((s) => (
              <div
                key={s.n}
                className="flex items-baseline justify-between gap-6 border-b border-line py-4"
              >
                <dt className="flex items-baseline gap-4 text-xs uppercase tracking-widest text-muted">
                  <span className="font-display text-sm text-accent">{s.n}</span>
                  {s.label}
                </dt>
                <dd className="font-display text-xl uppercase text-ink md:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="about-item relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-[4%] left-1/2 -translate-x-1/2 lg:-top-[11%] select-none whitespace-nowrap font-display text-[clamp(4rem,20vw,8rem)] uppercase leading-none text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.14)" }}
          >
            About
          </span>
          <div className="pointer-events-none absolute left-1/2 top-[40%] h-2/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[110px]" />
          {/* nudged down so the image's empty bottom strip is clipped and the shirt sits on the border */}
          <div className="relative aspect-[4/5] translate-y-[2%]">
            <Image
              src="/image/about-nobg.png"
              alt="Prabath Unni"
              fill
              sizes="(min-width: 1024px) 460px, 420px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
